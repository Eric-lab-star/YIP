"use server";

import { validateToken } from "../lib/auth/login";
import {
	createTopic,
	deleteTopic,
	listTopics,
	renameTopic,
	reorderTopics,
} from "../lib/mongo/topics";
import { revalidatePath } from "next/cache";

type Result = { success: true } | { success: false; error: string };

async function requireAdmin() {
	const auth = await validateToken();
	return auth.success && auth.role === "admin" ? auth : null;
}

// 주제 slug 는 문제 slug 와 같은 규칙이다. 문제가 이 값을 참조하므로 만든
// 뒤에는 바꾸지 않는다 — 이름만 바뀐다.
const SLUG_RE = /^[a-z0-9-]+$/;

/** 목록과 관리 화면 둘 다 주제를 읽으므로 함께 무효화한다. */
function revalidate() {
	revalidatePath("/problems");
	revalidatePath("/problems/topics");
}

export async function createTopicAction(slug: string, name: string): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };
	if (!SLUG_RE.test(slug)) {
		return { success: false, error: "slug 는 영문 소문자·숫자·하이픈만 쓸 수 있습니다." };
	}
	if (!name.trim()) return { success: false, error: "이름을 입력하세요." };

	const topics = await listTopics();
	// unique 인덱스가 어차피 막지만, 그대로 두면 E11000 원문이 화면에 뜬다.
	if (topics.some((t) => t.slug === slug)) {
		return { success: false, error: "이미 있는 slug 입니다." };
	}

	const order = topics.length ? Math.max(...topics.map((t) => t.order)) + 1 : 0;
	const r = await createTopic(slug, name.trim(), order);
	if (!r.ok) return { success: false, error: r.error };
	revalidate();
	return { success: true };
}

export async function renameTopicAction(slug: string, name: string): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };
	if (!name.trim()) return { success: false, error: "이름을 입력하세요." };
	const r = await renameTopic(slug, name.trim());
	if (!r.ok) return { success: false, error: r.error };
	revalidate();
	return { success: true };
}

/**
 * 이웃과 자리를 맞바꾼다. 목록 끝에서는 아무것도 하지 않는다.
 *
 * 두 문서의 order 를 각각 쓰는 대신 전체를 다시 매긴다 — 이유는
 * `reorderTopics` 주석에 있다.
 */
export async function moveTopicAction(slug: string, dir: "up" | "down"): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };

	const topics = await listTopics();
	const i = topics.findIndex((t) => t.slug === slug);
	if (i < 0) return { success: false, error: "주제를 찾을 수 없습니다." };
	const j = dir === "up" ? i - 1 : i + 1;
	if (j < 0 || j >= topics.length) return { success: true };

	const slugs = topics.map((t) => t.slug);
	[slugs[i], slugs[j]] = [slugs[j], slugs[i]];
	const r = await reorderTopics(slugs);
	if (!r.ok) return { success: false, error: r.error };
	revalidate();
	return { success: true };
}

/** 참조하는 문제가 남아 있으면 `deleteTopic` 이 거부한다. */
export async function deleteTopicAction(slug: string): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };
	const r = await deleteTopic(slug);
	if (!r.ok) return { success: false, error: r.error };
	revalidate();
	return { success: true };
}
