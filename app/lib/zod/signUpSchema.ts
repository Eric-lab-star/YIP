import * as z from "zod";


const signUpSchema = z.object({
	name: z.string()
				 .min(3, "이름을 3글자 이상 입력하세요."),
	phoneNumber: z.string()
								.min(11, "11글자 이상 입력하세요."),
	password: z.string()
						 .min(11, "11글자 이상 입력하세요.")
						 .max(24, "24글자 이상 입력하세요."),
	role: z.enum(["student", "teacher"]),
})



export {signUpSchema}
