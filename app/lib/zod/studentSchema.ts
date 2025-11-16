import * as z from "zod";

export const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"] as const;
const DaySchema = z.enum(days);
const TimeSchema = z.object({
	h: z.coerce.number<number>().max(24, "maximum valid input is 24"),
	m: z.coerce.number<number>().max(60,"maximum valid iput is 60"),
})

const studentSchema =  z.object({
	name: z.string().min(1, "Name is required"),
	birthYear: z.coerce.number<number>().min(1800, "Year is required"),
	birthDate: z.coerce.number<number>().min(1, "Invalid date").max(31, "Invalid date"),
	birthMonth: z.coerce.number<number>().min(1, "Invalid month").max(12, "Invalid month"),
	school: z.string().min(1, "school is required"),
	classDays: z.record(DaySchema, z.object({start: TimeSchema, end: TimeSchema}).optional()).optional() 
})


export default studentSchema;



