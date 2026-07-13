"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Code2 } from "lucide-react";
import { getRelatedProblems } from "@/app/lib/tourProblems";

// "Learn then practice" bridge: shown at the bottom of a Tour of Python chapter,
// it links to judge problems that reinforce that chapter's concept. Driven by
// the URL (chapter = path segment after /tourOfPython/), so it appears on every
// mapped chapter automatically — no per-lesson MDX edits. Renders nothing on
// chapters without a mapping (and on the section index).
export default function RelatedProblems() {
	const pathname = usePathname().replace(/\/$/, "");
	const chapter = pathname.split("/")[2]; // /tourOfPython/<chapter>
	const problems = getRelatedProblems(chapter);
	if (problems.length === 0) return null;

	return (
		<section className="mt-16 rounded-xl border bg-accent/30 p-5">
			<div className="mb-1 flex items-center gap-2">
				<Code2 className="size-5 text-amber-500" />
				<h2 className="font-bold">배운 걸로 문제 풀어보기</h2>
			</div>
			<p className="mb-4 text-sm text-muted-foreground">
				이 챕터에서 배운 개념을 연습할 수 있는 문제예요. 바로 풀어보며 익혀보세요.
			</p>
			<ul className="flex flex-col gap-2">
				{problems.map((p) => (
					<li key={p.slug}>
						<Link
							href={`/problems/${p.slug}`}
							className="group flex items-center justify-between rounded-lg border bg-background px-4 py-2.5 transition-colors hover:border-amber-400 hover:bg-accent"
						>
							<span className="font-medium">{p.title}</span>
							<ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
