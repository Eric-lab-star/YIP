import { redirect } from "next/navigation";
import { validateToken } from "@/app/lib/auth/login";
import { listWorksheets } from "@/app/lib/mongo/worksheets";
import {
	FINAL_PROJECT_BLOCKS,
	FINAL_PROJECT_PAGE_ID,
} from "@/utils/worksheets/finalProject";

// requireAuth() 는 누구인지만 증명한다. 관리자인지는 여기서 따로 본다 —
// app/dashBoard/page.tsx, app/problems/topics/page.tsx 와 같은 방식이다.
export const dynamic = "force-dynamic";

const ALL_FIELDS = FINAL_PROJECT_BLOCKS.flatMap((b) =>
	b.fields.map((f) => ({ block: b.title, ...f }))
);

export default async function WorksheetsPage() {
	const auth = await validateToken();
	if (!(auth.success && auth.role === "admin")) redirect("/");

	// 분모는 활동지 칸만이다. AI 가 만들어 준 프롬프트까지 세면 분자가 분모를
	// 넘어선다 — `listWorksheets` 주석 참고.
	const submissions = await listWorksheets(
		FINAL_PROJECT_PAGE_ID,
		ALL_FIELDS.map((f) => f.id)
	);

	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-8">
			<h1 className="mb-1 text-2xl font-bold">최종 프로젝트 활동지</h1>
			<p className="mb-6 text-sm text-neutral-600">
				학생이 레슨 페이지에서 직접 채운 내용입니다. 자동 저장이라 제출 버튼은
				없고, 쓰는 즉시 여기에 반영됩니다. 전체 {ALL_FIELDS.length}칸.
			</p>

			{submissions.length === 0 ? (
				<p className="rounded-md border-2 border-dashed p-6 text-center text-neutral-500">
					아직 활동지를 쓴 학생이 없습니다.
				</p>
			) : (
				<div className="space-y-6">
					{submissions.map((s) => (
						<details
							key={s.userId}
							className="rounded-lg border-2 border-neutral-200 p-4"
						>
							<summary className="cursor-pointer font-bold">
								{s.userName}
								<span className="ml-3 text-sm font-normal text-neutral-500">
									{s.filledCount} / {ALL_FIELDS.length}칸 ·{" "}
									{s.updatedAt.toLocaleString("ko-KR", {
										timeZone: "Asia/Seoul",
									})}
								</span>
							</summary>

							<dl className="mt-4 space-y-3">
								{ALL_FIELDS.filter((f) => (s.answers[f.id] ?? "").trim() !== "").map(
									(f) => (
										<div key={f.id}>
											<dt className="text-sm font-bold text-neutral-500">
												{f.block} · {f.label}
											</dt>
											{/* 학생이 쓴 줄바꿈을 그대로 보여준다. */}
											<dd className="whitespace-pre-wrap">{s.answers[f.id]}</dd>
										</div>
									)
								)}
							</dl>
						</details>
					))}
				</div>
			)}
		</div>
	);
}
