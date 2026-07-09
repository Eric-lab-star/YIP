import { validateToken } from "@/app/lib/auth/login";
import {
	findSubmissionById,
	updateSubmissionResult,
	type TestResult,
} from "@/app/lib/mongo/submissions";
import { findProblemBySlug } from "@/app/lib/mongo/problems";
import { getBatch } from "@/app/lib/judge0/client";
import { countPassed, deriveVerdict, isTerminal } from "@/app/lib/judge0/verdict";
import { NextRequest, NextResponse } from "next/server";

const toMs = (time: string | null) =>
	time === null ? null : Math.round(parseFloat(time) * 1000);

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const auth = await validateToken();
	if (!auth.success) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;
	const submission = await findSubmissionById(id);
	if (!submission) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}
	// A user may only see their own submissions (admins may see any).
	if (auth.role !== "admin" && submission.userId !== auth.id) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	// Terminal verdicts are immutable — serve the stored result without touching
	// the judge again.
	if (isTerminal(submission.verdict)) {
		return NextResponse.json(serialize(submission));
	}

	// Still pending: poll Judge0 for the batch and fold the results in.
	let results;
	try {
		results = await getBatch(submission.tokens);
	} catch (e) {
		console.error("judge poll error:", e);
		return NextResponse.json(serialize(submission));
	}

	const verdict = deriveVerdict(results);
	const problem = await findProblemBySlug(submission.problemSlug);
	const hidden = problem?.testcases.map((t) => t.hidden) ?? [];

	const detailed: TestResult[] = results.map((r, i) => {
		const isHidden = hidden[i] ?? false;
		const base: TestResult = {
			index: i,
			statusId: r.status.id,
			status: r.status.description,
			hidden: isHidden,
			timeMs: toMs(r.time),
			memoryKb: r.memory,
		};
		// Never persist or expose hidden test-case I/O.
		if (!isHidden) {
			base.stdout = r.stdout;
			base.stderr = r.stderr;
			base.compileOutput = r.compile_output;
			base.expected =
				problem?.testcases[i]?.expectedOutput ?? null;
		}
		return base;
	});

	const timeMs = detailed.reduce<number | null>(
		(max, r) => (r.timeMs === null ? max : Math.max(max ?? 0, r.timeMs)),
		null
	);
	const memoryKb = detailed.reduce<number | null>(
		(max, r) => (r.memoryKb === null ? max : Math.max(max ?? 0, r.memoryKb)),
		null
	);

	const update = {
		verdict,
		results: detailed,
		passed: countPassed(results),
		total: submission.total,
		timeMs,
		memoryKb,
	};

	// Only persist once the run is fully resolved, so a mid-flight poll doesn't
	// freeze a "pending" verdict as terminal.
	if (isTerminal(verdict)) {
		await updateSubmissionResult(id, update);
	}

	return NextResponse.json(serialize({ ...submission, ...update }));
}

// Client-facing shape: no Judge0 tokens, no raw source echo needed here.
function serialize(s: {
	verdict: string;
	problemSlug: string;
	language: string;
	passed: number;
	total: number;
	timeMs: number | null;
	memoryKb: number | null;
	results: TestResult[];
}) {
	return {
		verdict: s.verdict,
		problemSlug: s.problemSlug,
		language: s.language,
		passed: s.passed,
		total: s.total,
		timeMs: s.timeMs,
		memoryKb: s.memoryKb,
		results: s.results,
	};
}
