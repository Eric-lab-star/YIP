import studentSchema from "@/app/lib/zod/studentSchema";
import * as z from "zod";

export type StudentData = z.infer<typeof studentSchema>






