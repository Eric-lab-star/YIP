"use client";

import Link from "next/link";
import useSWR from "swr";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useUser from "@/components/SWR/auth/user";

export type ListedProblem = {
	slug: string;
	title: string;
	difficulty: string;
};

type ApiProblem = ListedProblem & { solved: boolean };

const DIFFICULTY: Record<string, { label: string; tone: string }> = {
	easy: { label: "쉬움", tone: "bg-green-600 text-white" },
	medium: { label: "보통", tone: "bg-yellow-500 text-white" },
	hard: { label: "어려움", tone: "bg-red-600 text-white" },
};

async function fetcher(url: string): Promise<ApiProblem[]> {
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

/**
 * The "완료" tick for one problem.
 *
 * This used to be rendered on the server, which forced the whole list page to
 * `force-dynamic` — every visitor got an uncached render (X-Vercel-Cache MISS,
 * ~280ms TTFB) just so a logged-in user could see their own ticks. The list
 * itself is identical for everyone, so it is now prerendered and revalidated
 * hourly, and only this per-user bit is fetched in the browser.
 */
function SolvedMark({ slug }: { slug: string }) {
	const data = useProblems();
	if (!data?.some((p) => p.slug === slug && p.solved)) return null;
	return (
		<span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
			<Check className="size-4" />
			완료
		</span>
	);
}

const EMPTY = (
	<p className="text-muted-foreground">
		아직 등록된 문제가 없습니다. `node scripts/seed-problems.mjs`로 예시 문제를
		추가할 수 있어요.
	</p>
);

/** The list itself. Rendered on the server in the normal case. */
export function ProblemRows({ problems }: { problems: ListedProblem[] }) {
	if (problems.length === 0) return EMPTY;
	return (
		<ul className="flex flex-col divide-y overflow-hidden rounded-md border">
			{problems.map((p) => {
				const d = DIFFICULTY[p.difficulty] ?? {
					label: p.difficulty,
					tone: "",
				};
				return (
					<li key={p.slug}>
						<Link
							href={`/problems/${p.slug}`}
							className="flex items-center gap-3 px-4 py-3 hover:bg-accent"
						>
							<span className="font-medium">{p.title}</span>
							<SolvedMark slug={p.slug} />
							<Badge className={`ml-auto ${d.tone}`}>{d.label}</Badge>
						</Link>
					</li>
				);
			})}
		</ul>
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
	if (!data) {
		return (
			<ul className="flex flex-col divide-y overflow-hidden rounded-md border">
				{[0, 1, 2].map((i) => (
					<li key={i} className="h-12 animate-pulse bg-accent/40" />
				))}
			</ul>
		);
	}
	return <ProblemRows problems={data} />;
}

/**
 * Admin-only "새 문제" link. Rendered into a slot that already reserves its
 * height, so appearing after the auth check does not shift the page.
 */
export function NewProblemButton() {
	const { user } = useUser();
	if (!(user?.success && user.role === "admin")) return null;
	return (
		<Button asChild>
			<Link href="/problems/new">새 문제</Link>
		</Button>
	);
}
