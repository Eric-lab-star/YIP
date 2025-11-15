import * as z from "zod";


const classDaysSchema = z.array(z.object({
	date: z.enum(["mon", "tue", "wed", "thur", "fri", "sat", "sun"]),
	time: z.object({
			start: z.string(),
			end: z.string(),
		}),
}))



const studentSchema =  z.object({
	name: z.string().min(1, "Name is required"),
	birthYear: z.coerce.number<number>().min(1800, "Year is required"),
	birthDate: z.coerce.number<number>().min(1, "Invalid date").max(31, "Invalid date"),
	birthMonth: z.coerce.number<number>().min(1, "Invalid month").max(12, "Invalid month"),
	school: z.string().min(1, "school is required"),
	classDays: classDaysSchema,
})


export default studentSchema;

