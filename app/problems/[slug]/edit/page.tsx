import { notFound } from "next/navigation";
import { validateToken } from "@/app/lib/auth/login";
import { findProblemBySlug } from "@/app/lib/mongo/problems";
import ProblemForm from "@/components/judge/ProblemForm";
import type { ProblemFormInput } from "@/app/lib/zod/problemFormSchema";

export const dynamic = "force-dynamic";

export default async function EditProblemPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const auth = await validateToken();
	if (!auth.success) {
		return <div className="px-4 py-8">로그인이 필요합니다.</div>;
	}
	if (auth.role !== "admin") {
		return <div className="px-4 py-8">권한이 없습니다.</div>;
	}

	const problem = await findProblemBySlug(slug);
	if (!problem) notFound();

	// Prefill with the full problem, including hidden test cases (admin only).
	const initial: ProblemFormInput = {
		title: problem.title,
		slug: problem.slug,
		difficulty: problem.difficulty,
		description: problem.description,
		languages: problem.languages,
		starterCode: problem.starterCode,
		timeLimit: problem.timeLimit,
		memoryLimit: problem.memoryLimit,
		testcases: problem.testcases,
	};

	return <ProblemForm mode="edit" initial={initial} />;
}
