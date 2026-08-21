import { ObjectId } from "mongodb";
import { getDB } from "./db";

export interface Topic {
	_id?: ObjectId;
	/** 문제가 가리키는 키라 불변. 문제 slug 와 같은 규칙. */
	slug: string;
	/** 화면에 보이는 이름. 자유롭게 바뀐다. */
	name: string;
	/** 목록 섹션 순서. 작을수록 위. */
	order: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface PublicTopic {
	slug: string;
	name: string;
	order: number;
}

async function col() {
	const db = await getDB();
	return db.collection<Topic>("topics");
}

let indexEnsured = false;
async function ensureIndexes() {
	if (indexEnsured) return;
	const c = await col();
	await c.createIndex({ slug: 1 }, { unique: true });
	await c.createIndex({ order: 1 });
	indexEnsured = true;
}

export async function listTopics(): Promise<PublicTopic[]> {
	const c = await col();
	const topics = await c.find({}).sort({ order: 1 }).toArray();
	return topics.map((t) => ({ slug: t.slug, name: t.name, order: t.order }));
}

export async function createTopic(
	slug: string,
	name: string,
	order: number
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		await ensureIndexes();
		const c = await col();
		const now = new Date();
		await c.insertOne({ slug, name, order, createdAt: now, updatedAt: now });
		return { ok: true };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}

/** 이름만 바꾼다. slug 는 문제가 가리키는 키라 건드리지 않는다. */
export async function renameTopic(
	slug: string,
	name: string
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const c = await col();
		const r = await c.updateOne(
			{ slug },
			{ $set: { name, updatedAt: new Date() } }
		);
		if (r.matchedCount === 0) return { ok: false, error: "not found" };
		return { ok: true };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}

export async function setTopicOrder(
	slug: string,
	order: number
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const c = await col();
		const r = await c.updateOne(
			{ slug },
			{ $set: { order, updatedAt: new Date() } }
		);
		if (r.matchedCount === 0) return { ok: false, error: "not found" };
		return { ok: true };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}

/**
 * 주제를 지운다. 참조하는 문제가 남아 있으면 거부한다.
 *
 * 문제들을 미분류로 떨어뜨리는 대안은 실수로 지웠을 때 분류가 조용히
 * 사라지고 하나씩 되돌려야 한다. 거부는 시끄럽고 복구할 게 없다.
 */
export async function deleteTopic(
	slug: string
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const db = await getDB();
		const inUse = await db.collection("problems").countDocuments({ topicSlug: slug });
		if (inUse > 0) {
			return { ok: false, error: `이 주제를 쓰는 문제가 ${inUse}개 있습니다. 먼저 옮기세요.` };
		}
		const r = await (await col()).deleteOne({ slug });
		if (r.deletedCount === 0) return { ok: false, error: "not found" };
		return { ok: true };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}

/**
 * 주어진 순서대로 order 를 0..n-1 로 다시 매긴다.
 *
 * 이웃끼리 order 를 맞바꾸는 방식은 쓰기가 두 번이라, 사이에서 실패하면 두
 * 주제가 같은 order 를 갖고 목록 순서가 렌더마다 달라진다. 전체를 한 번의
 * bulkWrite 로 다시 매기면 그 중간 상태가 없고, 이미 어긋나 있던 order 도
 * 이 호출로 정리된다.
 */
export async function reorderTopics(
	slugsInOrder: string[]
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		if (slugsInOrder.length === 0) return { ok: true };
		const c = await col();
		const now = new Date();
		await c.bulkWrite(
			slugsInOrder.map((slug, order) => ({
				updateOne: { filter: { slug }, update: { $set: { order, updatedAt: now } } },
			}))
		);
		return { ok: true };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}
