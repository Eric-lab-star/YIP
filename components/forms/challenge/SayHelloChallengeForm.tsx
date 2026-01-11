"use client";

import { challengeAction } from "@/app/actions/challengeAction";
import { validateToken } from "@/app/actions/loginAction";
import { challengeSchema } from "@/app/lib/zod/challengeSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";



export default function SayHello() {
	const rhform = useForm<z.infer<typeof challengeSchema>>({
		resolver: zodResolver(challengeSchema),
		mode: "all",
		defaultValues: {
			name: "",
			phoneNumber: "",
			link: "",
		}
	})

	const onSubmit = async (data: z.infer<typeof challengeSchema>) => {
		const action = await challengeAction(data, "sayHello")
		console.log(action)

	}

	return(
		<Card className="w-full sm:max-w-md mx-auto">
			<CardHeader>
				<CardTitle>1번째 과제. say_hello()</CardTitle>
				<CardDescription>과제를 완성하고 링크를 제출하세요.</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="rhf" onSubmit={rhform.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller 
							name="name"
							control={rhform.control} 
							render={({field, fieldState}) =>(
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="rhf-name">
										이름
									</FieldLabel >
									<Input
										{...field}
										id="rhf-name"
										aria-invalid={fieldState.invalid}
										placeholder="김커피"
										autoComplete="off"
									/>
									{fieldState.error &&
										<FieldError errors={[fieldState.error]}/>
									}
								</Field>
							)}
						/>


						<Controller 
							name="phoneNumber"
							control={rhform.control} 
							render={({field, fieldState}) =>(
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="rhf-phoneNumber">
										핸드폰 번호
									</FieldLabel >
									<Input
										{...field}
										id="rhf-phoneNumber"
										aria-invalid={fieldState.invalid}
										type="number"
										placeholder="01012341234"
										autoComplete="off"
									/>
									{fieldState.error &&
										<FieldError errors={[fieldState.error]}/>
									}
									
								</Field>
							)}
						/>


						<Controller 
							name="link"
							control={rhform.control} 
							render={({field, fieldState}) =>(
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="rhf-link">
										 링크
									</FieldLabel >
									<Input
										{...field}
										id="rhf-link"
										aria-invalid={fieldState.invalid}
										type="string"
										placeholder="https://codesandbox.io/devbox/1"
										autoComplete="off"
									/>
									{fieldState.error &&
										<FieldError errors={[fieldState.error]}/>
									}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>

			</CardContent>
      <CardFooter>
        <Field orientation="horizontal">
					
          <Button type="button" variant={"outline"} onClick={() =>rhform.reset()}>
          	초기화
          </Button>
          <Button type="submit" form="rhf">
          	제출하기
          </Button>
        </Field>
      </CardFooter>
		</Card>
	)
}
