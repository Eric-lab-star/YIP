"use server";

import { validateToken } from "../lib/auth/login";
import { createProblem, deleteProblem, updateProblem } from "../lib/mongo/problems";
import { isSupportedLanguage } from "../lib/judge0/languages";
import { problemFormSchema, type ProblemFormInput } from "../lib/zod/problemFormSchema";
import { revalidatePath } from "next/cache";

type Result =
	| { success: true; slug: string }
	| { success: false; error: string };

async function requireAdmin() {
	const auth = await validateToken();
	return auth.success && auth.role === "admin" ? auth : null;
}

// Validate the form and normalize the fields shared by create/update.
function prepare(
	data: ProblemFormInput
):
	| { ok: true; fields: Omit<ProblemFormInput, "slug"> & { starterCode: Record<string, string> }; slug: string }
	| { ok: false; error: string } {
	const parsed = problemFormSchema.safeParse(data);
	if (!parsed.success) {
		return { ok: false, error: "입력값이 올바르지 않습니다." };
	}
	const p = parsed.data;
	if (!p.languages.every((l) => isSupportedLanguage(l))) {
		return { ok: false, error: "지원하지 않는 언어가 포함되어 있습니다." };
	}
	// Keep only starter code for the selected languages (drop stale entries).
	const starterCode: Record<string, string> = {};
	for (const lang of p.languages) {
		starterCode[lang] = p.starterCode?.[lang] ?? "";
	}
	return {
		ok: true,
		slug: p.slug,
		fields: {
			title: p.title,
			description: p.description,
			difficulty: p.difficulty,
			languages: p.languages,
			starterCode,
			testcases: p.testcases,
			timeLimit: p.timeLimit,
			memoryLimit: p.memoryLimit,
		},
	};
}

/** Admin-only: create a judge problem from the admin form. */
export async function createProblemAction(
	data: ProblemFormInput
): Promise<Result> {
	const auth = await requireAdmin();
	if (!auth) return { success: false, error: "권한이 없습니다." };

	const prepared = prepare(data);
	if (!prepared.ok) return { success: false, error: prepared.error };

	const created = await createProblem({
		slug: prepared.slug,
		...prepared.fields,
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
	return { success: true, slug: prepared.slug };
}

/** Admin-only: update an existing problem. Matched by the original slug. */
export async function updateProblemAction(
	originalSlug: string,
	data: ProblemFormInput
): Promise<Result> {
	const auth = await requireAdmin();
	if (!auth) return { success: false, error: "권한이 없습니다." };

	const prepared = prepare(data);
	if (!prepared.ok) return { success: false, error: prepared.error };

	const updated = await updateProblem(originalSlug, prepared.fields);
	if (!updated.ok) {
		return {
			success: false,
			error: updated.error === "not found"
				? "문제를 찾을 수 없습니다."
				: "문제 수정에 실패했습니다.",
		};
	}

	revalidatePath("/problems");
	revalidatePath(`/problems/${originalSlug}`);
	return { success: true, slug: originalSlug };
}

/** Admin-only: delete a problem. */
export async function deleteProblemAction(
	slug: string
): Promise<{ success: true } | { success: false; error: string }> {
	const auth = await requireAdmin();
	if (!auth) return { success: false, error: "권한이 없습니다." };

	const deleted = await deleteProblem(slug);
	if (!deleted.ok) {
		return { success: false, error: "문제 삭제에 실패했습니다." };
	}

	revalidatePath("/problems");
	return { success: true };
}
