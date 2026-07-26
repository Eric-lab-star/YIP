import type { Metadata } from "next";
import Link from "next/link";
import { listProblems } from "@/app/lib/mongo/problems";
import { Badge } from "@/components/ui/badge";
import {
	NewProblemButton,
	SolvedMark,
} from "@/components/judge/ProblemListPersonal";

// The list is the same for everyone; only the "완료" ticks and the admin link
// differ per user, and both are fetched in the browser now. That lets the page
// be prerendered instead of `force-dynamic`, which was costing every visitor an
// uncached render (X-Vercel-Cache MISS, ~280ms TTFB against ~55ms for the
// cached routes). One hour matches app/sitemap.ts, which revalidates on the
// same cadence so a newly published problem appears without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = {
	title: "코딩 문제 풀이",
	description:
		"YIP의 파이썬 코딩 문제 목록입니다. 난이도별 문제를 브라우저에서 바로 작성하고 채점 결과를 확인해 보세요.",
	alternates: { canonical: "https://yipcode.xyz/problems" },
};

const DIFFICULTY: Record<string, { label: string; tone: string }> = {
	easy: { label: "쉬움", tone: "bg-green-600 text-white" },
	medium: { label: "보통", tone: "bg-yellow-500 text-white" },
	hard: { label: "어려움", tone: "bg-red-600 text-white" },
};

export default async function ProblemsPage() {
	const problems = await listProblems();

	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-8">
			{/* min-h keeps this row the height it has *with* the admin button, so
			    the button appearing after the auth check does not push the list
			    down. Non-admins see the same spacing, which is what the row
			    already looked like. */}
			<div className="mb-6 flex min-h-9 items-center justify-between">
				<h1 className="text-2xl font-bold">문제</h1>
				<NewProblemButton />
			</div>

			{problems.length === 0 ? (
				<p className="text-muted-foreground">
					아직 등록된 문제가 없습니다. `node scripts/seed-problems.mjs`로 예시
					문제를 추가할 수 있어요.
				</p>
			) : (
				<ul className="flex flex-col divide-y overflow-hidden rounded-md border">
					{problems.map((p) => {
						const d = DIFFICULTY[p.difficulty] ?? {
							label: p.difficulty,
							tone: "",
						};
						return (
							<li key={p._id}>
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
			)}
		</div>
	);
}
