import { getDB } from "./db";

/**
 * 레슨 페이지의 활동지 답안.
 *
 * 문서는 (학생 × 페이지) 하나다. 페이지 안에 활동지 블록이 11 개든 20 개든
 * 문서는 하나이고, 답은 `answers` 에 필드 id 로 들어간다. 블록마다 문서를
 * 나누면 한 페이지를 읽는 데 열 번 넘게 질의해야 하고, 교사 화면에서 학생
 * 한 명의 활동지를 다시 조립해야 한다.
 *
 * `answers` 를 키-값으로 둔 이유도 같다. 활동지 문항은 앞으로도 계속 바뀌는데,
 * 필드를 스키마에 박아두면 문항을 하나 고칠 때마다 마이그레이션이 붙는다.
 * 키가 사라지면 그 답이 화면에 안 보일 뿐 데이터는 남는다.
 */
export interface Worksheet {
	userId: string;
	/** 활동지가 실린 페이지. 라우트 경로에서 앞뒤 슬래시를 뺀 형태. */
	pageId: string;
	/** 학생 이름. 교사 화면이 학생 컬렉션과 조인하지 않아도 되게 복사해 둔다. */
	userName: string;
	/** 필드 id → 학생이 쓴 값. */
	answers: Record<string, string>;
	createdAt: Date;
	updatedAt: Date;
}

async function col() {
	const db = await getDB();
	return db.collection<Worksheet>("worksheets");
}

let indexEnsured = false;
async function ensureIndexes() {
	if (indexEnsured) return;
	const c = await col();
	// 학생 한 명이 한 페이지에 문서 하나. 자동 저장은 같은 문서를 계속
	// upsert 하므로, unique 가 없으면 동시 저장이 중복 문서를 만든다.
	await c.createIndex({ userId: 1, pageId: 1 }, { unique: true });
	// 교사 화면은 "이 페이지를 쓴 학생 전부"를 최근 순으로 읽는다.
	await c.createIndex({ pageId: 1, updatedAt: -1 });
	indexEnsured = true;
}

/** 학생 본인의 답안. 아직 쓴 적이 없으면 빈 객체. */
export async function getWorksheet(
	userId: string,
	pageId: string
): Promise<Record<string, string>> {
	const c = await col();
	const doc = await c.findOne(
		{ userId, pageId },
		{ projection: { answers: 1, _id: 0 } }
	);
	return doc?.answers ?? {};
}

/**
 * 바뀐 필드만 덮어쓴다.
 *
 * `answers` 를 통째로 $set 하지 않는 게 핵심이다. 학생이 같은 활동지를 두 탭에
 * 열어두면 통째 쓰기는 나중에 저장한 탭이 다른 탭의 답을 지운다. 필드 단위
 * 점 표기(`answers.<id>`)로 쓰면 서로 건드린 칸만 바뀐다.
 *
 * 그래서 필드 id 는 점과 `$` 를 쓸 수 없다 — 경로가 쪼개지거나 연산자로 읽힌다.
 * 그 규칙은 zod 스키마(`worksheetSchema.ts`)가 강제한다.
 */
export async function saveWorksheetFields(
	userId: string,
	userName: string,
	pageId: string,
	patch: Record<string, string>
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		await ensureIndexes();
		const c = await col();
		const now = new Date();

		const set: Record<string, unknown> = { updatedAt: now, userName };
		for (const [field, value] of Object.entries(patch)) {
			set[`answers.${field}`] = value;
		}

		await c.updateOne(
			{ userId, pageId },
			{
				$set: set,
				$setOnInsert: { userId, pageId, createdAt: now },
			},
			{ upsert: true }
		);
		return { ok: true };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}

export interface WorksheetSubmission {
	userId: string;
	userName: string;
	answers: Record<string, string>;
	updatedAt: Date;
	/** 비어 있지 않은 칸 수. 교사 화면에서 진행 정도를 한눈에 보려고 쓴다. */
	filledCount: number;
}

/** 한 페이지의 제출 현황. 교사(관리자) 화면 전용. */
export async function listWorksheets(pageId: string): Promise<WorksheetSubmission[]> {
	const c = await col();
	const docs = await c.find({ pageId }).sort({ updatedAt: -1 }).toArray();
	return docs.map((d) => ({
		userId: d.userId,
		userName: d.userName ?? "(이름 없음)",
		answers: d.answers ?? {},
		updatedAt: d.updatedAt,
		filledCount: Object.values(d.answers ?? {}).filter((v) => v.trim() !== "")
			.length,
	}));
}
