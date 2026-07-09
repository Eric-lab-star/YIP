import type { Judge0Result } from "./client";

// A submission's overall verdict, derived from the per-test-case Judge0 statuses.
export type Verdict =
	| "pending" // not all results are back yet
	| "accepted"
	| "wrong_answer"
	| "compilation_error"
	| "runtime_error"
	| "time_limit_exceeded"
	| "internal_error";

// Judge0 status ids (see https://ce.judge0.com/#statuses-and-languages).
const IN_QUEUE = 1;
const PROCESSING = 2;
const ACCEPTED = 3;
const WRONG_ANSWER = 4;
const TIME_LIMIT = 5;
const COMPILATION_ERROR = 6;
// 7..12 are the various runtime errors (SIGSEGV, SIGABRT, NZEC, ...).
const RUNTIME_ERROR_MIN = 7;
const RUNTIME_ERROR_MAX = 12;
const INTERNAL_ERROR = 13;
const EXEC_FORMAT_ERROR = 14;

export function isTerminal(v: Verdict): boolean {
	return v !== "pending";
}

/**
 * Reduce per-case Judge0 statuses to a single verdict. If any case is still
 * queued/processing the verdict is "pending". Otherwise the first non-accepted
 * failure decides it, in a fixed severity order so the reported verdict is
 * deterministic regardless of case ordering.
 */
export function deriveVerdict(results: Judge0Result[]): Verdict {
	if (results.length === 0) return "pending";

	if (results.some((r) => r.status.id === IN_QUEUE || r.status.id === PROCESSING)) {
		return "pending";
	}

	const ids = results.map((r) => r.status.id);
	if (ids.every((id) => id === ACCEPTED)) return "accepted";
	if (ids.some((id) => id === COMPILATION_ERROR)) return "compilation_error";
	if (ids.some((id) => id === TIME_LIMIT)) return "time_limit_exceeded";
	if (ids.some((id) => id >= RUNTIME_ERROR_MIN && id <= RUNTIME_ERROR_MAX))
		return "runtime_error";
	if (ids.some((id) => id === WRONG_ANSWER)) return "wrong_answer";
	if (ids.some((id) => id === INTERNAL_ERROR || id === EXEC_FORMAT_ERROR))
		return "internal_error";
	return "internal_error";
}

export function countPassed(results: Judge0Result[]): number {
	return results.filter((r) => r.status.id === ACCEPTED).length;
}
