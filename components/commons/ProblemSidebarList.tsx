"use client";

import useSWR from "swr";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProblemItem {
	slug: string;
	title: string;
	difficulty: string;
}

const DIFFICULTY_DOT: Record<string, string> = {
	easy: "bg-green-500",
	medium: "bg-yellow-500",
	hard: "bg-red-500",
};

const fetcher = (url: string): Promise<ProblemItem[]> =>
	fetch(url).then((r) => r.json());

export default function ProblemSidebarList() {
	const { data, isLoading } = useSWR<ProblemItem[]>("/api/problems", fetcher);
	const pathname = usePathname();

	if (isLoading) {
		return (
			<div className="px-4 py-3 text-sm text-muted-foreground">
				불러오는 중…
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="px-4 py-3 text-sm text-muted-foreground">
				등록된 문제가 없습니다.
			</div>
		);
	}

	return (
		<nav className="flex flex-col">
			{data.map((p) => {
				const active = pathname === `/problems/${p.slug}`;
				return (
					<Link
						key={p.slug}
						href={`/problems/${p.slug}`}
						className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-accent ${
							active ? "bg-accent font-medium" : ""
						}`}
					>
						<span
							className={`size-2 shrink-0 rounded-full ${
								DIFFICULTY_DOT[p.difficulty] ?? "bg-muted-foreground"
							}`}
						/>
						<span className="truncate">{p.title}</span>
					</Link>
				);
			})}
		</nav>
	);
}
