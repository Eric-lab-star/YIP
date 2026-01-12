"use client";

import { challengeAction } from "@/app/actions/challengeAction";
import { AuthContext } from "@/components/commons/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useContext, useState  } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";


// 사용자가 제출했다면 제출했다는 메시지 보여주기 
// form ui를 변경시키서 제출를 못하게 하기
// useEffect로 처음 들어왔을 때 이미 제출했는지 확인하기
// 제출후에도 확인
export default function SayHello() {
	const {loggedIn, id, name} = useContext(AuthContext)
	const [submitted, setSubmitted] = useState(false) 

	if (!loggedIn) {
		redirect("/login")
	}


	const rhform = useForm<{link: string}>({
		mode: "all",
		defaultValues: {
			link: "",
		}
	})

	const onSubmit = async ({link}: {link: string}) => {
		if (!id || !name){
			console.log("id or name is not valid")
			toast.error("id or name is not valid")
			redirect("/login")
		}
		const saved = await challengeAction({userId: id, name,link}, "sayHello")
		if (saved) {
			setSubmitted(true)
			toast.success("과제를 제출을 완료했습니다.")
		}
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
							name="link"
							rules={{
								required: {value:true, message: "주소를 입력하세요"},
								min: {value: 20, message: "올바른 주소를 입력하세요"},
								pattern: {value: new RegExp(/https:\/\/codesandbox\.io\/.*/), message: "codesandbox.io 주소를 입력하세요"},
							}}
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
          	지우기	
          </Button>
          <Button type="submit" form="rhf">
					{submitted ? "수정하기" : "제출하기"}
          </Button>
        </Field>
      </CardFooter>
		</Card>
	)
}
