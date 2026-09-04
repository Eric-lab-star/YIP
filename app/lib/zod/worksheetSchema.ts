import { z } from "zod";

/**
 * 활동지 자동 저장 요청의 검증 규칙.
 *
 * 이 입력은 로그인한 학생이 보내지만, 브라우저에서 오는 값이므로 컴포넌트가
 * 보냈을 법한 모양을 그대로 믿지 않는다. 특히 두 가지를 막는다.
 *
 * 1. 필드 id — Mongo 에서 `answers.<id>` 점 표기로 쓰이므로 `.` 과 `$` 가
 *    들어가면 경로가 쪼개지거나 연산자로 해석된다. 영문 소문자·숫자·하이픈만
 *    허용해서 그 가능성 자체를 없앤다.
 * 2. 크기 — 자동 저장이라 요청이 자주 온다. 상한이 없으면 한 학생이 문서
 *    하나를 수 MB 로 키울 수 있다. 칸 하나와 요청 하나 모두에 상한을 둔다.
 */

/** 활동지 한 칸의 최대 길이. 회고·기획서 서술형을 넉넉히 담는 길이. */
export const FIELD_MAX = 2000;

/** 한 번의 저장 요청에 담을 수 있는 칸 수. 페이지 전체 칸 수보다 넉넉하다. */
export const FIELDS_PER_REQUEST_MAX = 60;

const fieldId = z
	.string()
	.min(1)
	.max(64)
	.regex(/^[a-z0-9-]+$/, "필드 id 는 영문 소문자·숫자·하이픈만 쓸 수 있습니다.");

/** 레슨 라우트 경로에서 앞뒤 슬래시를 뺀 형태. 예: AIDeveloper/FinalProject_guide */
const pageId = z
	.string()
	.min(1)
	.max(120)
	.regex(/^[A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)*$/, "잘못된 페이지 id 입니다.");

export const worksheetSaveSchema = z.object({
	pageId,
	answers: z
		.record(fieldId, z.string().max(FIELD_MAX, `한 칸에 ${FIELD_MAX}자까지 쓸 수 있습니다.`))
		.refine(
			(a) => Object.keys(a).length > 0,
			"저장할 내용이 없습니다."
		)
		.refine(
			(a) => Object.keys(a).length <= FIELDS_PER_REQUEST_MAX,
			`한 번에 ${FIELDS_PER_REQUEST_MAX}칸까지 저장할 수 있습니다.`
		),
});

export type WorksheetSaveInput = z.infer<typeof worksheetSaveSchema>;
