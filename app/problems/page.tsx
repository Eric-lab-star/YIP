import Link from "next/link";
import { listProblems } from "@/app/lib/mongo/problems";
import { validateToken } from "@/app/lib/auth/login";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const DIFFICULTY: Record<string, { label: string; tone: string }> = {
	easy: { label: "쉬움", tone: "bg-green-600 text-white" },
	medium: { label: "보통", tone: "bg-yellow-500 text-white" },
	hard: { label: "어려움", tone: "bg-red-600 text-white" },
};

export default async function ProblemsPage() {
	const [problems, auth] = await Promise.all([listProblems(), validateToken()]);
	const isAdmin = auth.success && auth.role === "admin";

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
									className="flex items-center justify-between px-4 py-3 hover:bg-accent"
								>
									<span className="font-medium">{p.title}</span>
									<Badge className={d.tone}>{d.label}</Badge>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
