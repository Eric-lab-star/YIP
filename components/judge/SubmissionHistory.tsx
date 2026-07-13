"use client";

import { useState } from "react";
import ResultPanel, {
	VerdictBadge,
	type TestResult,
} from "@/components/judge/ResultPanel";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface SubmissionHistoryItem {
	id: string;
	language: string;
	languageLabel: string;
	verdict: string;
	passed: number;
	total: number;
	timeMs: number | null;
	memoryKb: number | null;
	createdAt: string;
	code: string;
	results: TestResult[];
}

function formatDate(iso: string): string {
	return new Date(iso).toLocaleString("ko-KR", {
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function SubmissionHistory({
	items,
}: {
	items: SubmissionHistoryItem[];
}) {
	if (items.length === 0) {
		return (
			<div className="rounded-md border px-6 py-12 text-center text-muted-foreground">
				아직 제출 기록이 없습니다.
			</div>
		);
	}

	return (
		<ul className="flex flex-col gap-2">
			{items.map((s) => (
				<SubmissionRow key={s.id} item={s} />
			))}
		</ul>
	);
}

function SubmissionRow({ item }: { item: SubmissionHistoryItem }) {
	const [open, setOpen] = useState(false);

	return (
		<li className="rounded-md border">
			<button
				onClick={() => setOpen((v) => !v)}
				className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-accent"
			>
				{open ? (
					<ChevronDown className="size-4 shrink-0 text-muted-foreground" />
				) : (
					<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
				)}
				<VerdictBadge verdict={item.verdict} />
				<span className="text-sm font-medium">{item.languageLabel}</span>
				<span className="text-sm text-muted-foreground">
					{item.passed}/{item.total}
				</span>
				<span className="ml-auto text-xs text-muted-foreground">
					{formatDate(item.createdAt)}
				</span>
			</button>

			{open && (
				<div className="space-y-3 border-t p-3">
					<div>
						<div className="mb-1 text-xs font-medium text-muted-foreground">
							제출한 코드
						</div>
						<pre className="max-h-80 overflow-auto rounded bg-muted p-3 text-xs">
							<code>{item.code}</code>
						</pre>
					</div>
					<ResultPanel
						result={{
							verdict: item.verdict,
							passed: item.passed,
							total: item.total,
							timeMs: item.timeMs,
							memoryKb: item.memoryKb,
							results: item.results,
						}}
					/>
				</div>
			)}
		</li>
	);
}
