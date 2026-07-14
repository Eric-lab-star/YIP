import { notFound } from "next/navigation";
import Link from "next/link";
import { findProblemBySlug, toPublicProblem } from "@/app/lib/mongo/problems";
import { getSolvedSlugs } from "@/app/lib/mongo/submissions";
import { validateToken } from "@/app/lib/auth/login";
import ChatMarkdown from "@/components/commons/ChatMarkdown";
import Solver from "@/components/judge/Solver";
import ProblemAdminControls from "@/components/judge/ProblemAdminControls";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic";

const DIFFICULTY: Record<string, { label: string; tone: string }> = {
	easy: { label: "쉬움", tone: "bg-green-600 text-white" },
	medium: { label: "보통", tone: "bg-yellow-500 text-white" },
	hard: { label: "어려움", tone: "bg-red-600 text-white" },
};

export default async function ProblemPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const [raw, auth] = await Promise.all([
		findProblemBySlug(slug),
		validateToken(),
	]);
	if (!raw) notFound();
	const isAdmin = auth.success && auth.role === "admin";
	const solved = auth.success
		? (await getSolvedSlugs(auth.id)).includes(slug)
		: false;

	const problem = toPublicProblem(raw);
	const d = DIFFICULTY[problem.difficulty] ?? {
		label: problem.difficulty,
		tone: "",
	};

	return (
		<div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 lg:grid-cols-2">
			<section className="min-w-0">
				<div className="mb-3 flex items-center gap-3">
					<h1 className="text-xl font-bold">{problem.title}</h1>
					<Badge className={d.tone}>{d.label}</Badge>
					{solved && (
						<span className="flex items-center gap-0.5 text-sm font-medium text-green-600">
							<Check className="size-4" />
							완료
						</span>
					)}
					<Link
						href={`/problems/${problem.slug}/solutions`}
						className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
					>
						다른 풀이
					</Link>
					{isAdmin && (
						<div className="ml-auto">
							<ProblemAdminControls slug={problem.slug} />
						</div>
					)}
				</div>
				<ChatMarkdown content={problem.description} className="text-base" />

				<h2 className="mt-6 mb-2 text-sm font-semibold text-muted-foreground">
					예시 테스트
				</h2>
				<div className="flex flex-col gap-2">
					{problem.sampleTestcases.map((t, i) => (
						<div key={i} className="rounded-md border p-3 text-sm">
							<div>
								<span className="font-medium">입력</span>
								<pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-muted p-2">
									{t.stdin}
								</pre>
							</div>
							<div className="mt-2">
								<span className="font-medium">출력</span>
								<pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-muted p-2">
									{t.expectedOutput}
								</pre>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="min-w-0">
				<Solver
					problem={{
						slug: problem.slug,
						languages: problem.languages,
						starterCode: problem.starterCode,
						sampleStdin: problem.sampleTestcases[0]?.stdin ?? "",
					}}
					isLoggedIn={auth.success}
				/>
			</section>
		</div>
	);
}
