import type { Metadata } from "next";
import { listProblems } from "@/app/lib/mongo/problems";
import {
	ClientProblemList,
	NewProblemButton,
	ProblemRows,
	type ListedProblem,
} from "@/components/judge/ProblemList";

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

export default async function ProblemsPage() {
	// Prerendering means the build now talks to Mongo, and a build must not die
	// because Atlas had a bad minute — app/sitemap.ts guards the same call for
	// the same reason. `null` means "could not load here", and the list is
	// fetched in the browser instead of baking an empty page into the cache.
	let problems: ListedProblem[] | null = null;
	try {
		problems = (await listProblems()).map((p) => ({
			slug: p.slug,
			title: p.title,
			difficulty: p.difficulty,
		}));
	} catch (e) {
		console.warn("[/problems] could not load problems at render time:", e);
	}

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

			{problems ? (
				<ProblemRows problems={problems} />
			) : (
				<ClientProblemList />
			)}
		</div>
	);
}
