import type { Metadata } from "next";
import Link from "next/link";
import { listProblems } from "@/app/lib/mongo/problems";
import { getSolvedSlugs } from "@/app/lib/mongo/submissions";
import { validateToken } from "@/app/lib/auth/login";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic";

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
	const [problems, auth] = await Promise.all([listProblems(), validateToken()]);
	const isAdmin = auth.success && auth.role === "admin";
	const solved = auth.success
		? new Set(await getSolvedSlugs(auth.id))
		: new Set<string>();

	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-8">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">문제</h1>
				{isAdmin && (
					<Button asChild>
						<Link href="/problems/new">새 문제</Link>
					</Button>
				)}
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
			)}
		</div>
	);
}
