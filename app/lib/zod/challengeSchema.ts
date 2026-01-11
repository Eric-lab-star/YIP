import * as z from "zod";
export const challengeSchema = z.object({
	name: z.string()
		.min(3, "올바른 이름을 입력하세요")
		.max(10,"입력길이를 초과했습니다."),
	phoneNumber: z.string()
		.min(11, "올바른 번호를 입력하세요"),
	link: z.string("링크를 입력하세요").min(20, "올바른 링크를 입력하세요"),
})
