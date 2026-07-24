import * as z from "zod";

// Upper bound on submitted source size — generous for real solutions, but
// bounded so a single submission can't ship megabytes of code to the judge.
const MAX_CODE_LENGTH = 64 * 1024; // 64 KB

export const submitSchema = z.object({
	problemSlug: z.string().min(1).max(200),
	language: z.string().min(1).max(40),
	code: z.string().min(1, "코드를 입력하세요").max(MAX_CODE_LENGTH, "코드가 너무 깁니다"),
});

export type SubmitInput = z.infer<typeof submitSchema>;

// A one-off run against user-provided stdin (no judging). Used by the "실행"
// button so a user can see their program's output before submitting.
export const runSchema = z.object({
	language: z.string().min(1).max(40),
	code: z.string().min(1, "코드를 입력하세요").max(MAX_CODE_LENGTH, "코드가 너무 깁니다"),
	stdin: z.string().max(MAX_CODE_LENGTH).optional().default(""),
});

export type RunInput = z.infer<typeof runSchema>;

// An AI-hint request for a problem. `mode: "hint"` gives a progressive nudge
// (escalating with `level` 1→3, never a full solution); `mode: "diagnose"`
// explains why a failed submission is wrong. `failure` carries a short,
// client-supplied summary of the failing run (never hidden test data). Code is
// optional — a hint can be requested before writing anything.
export const hintSchema = z.object({
	problemSlug: z.string().min(1).max(200),
	language: z.string().min(1).max(40),
	code: z.string().max(MAX_CODE_LENGTH, "코드가 너무 깁니다").optional().default(""),
	mode: z.enum(["hint", "diagnose"]).default("hint"),
	level: z.number().int().min(1).max(3).default(1),
	failure: z.string().max(4000).optional(),
});

export type HintInput = z.infer<typeof hintSchema>;
