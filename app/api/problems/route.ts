import { listProblems } from "@/app/lib/mongo/problems";
import { NextResponse } from "next/server";

// Public list of problems for the sidebar / list page. Only the fields the
// navigation needs — hidden test cases are already stripped by listProblems.
export async function GET() {
	const problems = await listProblems();
	return NextResponse.json(
		problems.map((p) => ({
			slug: p.slug,
			title: p.title,
			difficulty: p.difficulty,
		}))
	);
}
