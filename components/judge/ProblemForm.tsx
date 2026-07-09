"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { LANGUAGES } from "@/app/lib/judge0/languages";
import {
	problemFormSchema,
	type ProblemFormInput,
} from "@/app/lib/zod/problemFormSchema";
import { createProblemAction } from "@/app/actions/problemAction";

function slugify(s: string): string {
	return s
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.slice(0, 200);
}

export default function ProblemForm() {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<ProblemFormInput>({
		resolver: zodResolver(problemFormSchema),
		defaultValues: {
			title: "",
			slug: "",
			difficulty: "easy",
			description: "",
			languages: [],
			starterCode: {},
			timeLimit: 5,
			memoryLimit: 256000,
			testcases: [{ stdin: "", expectedOutput: "", hidden: false }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "testcases",
	});

	const selectedLanguages = watch("languages") ?? [];

	const onSubmit = async (data: ProblemFormInput) => {
		const res = await createProblemAction(data);
		if (res.success) {
			toast.success("문제를 등록했습니다.");
			router.push(`/problems/${res.slug}`);
		} else {
			toast.error(res.error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mx-auto w-full max-w-3xl px-4 py-8"
		>
			<h1 className="mb-6 text-2xl font-bold">새 문제 만들기</h1>

			<FieldGroup className="gap-5">
				{/* 제목 + slug */}
				<Field data-invalid={!!errors.title}>
					<FieldLabel htmlFor="title">제목</FieldLabel>
					<Input
						id="title"
						{...register("title")}
						aria-invalid={!!errors.title}
						placeholder="예: 두 수의 합"
					/>
					{errors.title && <FieldError errors={[errors.title]} />}
				</Field>

				<Field data-invalid={!!errors.slug}>
					<FieldLabel htmlFor="slug">Slug (URL)</FieldLabel>
					<div className="flex gap-2">
						<Input
							id="slug"
							{...register("slug")}
							aria-invalid={!!errors.slug}
							placeholder="two-sum-stdin"
						/>
						<Button
							type="button"
							variant="outline"
							onClick={() =>
								setValue("slug", slugify(getValues("title")), {
									shouldValidate: true,
								})
							}
						>
							제목으로 생성
						</Button>
					</div>
					{errors.slug && <FieldError errors={[errors.slug]} />}
				</Field>

				{/* 난이도 */}
				<Field data-invalid={!!errors.difficulty}>
					<FieldLabel>난이도</FieldLabel>
					<Controller
						control={control}
						name="difficulty"
						render={({ field }) => (
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger className="w-48">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="easy">쉬움</SelectItem>
									<SelectItem value="medium">보통</SelectItem>
									<SelectItem value="hard">어려움</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</Field>

				{/* 설명 (마크다운) */}
				<Field data-invalid={!!errors.description}>
					<FieldLabel htmlFor="description">문제 설명 (마크다운)</FieldLabel>
					<Textarea
						id="description"
						rows={10}
						className="font-mono text-sm"
						{...register("description")}
						aria-invalid={!!errors.description}
						placeholder={"# 제목\n\n문제 설명을 마크다운으로 작성하세요."}
					/>
					{errors.description && <FieldError errors={[errors.description]} />}
				</Field>

				{/* 언어 선택 */}
				<Field data-invalid={!!errors.languages}>
					<FieldLabel>허용 언어</FieldLabel>
					<div className="flex flex-wrap gap-3">
						{LANGUAGES.map((l) => (
							<label
								key={l.slug}
								className="flex items-center gap-2 rounded border px-3 py-1.5 text-sm"
							>
								<input
									type="checkbox"
									value={l.slug}
									{...register("languages")}
								/>
								{l.label}
							</label>
						))}
					</div>
					{errors.languages && (
						<FieldError errors={[errors.languages]} />
					)}
				</Field>

				{/* 언어별 스타터 코드 */}
				{selectedLanguages.length > 0 && (
					<Field>
						<FieldLabel>스타터 코드 (선택)</FieldLabel>
						<div className="flex flex-col gap-3">
							{LANGUAGES.filter((l) =>
								selectedLanguages.includes(l.slug)
							).map((l) => (
								<div key={l.slug}>
									<span className="text-xs text-muted-foreground">
										{l.label}
									</span>
									<Textarea
										rows={4}
										className="font-mono text-sm"
										{...register(`starterCode.${l.slug}`)}
										placeholder={`${l.label} 시작 코드`}
									/>
								</div>
							))}
						</div>
					</Field>
				)}

				{/* 제한 */}
				<div className="flex gap-4">
					<Field data-invalid={!!errors.timeLimit} className="flex-1">
						<FieldLabel htmlFor="timeLimit">시간 제한 (초)</FieldLabel>
						<Input
							id="timeLimit"
							type="number"
							step="0.5"
							{...register("timeLimit", { valueAsNumber: true })}
							aria-invalid={!!errors.timeLimit}
						/>
						{errors.timeLimit && <FieldError errors={[errors.timeLimit]} />}
					</Field>
					<Field data-invalid={!!errors.memoryLimit} className="flex-1">
						<FieldLabel htmlFor="memoryLimit">메모리 제한 (KB)</FieldLabel>
						<Input
							id="memoryLimit"
							type="number"
							step="1000"
							{...register("memoryLimit", { valueAsNumber: true })}
							aria-invalid={!!errors.memoryLimit}
						/>
						{errors.memoryLimit && (
							<FieldError errors={[errors.memoryLimit]} />
						)}
					</Field>
				</div>

				{/* 테스트케이스 */}
				<Field data-invalid={!!errors.testcases}>
					<FieldLabel>테스트케이스</FieldLabel>
					{typeof errors.testcases?.message === "string" && (
						<p className="text-sm text-destructive">
							{errors.testcases.message}
						</p>
					)}
					<div className="flex flex-col gap-3">
						{fields.map((f, i) => (
							<div key={f.id} className="rounded-md border p-3">
								<div className="mb-2 flex items-center justify-between">
									<span className="text-sm font-medium">
										테스트 {i + 1}
									</span>
									<div className="flex items-center gap-3">
										<label className="flex items-center gap-1.5 text-sm">
											<input
												type="checkbox"
												{...register(`testcases.${i}.hidden`)}
											/>
											숨김
										</label>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => remove(i)}
											disabled={fields.length === 1}
											aria-label="테스트 삭제"
										>
											<Trash2 className="size-4" />
										</Button>
									</div>
								</div>
								<div className="grid gap-2 sm:grid-cols-2">
									<div>
										<span className="text-xs text-muted-foreground">
											입력 (stdin)
										</span>
										<Textarea
											rows={3}
											className="font-mono text-sm"
											{...register(`testcases.${i}.stdin`)}
										/>
									</div>
									<div>
										<span className="text-xs text-muted-foreground">
											기대 출력
										</span>
										<Textarea
											rows={3}
											className="font-mono text-sm"
											{...register(`testcases.${i}.expectedOutput`)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
					<Button
						type="button"
						variant="outline"
						className="mt-2 self-start"
						onClick={() =>
							append({ stdin: "", expectedOutput: "", hidden: false })
						}
					>
						+ 테스트케이스 추가
					</Button>
				</Field>

				<Button type="submit" disabled={isSubmitting} className="self-start">
					{isSubmitting && <Spinner />}
					문제 등록
				</Button>
			</FieldGroup>
		</form>
	);
}
