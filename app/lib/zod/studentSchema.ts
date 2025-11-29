import * as z from "zod";

export const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"] as const;
const DaySchema = z.enum(days);
const TimeSchema = z.object({
	h: z.coerce.number<number>().min(0, "최소 0시부터 입력가능합니다.").max(24, "24시까지 입력가능합니다."),
	m: z.coerce.number<number>().min(0, "최소 0분부터 입력가능합니다").max(59, "59분까지 입력 가능합니다."),
})

const studentSchema =  z.object({
	name: z.string("이름을 확인하세요.").min(1, "이름을 확인하세요"),
	birthYear: z.coerce.number<number>("연도를 확인해 주세요.").min(1800, "잘못된 연도입니다."),
	birthDate: z.coerce.number<number>("날짜를 확인해 주세요.").min(1).max(31, "잘못된 날짜입니다."),
	birthMonth: z.coerce.number<number>("월을 확인해 주세요.").min(1).max(12, "잘못된 월입니다."),
	school: z.string().min(1, "학교를 확인하세요"),
	classDays: z.partialRecord(DaySchema, z.object({start: TimeSchema, end: TimeSchema})),
	studentPhoneNumber: z.tuple([z.string().regex(/^\d+$/, "numbers only").min(3, "min 3").max(3, "max 3"), z.string().min(4).regex(/^\d+$/), z.string().min(4).regex(/^\d+$/)]),
	guardianPhoneNUmber: z.tuple([z.string().min(3).regex(/^\d+$/), z.string().min(4).regex(/^\d+$/), z.string().min(4).regex(/^\d+$/)]),
})


export default studentSchema;



