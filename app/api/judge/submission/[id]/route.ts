import { validateToken } from "@/app/lib/auth/login";
import {
	findSubmissionById,
	type TestResult,
} from "@/app/lib/mongo/submissions";
import { NextRequest, NextResponse } from "next/server";

// Submissions are judged inline at submit time (Piston is synchronous), so a
// submission is already terminal when stored. This endpoint just returns it,
// ownership-checked. The client still polls it, which harmlessly resolves on the
// first read.
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

	return NextResponse.json(serialize(submission));
}

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
