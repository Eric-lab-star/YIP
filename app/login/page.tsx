"use client"
import Link  from "next/link"
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
import { loginAction, validateToken } from "../actions/loginAction"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { useAuthCtx } from "@/components/commons/AuthProvider"

const checkToken = async () => {
	const validToken = await validateToken()
	if (validToken?.result == "expired token") {
		return false
	} else {
		return true
	}
	
}

export default function Page() {
	const authCtx = useAuthCtx()

	useEffect(() => {
		checkToken().then((r)=>{
			if (!r) {
				toast.error("로그인 세션이 만료되었습니다.", {position: "top-center"})
				authCtx.setUser({loggedIn: false})

			}
		})
	},[])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  })

	const {isSubmitting } = form.formState


  async function onSubmit(data: z.infer<typeof loginSchema>) {
		const result = await loginAction(data)
		if (!result) {
			form.reset()
			toast.error("로그인 정보가 없습니다.",{position:"top-center"})
		} else {
			redirect("/pythonWebScrapper")
		} 
	}

	const acceptOnlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const invalidKeys = ["e", "E", "+", "-"];
		if ( invalidKeys.includes( e.key ) ) {
			e.preventDefault( )
		}
	}


  return (
		<div className="pt-30">
    <Card className={ `mx-auto w-full sm:max-w-md ${isSubmitting && "animate-pulse"}`}>
			<Link href={"/pythonWebScrapper"}></Link>
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
										onKeyDown={(e) => acceptOnlyNumber(e)}
										id="form-number"
										type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="01033331231"
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
						"로그인" }
          </Button>
        </Field>
      </CardFooter>
    </Card>
		</div>
  )
}
