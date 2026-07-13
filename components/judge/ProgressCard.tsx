import { Flame, Trophy } from "lucide-react";
import type { UserProgress } from "@/app/lib/mongo/progress";

// Learning-progress summary card: total solved, current streak, and per-difficulty
// completion bars. Purely presentational (no hooks) so it renders on the server.

const DIFFICULTY_META: Record<
	"easy" | "medium" | "hard",
	{ label: string; bar: string; text: string }
> = {
	easy: { label: "쉬움", bar: "bg-green-600", text: "text-green-700" },
	medium: { label: "보통", bar: "bg-yellow-500", text: "text-yellow-700" },
	hard: { label: "어려움", bar: "bg-red-600", text: "text-red-700" },
};

function Bar({
	meta,
	solved,
	total,
}: {
	meta: { label: string; bar: string; text: string };
	solved: number;
	total: number;
}) {
	const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
	return (
		<div>
			<div className="mb-1 flex items-center justify-between text-sm">
				<span className={`font-bold ${meta.text}`}>{meta.label}</span>
				<span className="font-mono text-muted-foreground">
					{solved} / {total}
				</span>
			</div>
			<div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
				<div
					className={`h-full rounded-full ${meta.bar} transition-all`}
					style={{ width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}

export default function ProgressCard({ progress }: { progress: UserProgress }) {
	const { totalSolved, totalProblems, byDifficulty, currentStreak } = progress;

	return (
		<div className="doodle-box bg-white px-6 py-6" style={{ rotate: "-0.4deg" }}>
			<div className="mb-5 flex flex-wrap items-center gap-x-8 gap-y-3">
				<div className="flex items-center gap-3">
					<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
						<Trophy className="h-6 w-6" strokeWidth={2.25} />
					</span>
					<div>
						<p className="text-2xl font-bold leading-none">
							{totalSolved}
							<span className="ml-1 text-base font-medium text-muted-foreground">
								/ {totalProblems} 문제
							</span>
						</p>
						<p className="text-sm text-muted-foreground">푼 문제</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
						<Flame className="h-6 w-6" strokeWidth={2.25} />
					</span>
					<div>
						<p className="text-2xl font-bold leading-none">
							{currentStreak}
							<span className="ml-1 text-base font-medium text-muted-foreground">
								일
							</span>
						</p>
						<p className="text-sm text-muted-foreground">연속 풀이</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<Bar meta={DIFFICULTY_META.easy} {...byDifficulty.easy} />
				<Bar meta={DIFFICULTY_META.medium} {...byDifficulty.medium} />
				<Bar meta={DIFFICULTY_META.hard} {...byDifficulty.hard} />
			</div>
		</div>
	);
}
