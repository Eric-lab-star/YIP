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
