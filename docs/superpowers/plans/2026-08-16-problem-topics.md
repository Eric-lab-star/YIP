# 문제 주제 분류 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/problems`의 131개 평면 목록을 주제별 접힌 섹션으로 바꾸고, 주제를 관리자가 DB에서 관리할 수 있게 한다.

**Architecture:** 새 `topics` 컬렉션이 `{ slug, name, order }`를 가지고, `Problem`이 `topicSlug`로 그것을 **참조**한다(복제 아님). 기존 Algorithm 레슨이 이미 가진 `/problems/<slug>` 링크에서 초기 분류를 백필한 뒤, 그때부터 `topicSlug`가 진실 소스가 된다. 목록은 지금처럼 서버에서 프리렌더하고 사용자별 완료 표시만 브라우저에서 채운다.

**Tech Stack:** Next.js 16.3 App Router, MongoDB(드라이버 직접), Zod, SWR, shadcn/ui, Tailwind v4

**Spec:** `docs/superpowers/specs/2026-08-16-problem-topics-design.md`

## Global Constraints

- **테스트 스위트가 없다.** `npm test`는 존재하지 않는다. 각 작업의 검증은 아래 명령으로 한다. 스텝에 "테스트를 작성한다"가 없는 것은 누락이 아니다.
- 검증 게이트: `npx tsc --noEmit` 0 errors / `npm run build` exit 0 / `npm run lint`는 **main 기준선 168 problems과 비교**(0이 목표가 아님)
- `.mdx`를 건드리는 작업은 `@mdx-js/mdx` + `remark-gfm` + `remark-cjk-friendly`로 컴파일까지 확인
- **`/problems`의 프리렌더를 깨지 말 것.** `app/problems/page.tsx`의 `export const revalidate = 3600`을 유지한다. `force-dynamic`은 방문자당 TTFB를 55ms에서 280ms로 되돌린다.
- 새 UI는 320 / 390 / 641 / 768 / 769 / 1024 / 1025 / 1280에서 반응형 확인. `/responsive-check` 스킬 사용.
- dev 서버는 사용자의 :3000을 피해 다른 포트로 띄운다. 띄운 뒤에는 **node 프로세스 수를 감시**한다 — 30개를 넘으면 폭주다(`docs`가 아니라 HANDOFF.md A-3 참조).
- DB 쓰기는 전부 `app/actions/`의 Server Action을 거친다. 클라이언트에서 직접 쓰지 않는다.
- 관리자 권한은 **페이지 본문에서 매번 확인**한다. `requireAuth()`는 신원만 증명한다.

---

## File Structure

**생성**

| 파일 | 책임 |
|---|---|
| `app/lib/mongo/topics.ts` | `topics` 컬렉션 접근 — 타입, 인덱스, CRUD |
| `app/actions/topicAction.ts` | 주제 생성·이름변경·순서변경·삭제 Server Action |
| `scripts/backfill-problem-topics.mjs` | 레슨 링크에서 초기 분류 백필 (1회성, 재실행 안전) |
| `app/problems/topics/page.tsx` | 관리자 주제 관리 화면 |
| `components/judge/TopicManager.tsx` | 위 화면의 클라이언트 UI |
| `components/judge/TopicSection.tsx` | 목록의 접히는 주제 섹션 하나 |

**수정**

| 파일 | 무엇을 |
|---|---|
| `app/lib/mongo/problems.ts` | `Problem`에 `topicSlug?`, `updateProblemTopic()` 추가 |
| `app/lib/zod/problemFormSchema.ts` | `topicSlug` 선택 필드 + slug 예약어 검증 |
| `app/actions/problemAction.ts` | `topicSlug`를 통과시킴 |
| `app/api/problems/route.ts` | 응답을 `{ topics, problems }` 객체로 |
| `components/judge/ProblemList.tsx` | 주제별 섹션 렌더 |
| `components/commons/ProblemSidebarList.tsx` | 바뀐 응답 형태에 맞춤 |
| `components/judge/ProblemForm.tsx` | 주제 select |
| `app/problems/page.tsx` | 주제를 서버에서 함께 로드 |

---

## Task 1: `topics` 컬렉션과 CRUD

**Files:**
- Create: `app/lib/mongo/topics.ts`

**Interfaces:**
- Consumes: `getDB` from `./db`
- Produces: `Topic`, `listTopics()`, `createTopic()`, `renameTopic()`, `setTopicOrder()`, `deleteTopic()`

- [ ] **Step 1: `app/lib/mongo/topics.ts` 작성**

`problems.ts`의 관례를 그대로 따른다 — 모듈 수준 `indexEnsured` 플래그, `{ ok } | { ok:false, error }` 반환.

```ts
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
```

- [ ] **Step 2: 타입 검사**

Run: `npx tsc --noEmit`
Expected: `0 errors`

- [ ] **Step 3: 커밋**

```bash
git add app/lib/mongo/topics.ts
git commit -m "feat(topics): add topics collection and CRUD"
```

---

## Task 2: `Problem.topicSlug`와 slug 예약어 검증

**Files:**
- Modify: `app/lib/mongo/problems.ts`
- Modify: `app/lib/zod/problemFormSchema.ts`
- Modify: `app/actions/problemAction.ts`

**Interfaces:**
- Consumes: Task 1의 `PublicTopic`은 아직 쓰지 않는다
- Produces: `Problem.topicSlug?: string`, `PublicProblem.topicSlug?: string`, `updateProblemTopic(slug, topicSlug)`, `RESERVED_PROBLEM_SLUGS`

- [ ] **Step 1: `Problem` 인터페이스에 필드 추가**

`app/lib/mongo/problems.ts`의 `Problem` 안, `difficulty` 바로 아래:

```ts
	/** 소속 주제의 slug (`topics` 컬렉션). 미분류면 없음. */
	topicSlug?: string;
```

`PublicProblem`은 `Omit<Problem, "_id" | "testcases">`이므로 자동으로 따라온다.

- [ ] **Step 2: 주제만 바꾸는 함수 추가**

`app/lib/mongo/problems.ts` 맨 아래. `updateProblem`은 문제의 모든 필드를 요구해서 주제만 바꾸는 용도로 못 쓴다.

```ts
/** 문제의 주제만 바꾼다. null 을 주면 미분류로 되돌린다. */
export async function updateProblemTopic(
	slug: string,
	topicSlug: string | null
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const c = await col();
		const r = await c.updateOne(
			{ slug },
			topicSlug
				? { $set: { topicSlug, updatedAt: new Date() } }
				: { $unset: { topicSlug: "" }, $set: { updatedAt: new Date() } }
		);
		if (r.matchedCount === 0) return { ok: false, error: "not found" };
		return { ok: true };
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) };
	}
}
```

- [ ] **Step 3: zod 스키마에 `topicSlug`와 예약어 검증**

`app/lib/zod/problemFormSchema.ts`. **예약어 검증은 이 작업 전부터 있던 구멍을 메우는 것이다** — `app/problems/new/`가 정적 세그먼트라 `[slug]`를 이기므로, 지금도 slug가 `new`인 문제를 만들면 영영 열 수 없다. Task 6이 `topics`를 같은 이유로 예약한다.

`slug` 필드를 다음으로 교체:

```ts
// 정적 라우트가 [slug] 를 이긴다. 이 slug 를 가진 문제는 페이지가 열리지
// 않으므로 애초에 만들 수 없게 막는다. app/problems/ 아래 정적 세그먼트를
// 추가하면 여기에도 더해야 한다.
export const RESERVED_PROBLEM_SLUGS = ["new", "topics"] as const;

	slug: z
		.string()
		.min(1, "slug를 입력하세요")
		.max(200)
		.regex(/^[a-z0-9-]+$/, "영문 소문자·숫자·하이픈만 사용하세요")
		.refine((s) => !RESERVED_PROBLEM_SLUGS.includes(s as (typeof RESERVED_PROBLEM_SLUGS)[number]), {
			message: `예약된 slug 입니다 (${RESERVED_PROBLEM_SLUGS.join(", ")})`,
		}),
```

같은 객체 안에 `difficulty` 아래로:

```ts
	/** 빈 문자열은 "주제 없음". 액션에서 undefined 로 바꾼다. */
	topicSlug: z.string().regex(/^[a-z0-9-]*$/, "주제 slug 형식이 아닙니다").optional(),
```

- [ ] **Step 4: 액션이 `topicSlug`를 통과시키게**

`app/actions/problemAction.ts`의 `prepare()`가 만드는 `fields`에 포함시킨다. 빈 문자열은 미분류이므로 `undefined`로 정규화한다:

```ts
		topicSlug: p.topicSlug ? p.topicSlug : undefined,
```

- [ ] **Step 5: 검증**

Run: `npx tsc --noEmit && npm run build`
Expected: tsc `0 errors`, build `exit 0`

예약어 검증이 실제로 막는지 확인한다. zod 스키마는 TS라 바로 실행할 수 없으므로
프로젝트의 TS 러너로 돌린다:

```bash
npx tsx -e "import { problemFormSchema } from './app/lib/zod/problemFormSchema'; \
const base = { title:'t', difficulty:'easy', description:'d', languages:['python'], \
starterCode:{python:''}, timeLimit:5, memoryLimit:256000, testcases:[{stdin:'',expectedOutput:'',hidden:false}] }; \
for (const s of ['new','topics','ok-slug']) \
  console.log(s, problemFormSchema.safeParse({...base, slug:s}).success);"
```
Expected: `new false` / `topics false` / `ok-slug true`

`tsx`가 없으면 `npx tsx`가 받아온다. 그것도 막히면 이 확인은 Task 7 Step 3의
브라우저 확인으로 미룬다 — **미루더라도 확인 자체를 건너뛰지는 않는다.**
```

- [ ] **Step 6: 커밋**

```bash
git add app/lib/mongo/problems.ts app/lib/zod/problemFormSchema.ts app/actions/problemAction.ts
git commit -m "feat(problems): add topicSlug field and reserve routing slugs"
```

---

## Task 3: 백필 스크립트

**Files:**
- Create: `scripts/backfill-problem-topics.mjs`

**Interfaces:**
- Consumes: `loadEnv`, `resolveMongoUri` from `scripts/lib/mongoUri.mjs`; Task 1의 `topics` 컬렉션; Task 2의 `topicSlug` 필드
- Produces: 없음 (1회성 스크립트)

**되돌리기 번거로운 유일한 단계다.** 기본 동작은 미리보기이고, 쓰기는 `--write`가 있을 때만 한다.

- [ ] **Step 1: 스크립트 작성**

```js
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
```

- [ ] **Step 2: 미리보기로 결과 확인**

Run: `node scripts/backfill-problem-topics.mjs`
Expected: 주제 24개(기초 + 23챕터), 분류 130개, 미분류 1개(`two-sum-stdin`)

**숫자가 다르면 멈추고 이유를 확인한다.** 설계 문서의 측정치는 링크 113 + 기초 17 = 130이다.

- [ ] **Step 3: 실제로 백필**

Run: `node scripts/backfill-problem-topics.mjs --write`
Expected: `주제 24개 upsert, 문제 130개 갱신 완료.`

- [ ] **Step 4: 재실행해도 안전한지 확인**

Run: `node scripts/backfill-problem-topics.mjs --write`
Expected: 같은 숫자. 중복 주제가 생기지 않는다.

- [ ] **Step 5: 결과를 사람이 본다**

`두 수의 합` 3개(`two-sum-stdin`, `s-sum-two`, `s-two-sum-count`)가 각각 어느 주제에 갔는지 출력에서 확인하고, 이상하면 보고한다. 스크립트가 정할 일이 아니다.

- [ ] **Step 6: 커밋**

```bash
git add scripts/backfill-problem-topics.mjs
git commit -m "feat(topics): backfill problem topics from Algorithm lesson links"
```

---

## Task 4: API 응답 형태 변경

**Files:**
- Modify: `app/api/problems/route.ts`
- Modify: `components/commons/ProblemSidebarList.tsx`
- Modify: `components/judge/ProblemList.tsx` (fetcher 타입만)

**Interfaces:**
- Consumes: Task 1의 `listTopics`, Task 2의 `topicSlug`
- Produces: `/api/problems` 응답 `{ topics: PublicTopic[]; problems: ApiProblem[] }`, `ApiProblem = { slug, title, difficulty, solved, topicSlug? }`

**배열에서 객체로 바뀌는 파괴적 변경이다. 소비자가 둘이다** — `ProblemList.tsx`와 `ProblemSidebarList.tsx`. 한 커밋에서 같이 고친다.

- [ ] **Step 1: 라우트 수정**

`app/api/problems/route.ts` 전체 교체:

```ts
import { listProblems } from "@/app/lib/mongo/problems";
import { listTopics } from "@/app/lib/mongo/topics";
import { getSolvedSlugs } from "@/app/lib/mongo/submissions";
import { validateToken } from "@/app/lib/auth/login";
import { NextResponse } from "next/server";

// 사이드바 / 목록 페이지가 쓰는 문제 목록. 사용자별 `solved` 를 포함한다.
//
// 주제를 별도 엔드포인트로 나누지 않고 같은 응답에 싣는다. 목록 화면은 늘
// 둘을 함께 필요로 하고, 두 요청으로 나누면 한쪽만 새 것인 순간(새 주제는
// 왔는데 문제는 옛날 것) 을 화면이 처리해야 한다.
export async function GET() {
	const [problems, topics, auth] = await Promise.all([
		listProblems(),
		listTopics(),
		validateToken(),
	]);
	const solved = auth.success
		? new Set(await getSolvedSlugs(auth.id))
		: new Set<string>();

	return NextResponse.json({
		topics,
		problems: problems.map((p) => ({
			slug: p.slug,
			title: p.title,
			difficulty: p.difficulty,
			topicSlug: p.topicSlug,
			solved: solved.has(p.slug),
		})),
	});
}
```

- [ ] **Step 2: 사이드바 소비자 수정**

`components/commons/ProblemSidebarList.tsx`에서 fetcher와 훅 두 줄:

```ts
const fetcher = (url: string): Promise<{ problems: ProblemItem[] }> =>
	fetch(url).then((r) => r.json());
```

```ts
	const { data, isLoading } = useSWR<{ problems: ProblemItem[] }>("/api/problems", fetcher);
```

이후 `data`를 쓰는 곳을 전부 `data?.problems`로 바꾼다. **`rg -n "data" components/commons/ProblemSidebarList.tsx`로 빠짐없이 확인할 것.**

- [ ] **Step 3: 목록 소비자의 fetcher 수정**

`components/judge/ProblemList.tsx`:

`topicSlug`는 서버 렌더 경로(`app/problems/page.tsx`)도 넘겨야 하므로
`ApiProblem`이 아니라 **`ListedProblem`에** 둔다. 그래야 Task 5에서 두 경로가
같은 타입을 쓴다.

```ts
export type ListedProblem = {
	slug: string;
	title: string;
	difficulty: string;
	/** 소속 주제. 미분류면 없음. */
	topicSlug?: string;
};

type ApiProblem = ListedProblem & { solved: boolean };
// Task 1 의 PublicTopic 과 같은 모양이다. 클라이언트 쪽에 따로 두는 이유는
// 이 파일이 "use client" 라 mongo 모듈에서 타입을 끌어오면 그 파일의
// import 사슬(mongodb 드라이버)이 눈에 띄지 않게 따라붙기 때문이다. 타입만
// 쓰면 컴파일에서 지워지긴 하지만, 경계를 흐리지 않는 쪽을 택한다.
type ApiTopic = { slug: string; name: string; order: number };
type ApiResponse = { topics: ApiTopic[]; problems: ApiProblem[] };

async function fetcher(url: string): Promise<ApiResponse> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(String(res.status));
	return res.json();
}
```

`useProblems()`가 `data`를 그대로 돌려주므로, 이를 쓰는 `solved` 계산과 `ClientProblemList`를 `data?.problems` / `data?.topics`로 맞춘다.

- [ ] **Step 4: 검증**

Run: `npx tsc --noEmit && npm run build`
Expected: tsc `0 errors`, build `exit 0`

dev 서버를 띄우고 응답 형태 확인:

```bash
curl -s http://localhost:<port>/api/problems | head -c 300
```
Expected: `{"topics":[{"slug":"basics",...}],"problems":[...]}`

브라우저에서 `/problems`와 문제 상세 페이지 사이드바가 **둘 다** 정상인지 눈으로 확인한다. 사이드바는 `/problems/[slug]`에서만 보인다.

- [ ] **Step 5: 커밋**

```bash
git add app/api/problems/route.ts components/commons/ProblemSidebarList.tsx components/judge/ProblemList.tsx
git commit -m "feat(api): return topics alongside problems"
```

---

## Task 5: 목록을 접힌 주제 섹션으로

**Files:**
- Create: `components/judge/TopicSection.tsx`
- Modify: `components/judge/ProblemList.tsx`
- Modify: `app/problems/page.tsx`

**Interfaces:**
- Consumes: Task 4의 `ApiResponse`, Task 1의 `listTopics`
- Produces: `TopicSection` 컴포넌트

**여기가 실제 이득이 나오는 지점이다.** 묶기만 하고 다 펼치면 131행에 소제목 24개가 더해진 것뿐이다.

- [ ] **Step 1: `components/judge/TopicSection.tsx` 작성**

```tsx
"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * 접히는 주제 섹션 하나.
 *
 * 기본이 접힘인 것이 이 화면의 요점이다. 131개를 주제로 묶기만 하고 전부
 * 펼쳐두면 소제목만 24개 늘어난 같은 벽이 된다. 접으면 첫 화면이 24줄짜리
 * 목차가 된다.
 *
 * `forceOpen` 은 검색·필터가 걸렸을 때 부모가 강제로 펼치는 용도다. 접힌 채로
 * 두면 "131개 중 3개" 라고 해놓고 화면에 아무것도 안 보인다.
 */
export function TopicSection({
	name,
	total,
	solvedCount,
	forceOpen,
	children,
}: {
	name: string;
	total: number;
	solvedCount: number;
	forceOpen: boolean;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const expanded = forceOpen || open;

	return (
		<section className="overflow-hidden rounded-md border">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={expanded}
				className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-accent"
			>
				<ChevronRight
					className={`size-4 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
					aria-hidden
				/>
				<span className="font-medium">{name}</span>
				<span className="ml-auto shrink-0 text-sm text-muted-foreground">
					{total}문제
					{solvedCount > 0 && ` · ${solvedCount} 완료`}
				</span>
			</button>
			{expanded && <div className="border-t">{children}</div>}
		</section>
	);
}
```

- [ ] **Step 2: `ProblemList.tsx`가 섹션으로 렌더하게**

`ProblemRows`의 반환부에서, 지금 `<Rows problems={shown} .../>`를 하던 자리를 주제별 그룹으로 바꾼다. 필터 로직(`shown`)은 그대로 두고 그 결과를 나눈다:

```tsx
	const filterActive = query.trim() !== "" || difficulty !== "all" || status !== "all";

	// 주제 순서대로, 마지막에 미분류. 일치하는 문제가 없는 섹션은 숨긴다.
	const grouped = useMemo(() => {
		const byTopic = new Map<string, ListedProblem[]>();
		for (const p of shown) {
			const key = p.topicSlug ?? "";
			const arr = byTopic.get(key);
			if (arr) arr.push(p);
			else byTopic.set(key, [p]);
		}
		const sections = topics
			.map((t) => ({ slug: t.slug, name: t.name, items: byTopic.get(t.slug) ?? [] }))
			.filter((s) => s.items.length > 0);
		const loose = byTopic.get("") ?? [];
		if (loose.length) sections.push({ slug: "", name: "미분류", items: loose });
		return sections;
	}, [shown, topics]);
```

그리고 렌더:

```tsx
			{shown.length === 0 ? (
				<p className="text-muted-foreground">
					조건에 맞는 문제가 없습니다. 검색어나 필터를 바꿔 보세요.
				</p>
			) : (
				<div className="flex flex-col gap-2">
					{grouped.map((s) => (
						<TopicSection
							key={s.slug || "__none"}
							name={s.name}
							total={s.items.length}
							solvedCount={s.items.filter((p) => solved.has(p.slug)).length}
							forceOpen={filterActive}
						>
							<Rows problems={s.items} solved={solved} />
						</TopicSection>
					))}
				</div>
			)}
```

`Rows`가 지금 자체 테두리(`rounded-md border`)를 갖고 있으므로, 섹션 안에 들어갈 때는 테두리를 빼야 이중 테두리가 안 생긴다. `Rows`의 `<ul>` className을 `flex flex-col divide-y`로 바꾼다.

`ProblemRows`는 `topics` prop을 받아야 한다. 시그니처를 바꾼다 (`ApiTopic`은
Task 4에서 정의했다):

```tsx
export function ProblemRows({
	problems,
	topics,
}: {
	problems: ListedProblem[];
	topics: ApiTopic[];
}) {
```

`ListedProblem`의 `topicSlug?`는 Task 4에서 이미 더했다.

- [ ] **Step 3: 서버에서 주제를 함께 로드**

`app/problems/page.tsx`. 프리렌더를 유지하려면 주제도 서버에서 읽어야 한다:

```ts
	let problems: ListedProblem[] | null = null;
	let topics: { slug: string; name: string; order: number }[] = [];
	try {
		const [ps, ts] = await Promise.all([listProblems(), listTopics()]);
		problems = ps.map((p) => ({
			slug: p.slug,
			title: p.title,
			difficulty: p.difficulty,
			topicSlug: p.topicSlug,
		}));
		topics = ts;
	} catch (e) {
		console.warn("[/problems] could not load problems at render time:", e);
	}
```

렌더:

```tsx
			{problems ? (
				<ProblemRows problems={problems} topics={topics} />
			) : (
				<ClientProblemList />
			)}
```

`ClientProblemList`는 브라우저 응답에서 둘 다 얻으므로 `<ProblemRows problems={data.problems} topics={data.topics} />`로 넘긴다.

- [ ] **Step 4: 검증 — 동작**

dev 서버에서 `/problems`를 열고 브라우저 콘솔로 확인:

```js
// 첫 화면이 목차인가
({sections: document.querySelectorAll('section').length,
  rowsVisible: document.querySelectorAll('section li a').length})
```
Expected: `sections` 24 안팎, `rowsVisible` 0 (전부 접혀 있음)

검색이 자동으로 펼치는가:

```js
const q = document.querySelector('input[type="search"]');
const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
set.call(q,'하노이'); q.dispatchEvent(new Event('input',{bubbles:true}));
await new Promise(r=>setTimeout(r,400));
({sections: document.querySelectorAll('section').length,
  rowsVisible: document.querySelectorAll('section li a').length})
```
Expected: 섹션 1개, 행 1개 이상 — **보여야 한다**

- [ ] **Step 5: 검증 — 게이트와 반응형**

Run: `npx tsc --noEmit && npm run build && npm run lint`
Expected: tsc 0, build exit 0, lint ≤ 168

`/responsive-check` 스킬로 `/problems`를 320 / 390 / 641 / 768 / 769 / 1024 / 1025 / 1280에서 확인. **숫자만 보지 말고 320px 스크린샷을 실제로 볼 것** — 섹션 헤더의 "17문제 · 17 완료"가 좁은 폭에서 제목과 겹치는지는 `scrollWidth` 비교로 안 잡힌다.

- [ ] **Step 6: 커밋**

```bash
git add components/judge/TopicSection.tsx components/judge/ProblemList.tsx app/problems/page.tsx
git commit -m "feat(problems): group the list into collapsed topic sections"
```

---

## Task 6: 관리자 주제 관리 화면

**Files:**
- Create: `app/actions/topicAction.ts`
- Create: `app/problems/topics/page.tsx`
- Create: `components/judge/TopicManager.tsx`

**Interfaces:**
- Consumes: Task 1의 `listTopics`/`createTopic`/`renameTopic`/`setTopicOrder`/`deleteTopic`
- Produces: `createTopicAction`, `renameTopicAction`, `moveTopicAction`, `deleteTopicAction` — 전부 `Promise<{ success: true } | { success: false; error: string }>`

**이 라우트를 만드는 순간 `topics`가 문제 slug로 영구 예약된다.** Task 2가 이미 막았다.

- [ ] **Step 1: `app/actions/topicAction.ts` 작성**

`problemAction.ts`의 관례를 그대로 따른다.

```ts
"use server";

import { validateToken } from "../lib/auth/login";
import {
	createTopic,
	deleteTopic,
	listTopics,
	renameTopic,
	setTopicOrder,
} from "../lib/mongo/topics";
import { revalidatePath } from "next/cache";

type Result = { success: true } | { success: false; error: string };

async function requireAdmin() {
	const auth = await validateToken();
	return auth.success && auth.role === "admin" ? auth : null;
}

const SLUG_RE = /^[a-z0-9-]+$/;

export async function createTopicAction(slug: string, name: string): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };
	if (!SLUG_RE.test(slug)) return { success: false, error: "slug 형식이 올바르지 않습니다." };
	if (!name.trim()) return { success: false, error: "이름을 입력하세요." };

	const topics = await listTopics();
	const order = topics.length ? Math.max(...topics.map((t) => t.order)) + 1 : 0;
	const r = await createTopic(slug, name.trim(), order);
	if (!r.ok) return { success: false, error: r.error };
	revalidatePath("/problems");
	revalidatePath("/problems/topics");
	return { success: true };
}

export async function renameTopicAction(slug: string, name: string): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };
	if (!name.trim()) return { success: false, error: "이름을 입력하세요." };
	const r = await renameTopic(slug, name.trim());
	if (!r.ok) return { success: false, error: r.error };
	revalidatePath("/problems");
	revalidatePath("/problems/topics");
	return { success: true };
}

/** 이웃과 order 를 맞바꾼다. 목록 끝에서는 아무것도 하지 않는다. */
export async function moveTopicAction(slug: string, dir: "up" | "down"): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };
	const topics = await listTopics();
	const i = topics.findIndex((t) => t.slug === slug);
	if (i < 0) return { success: false, error: "주제를 찾을 수 없습니다." };
	const j = dir === "up" ? i - 1 : i + 1;
	if (j < 0 || j >= topics.length) return { success: true };

	const a = topics[i];
	const b = topics[j];
	const ra = await setTopicOrder(a.slug, b.order);
	if (!ra.ok) return { success: false, error: ra.error };
	const rb = await setTopicOrder(b.slug, a.order);
	if (!rb.ok) return { success: false, error: rb.error };
	revalidatePath("/problems");
	revalidatePath("/problems/topics");
	return { success: true };
}

export async function deleteTopicAction(slug: string): Promise<Result> {
	if (!(await requireAdmin())) return { success: false, error: "권한이 없습니다." };
	const r = await deleteTopic(slug);
	if (!r.ok) return { success: false, error: r.error };
	revalidatePath("/problems");
	revalidatePath("/problems/topics");
	return { success: true };
}
```

- [ ] **Step 2: 페이지 — 권한은 본문에서 확인**

`app/problems/topics/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { validateToken } from "@/app/lib/auth/login";
import { listTopics } from "@/app/lib/mongo/topics";
import { listProblems } from "@/app/lib/mongo/problems";
import { TopicManager } from "@/components/judge/TopicManager";

// requireAuth() 는 누구인지만 증명한다. 관리자인지는 여기서 따로 본다 —
// app/dashBoard/page.tsx 가 같은 방식이다. 레이아웃이 대신해 주지 않는다.
export const dynamic = "force-dynamic";

export default async function TopicsAdminPage() {
	const auth = await validateToken();
	if (!(auth.success && auth.role === "admin")) redirect("/problems");

	const [topics, problems] = await Promise.all([listTopics(), listProblems()]);
	const counts: Record<string, number> = {};
	for (const p of problems) {
		if (p.topicSlug) counts[p.topicSlug] = (counts[p.topicSlug] ?? 0) + 1;
	}

	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-8">
			<h1 className="mb-6 text-2xl font-bold">주제 관리</h1>
			<TopicManager topics={topics} counts={counts} />
		</div>
	);
}
```

- [ ] **Step 3: `components/judge/TopicManager.tsx` 작성**

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	createTopicAction,
	deleteTopicAction,
	moveTopicAction,
	renameTopicAction,
} from "@/app/actions/topicAction";

type T = { slug: string; name: string; order: number };

export function TopicManager({
	topics,
	counts,
}: {
	topics: T[];
	counts: Record<string, number>;
}) {
	const router = useRouter();
	const [pending, start] = useTransition();
	const [error, setError] = useState("");
	const [newSlug, setNewSlug] = useState("");
	const [newName, setNewName] = useState("");

	const run = (fn: () => Promise<{ success: true } | { success: false; error: string }>) =>
		start(async () => {
			const r = await fn();
			setError(r.success ? "" : r.error);
			if (r.success) router.refresh();
		});

	return (
		<div className="flex flex-col gap-4">
			{error && <p className="text-sm text-red-600">{error}</p>}

			<ul className="flex flex-col divide-y overflow-hidden rounded-md border">
				{topics.map((t, i) => (
					<li key={t.slug} className="flex items-center gap-2 px-3 py-2">
						<Input
							defaultValue={t.name}
							aria-label={`${t.name} 이름`}
							onBlur={(e) => {
								if (e.target.value !== t.name) run(() => renameTopicAction(t.slug, e.target.value));
							}}
							className="max-w-60"
						/>
						<span className="text-sm text-muted-foreground">{t.slug}</span>
						<span className="ml-auto shrink-0 text-sm text-muted-foreground">
							{counts[t.slug] ?? 0}문제
						</span>
						<Button size="icon" variant="ghost" disabled={pending || i === 0}
							aria-label="위로" onClick={() => run(() => moveTopicAction(t.slug, "up"))}>
							<ChevronUp className="size-4" />
						</Button>
						<Button size="icon" variant="ghost" disabled={pending || i === topics.length - 1}
							aria-label="아래로" onClick={() => run(() => moveTopicAction(t.slug, "down"))}>
							<ChevronDown className="size-4" />
						</Button>
						{/* 문제가 남아 있으면 삭제를 막는다. 서버도 같은 규칙을 강제한다. */}
						<Button size="icon" variant="ghost" disabled={pending || (counts[t.slug] ?? 0) > 0}
							aria-label="삭제" onClick={() => run(() => deleteTopicAction(t.slug))}>
							<Trash2 className="size-4" />
						</Button>
					</li>
				))}
			</ul>

			<div className="flex flex-wrap items-center gap-2">
				<Input value={newSlug} onChange={(e) => setNewSlug(e.target.value)}
					placeholder="slug (영문 소문자·숫자·하이픈)" className="max-w-64" />
				<Input value={newName} onChange={(e) => setNewName(e.target.value)}
					placeholder="이름" className="max-w-48" />
				<Button disabled={pending || !newSlug || !newName}
					onClick={() => run(async () => {
						const r = await createTopicAction(newSlug, newName);
						if (r.success) { setNewSlug(""); setNewName(""); }
						return r;
					})}>
					추가
				</Button>
			</div>
		</div>
	);
}
```

- [ ] **Step 4: 목록 페이지에 진입점**

`components/judge/ProblemList.tsx`의 `NewProblemButton` 옆에, 같은 관리자 조건으로:

```tsx
			<Button asChild variant="outline">
				<Link href="/problems/topics">주제 관리</Link>
			</Button>
```

- [ ] **Step 5: 검증**

Run: `npx tsc --noEmit && npm run build && npm run lint`
Expected: tsc 0, build exit 0, lint ≤ 168

브라우저에서 관리자 계정으로:
1. `/problems/topics` 접근 → 주제 24개가 order 순으로, 문제 수와 함께 보인다
2. 이름을 바꾸고 focus를 뺀다 → `/problems`의 섹션 제목이 바뀐다
3. 위/아래 버튼 → 섹션 순서가 바뀐다
4. 문제가 있는 주제의 삭제 버튼 → **비활성**
5. 빈 주제를 만들고 삭제 → 성공

**비관리자로 `/problems/topics`에 접근하면 `/problems`로 리다이렉트되는지 반드시 확인한다.**

- [ ] **Step 6: 커밋**

```bash
git add app/actions/topicAction.ts app/problems/topics/page.tsx components/judge/TopicManager.tsx components/judge/ProblemList.tsx
git commit -m "feat(topics): add admin screen to manage topics"
```

---

## Task 7: 문제 편집 폼의 주제 선택

**Files:**
- Modify: `components/judge/ProblemForm.tsx`
- Modify: `app/problems/new/page.tsx`, `app/problems/[slug]/edit/page.tsx` (주제 목록 전달)

**Interfaces:**
- Consumes: Task 1의 `listTopics`, Task 2의 `problemFormSchema.topicSlug`
- Produces: 없음

- [ ] **Step 1: 폼이 주제 목록을 받게**

`ProblemForm`의 props에 `topics: { slug: string; name: string }[]`를 더하고, `difficulty` 필드 옆에 select를 넣는다. 저장소가 shadcn `select`를 이미 가지고 있다(`components/ui/select.tsx`).

**Radix `SelectItem`은 `value=""`를 거부한다** (`A <Select.Item /> must have a
value prop that is not an empty string`). 그래서 "주제 없음"에 센티넬 값을
쓰고 폼 값으로 넘길 때 빈 문자열로 되돌린다.

```tsx
// Radix 가 빈 문자열 value 를 금지하므로 "주제 없음" 에 센티넬을 쓴다.
// 폼 값은 계속 "" (미분류) 이고, 액션이 그걸 undefined 로 정규화한다.
const NO_TOPIC = "__none";

	<Controller
		name="topicSlug"
		control={control}
		render={({ field }) => (
			<Select
				value={field.value ? field.value : NO_TOPIC}
				onValueChange={(v) => field.onChange(v === NO_TOPIC ? "" : v)}
			>
				<SelectTrigger className="w-48" aria-label="주제">
					<SelectValue placeholder="주제 없음" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={NO_TOPIC}>주제 없음</SelectItem>
					{topics.map((t) => (
						<SelectItem key={t.slug} value={t.slug}>{t.name}</SelectItem>
					))}
				</SelectContent>
			</Select>
		)}
	/>
```

`difficulty` 필드가 바로 위에서 같은 구조(`Controller` + `Select` +
`SelectTrigger className="w-48"`)를 쓰고 있으니 그 옆에 나란히 둔다.

- [ ] **Step 2: 두 페이지가 주제를 넘기게**

`app/problems/new/page.tsx`와 `app/problems/[slug]/edit/page.tsx` 각각에서:

```ts
import { listTopics } from "@/app/lib/mongo/topics";
// ...
const topics = await listTopics();
// <ProblemForm ... topics={topics} />
```

편집 폼의 `defaultValues`에 `topicSlug: problem.topicSlug ?? ""`를 더한다.

- [ ] **Step 3: 검증**

Run: `npx tsc --noEmit && npm run build && npm run lint`
Expected: tsc 0, build exit 0, lint ≤ 168

브라우저에서:
1. 기존 문제를 편집 → 현재 주제가 선택돼 있다
2. 주제를 바꾸고 저장 → `/problems`에서 다른 섹션으로 옮겨간다
3. "주제 없음"으로 바꾸고 저장 → 미분류 섹션으로 간다
4. **새 문제를 slug `new`로 만들려 하면 거부된다** (Task 2의 예약어 검증)

- [ ] **Step 4: 커밋**

```bash
git add components/judge/ProblemForm.tsx app/problems/new/page.tsx app/problems/[slug]/edit/page.tsx
git commit -m "feat(problems): let the problem form pick a topic"
```

---

## PR 나누기

Task 1–4가 사용자에게 보이는 변화 없이 기반을 놓는다. Task 5가 실제 이득이다. Task 6–7은 관리 기능이다.

한 PR로 묶어도 되지만, **Task 3(백필)은 프로덕션 DB를 바꾸므로** 리뷰어가 그 커밋을 따로 볼 수 있게 최소한 커밋은 나눠 둔다. 계획대로 하면 그렇게 된다.

## 남은 위험

- **`/api/problems` 응답 형태 변경**이 파괴적이다. 소비자 둘을 같은 커밋에서 고치지 않으면 사이드바가 조용히 빈다. Task 4 Step 2의 `rg` 확인을 건너뛰지 말 것.
- **백필은 되돌리기 번거롭다.** `--write` 없이 먼저 보고, 숫자가 설계 문서와 다르면 멈춘다.
- `list_search` 챕터만 문제가 3개다. 백필 출력에서 확인되면 의도인지 물어본다.
- `두 수의 합` 3개 중복은 이 작업이 해결하지 않는다. 주제로 흩어질 뿐이다.
