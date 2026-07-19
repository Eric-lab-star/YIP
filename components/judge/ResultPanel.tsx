import { Badge } from "@/components/ui/badge";
import { doodleBox } from "@/components/mdx/doodle";

// Shared judge-result types + presentation, used by the live Solver and the
// submission-history view. Pure presentational (no hooks), so it works in both
// server and client components.

export interface TestResult {
	index: number;
	statusId: number;
	status: string;
	hidden: boolean;
	timeMs: number | null;
	memoryKb: number | null;
	stdout?: string | null;
	stderr?: string | null;
	compileOutput?: string | null;
	expected?: string | null;
}

export interface SubmissionResult {
	verdict: string;
	passed: number;
	total: number;
	timeMs: number | null;
	memoryKb: number | null;
	results: TestResult[];
}

export const VERDICT_LABEL: Record<string, string> = {
	pending: "채점 중",
	accepted: "정답",
	wrong_answer: "오답",
	compilation_error: "컴파일 에러",
	runtime_error: "런타임 에러",
	time_limit_exceeded: "시간 초과",
	internal_error: "내부 오류",
};

export function verdictTone(verdict: string): string {
	if (verdict === "accepted") return "bg-green-600 text-white";
	if (verdict === "pending") return "bg-neutral-500 text-white";
	return "bg-red-600 text-white";
}

export function VerdictBadge({ verdict }: { verdict: string }) {
	return (
		<Badge className={verdictTone(verdict)}>
			{VERDICT_LABEL[verdict] ?? verdict}
		</Badge>
	);
}

// Same tint vocabulary as the lesson-page callouts: green reads as "됐다",
// red as "봐야 한다", cream as "아직 진행 중".
function verdictTint(verdict: string): string {
	if (verdict === "accepted") return "#EAF7EF";
	if (verdict === "pending") return "#FFF6E9";
	return "#FDECEC";
}

export default function ResultPanel({ result }: { result: SubmissionResult }) {
	return (
		<div
			className="px-6 py-5"
			style={{ ...doodleBox, backgroundColor: verdictTint(result.verdict) }}
		>
			<div className="mb-3 flex flex-wrap items-center gap-3">
				<VerdictBadge verdict={result.verdict} />
				{result.verdict === "pending" ? (
					<span className="text-base text-muted-foreground">
						채점 중입니다…
					</span>
				) : (
					<span className="text-base font-bold">
						{result.passed}/{result.total} 통과
						{result.timeMs !== null && ` · ${result.timeMs}ms`}
						{result.memoryKb !== null &&
							` · ${Math.round(result.memoryKb / 1024)}MB`}
					</span>
				)}
			</div>

			{result.results.length > 0 && (
				<ul className="flex flex-col gap-2">
					{result.results.map((r) => (
						<li
							key={r.index}
							className="rounded-xl border-2 bg-white/60 px-4 py-3 text-sm"
						>
							<div className="flex items-center justify-between">
								<span className="font-medium">
									테스트 {r.index + 1}
									{r.hidden && (
										<span className="ml-1 text-xs text-muted-foreground">
											(숨김)
										</span>
									)}
								</span>
								<span
									className={
										r.statusId === 3 ? "text-green-600" : "text-red-600"
									}
								>
									{r.status}
								</span>
							</div>
							{!r.hidden && r.statusId !== 3 && (
								<div className="mt-2 space-y-1 text-xs text-muted-foreground">
									{r.compileOutput && (
										<pre className="overflow-x-auto whitespace-pre-wrap">
											{r.compileOutput}
										</pre>
									)}
									{/* `break-all` so a long single-token expected/actual value wraps
									    instead of pushing the card past the viewport. */}
									{r.expected !== undefined && r.expected !== null && (
										<div>
											<span className="font-bold">기대: </span>
											<code className="font-mono break-all">{r.expected}</code>
										</div>
									)}
									{r.stdout !== undefined && r.stdout !== null && (
										<div>
											<span className="font-bold">출력: </span>
											<code className="font-mono break-all">{r.stdout}</code>
										</div>
									)}
									{r.stderr && (
										<pre className="overflow-x-auto whitespace-pre-wrap">
											{r.stderr}
										</pre>
									)}
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
