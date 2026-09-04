import { validateToken } from "@/app/lib/auth/login";
import { getWorksheet } from "@/app/lib/mongo/worksheets";

/**
 * 학생 본인의 활동지 답안을 돌려준다.
 *
 * 활동지 컴포넌트는 `.mdx` 안에 놓이므로 서버에서 props 로 값을 내려줄 자리가
 * 없다 — MDX 에 적는 props 는 파일에 고정된 값이다. 그래서 클라이언트에서
 * SWR 로 읽는다.
 *
 * pageId 는 쿼리로 받지만 userId 는 토큰에서만 온다. 남의 답안은 어떤 방법으로도
 * 이 라우트로 읽을 수 없다.
 */
export async function GET(req: Request) {
	const auth = await validateToken();
	if (!auth.success) {
		return Response.json({ error: "unauthorized" }, { status: 401 });
	}

	const pageId = new URL(req.url).searchParams.get("pageId");
	if (!pageId) {
		return Response.json({ error: "pageId required" }, { status: 400 });
	}

	const answers = await getWorksheet(auth.id, pageId);
	return Response.json(
		{ answers },
		// 학생마다 다른 내용이고 방금 쓴 값이 바로 보여야 한다.
		{ headers: { "Cache-Control": "private, no-store" } }
	);
}
