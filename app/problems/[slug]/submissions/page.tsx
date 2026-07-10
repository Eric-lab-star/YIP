import { notFound } from "next/navigation";
import Link from "next/link";
import { validateToken } from "@/app/lib/auth/login";
import { findProblemBySlug } from "@/app/lib/mongo/problems";
import { listSubmissionsByUserAndProblem } from "@/app/lib/mongo/submissions";
import { getLanguage } from "@/app/lib/judge0/languages";
import SubmissionHistory, {
	type SubmissionHistoryItem,
} from "@/components/judge/SubmissionHistory";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage({
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

	const subs = await listSubmissionsByUserAndProblem(auth.id, slug);
	const items: SubmissionHistoryItem[] = subs.map((s) => ({
		id: s._id!.toString(),
		language: s.language,
		languageLabel: getLanguage(s.language)?.label ?? s.language,
		verdict: s.verdict,
		passed: s.passed,
		total: s.total,
		timeMs: s.timeMs,
		memoryKb: s.memoryKb,
		createdAt: s.createdAt.toISOString(),
		code: s.code,
		results: s.results,
	}));

	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-8">
			<div className="mb-2 flex items-center justify-between">
				<h1 className="text-2xl font-bold">제출 기록</h1>
				<Button asChild variant="outline">
					<Link href={`/problems/${slug}`}>문제로 돌아가기</Link>
				</Button>
			</div>
			<p className="mb-6 text-muted-foreground">{problem.title}</p>

			<SubmissionHistory items={items} />
		</div>
	);
}
