// A submission's overall verdict. Derivation from per-case results lives in
// evaluate.ts; this module just owns the shared type.
export type Verdict =
	| "pending"
	| "accepted"
	| "wrong_answer"
	| "compilation_error"
	| "runtime_error"
	| "time_limit_exceeded"
	| "output_limit_exceeded"
	| "internal_error";

export function isTerminal(v: Verdict): boolean {
	return v !== "pending";
}
