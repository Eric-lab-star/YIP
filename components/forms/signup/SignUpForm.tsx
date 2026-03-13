"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import studentSchema from "@/app/lib/zod/studentSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPhoneNumber } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form"
import { studentCreateAction } from "@/app/actions/studentAction";

interface FormInputProps<T extends FieldValues>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
	name: Path<T>
	control: Control<T>
	label: string
	id: string
	placeholder?: string
	transform?: (input: string) => string
}


export default function SignUpForm() {
	const form = useForm<z.infer<typeof studentSchema>>({
		resolver: zodResolver(studentSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			studentPhoneNumber: "",
			role: "student",
		}
	})

	async function onSubmit(data: z.infer<typeof studentSchema>) {
		const result = await studentCreateAction(data)
		if (result.success) {
			toast.success("회원가입이 완료되었습니다.", { position: "top-center" })
			form.reset()
		} else {
			toast.error("회원가입에 실패하였습니다. 입력값을 확인해주세요.", { position: "top-center" })
		}
		console.log(result)
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>회원등록</CardTitle>
				<CardDescription>
					아래의 양식을 작성하여 회원등록을 완료하세요.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<div className="grid w-full items-center gap-4 md:grid-cols-2">
							<FormInput label="이름" name={"name"} id="form-name" control={form.control} placeholder="김경섭" />
							<FormInput
								label="전화번호"
								transform={formatPhoneNumber}
								name={"studentPhoneNumber"} id="form-phoneNumber" control={form.control} placeholder="010-0000-0000" />
						</div>
						<Controller
							name="role"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="form-role">
										권한
									</FieldLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="권한 선택" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="student">학생</SelectItem>
											<SelectItem value="admin">관리자</SelectItem>
										</SelectContent>
									</Select>
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation={"horizontal"}>
					<Button type="button" variant={"outline"} onClick={() => form.reset()}> 초기화 </Button>
					<Button type="submit" form="form-signup" >  확인  </Button>
				</Field>
			</CardFooter>
		</Card>
	)
}





function FormInput<T extends FieldValues>({
	name,
	control,
	label,
	id,
	placeholder,
	transform,
	...props

}: FormInputProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={id}>
						{label}
					</FieldLabel>
					<Input
						{...field}
						onChange={(e) => {
							const value = transform ? transform(e.target.value) : e.target.value
							field.onChange(value)
						}}
						{...props}
						id={id}
						aria-invalid={fieldState.invalid}
						placeholder={placeholder}
						autoComplete="off"
					/>
					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	)
}
