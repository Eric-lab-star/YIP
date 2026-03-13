import * as z from "zod";

const studentSchema = z.object({
	name: z.string().min(2, "이름을 입력하세요."),
	studentPhoneNumber: z.string().regex(
		/^01[016789]-?\d{3,4}-?\d{4}$/,
		"올바른 전화번호 형식으로 입력하세요."
	),
	role: z.enum(["student", "admin"]),
	date:z.array(z.string())
})


export default studentSchema;

