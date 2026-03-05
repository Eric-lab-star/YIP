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


export default function SignUpForm() {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			password: "",
			phoneNumber: "",
			role: "student",
		}
	})

	function onSubmit(data: z.infer<typeof signUpSchema>) {
		toast.success("회원가입이 완료되었습니다.", {position: "top-center"})
		console.log(data)
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>회원가입</CardTitle>
				<CardDescription>
					아래의 양식을 작성하여 회원가입을 완료하세요.
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
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="form-password">
												비밀번호
											</FieldLabel>
											<Input
													{...field}
													id="form-password"
													aria-invalid={fieldState.invalid}
													placeholder="********"
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
