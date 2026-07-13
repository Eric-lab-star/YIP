import type { PistonRunResult } from "./client";
import type { Verdict } from "./verdict";

// Per-test-case outcome. statusId mirrors the small set the UI color-codes
// (3 = accepted/green, anything else = failure/red).
export interface CaseEval {
	statusId: number;
	status: string;
	passed: boolean;
}

const ACCEPTED = 3;
const WRONG_ANSWER = 4;
const TIME_LIMIT = 5;
const COMPILATION_ERROR = 6;
const RUNTIME_ERROR = 11;

/** Trim trailing whitespace on each line and any trailing blank lines. */
function normalizeOutput(s: string): string {
	return s
		.replace(/\r\n/g, "\n")
		.replace(/[ \t]+$/gm, "")
		.replace(/\n+$/, "");
}

/** Compare program output to expected output, ignoring trailing whitespace. */
export function compareOutput(actual: string, expected: string): boolean {
	return normalizeOutput(actual) === normalizeOutput(expected);
}

/** Classify a single Piston run against its expected output. */
export function evaluateRun(run: PistonRunResult, expected: string): CaseEval {
	if (run.compileCode !== null && run.compileCode !== 0) {
		return { statusId: COMPILATION_ERROR, status: "Compilation Error", passed: false };
	}
	// Piston kills a run that exceeds run_timeout with SIGKILL.
	if (run.signal === "SIGKILL") {
		return { statusId: TIME_LIMIT, status: "Time Limit Exceeded", passed: false };
	}
	if (run.signal || (run.code !== null && run.code !== 0)) {
		return { statusId: RUNTIME_ERROR, status: "Runtime Error", passed: false };
	}
	if (compareOutput(run.stdout, expected)) {
		return { statusId: ACCEPTED, status: "Accepted", passed: true };
	}
	return { statusId: WRONG_ANSWER, status: "Wrong Answer", passed: false };
}

/**
 * Reduce per-case results to one verdict, in a fixed severity order so the
 * reported verdict is deterministic regardless of case ordering.
 */
export function deriveVerdict(cases: CaseEval[]): Verdict {
	if (cases.length === 0) return "internal_error";
	if (cases.every((c) => c.statusId === ACCEPTED)) return "accepted";
	if (cases.some((c) => c.statusId === COMPILATION_ERROR)) return "compilation_error";
	if (cases.some((c) => c.statusId === TIME_LIMIT)) return "time_limit_exceeded";
	if (cases.some((c) => c.statusId === RUNTIME_ERROR)) return "runtime_error";
	if (cases.some((c) => c.statusId === WRONG_ANSWER)) return "wrong_answer";
	return "internal_error";
}
