import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { findProblemBySlug, toPublicProblem } from "@/app/lib/mongo/problems";
import { getSolvedSlugs } from "@/app/lib/mongo/submissions";
import { validateToken } from "@/app/lib/auth/login";
import ChatMarkdown from "@/components/commons/ChatMarkdown";
import Solver from "@/components/judge/Solver";
import ProblemAdminControls from "@/components/judge/ProblemAdminControls";
import { Badge } from "@/components/ui/badge";
import Squiggle from "@/components/mdx/Squiggle";
import { doodleBox, ink } from "@/components/mdx/doodle";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic";

const SITE_URL = "https://yipcode.xyz";

// generateMetadata and the page body both need the problem. React's `cache`
// collapses them into a single query per request.
const getProblem = cache(findProblemBySlug);

const DIFFICULTY: Record<string, { label: string; tone: string }> = {
	easy: { label: "쉬움", tone: "bg-green-600 text-white" },
	medium: { label: "보통", tone: "bg-yellow-500 text-white" },
	hard: { label: "어려움", tone: "bg-red-600 text-white" },
};

/**
 * Flatten a Markdown problem statement into a one-line search snippet.
 * Fenced code blocks go first — a statement often opens with an example, and
 * leading code makes for a useless description. A statement almost always
 * opens with an `# <title>` heading, which would otherwise repeat the <title>
 * tag verbatim and waste the snippet's first words, so `title` is trimmed off
 * the front when present.
 */
function toSnippet(markdown: string, title: string, limit = 155): string {
	let text = markdown
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`([^`]*)`/g, "$1")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/<[^>]+>/g, " ")
		.replace(/^\s{0,3}#{1,6}\s+/gm, "")
		.replace(/^\s{0,3}>\s?/gm, "")
		.replace(/[*_~]/g, "")
		.replace(/\s+/g, " ")
		.trim();

	if (text.toLowerCase().startsWith(title.trim().toLowerCase())) {
		text = text.slice(title.trim().length).trim();
	}

	if (text.length <= limit) return text;
	// Prefer cutting on a word boundary so the snippet doesn't end mid-word.
	const cut = text.slice(0, limit);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const problem = await getProblem(slug);
	if (!problem) return { title: "문제를 찾을 수 없습니다" };

	const level = DIFFICULTY[problem.difficulty]?.label ?? problem.difficulty;
	const snippet = toSnippet(problem.description, problem.title);
	const description = snippet
		? `[난이도 ${level}] ${snippet}`
		: `YIP 코딩 문제 "${problem.title}" — 난이도 ${level}. 브라우저에서 바로 풀고 채점해 보세요.`;
	const url = `${SITE_URL}/problems/${problem.slug}`;

	return {
		title: problem.title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title: `${problem.title} | YIP 코딩 문제`,
			description,
			url,
			type: "article",
		},
	};
}

export default async function ProblemPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const [raw, auth] = await Promise.all([getProblem(slug), validateToken()]);
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
				{/* Title gets the same treatment as an MDX <h1> on the lesson pages:
				    big handwritten type with a squiggle underline. Meta sits on its
				    own row below so the heading is never squeezed. */}
				<h1 className="relative inline-block text-3xl leading-[1.15] font-bold md:text-4xl">
					{problem.title}
					<Squiggle className="absolute -bottom-3 left-0 h-3.5 w-full" />
				</h1>

				<div className="mt-7 mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
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

				{/* Body scale matches an MDX lesson page. ChatMarkdown's defaults are
				    tuned for chat bubbles, so its headings need bumping here or they
				    come out the same size as the body text. */}
				<ChatMarkdown
					content={problem.description}
					className="text-lg leading-[1.8] [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_li]:my-1 [&_p]:my-4"
				/>

				<h2 className="mt-10 mb-4 flex items-center gap-3 text-2xl font-bold">
					<span aria-hidden>🧪</span>
					예시 테스트
				</h2>
				<div className="flex flex-col gap-5">
					{problem.sampleTestcases.map((t, i) => (
						<div key={i} className="px-6 py-5" style={doodleBox}>
							<div className="mb-3 flex items-center gap-2">
								<span
									className="rounded-full px-3 py-1 text-sm font-bold text-white"
									style={{ backgroundColor: ink }}
								>
									예시 {i + 1}
								</span>
							</div>
							<div>
								<span className="font-bold">입력</span>
								<pre className="mt-1 overflow-x-auto rounded-lg bg-muted p-3 font-mono text-sm whitespace-pre-wrap">
									{t.stdin}
								</pre>
							</div>
							<div className="mt-3">
								<span className="font-bold">출력</span>
								<pre className="mt-1 overflow-x-auto rounded-lg bg-muted p-3 font-mono text-sm whitespace-pre-wrap">
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
