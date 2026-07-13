import { getLanguage } from "@/app/lib/judge0/languages";

// Presentational list of other users' accepted solutions. Rendered only after
// the server has verified the viewer solved the problem, so it never needs to
// gate anything itself. Code is shown verbatim in a <pre> (no markdown parsing)
// so arbitrary submitted code can't inject formatting.

export interface SolutionItem {
	author: string;
	language: string;
	code: string;
	createdAt: string; // ISO
}

export default function SolutionList({ items }: { items: SolutionItem[] }) {
	if (items.length === 0) {
		return (
			<div className="rounded-md border px-6 py-12 text-center text-muted-foreground">
				아직 공유된 다른 풀이가 없어요. 첫 정답의 주인공이 되어보세요!
			</div>
		);
	}

	return (
		<ul className="flex flex-col gap-4">
			{items.map((s, i) => (
				<li key={i} className="overflow-hidden rounded-md border">
					<div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2 text-sm">
						<span className="font-medium">{s.author}</span>
						<span className="text-muted-foreground">
							{getLanguage(s.language)?.label ?? s.language} ·{" "}
							{new Date(s.createdAt).toLocaleDateString("ko-KR")}
						</span>
					</div>
					<pre className="overflow-x-auto p-4 text-sm leading-relaxed">
						<code>{s.code}</code>
					</pre>
				</li>
			))}
		</ul>
	);
}
