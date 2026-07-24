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
const OUTPUT_LIMIT = 7;
const RUNTIME_ERROR = 11;

// Piston caps each stdio buffer at PISTON_OUTPUT_MAX_SIZE and, on overflow,
// kills the program rather than truncating. Keep in sync with the value set in
// piston/docker-compose.yml — it is only used to recognize the kill, so being
// stale makes the verdict less specific, never wrong.
const OUTPUT_MAX_BYTES = 1_048_576;

// The sandbox keeper aborts (signal 6) on overflow, but Piston reports the run
// as SIGKILL — indistinguishable from a timeout by signal alone. That is why an
// over-long-output submission used to be reported as "시간 초과".
const OVERFLOW_MARKER = "Sandbox keeper received fatal signal";

/**
 * Whether a SIGKILL was caused by exceeding the output cap rather than the time
 * limit. Two signals, because neither alone covers both streams:
 *  - stdout overflow leaves the keeper's abort message in stderr;
 *  - stderr overflow crowds that message out, but leaves stderr sitting exactly
 *    at the cap.
 * Both are positive evidence of overflow, so an OOM kill (also SIGKILL) is not
 * swept up and still falls through to the time-limit branch.
 */
function isOutputLimitKill(run: PistonRunResult): boolean {
	if (run.signal !== "SIGKILL") return false;
	if (run.stderr.includes(OVERFLOW_MARKER)) return true;
	return (
		run.stdout.length >= OUTPUT_MAX_BYTES || run.stderr.length >= OUTPUT_MAX_BYTES
	);
}

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
	// Both an output overflow and a timeout surface as SIGKILL, so check the
	// more specific cause first.
	if (isOutputLimitKill(run)) {
		return { statusId: OUTPUT_LIMIT, status: "Output Limit Exceeded", passed: false };
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
	if (cases.some((c) => c.statusId === OUTPUT_LIMIT)) return "output_limit_exceeded";
	if (cases.some((c) => c.statusId === RUNTIME_ERROR)) return "runtime_error";
	if (cases.some((c) => c.statusId === WRONG_ANSWER)) return "wrong_answer";
	return "internal_error";
}
