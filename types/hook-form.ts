import studentSchema from "@/app/lib/zod/studentSchema";
import { UseFormRegister } from "react-hook-form";
import * as z from "zod";

export type StudentDataRegister= ReturnType<UseFormRegister<StudentData>>
export type StudentData = z.infer<typeof studentSchema>
