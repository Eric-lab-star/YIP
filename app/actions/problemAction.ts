"use server";

import { validateToken } from "../lib/auth/login";
import { createProblem } from "../lib/mongo/problems";
import { isSupportedLanguage } from "../lib/judge0/languages";
import { problemFormSchema, type ProblemFormInput } from "../lib/zod/problemFormSchema";
import { revalidatePath } from "next/cache";

type Result =
	| { success: true; slug: string }
	| { success: false; error: string };

/** Admin-only: create a judge problem from the admin form. */
export async function createProblemAction(
	data: ProblemFormInput
): Promise<Result> {
	const auth = await validateToken();
	if (!auth.success || auth.role !== "admin") {
		return { success: false, error: "권한이 없습니다." };
	}

	const parsed = problemFormSchema.safeParse(data);
	if (!parsed.success) {
		return { success: false, error: "입력값이 올바르지 않습니다." };
	}
	const p = parsed.data;

	// Every selected language must exist in the judge registry.
	if (!p.languages.every((l) => isSupportedLanguage(l))) {
		return { success: false, error: "지원하지 않는 언어가 포함되어 있습니다." };
	}

	// Keep only starter code for the selected languages (drop stale entries).
	const starterCode: Record<string, string> = {};
	for (const lang of p.languages) {
		starterCode[lang] = p.starterCode?.[lang] ?? "";
	}

	const created = await createProblem({
		slug: p.slug,
		title: p.title,
		description: p.description,
		difficulty: p.difficulty,
		languages: p.languages,
		starterCode,
		testcases: p.testcases,
		timeLimit: p.timeLimit,
		memoryLimit: p.memoryLimit,
		createdBy: auth.id,
	});

	if (!created.ok) {
		// Most likely a duplicate slug (unique index).
		const dup = /duplicate key/i.test(created.error);
		return {
			success: false,
			error: dup ? "이미 사용 중인 slug입니다." : "문제 저장에 실패했습니다.",
		};
	}

	revalidatePath("/problems");
	return { success: true, slug: p.slug };
}
