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
	studentPhoneNumber: z.tuple([z.string().regex(/^\d+$/, "앞번호를 입력하세요").min(3, "앞번호를 3자리 이상입력하세요.").max(3, "앞번호는 3자리까지 입력가능합니다."), z.string().regex(/^\d+$/, "중간 번호를 입력하세요").min(4, "중간번호를 4자리 이상입력하세요").max(4, "중간번호는 4 자리까지 입력할 수 있습니다."), z.string().regex(/^\d+$/, "마지막 번호를 입력하세요").min(4, "마지막 번호를 4자리 이상입력하세요").max(4, "마지막 번호는 4 자리까지 입력할 수 있습니다.")]),
	 guardianPhoneNumber: z.tuple([z.string().regex(/^\d+$/, "앞번호를 입력하세요").min(3, "앞번호를 3자리 이상입력하세요.").max(3, "앞번호는 3자리까지 입력가능합니다."), z.string().regex(/^\d+$/, "중간 번호를 입력하세요").min(4, "중간번호를 4자리 이상입력하세요").max(4, "중간번호는 4 자리까지 입력할 수 있습니다."), z.string().regex(/^\d+$/, "마지막 번호를 입력하세요").min(4, "마지막 번호를 4자리 이상입력하세요").max(4, "마지막 번호는 4 자리까지 입력할 수 있습니다.")]),
})


export default studentSchema;



