import * as z from "zod";
export const loginSchema = z.object({
  name: z
    .string()
    .min(3, "이름을 입력하세요."),
  phoneNumber: z
    .string()
    .min(11, "핸드폰 번호 11자리를 모두 입력하세요.")
})
