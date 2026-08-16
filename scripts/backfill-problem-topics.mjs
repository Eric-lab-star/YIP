// Algorithm 레슨이 이미 가진 /problems/<slug> 링크에서 초기 주제 분류를
// 만들어 넣는다. 그 문제를 가르치는 챕터가 직접 링크하므로 현재 존재하는
// 가장 좋은 신호다. 백필 이후의 진실 소스는 problems.topicSlug 이고,
// 주제는 커리큘럼과 독립적으로 편집된다.
//
// 기본은 미리보기. 실제 쓰기는 --write 를 줄 때만 한다. slug 로 upsert 하므로
// 다시 실행해도 안전하다.
import { MongoClient } from "mongodb";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const WRITE = process.argv.includes("--write");
const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const ALGO = join(ROOT, "app", "Algorithm");

/** 디렉터리를 재귀로 훑어 .mdx 파일 경로를 모은다. */
function mdxFiles(dir) {
	const out = [];
	for (const entry of readdirSync(dir)) {
		const p = join(dir, entry);
		if (statSync(p).isDirectory()) out.push(...mdxFiles(p));
		else if (entry.endsWith(".mdx")) out.push(p);
	}
	return out;
}

/** 커리큘럼 배열에서 { slug, name } 을 순서대로 뽑는다. */
function curriculum() {
	const src = readFileSync(join(ROOT, "utils", "curriculum", "Algorithm.ts"), "utf8");
	const out = [];
	const re = /name:\s*"([^"]+)"[\s\S]{0,200}?slug:\s*"([^"]+)"/g;
	let m;
	while ((m = re.exec(src))) out.push({ name: m[1], slug: m[2] });
	return out;
}

function chapterLinks() {
	const map = new Map(); // chapterSlug -> Set<problemSlug>
	for (const dir of readdirSync(ALGO)) {
		const full = join(ALGO, dir);
		if (!statSync(full).isDirectory()) continue;
		const slugs = new Set();
		for (const f of mdxFiles(full)) {
			for (const m of readFileSync(f, "utf8").matchAll(/\/problems\/([a-z0-9-]+)/g)) {
				slugs.add(m[1]);
			}
		}
		if (slugs.size) map.set(dir, slugs);
	}
	return map;
}

const BASICS = {
	slug: "basics",
	name: "기초",
	// seed-simple-problems.mjs 가 넣는 문제들. 어느 레슨도 링크하지 않는다.
	match: (slug, linked) => !linked.has(slug) && slug !== "two-sum-stdin",
};

async function main() {
	loadEnv();
	const uri = await resolveMongoUri(process.env.YIPDB_MONGODB_URI);
	const client = new MongoClient(uri);
	await client.connect();
	const db = client.db("yipDB");

	const problems = await db.collection("problems").find({}, { projection: { slug: 1, title: 1 } }).toArray();
	const links = chapterLinks();
	const linked = new Set([...links.values()].flatMap((s) => [...s]));
	const chapters = curriculum().filter((c) => links.has(c.slug));

	// 주제: 기초를 맨 앞(order 0), 그 뒤로 커리큘럼 순서
	const topics = [
		{ slug: BASICS.slug, name: BASICS.name, order: 0 },
		...chapters.map((c, i) => ({ slug: c.slug, name: c.name, order: i + 1 })),
	];

	// 문제 -> 주제
	const assign = new Map();
	for (const [chapter, slugs] of links) {
		for (const s of slugs) assign.set(s, chapter);
	}
	for (const p of problems) {
		if (!assign.has(p.slug) && BASICS.match(p.slug, linked)) assign.set(p.slug, BASICS.slug);
	}

	const unassigned = problems.filter((p) => !assign.has(p.slug));

	console.log(`주제 ${topics.length}개, 문제 ${problems.length}개 중 ${assign.size}개 분류`);
	console.log(`미분류 ${unassigned.length}개: ${unassigned.map((p) => p.slug).join(", ")}`);
	for (const t of topics) {
		const n = [...assign.values()].filter((v) => v === t.slug).length;
		console.log(`  ${String(t.order).padStart(2)} ${t.slug.padEnd(20)} ${t.name.padEnd(16)} ${n}문제`);
	}

	if (!WRITE) {
		console.log("\n미리보기입니다. 실제로 쓰려면 --write 를 주세요.");
		await client.close();
		return;
	}

	// topics 컬렉션에 이 스크립트가 첫 writer 다. app/lib/mongo/topics.ts 의
	// ensureIndexes() 는 관리자가 앱을 통해 주제를 만들 때만 호출되므로, 여기서
	// raw 드라이버로 먼저 upsert 하면 unique 인덱스 없이 컬렉션이 생겨버린다.
	// 그래서 백필이 직접 인덱스를 만든다.
	await db.collection("topics").createIndex({ slug: 1 }, { unique: true });
	await db.collection("topics").createIndex({ order: 1 });

	const now = new Date();
	for (const t of topics) {
		await db.collection("topics").updateOne(
			{ slug: t.slug },
			{ $set: { name: t.name, order: t.order, updatedAt: now }, $setOnInsert: { createdAt: now } },
			{ upsert: true }
		);
	}
	let n = 0;
	for (const [problemSlug, topicSlug] of assign) {
		const r = await db.collection("problems").updateOne(
			{ slug: problemSlug },
			{ $set: { topicSlug, updatedAt: now } }
		);
		n += r.matchedCount;
	}
	console.log(`\n주제 ${topics.length}개 upsert, 문제 ${n}개 갱신 완료.`);
	await client.close();
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
