import { validateToken } from "@/app/lib/auth/login";
import {
	clearWorksheetFields,
	getWorksheet,
	saveWorksheetFields,
} from "@/app/lib/mongo/worksheets";
import {
	worksheetClearSchema,
	worksheetSaveSchema,
} from "@/app/lib/zod/worksheetSchema";

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

/**
 * 자동 저장. 바뀐 칸만 받는다.
 *
 * **이 저장이 서버 액션이 아니라 API 라우트인 이유가 있다.** 서버 액션의 id 는
 * 빌드마다 새로 해시된다. 그래서 학생이 활동지를 열어둔 채로 배포가 나가면,
 * 이미 로드된 페이지가 들고 있는 id 가 서버에서 사라져 이후 저장이 전부
 * `Server Action "…" was not found on the server` 로 실패한다. 학생은 계속
 * 타이핑하는데 아무것도 저장되지 않는 상태가 되고, 그 사실을 새로고침하기
 * 전까지 모른다.
 *
 * 활동지는 학생이 쓴 글의 유일한 사본이라 그 실패 방식이 가장 나쁘다. 라우트
 * URL 은 배포를 건너도 그대로라 이 문제 자체가 없다. 이 저장소의 쓰기는 보통
 * 서버 액션을 쓰지만(`app/actions/`), 여기서는 그 관례보다 이 이유를 앞에 둔다.
 *
 * 검증과 권한 처리는 서버 액션이었을 때와 같다 — zod 로 검사하고, userId 는
 * 본문이 아니라 토큰에서 꺼낸다.
 */
export async function POST(req: Request) {
	const auth = await validateToken();
	if (!auth.success) {
		return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
	}

	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
	}

	const parsed = worksheetSaveSchema.safeParse(body);
	if (!parsed.success) {
		return Response.json(
			{ error: parsed.error.issues[0]?.message ?? "입력을 확인해 주세요." },
			{ status: 400 }
		);
	}

	const r = await saveWorksheetFields(
		auth.id,
		auth.name,
		parsed.data.pageId,
		parsed.data.answers
	);
	if (!r.ok) {
		return Response.json(
			{ error: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." },
			{ status: 500 }
		);
	}

	// 저장 시각은 서버가 찍는다. 클라이언트 시계로 찍으면 요청이 실패했는데도
	// 방금 저장된 것처럼 보일 수 있다.
	return Response.json({ savedAt: Date.now() });
}

/**
 * 활동지 한 블록 초기화. 지울 칸을 본문으로 받는다.
 *
 * 저장과 마찬가지로 userId 는 토큰에서만 온다 — 남의 답안은 지울 수 없다.
 * 지울 범위도 요청이 명시한 칸으로 한정된다(`worksheetClearSchema` 주석 참고).
 */
export async function DELETE(req: Request) {
	const auth = await validateToken();
	if (!auth.success) {
		return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
	}

	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
	}

	const parsed = worksheetClearSchema.safeParse(body);
	if (!parsed.success) {
		return Response.json(
			{ error: parsed.error.issues[0]?.message ?? "입력을 확인해 주세요." },
			{ status: 400 }
		);
	}

	const r = await clearWorksheetFields(
		auth.id,
		parsed.data.pageId,
		parsed.data.fieldIds
	);
	if (!r.ok) {
		return Response.json(
			{ error: "지우지 못했습니다. 잠시 후 다시 시도해 주세요." },
			{ status: 500 }
		);
	}
	return Response.json({ cleared: parsed.data.fieldIds.length });
}
