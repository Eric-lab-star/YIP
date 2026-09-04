"use server";

import { validateToken } from "../lib/auth/login";
import { saveWorksheetFields } from "../lib/mongo/worksheets";
import { worksheetSaveSchema } from "../lib/zod/worksheetSchema";

type Result = { success: true; savedAt: number } | { success: false; error: string };

/**
 * 활동지 자동 저장.
 *
 * 학생 본인 것만 쓴다 — userId 는 인자가 아니라 토큰에서 꺼낸다. 인자로 받으면
 * 남의 답안을 덮어쓸 수 있다.
 *
 * 성공 시 저장 시각을 돌려주는 이유는 화면에 "저장됨 · 오후 3:12" 를 띄우기
 * 위해서다. 클라이언트 시계로 찍으면 요청이 실패했는데도 방금 저장된 것처럼
 * 보일 수 있다.
 */
export async function saveWorksheetAction(
	pageId: string,
	answers: Record<string, string>
): Promise<Result> {
	const auth = await validateToken();
	if (!auth.success) return { success: false, error: "로그인이 필요합니다." };

	const parsed = worksheetSaveSchema.safeParse({ pageId, answers });
	if (!parsed.success) {
		return {
			success: false,
			error: parsed.error.issues[0]?.message ?? "입력을 확인해 주세요.",
		};
	}

	const r = await saveWorksheetFields(
		auth.id,
		auth.name,
		parsed.data.pageId,
		parsed.data.answers
	);
	if (!r.ok) return { success: false, error: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };

	// revalidatePath 는 부르지 않는다. 활동지는 학생 본인 화면에서만 읽고,
	// 그 값은 이미 브라우저 상태에 있다. 자동 저장마다 레슨 페이지 캐시를
	// 버리면 타이핑할 때마다 페이지가 다시 렌더된다.
	return { success: true, savedAt: Date.now() };
}
