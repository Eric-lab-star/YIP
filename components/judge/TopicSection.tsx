"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * 접히는 주제 섹션 하나.
 *
 * 기본이 접힘인 것이 이 화면의 요점이다. 131개를 주제로 묶기만 하고 전부
 * 펼쳐두면 소제목만 24개 늘어난 같은 벽이 된다. 접으면 첫 화면이 24줄짜리
 * 목차가 된다.
 *
 * `forceOpen` 은 검색·필터가 걸렸을 때 부모가 강제로 펼치는 용도다. 접힌 채로
 * 두면 "131개 중 3개" 라고 해놓고 화면에 아무것도 안 보인다.
 */
export function TopicSection({
	name,
	total,
	solvedCount,
	forceOpen,
	children,
}: {
	name: string;
	total: number;
	solvedCount: number;
	forceOpen: boolean;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const expanded = forceOpen || open;

	return (
		<section className="overflow-hidden rounded-md border">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={expanded}
				className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-accent"
			>
				<ChevronRight
					className={`size-4 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
					aria-hidden
				/>
				<span className="font-medium">{name}</span>
				<span className="ml-auto shrink-0 text-sm text-muted-foreground">
					{total}문제
					{solvedCount > 0 && ` · ${solvedCount} 완료`}
				</span>
			</button>
			{expanded && <div className="border-t">{children}</div>}
		</section>
	);
}
