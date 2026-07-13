import { validateToken } from "@/app/lib/auth/login";
import ProblemForm from "@/components/judge/ProblemForm";

export const dynamic = "force-dynamic";

export default async function NewProblemPage() {
	const auth = await validateToken();
	if (!auth.success) {
		return <div className="px-4 py-8">로그인이 필요합니다.</div>;
	}
	if (auth.role !== "admin") {
		return <div className="px-4 py-8">권한이 없습니다.</div>;
	}
	return <ProblemForm />;
}
