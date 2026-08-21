"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useUser from "@/components/SWR/auth/user";
import { TopicSection } from "@/components/judge/TopicSection";

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

const DIFFICULTY: Record<string, { label: string; tone: string }> = {
	easy: { label: "쉬움", tone: "bg-green-600 text-white" },
	medium: { label: "보통", tone: "bg-yellow-500 text-white" },
	hard: { label: "어려움", tone: "bg-red-600 text-white" },
};

/** Teaching order, hardest last. Anything unrecognised sorts after these. */
const DIFFICULTY_ORDER = ["easy", "medium", "hard"];

async function fetcher(url: string): Promise<ApiResponse> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(String(res.status));
	return res.json();
}

// One shared SWR key for the whole page: every row asks for it, and deduping
// collapses them into a single request.
function useProblems() {
	const { data } = useSWR("/api/problems", fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60_000,
	});
	return data;
}

const EMPTY = (
	<p className="text-muted-foreground">
		아직 등록된 문제가 없습니다. `node scripts/seed-problems.mjs`로 예시 문제를
		추가할 수 있어요.
	</p>
);

/** Just the rows. No filtering — the caller has already narrowed the list. */
function Rows({
	problems,
	solved,
}: {
	problems: ListedProblem[];
	solved: Set<string>;
}) {
	return (
		<ul className="flex flex-col divide-y">
			{problems.map((p) => {
				const d = DIFFICULTY[p.difficulty] ?? { label: p.difficulty, tone: "" };
				return (
					<li key={p.slug}>
						<Link
							href={`/problems/${p.slug}`}
							className="flex items-center gap-3 px-4 py-3 hover:bg-accent"
						>
							<span className="font-medium">{p.title}</span>
							{solved.has(p.slug) && (
								<span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
									<Check className="size-4" />
									완료
								</span>
							)}
							<Badge className={`ml-auto ${d.tone}`}>{d.label}</Badge>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

/**
 * The list, with search and filters.
 *
 * Filtering runs in the browser on purpose. This page is prerendered with
 * `revalidate = 3600` (see app/problems/page.tsx) because serving it
 * `force-dynamic` cost every visitor an uncached render — ~280ms TTFB against
 * ~55ms cached. Driving the filters through query params would make the route
 * dynamic again and hand that back. There are ~128 problems; narrowing them
 * client-side is free.
 *
 * Rendered on the server in the normal case, so the initial state must be the
 * unfiltered list — which is also what a visitor with JS disabled keeps.
 */
export function ProblemRows({
	problems,
	topics,
}: {
	problems: ListedProblem[];
	topics: ApiTopic[];
}) {
	const [query, setQuery] = useState("");
	const [difficulty, setDifficulty] = useState("all");
	const [status, setStatus] = useState("all");

	const { user } = useUser();
	const loggedIn = Boolean(user?.success);
	const data = useProblems();

	const solved = useMemo(
		() => new Set((data?.problems ?? []).filter((p) => p.solved).map((p) => p.slug)),
		[data]
	);

	// Derived from the data rather than hardcoded: today every chapter except
	// 기초 is seeded as `medium` and nothing is `hard`, so a fixed three-way
	// control would show an option that never matches — and would hide `hard`
	// the moment an admin adds one.
	const difficulties = useMemo(() => {
		const present = [...new Set(problems.map((p) => p.difficulty))];
		return present.sort((a, b) => {
			const ia = DIFFICULTY_ORDER.indexOf(a);
			const ib = DIFFICULTY_ORDER.indexOf(b);
			return (ia < 0 ? DIFFICULTY_ORDER.length : ia) - (ib < 0 ? DIFFICULTY_ORDER.length : ib);
		});
	}, [problems]);

	const shown = useMemo(() => {
		const q = query.trim().toLowerCase();
		return problems.filter((p) => {
			if (q && !p.title.toLowerCase().includes(q)) return false;
			if (difficulty !== "all" && p.difficulty !== difficulty) return false;
			if (status === "unsolved" && solved.has(p.slug)) return false;
			if (status === "solved" && !solved.has(p.slug)) return false;
			return true;
		});
	}, [problems, query, difficulty, status, solved]);

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

	if (problems.length === 0) return EMPTY;

	// Radix clears the value when the active item is pressed again. Treat that
	// as "back to 전체" rather than letting the control fall into a state with
	// no selection.
	const pick = (set: (v: string) => void) => (v: string) => set(v || "all");

	return (
		<div className="flex flex-col gap-3">
			<Input
				type="search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="문제 제목 검색"
				aria-label="문제 제목 검색"
			/>

			<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
				{difficulties.length > 1 && (
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">난이도</span>
						<ToggleGroup
							type="single"
							size="sm"
							variant="outline"
							spacing={2}
							value={difficulty}
							onValueChange={pick(setDifficulty)}
						>
							<ToggleGroupItem value="all">전체</ToggleGroupItem>
							{difficulties.map((d) => (
								<ToggleGroupItem key={d} value={d}>
									{DIFFICULTY[d]?.label ?? d}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</div>
				)}

				{/* Solved state comes from /api/problems, which only answers for a
				    signed-in user — a guest would get a filter that hides everything. */}
				{loggedIn && (
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">풀이</span>
						<ToggleGroup
							type="single"
							size="sm"
							variant="outline"
							spacing={2}
							value={status}
							onValueChange={pick(setStatus)}
						>
							<ToggleGroupItem value="all">전체</ToggleGroupItem>
							<ToggleGroupItem value="unsolved">안 푼 것</ToggleGroupItem>
							<ToggleGroupItem value="solved">푼 것</ToggleGroupItem>
						</ToggleGroup>
					</div>
				)}
			</div>

			<p className="text-sm text-muted-foreground" aria-live="polite">
				{shown.length === problems.length
					? `${problems.length}개`
					: `${problems.length}개 중 ${shown.length}개`}
			</p>

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
		</div>
	);
}

/**
 * Fallback for when the build could not reach Mongo.
 *
 * Prerendering the page introduced a build-time dependency on the database,
 * and a preview build failed exactly that way (`ReplicaSetNoPrimary`, TLS
 * alert from Atlas) — the whole deploy died on
 * `Export encountered an error on /problems/page`. app/sitemap.ts already
 * guards against this and says so; this page needed the same guard.
 *
 * Swallowing the error alone would be worse than the crash: an empty list
 * would be baked into the prerender and served for the full revalidate window.
 * So the page falls back to fetching the list in the browser instead, and the
 * next successful revalidation restores the server-rendered version.
 */
export function ClientProblemList() {
	const data = useProblems();
	if (!data?.problems) {
		return (
			<ul className="flex flex-col divide-y overflow-hidden rounded-md border">
				{[0, 1, 2].map((i) => (
					<li key={i} className="h-12 animate-pulse bg-accent/40" />
				))}
			</ul>
		);
	}
	return <ProblemRows problems={data.problems} topics={data.topics} />;
}

/**
 * Admin-only links. Rendered into a slot that already reserves its height, so
 * appearing after the auth check does not shift the page.
 */
export function ProblemAdminLinks() {
	const { user } = useUser();
	if (!(user?.success && user.role === "admin")) return null;
	return (
		<div className="flex items-center gap-2">
			<Button asChild variant="outline">
				<Link href="/problems/topics">주제 관리</Link>
			</Button>
			<Button asChild>
				<Link href="/problems/new">새 문제</Link>
			</Button>
		</div>
	);
}
