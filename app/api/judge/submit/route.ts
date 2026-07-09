import { validateToken } from "@/app/lib/auth/login";
import { findProblemBySlug } from "@/app/lib/mongo/problems";
import { createSubmission } from "@/app/lib/mongo/submissions";
import { getLanguage } from "@/app/lib/judge0/languages";
import { isJudgeConfigured, submitBatch } from "@/app/lib/judge0/client";
import { submitSchema } from "@/app/lib/zod/judgeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const auth = await validateToken();
	if (!auth.success) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	if (!isJudgeConfigured()) {
		return NextResponse.json(
			{ error: "채점 서버가 설정되지 않았습니다." },
			{ status: 503 }
		);
	}

	const parsed = submitSchema.safeParse(await req.json().catch(() => null));
	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}
	const { problemSlug, language, code } = parsed.data;

	const lang = getLanguage(language);
	if (!lang) {
		return NextResponse.json(
			{ error: "지원하지 않는 언어입니다." },
			{ status: 400 }
		);
	}

	const problem = await findProblemBySlug(problemSlug);
	if (!problem) {
		return NextResponse.json({ error: "문제를 찾을 수 없습니다." }, { status: 404 });
	}
	if (!problem.languages.includes(language)) {
		return NextResponse.json(
			{ error: "이 문제에서 허용되지 않은 언어입니다." },
			{ status: 400 }
		);
	}

	// One Judge0 run per test case, sharing the same source. Judge0 compares each
	// run's stdout to expected_output and returns Accepted / Wrong Answer itself.
	const batch = problem.testcases.map((t) => ({
		source_code: code,
		language_id: lang.id,
		stdin: t.stdin,
		expected_output: t.expectedOutput,
		cpu_time_limit: problem.timeLimit,
		memory_limit: problem.memoryLimit,
	}));

	let tokens: string[];
	try {
		tokens = await submitBatch(batch);
	} catch (e) {
		console.error("judge submit error:", e);
		return NextResponse.json(
			{ error: "채점 서버에 제출하지 못했습니다." },
			{ status: 502 }
		);
	}

	const submissionId = await createSubmission({
		userId: auth.id,
		problemId: problem._id!.toString(),
		problemSlug: problem.slug,
		language,
		code,
		verdict: "pending",
		tokens,
		results: [],
		passed: 0,
		total: problem.testcases.length,
		timeMs: null,
		memoryKb: null,
	});

	return NextResponse.json({ submissionId });
}
