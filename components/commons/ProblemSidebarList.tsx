"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";

interface ProblemItem {
	slug: string;
	title: string;
	difficulty: string;
	/** 소속 주제. 미분류면 없음. */
	topicSlug?: string;
	solved?: boolean;
}

interface TopicItem {
	slug: string;
	name: string;
	order: number;
}

const DIFFICULTY_DOT: Record<string, string> = {
	easy: "bg-green-500",
	medium: "bg-yellow-500",
	hard: "bg-red-500",
};

const fetcher = (url: string): Promise<{ topics: TopicItem[]; problems: ProblemItem[] }> =>
	fetch(url).then((r) => r.json());

/** `/problems/<slug>` 및 그 하위(`/submissions`·`/solutions`·`/edit`)에서 slug 를 뽑는다. */
function activeSlugOf(pathname: string): string | null {
	const seg = pathname.split("/");
	if (seg[1] !== "problems") return null;
	const slug = seg[2];
	// 목록·관리 화면은 문제가 아니다.
	if (!slug || slug === "new" || slug === "topics") return null;
	return slug;
}

export default function ProblemSidebarList() {
	const { data, isLoading } = useSWR<{ topics: TopicItem[]; problems: ProblemItem[] }>(
		"/api/problems",
		fetcher
	);
	const pathname = usePathname();
	const activeSlug = activeSlugOf(pathname);

	// 주제 순서대로, 미분류는 마지막. 문제가 없는 주제는 숨긴다 — 목록 화면의
	// grouping 과 같은 규칙이라 두 화면의 섹션 구성이 어긋나지 않는다.
	const sections = useMemo(() => {
		const problems = data?.problems ?? [];
		const topics = data?.topics ?? [];
		const byTopic = new Map<string, ProblemItem[]>();
		for (const p of problems) {
			const key = p.topicSlug ?? "";
			const arr = byTopic.get(key);
			if (arr) arr.push(p);
			else byTopic.set(key, [p]);
		}
		const out = topics
			.map((t) => ({ slug: t.slug, name: t.name, items: byTopic.get(t.slug) ?? [] }))
			.filter((s) => s.items.length > 0);
		const loose = byTopic.get("") ?? [];
		if (loose.length) out.push({ slug: "", name: "미분류", items: loose });
		return out;
	}, [data]);

	if (isLoading) {
		return <div className="px-4 py-3 text-sm text-muted-foreground">불러오는 중…</div>;
	}

	if (sections.length === 0) {
		return <div className="px-4 py-3 text-sm text-muted-foreground">등록된 문제가 없습니다.</div>;
	}

	return (
		<nav className="flex flex-col gap-0.5 px-2">
			{sections.map((s) => (
				<TopicGroup
					key={s.slug || "__none"}
					name={s.name}
					items={s.items}
					activeSlug={activeSlug}
				/>
			))}
		</nav>
	);
}

/**
 * 접히는 주제 하나. 기본은 접힘이고, 지금 보고 있는 문제가 든 주제만 펼친다.
 *
 * 레슨 사이드바(`SideBarItems`)의 폴더와 같은 규칙으로 자동으로 펼치기만 하고
 * 자동으로 접지는 않는다 — 사용자가 열어둔 다른 주제를 이동할 때마다 닫으면
 * 옆 주제의 문제를 훑어보는 동작이 매번 끊긴다.
 */
function TopicGroup({
	name,
	items,
	activeSlug,
}: {
	name: string;
	items: ProblemItem[];
	activeSlug: string | null;
}) {
	const hasActive = activeSlug !== null && items.some((p) => p.slug === activeSlug);
	const [open, setOpen] = useState(hasActive);
	const activeRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (hasActive) setOpen(true);
	}, [hasActive]);

	// 주제가 25개면 접힌 목차만으로도 화면보다 길다. 펼쳐진 곳이 화면 밖이면
	// 자동으로 펼친 의미가 없으므로 현재 문제를 보이는 곳까지 끌어온다.
	useEffect(() => {
		if (hasActive && open) {
			activeRef.current?.scrollIntoView({ block: "nearest" });
		}
	}, [hasActive, open]);

	const solvedCount = items.filter((p) => p.solved).length;

	return (
		<div>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				className="flex w-full items-center gap-1.5 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
			>
				<ChevronRight
					className={`size-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
					aria-hidden
				/>
				<span className="min-w-0 flex-1 font-medium">{name}</span>
				<span className="shrink-0 text-xs text-muted-foreground tabular-nums">
					{solvedCount > 0 && (
						<span className="font-medium text-green-600">{solvedCount}</span>
					)}
					{solvedCount > 0 && "/"}
					{items.length}
				</span>
			</button>

			{open && (
				<ul className="flex flex-col">
					{items.map((p) => {
						const active = p.slug === activeSlug;
						return (
							<li key={p.slug}>
								<Link
									ref={active ? activeRef : undefined}
									href={`/problems/${p.slug}`}
									aria-current={active ? "page" : undefined}
									className={`flex items-center gap-2 rounded-md py-2 pr-2 pl-7 text-sm transition-colors hover:bg-accent ${
										active ? "bg-accent font-medium" : ""
									}`}
								>
									<span
										className={`size-2 shrink-0 rounded-full ${
											DIFFICULTY_DOT[p.difficulty] ?? "bg-muted-foreground"
										}`}
									/>
									<span className="truncate">{p.title}</span>
									{p.solved && (
										<Check
											className="ml-auto size-3.5 shrink-0 text-green-600"
											aria-label="완료"
										/>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
