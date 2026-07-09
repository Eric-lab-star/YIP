import * as z from "zod";
export const challengeSchema = z.object({
	link: z.string("링크를 입력하세요").min(20, "올바른 링크를 입력하세요").max(2048, "링크가 너무 깁니다"),
	userId: z.string("needs userid").min(1, "userId is missing").max(64, "userId is too long"),
	name: z.string("nees string as input").min(1, "name is missing").max(100, "name is too long")
})
