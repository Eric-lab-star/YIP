import * as z from "zod";

// Validation for the admin "create problem" form. Shared by the client form
// (react-hook-form resolver) and the server action, so both enforce identical
// rules. Language slugs are re-checked against the judge registry in the action.

export const testcaseSchema = z.object({
	stdin: z.string().max(100_000, "입력이 너무 깁니다"),
	expectedOutput: z.string().max(100_000, "기대 출력이 너무 깁니다"),
	hidden: z.boolean(),
});

// 정적 라우트가 [slug] 를 이긴다. 이 slug 를 가진 문제는 페이지가 열리지
// 않으므로 애초에 만들 수 없게 막는다. app/problems/ 아래 정적 세그먼트를
// 추가하면 여기에도 더해야 한다.
export const RESERVED_PROBLEM_SLUGS = ["new", "topics"] as const;

export const problemFormSchema = z.object({
	title: z.string().min(1, "제목을 입력하세요").max(200, "제목이 너무 깁니다"),
	slug: z
		.string()
		.min(1, "slug를 입력하세요")
		.max(200)
		.regex(/^[a-z0-9-]+$/, "영문 소문자·숫자·하이픈만 사용하세요")
		.refine((s) => !RESERVED_PROBLEM_SLUGS.includes(s as (typeof RESERVED_PROBLEM_SLUGS)[number]), {
			message: `예약된 slug 입니다 (${RESERVED_PROBLEM_SLUGS.join(", ")})`,
		}),
	difficulty: z.enum(["easy", "medium", "hard"]),
	/** 빈 문자열은 "주제 없음". 액션에서 undefined 로 바꾼다. */
	topicSlug: z.string().regex(/^[a-z0-9-]*$/, "주제 slug 형식이 아닙니다").optional(),
	description: z
		.string()
		.min(1, "문제 설명을 입력하세요")
		.max(50_000, "설명이 너무 깁니다"),
	languages: z.array(z.string()).min(1, "언어를 하나 이상 선택하세요"),
	starterCode: z.record(z.string(), z.string()),
	timeLimit: z
		.number("시간 제한을 입력하세요")
		.min(0.5, "0.5초 이상이어야 합니다")
		.max(15, "15초 이하여야 합니다"),
	memoryLimit: z
		.number("메모리 제한을 입력하세요")
		.min(16_000, "16000KB 이상이어야 합니다")
		.max(512_000, "512000KB 이하여야 합니다"),
	testcases: z
		.array(testcaseSchema)
		.min(1, "테스트케이스를 하나 이상 추가하세요"),
});

export type ProblemFormInput = z.infer<typeof problemFormSchema>;
