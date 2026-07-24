"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { loginSchema } from "../lib/zod/loginSchema"
import { loginAction } from "../actions/authAction"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import useUser from "@/components/SWR/auth/user"
import { formatPhoneNumber } from "@/lib/utils"
import { CatIcon } from "@/components/mdx/CatIcon"

/* ── Doodle design tokens (shared language with the landing page) ── */
const ink = "#263D5B" // hand-drawn ink line / text
const sky = "#49B6E5" // playful accent
const paper = "#FFFDF7" // warm notebook paper surface

// Irregular radii give every box a hand-drawn, "imperfect line" feel.
const doodleBox = (rot = 0): React.CSSProperties => ({
	border: `2.5px solid ${ink}`,
	borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
	rotate: `${rot}deg`,
})

// A softer, evenly-drawn box for input fields so text stays readable.
const doodleField: React.CSSProperties = {
	border: `2.5px solid ${ink}`,
	borderRadius: "14px 6px 14px 6px / 6px 14px 6px 14px",
}

const handFont = {
	fontFamily: '"Gaegu", "Delius Swash Caps", "Comic Sans MS", cursive',
}
const monoFont = {
	fontFamily: '"JetBrains Mono", ui-monospace, monospace',
}

/* A wobbly hand-drawn underline. */
function Squiggle({ color = sky, className = "" }: { color?: string; className?: string }) {
	return (
		<svg className={className} viewBox="0 0 300 14" fill="none" preserveAspectRatio="none" aria-hidden>
			<path
				d="M3 8 Q 30 2, 58 7 T 116 7 Q 150 12, 184 6 T 242 7 Q 270 2, 297 8"
				stroke={color}
				strokeWidth="4.5"
				strokeLinecap="round"
			/>
		</svg>
	)
}

export default function Page() {
	const { userMutate } = useUser()

	useEffect(() => {
		if (!document.getElementById("doodle-fonts")) {
			const link = document.createElement("link")
			link.id = "doodle-fonts"
			link.rel = "stylesheet"
			link.href =
				"https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
			document.head.appendChild(link)
		}
	}, [])

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
			if (result.rateLimited) {
				const mins = Math.ceil((result.retryAfterSec ?? 60) / 60)
				toast.error(
					`로그인 시도가 너무 많습니다. ${mins}분 후에 다시 시도해주세요.`,
					{ position: "top-center" },
				)
			} else {
				toast.error("로그인 정보가 없습니다.", { position: "top-center" })
			}
		} else {
			redirect(`/students/${result.userInfo.id}`)
		}
	}

	const acceptOnlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const invalidKeys = ["e", "E"]
		if (invalidKeys.includes(e.key)) {
			e.preventDefault()
		}
	}

	return (
		<div
			className="min-h-screen flex items-center justify-center antialiased px-5 py-12"
			style={{
				...handFont,
				color: ink,
				backgroundColor: paper,
				// Notebook dot-grid paper, matching the landing page.
				backgroundImage: `radial-gradient(${ink}14 1.4px, transparent 1.4px)`,
				backgroundSize: "24px 24px",
			}}
		>
			<div className={`w-full max-w-md ${isSubmitting ? "animate-pulse" : ""}`}>
				<div className="bg-white p-8 sm:p-10" style={doodleBox(-1)}>
					{/* Mascot + heading */}
					<div className="flex flex-col items-center text-center mb-8">
						<CatIcon size={84} src="BIG_SMILE" />
						<h1 className="relative inline-block mt-4 text-4xl" style={{ fontWeight: 700 }}>
							로그인
							<Squiggle color={sky} className="absolute -bottom-2 left-0 w-full h-3" />
						</h1>
						<p className="mt-5 text-lg leading-snug" style={{ color: `${ink}cc` }}>
							로그인을 하시면 더 많은 내용을 볼 수 있어요 ✏️
						</p>
					</div>

					<form id="form-login" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<div>
									<label
										htmlFor="form-name"
										className="block text-sm tracking-[0.15em] uppercase mb-2"
										style={{ ...monoFont, color: `${ink}aa` }}
									>
										이름
									</label>
									<input
										{...field}
										id="form-name"
										aria-invalid={fieldState.invalid}
										placeholder="김석수"
										autoComplete="off"
										disabled={isSubmitting}
										className="w-full bg-white px-4 py-3 text-xl outline-none transition-shadow focus:shadow-[3px_3px_0_0_#49B6E5] disabled:opacity-60"
										style={{
											...doodleField,
											borderColor: fieldState.invalid ? "#dc2626" : ink,
										}}
									/>
									{fieldState.invalid && (
										<p className="mt-1.5 text-base" style={{ color: "#dc2626" }}>
											{fieldState.error?.message}
										</p>
									)}
								</div>
							)}
						/>

						<Controller
							name="phoneNumber"
							control={form.control}
							render={({ field, fieldState }) => (
								<div>
									<label
										htmlFor="form-number"
										className="block text-sm tracking-[0.15em] uppercase mb-2"
										style={{ ...monoFont, color: `${ink}aa` }}
									>
										핸드폰 번호
									</label>
									<input
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
										className="w-full bg-white px-4 py-3 text-xl outline-none transition-shadow focus:shadow-[3px_3px_0_0_#49B6E5] disabled:opacity-60"
										style={{
											...doodleField,
											borderColor: fieldState.invalid ? "#dc2626" : ink,
										}}
									/>
									{fieldState.invalid && (
										<p className="mt-1.5 text-base" style={{ color: "#dc2626" }}>
											{fieldState.error?.message}
										</p>
									)}
								</div>
							)}
						/>

						<button
							type="submit"
							form="form-login"
							disabled={isSubmitting}
							className="w-full inline-flex items-center justify-center gap-2 h-14 text-xl text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
							style={{ ...doodleBox(-0.6), backgroundColor: ink }}
						>
							{isSubmitting ? (
								<>
									<Spinner /> 기다려주세요
								</>
							) : (
								"로그인"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
