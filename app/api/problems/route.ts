import { listProblems } from "@/app/lib/mongo/problems";
import { listTopics } from "@/app/lib/mongo/topics";
import { getSolvedSlugs } from "@/app/lib/mongo/submissions";
import { validateToken } from "@/app/lib/auth/login";
import { NextResponse } from "next/server";

// 사이드바 / 목록 페이지가 쓰는 문제 목록. 사용자별 `solved` 를 포함한다.
//
// 주제를 별도 엔드포인트로 나누지 않고 같은 응답에 싣는다. 목록 화면은 늘
// 둘을 함께 필요로 하고, 두 요청으로 나누면 한쪽만 새 것인 순간(새 주제는
// 왔는데 문제는 옛날 것) 을 화면이 처리해야 한다.
export async function GET() {
	const [problems, topics, auth] = await Promise.all([
		listProblems(),
		listTopics(),
		validateToken(),
	]);
	const solved = auth.success
		? new Set(await getSolvedSlugs(auth.id))
		: new Set<string>();

	return NextResponse.json({
		topics,
		problems: problems.map((p) => ({
			slug: p.slug,
			title: p.title,
			difficulty: p.difficulty,
			topicSlug: p.topicSlug,
			solved: solved.has(p.slug),
		})),
	});
}
