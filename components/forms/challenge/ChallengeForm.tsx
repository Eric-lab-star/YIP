"use client";

import { challengeAction, findChallengeAction } from "@/app/actions/challengeAction";
import { challenges } from "@/app/lib/mongo/challenge";
import { AuthContext } from "@/components/commons/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { sub } from "date-fns";
import { PartyPopper } from "lucide-react";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState  } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";


interface ChallengForm {
	challenge: challenges
}

export default function ChallengForm({challenge}: ChallengForm) {
	const {loggedIn, id, name} = useContext(AuthContext)
	const [submitted, setSubmitted] = useState<{submitted: boolean, link?: string}>({submitted: false}) 

	const rhform = useForm<{link: string}>({
		mode: "all",
		defaultValues: {
			link: submitted.link ? submitted.link : "",
		}
	})

	useEffect(() =>{
		const find = async () => {
			if (id && name){
				const doc = await findChallengeAction(id, challenge)
				setSubmitted(doc)
				rhform.setValue("link", doc.link ? doc.link : "")
			}
		}
		find()
	},[])

	if (!loggedIn) {
		redirect("/login")
	}



	const onSubmit = async ({link}: {link: string}) => {
		if (!id || !name){
			console.log("id or name is not valid")
			toast.error("id or name is not valid")
			redirect("/login")
		}
		const saved = await challengeAction({userId: id, name,link}, challenge)
		if (saved) {
			setSubmitted({submitted: true, link: link})
			toast.success("과제를 제출을 완료했습니다.")
		}
	}

	return(
		<Card className={ `my-6 w-full sm:max-w-md mx-auto ${rhform.formState.isSubmitting && "animate-pulse"}`}>
			<CardHeader>
				<CardTitle>도전 과제! {challenge}</CardTitle>
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
			<CardContent>
				{submitted && <div className="text-blue-400 flex space-x-3"> <PartyPopper/> <div>제출되었습니다.</div></div>}
			</CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant={"outline"} onClick={() =>rhform.reset()}>
          	지우기	
          </Button>
          <Button type="submit" form="rhf">
						{rhform.formState.isSubmitting && <Spinner />}
						{submitted ? "다시 제출하기" : "제출하기"}
          </Button>
        </Field>
      </CardFooter>
		</Card>
	)
}
