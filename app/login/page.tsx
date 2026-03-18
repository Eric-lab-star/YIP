"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
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
import { loginSchema } from "../lib/zod/loginSchema"
import { loginAction } from "../actions/authAction"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import useUser from "@/components/SWR/auth/user"
import { formatPhoneNumber } from "@/lib/utils"

export default function Page() {
	const { userMutate } = useUser()


	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			name: "",
			phoneNumber: "",
		},
	})

	const { isSubmitting } = form.formState

	async function onSubmit(data: z.infer<typeof loginSchema>) {
		const result = await loginAction(data)

		userMutate() // revalidate user data
		if (!result.success) {
			form.reset()
			toast.error("로그인 정보가 없습니다.", { position: "top-center" })
		} else {
			redirect(`/students/${result.userInfo.id}`)
		}
	}

	const acceptOnlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const invalidKeys = ["e", "E",];
		if (invalidKeys.includes(e.key)) {
			e.preventDefault()
		}
	}

	return (
		<div className="pt-30">
			<Card className={`mx-auto w-full sm:max-w-md ${isSubmitting && "animate-pulse"}`}>
				<CardHeader>
					<CardTitle>로그인</CardTitle>
					<CardDescription>
						로그인을 하시면 더 많은 내용을 볼 수 있습니다.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
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
											placeholder="김석수"
											autoComplete="off"
											disabled={isSubmitting}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-number">
											핸드폰 번호
										</FieldLabel>
										<Input
											{...field}
											onChange={(e) => {
												const fn = formatPhoneNumber(e.target.value)

												field.onChange(fn)
											}}
											onKeyDown={(e) => acceptOnlyNumber(e)}
											id="form-number"
											type="string"
											aria-invalid={fieldState.invalid}
											placeholder="010-3333-1231"
											autoComplete="off"
											disabled={isSubmitting}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<Field orientation="horizontal">
						<Button type="submit" form="form-login" disabled={isSubmitting}>
							{isSubmitting ?
								<><Spinner /> 기다려주세요</> :
								"로그인"}
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</div>
	)
}
