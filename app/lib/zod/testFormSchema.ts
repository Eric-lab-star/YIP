import z from "zod";

export const testFormSchema = z.object({
	id: z.string().min(1).max(200)
})
