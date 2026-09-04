import Link from "next/link";
import { ArrowLeft, ArrowRight, List } from "lucide-react";
import { doodleBox, ink, sky } from "./doodle";

/**
 * 최종 프로젝트 실습을 6개로 나눈 뒤 붙는 이전/다음 이동.
 *
 * 사이드바에도 같은 링크가 있지만, 한 장을 끝까지 읽은 학생이 다음으로 가려고
 * 화면 반대쪽까지 올라가야 하는 건 다른 문제다. 그래서 끝에 한 번 더 둔다.
 * 가운데의 목록 링크는 지금 몇 번째 장인지 잃었을 때 돌아갈 자리다.
 */
export function PartNav({
	prev,
	next,
}: {
	prev?: { name: string; url: string };
	next?: { name: string; url: string };
}) {
	const base =
		"flex items-center gap-2 px-4 py-3 text-lg font-bold no-underline";

	return (
		<nav className="my-10 flex flex-wrap items-stretch justify-between gap-3">
			{prev ? (
				<Link href={prev.url} className={base} style={{ ...doodleBox, color: ink }}>
					<ArrowLeft className="size-4 shrink-0" />
					{prev.name}
				</Link>
			) : (
				<span />
			)}

			<Link
				href="/AIDeveloper/FinalProject_guide/task"
				className="flex items-center gap-2 px-4 py-3 text-base no-underline"
				style={{ ...doodleBox, color: "#6B7280" }}
			>
				<List className="size-4 shrink-0" />
				전체 목록
			</Link>

			{next ? (
				<Link
					href={next.url}
					className={base}
					style={{ ...doodleBox, backgroundColor: sky, color: "#fff" }}
				>
					{next.name}
					<ArrowRight className="size-4 shrink-0" />
				</Link>
			) : (
				<span />
			)}
		</nav>
	);
}
