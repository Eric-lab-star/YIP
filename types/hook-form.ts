import studentSchema from "@/app/lib/zod/studentSchema";
import { ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form";
import * as z from "zod";

export type StudentDataRegister= ReturnType<UseFormRegister<StudentData>>
export type StudentData = z.infer<typeof studentSchema>
export type BdName  = "birthYear" | "birthMonth" | "birthDate";

export interface Roption{
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	max?: number;
	min?: number
}
export interface IBirthDayInput {
	field: string;
	register: UseFormRegister<StudentData>;
	name: BdName;
	rOption: Roption; 
}

const days = [
	"mon",
	"tue",
	"wed",
	"thur",
	"fri",
	"sat",
	"sun",
] as const

export type Day = typeof days[number]
