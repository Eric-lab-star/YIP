"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { ko } from 'date-fns/locale'
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
import { studentCreateAction, updateStudentAction } from "@/app/actions/studentAction";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";

interface FormInputProps<T extends FieldValues>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
	name: Path<T>
	control: Control<T>
	label: string
	id: string
	placeholder?: string
	transform?: (input: string) => string
}


export default function SignUpForm({ studentData }: { studentData?: { _id: string } & z.infer<typeof studentSchema> }) {
	const form = useForm<z.infer<typeof studentSchema>>({
		resolver: zodResolver(studentSchema),
		mode: "onSubmit",
		defaultValues: studentData ? studentData : {
			name: "",
			studentPhoneNumber: "",
			birthday: new Date(Date.now()),
			role: "student",
			class: [{
				title: "python",
				day: "mon",
				startTime: "18:00",
				endTime: "20:00"
			}],
		}
	})
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "class", // 배열 필드 이름
	});


	async function onSubmit(data: z.infer<typeof studentSchema>) {
		const action = async () => {
			if (studentData) {
				return await updateStudentAction({ ...data, _id: studentData._id })
			} else {
				return await studentCreateAction(data)
			}
		}
		const result = await action()

		if (result.success) {
			toast.success(studentData ? "수정되었습니다." : "회원가입이 완료되었습니다.", { position: "top-center" })
			if (studentData) {
				redirect(".")
			} else {
				form.reset()
			}
		} else {
			toast.error(studentData ? "다시 확인하세요." : "회원가입에 실패하였습니다. 입력값을 확인해주세요.", { position: "top-center" })
		}
	}





	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle> {studentData ? "정보 수정" : "회원등록"}</CardTitle>
				<CardDescription>
					{studentData ? "정보수정하기" : "아래의 양식을 작성하여 회원등록을 완료하세요."}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<div className="grid w-full items-center gap-2 sm:grid-cols-3">
							<FormInput label="이름" name={"name"} id="form-name" control={form.control} placeholder="김경섭" />
							<FormInput
								label="전화번호"
								transform={formatPhoneNumber}
								name={"studentPhoneNumber"} id="form-phoneNumber" control={form.control} placeholder="010-0000-0000" />
							<Controller
								name={"birthday"}
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid} className="h-20">
										<FieldLabel htmlFor="form-birthday"> 생년월일 </FieldLabel>
										<Popover>
											<PopoverTrigger asChild>
												<Button id={"form-birthday"} variant={"outline"}>
													{form.watch("birthday") ? format(form.watch("birthday"), "yyyy/MM/dd", { locale: ko }) : "생년월일 선택"}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={form.watch("birthday") ? new Date(form.watch("birthday")) : undefined}
													onSelect={field.onChange}
													defaultMonth={new Date(Date.now())}
													captionLayout="dropdown"
												/>
											</PopoverContent>
										</Popover>
									</Field>
								)}

							/>
						</div>
						{
							fields.map((field, index) => (
								<div key={field.id} className="grid w-full items-center gap-2 sm:grid-cols-5">
									<Controller
										name={`class.${index}.title`}
										control={form.control}
										render={({ field: f, fieldState: s }) => (
											<Field data-invalid={s.invalid}>
												{index == 0 && <FieldLabel htmlFor={`class.${index}.title`}>수업반</FieldLabel>}
												<Select onValueChange={f.onChange} defaultValue={f.value}>
													<SelectTrigger>
														<SelectValue placeholder="수업반 선택" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="hd_class">아두이노(수업)</SelectItem>
														<SelectItem value="research">연구</SelectItem>
														<SelectItem value="python">파이썬</SelectItem>
														<SelectItem value="bridge">도브</SelectItem>
													</SelectContent>
												</Select>
											</Field>
										)}
									/>

									<Controller
										name={`class.${index}.day`}
										control={form.control}
										render={({ field: f, fieldState: s }) => (
											<Field data-invalid={s.invalid}>
												{index == 0 && <FieldLabel htmlFor={`class.${index}.day`}>등원 요일</FieldLabel>}
												<Select onValueChange={f.onChange} defaultValue={f.value}>
													<SelectTrigger>
														<SelectValue placeholder="등원 요일 선택" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="mon">월요일</SelectItem>
														<SelectItem value="tue">화요일</SelectItem>
														<SelectItem value="wed">수요일</SelectItem>
														<SelectItem value="thur">목요일</SelectItem>
														<SelectItem value="fri">금요일</SelectItem>
														<SelectItem value="sat">토요일</SelectItem>
														<SelectItem value="sun">일요일</SelectItem>
													</SelectContent>
												</Select>
											</Field>
										)}
									/>

									<Controller
										name={`class.${index}.startTime`}
										control={form.control}
										render={({ field: f, fieldState: s }) => (
											<Field data-invalid={s.invalid}>
												{index == 0 && <FieldLabel htmlFor={`class.${index}.startTime`}>등원 시간</FieldLabel>}
												<Input
													{...f}
													id={`class.${index}.startTime`}
													aria-invalid={s.invalid}
													placeholder={"13:00"}
													autoComplete="off"
												/>
												{s.invalid && (
													<FieldError errors={[s.error]} />
												)}
											</Field>
										)}
									/>
									<Controller
										name={`class.${index}.endTime`}
										control={form.control}
										render={({ field: f, fieldState: s }) => (
											<Field data-invalid={s.invalid}>
												{index == 0 && <FieldLabel htmlFor={`class.${index}.endTime`}>하원 시간</FieldLabel>}
												<Input
													{...f}
													id={`class.${index}.endTime`}
													aria-invalid={s.invalid}
													placeholder={"15:00"}
													autoComplete="off"
												/>
												{s.invalid && (
													<FieldError errors={[s.error]} />
												)}
											</Field>
										)}
									/>
									<Field>
										{index == 0 && <FieldLabel> 삭제 </FieldLabel>}
										<div>
											<Button size={"icon"} variant={"destructive"}
												type="button"
												onClick={(e) => { e.preventDefault(); remove(index) }}
												disabled={fields.length <= 1 ? true : false}>
												<Trash2Icon />
											</Button>
										</div>
									</Field>
								</div>
							))

						}
						<div className="flex w-full gap-2">
							<Button variant={"default"} type="button"
								onClick={(e) => {
									e.preventDefault()
									append({
										title: "python",
										day: "mon",
										startTime: "14:00",
										endTime: "16:00"
									})
								}}>
								추가
								<PlusIcon />
							</Button>
						</div>




						<Controller
							name="role"
							control={form.control}
							render={({ field }) => (
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
					{!studentData && <Button type="button" variant={"outline"} onClick={() => form.reset()}> 초기화 </Button>}
					<Button type="submit" form="form-signup" > {studentData ? "수정" : "등록"}  </Button>
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
				<Field data-invalid={fieldState.invalid} className="h-20">
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
