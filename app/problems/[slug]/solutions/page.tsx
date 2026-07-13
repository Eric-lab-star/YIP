import { notFound } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { validateToken } from "@/app/lib/auth/login";
import { findProblemBySlug } from "@/app/lib/mongo/problems";
import {
	getSolvedSlugs,
	listAcceptedSolutions,
} from "@/app/lib/mongo/submissions";
import { readStudentNames } from "@/app/lib/mongo/students";
import SolutionList, { type SolutionItem } from "@/components/judge/SolutionList";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

// Other users' accepted solutions, gated so only a user who has themselves
// solved the problem can view them — you can't read the answers until you've
// earned it, which keeps the practice honest.
export default async function SolutionsPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const auth = await validateToken();
	if (!auth.success) {
		return <div className="px-4 py-8">로그인이 필요합니다.</div>;
	}

	const problem = await findProblemBySlug(slug);
	if (!problem) notFound();

	const solved = (await getSolvedSlugs(auth.id)).includes(slug);

	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-8">
			<div className="mb-2 flex items-center justify-between">
				<h1 className="text-2xl font-bold">다른 풀이</h1>
				<Button asChild variant="outline">
					<Link href={`/problems/${slug}`}>문제로 돌아가기</Link>
				</Button>
			</div>
			<p className="mb-6 text-muted-foreground">{problem.title}</p>

			{solved ? (
				<Solutions slug={slug} userId={auth.id} />
			) : (
				<div className="rounded-md border bg-accent/30 px-6 py-12 text-center">
					<Lock className="mx-auto mb-3 size-8 text-muted-foreground" />
					<p className="font-medium">
						먼저 이 문제를 맞혀야 다른 사람의 풀이를 볼 수 있어요.
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						직접 고민해서 푼 다음, 다른 접근 방식과 비교해보세요.
					</p>
					<Button asChild className="mt-4">
						<Link href={`/problems/${slug}`}>문제 풀러 가기</Link>
					</Button>
				</div>
			)}
		</div>
	);
}

async function Solutions({ slug, userId }: { slug: string; userId: string }) {
	const solutions = await listAcceptedSolutions(slug, userId);
	const names = await readStudentNames(solutions.map((s) => s.userId));
	const items: SolutionItem[] = solutions.map((s) => ({
		author: names[s.userId] ?? "익명",
		language: s.language,
		code: s.code,
		createdAt: s.createdAt.toISOString(),
	}));
	return <SolutionList items={items} />;
}
