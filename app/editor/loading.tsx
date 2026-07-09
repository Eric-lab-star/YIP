import { Skeleton } from "@/components/ui/skeleton";

// 실제 에디터 레이아웃(중앙정렬 max-w-4xl, 툴바 카드 + 제목/본문 카드)과
// 같은 모양으로 맞춰 로딩 → 렌더 시 레이아웃이 튀지 않게 한다.
export default function Loading() {
	return (
		<div className="min-h-screen w-full bg-zinc-50 py-6">
			<div className="mx-auto w-full max-w-4xl px-3 sm:px-5">
				{/* 툴바 자리 */}
				<Skeleton className="h-14 w-full rounded-2xl bg-zinc-200" />
				{/* 제목 + 본문 카드 자리 */}
				<div className="mt-4 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
					<Skeleton className="h-9 w-2/3 bg-zinc-200" />
					<Skeleton className="h-[520px] w-full bg-zinc-200" />
				</div>
			</div>
		</div>
	);
}
