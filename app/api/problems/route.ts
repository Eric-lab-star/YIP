import { listProblems } from "@/app/lib/mongo/problems";
import { getSolvedSlugs } from "@/app/lib/mongo/submissions";
import { validateToken } from "@/app/lib/auth/login";
import { NextResponse } from "next/server";

// Problem list for the sidebar / list page. Includes a per-user `solved` flag
// (a problem is solved once the user has an accepted submission for it).
export async function GET() {
	const [problems, auth] = await Promise.all([listProblems(), validateToken()]);
	const solved = auth.success
		? new Set(await getSolvedSlugs(auth.id))
		: new Set<string>();

	return NextResponse.json(
		problems.map((p) => ({
			slug: p.slug,
			title: p.title,
			difficulty: p.difficulty,
			solved: solved.has(p.slug),
		}))
	);
}
