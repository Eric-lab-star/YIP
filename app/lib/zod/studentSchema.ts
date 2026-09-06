import * as z from "zod";

const classSchema = z.object({
	title: z.string(),
	day: z.string(),
	startTime: z.string(),
	endTime: z.string(),
})

const bookSchema = z.object({
	link: z.string(),
	imagekey: z.string(),
	title: z.string(),
	state: z.string(),
	description: z.string()
})

const studentSchema = z.object({
	name: z.string().min(2, "이름을 입력하세요."),
	studentPhoneNumber: z.string().regex(
		/^01[016789]-?\d{3,4}-?\d{4}$/,
		"올바른 전화번호 형식으로 입력하세요."
	),
	role: z.enum(["student", "admin"]),
	class: z.array(classSchema).min(1, "등원 날짜를 최소 한 개 이상 입력하세요."),
	birthday: z.date(),
	// 같은 교재를 두 번 배정할 이유가 없다. 막지 않았을 때 실제로 한 학생 문서에
	// 같은 교재가 두 번 들어갔고, 학생 화면에 같은 카드가 두 장 나왔다.
	books: z
		.array(bookSchema)
		.min(1, "최소 한개 선택하세요.")
		.refine(
			(books) => new Set(books.map((b) => b.title)).size === books.length,
			"같은 교재를 두 번 선택할 수 없습니다."
		)
})



export default studentSchema;

