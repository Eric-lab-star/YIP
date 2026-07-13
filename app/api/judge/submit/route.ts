import { validateToken } from "@/app/lib/auth/login";
import { findProblemBySlug } from "@/app/lib/mongo/problems";
import {
	createSubmission,
	type TestResult,
} from "@/app/lib/mongo/submissions";
import { getLanguage } from "@/app/lib/judge0/languages";
import { execute, isJudgeConfigured, resolveRuntime } from "@/app/lib/judge0/client";
import { deriveVerdict, evaluateRun, type CaseEval } from "@/app/lib/judge0/evaluate";
import { submitSchema } from "@/app/lib/zod/judgeSchema";
import { consumeSubmitRate } from "@/app/lib/mongo/judgeRateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const auth = await validateToken();
	if (!auth.success) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// Rate-limit per user before the expensive Piston fan-out (one run per test
	// case). Blocks hammering the judge; humans stay well under the limit.
	const rate = await consumeSubmitRate(auth.id);
	if (!rate.allowed) {
		return NextResponse.json(
			{ error: "제출이 너무 잦습니다. 잠시 후 다시 시도해주세요." },
			{ status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
		);
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

	// Resolve the language to an installed Piston runtime.
	let runtime: { language: string; version: string } | null;
	try {
		runtime = await resolveRuntime(lang.piston);
	} catch (e) {
		console.error("judge runtime lookup error:", e);
		return NextResponse.json(
			{ error: "채점 서버에 연결하지 못했습니다." },
			{ status: 502 }
		);
	}
	if (!runtime) {
		return NextResponse.json(
			{ error: "채점 서버에 해당 언어 런타임이 설치되지 않았습니다." },
			{ status: 503 }
		);
	}
	const rt = runtime;

	// Run every test case (Piston is synchronous, so we judge inline and store a
	// terminal result). One shared source, per-case stdin/expected comparison.
	let runs;
	try {
		runs = await Promise.all(
			problem.testcases.map((t) =>
				execute({
					language: rt.language,
					version: rt.version,
					filename: lang.filename,
					source: code,
					stdin: t.stdin,
					runTimeoutMs: Math.round(problem.timeLimit * 1000),
					memoryLimitBytes: problem.memoryLimit * 1024,
				})
			)
		);
	} catch (e) {
		console.error("judge execute error:", e);
		return NextResponse.json(
			{ error: "채점 실행에 실패했습니다." },
			{ status: 502 }
		);
	}

	const cases: CaseEval[] = [];
	const results: TestResult[] = runs.map((run, i) => {
		const t = problem.testcases[i];
		const evalResult = evaluateRun(run, t.expectedOutput);
		cases.push(evalResult);

		const base: TestResult = {
			index: i,
			statusId: evalResult.statusId,
			status: evalResult.status,
			hidden: t.hidden,
			timeMs: run.wallTimeMs,
			memoryKb: run.memoryKb,
		};
		// Never expose hidden test-case I/O.
		if (!t.hidden) {
			base.stdout = run.stdout;
			base.stderr = run.stderr;
			base.compileOutput = run.compileStderr;
			base.expected = t.expectedOutput;
		}
		return base;
	});

	const verdict = deriveVerdict(cases);
	const passed = cases.filter((c) => c.passed).length;
	const timeMs = results.reduce<number | null>(
		(max, r) => (r.timeMs === null ? max : Math.max(max ?? 0, r.timeMs)),
		null
	);
	const memoryKb = results.reduce<number | null>(
		(max, r) => (r.memoryKb === null ? max : Math.max(max ?? 0, r.memoryKb)),
		null
	);

	const submissionId = await createSubmission({
		userId: auth.id,
		problemId: problem._id!.toString(),
		problemSlug: problem.slug,
		language,
		code,
		verdict,
		tokens: [],
		results,
		passed,
		total: problem.testcases.length,
		timeMs,
		memoryKb,
	});

	return NextResponse.json({ submissionId });
}
