"use client";
import { signUpSchema } from "@/app/lib/zod/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {Controller, useForm } from "react-hook-form";
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


export default function SignUpForm() {
	const form = useForm<z.infer<typeof studentSchema>>({
		resolver: zodResolver(studentSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			phoneNumber: "",
			role: "student",
		}
	})

	function onSubmit(data: z.infer<typeof studentSchema>) {
		toast.success("회원가입이 완료되었습니다.", {position: "top-center"})
		console.log(data)
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>회원등록</CardTitle>
				<CardDescription>
					아래의 양식을 작성하여 회원등록을 완료하세요.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller 
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="form-name">
												이름
											</FieldLabel>
											<Input
													{...field}
													id="form-name"
													aria-invalid={fieldState.invalid}
													placeholder="김경섭"
													autoComplete="off"
											/>
											{fieldState.invalid && (
													<FieldError errors={[fieldState.error]}/>
											)}
									</Field>
								)}
						/>
						<Controller 
								name="phoneNumber"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="form-phoneNumber">
												전화번호
											</FieldLabel>
											<Input
													{...field}
													onChange={(e) => {
														const value = e.target.value
														field.onChange( formatPhoneNumber(value))
													}}
													id="form-phoneNumber"
													aria-invalid={fieldState.invalid}
													placeholder="010-2222-3211"
													autoComplete="off"
											/>
											{fieldState.invalid && (
													<FieldError errors={[fieldState.error]}/>
											)}
									</Field>
								)}
						/>
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




function formatPhoneNumber(input: string) {
  const digits = input.replace(/-/g, "");
  switch (true) {
    case digits.length < 4:
      return digits;

    case digits.length < 8:
      return digits.replace(/(\d{3})(\d{1,4})/, "$1-$2");

    default:
      return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
  }
}


