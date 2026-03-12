import * as z from "zod";
export const loginSchema = z.object({
	name: z
		.string()
		.min(2, "이름을 입력하세요."),
	phoneNumber: z
		.string()
		.regex(
			/^01[016789]-?\d{3,4}-?\d{4}$/,
			"올바른 전화번호 형식으로 입력하세요."
		)
		.min(13, "핸드폰 번호 11자리를 모두 입력하세요.")
		.max(13, "핸드폰 번호를 다시 확인하세요.")
})
