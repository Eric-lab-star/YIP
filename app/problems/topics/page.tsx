import { redirect } from "next/navigation";
import { validateToken } from "@/app/lib/auth/login";
import { listTopics } from "@/app/lib/mongo/topics";
import { listProblems } from "@/app/lib/mongo/problems";
import { TopicManager } from "@/components/judge/TopicManager";

// requireAuth() 는 누구인지만 증명한다. 관리자인지는 여기서 따로 본다 —
// app/dashBoard/page.tsx 가 같은 방식이고, 레이아웃이 대신해 주지 않는다.
export const dynamic = "force-dynamic";

export default async function TopicsAdminPage() {
	const auth = await validateToken();
	if (!(auth.success && auth.role === "admin")) redirect("/problems");

	// 문제 수는 삭제 가능 여부를 화면에서 미리 알려주는 용도다. 서버도
	// 같은 규칙을 강제하므로 이 숫자가 낡아도 잘못 지워지지는 않는다.
	const [topics, problems] = await Promise.all([listTopics(), listProblems()]);
	const counts: Record<string, number> = {};
	for (const p of problems) {
		if (p.topicSlug) counts[p.topicSlug] = (counts[p.topicSlug] ?? 0) + 1;
	}

	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-8">
			<h1 className="mb-6 text-2xl font-bold">주제 관리</h1>
			<TopicManager topics={topics} counts={counts} />
		</div>
	);
}
