"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import ChatMarkdown from "@/components/commons/ChatMarkdown";

/**
 * 접힌 머리글에 쓸 부제를 본문에서 떼어낸다.
 *
 * 개념 정리를 필드 하나(마크다운)로 두기로 했으므로 제목 필드가 따로 없다.
 * 맨 앞의 `# 제목` 한 줄을 부제로 쓰고 본문에서는 지운다 — 남겨두면 접힌
 * 머리글과 펼친 첫 줄에 같은 문장이 두 번 나온다. 첫 줄이 제목이 아니면
 * 부제 없이 본문을 그대로 쓴다.
 */
function splitLeadingHeading(markdown: string): {
	title: string | null;
	body: string;
} {
	const m = markdown.match(/^\s*#\s+(.+?)\s*(?:\n|$)/);
	if (!m) return { title: null, body: markdown };
	return { title: m[1], body: markdown.slice(m[0].length) };
}

/**
 * 문제 페이지의 접히는 "개념 정리".
 *
 * 기본이 접힘인 것이 요점이다. 문제 페이지의 주인공은 문제이고, 개념은 필요한
 * 학생만 펼쳐 보면 된다. 펼친 채로 두면 이미 아는 학생에게는 문제까지 가는
 * 길이 길어지고, 에디터가 있는 오른쪽 칸과 높이가 크게 어긋난다.
 *
 * 여는 동작과 생김새는 `/problems` 목록의 주제 섹션(`TopicSection`)과 같게 뒀다.
 * 같은 화면군에서 접히는 것이 두 가지 방식으로 열리면 그것부터 배워야 한다.
 */
export default function TheorySection({ markdown }: { markdown: string }) {
	const [open, setOpen] = useState(false);
	const { title, body } = splitLeadingHeading(markdown);

	return (
		<section className="mt-10 overflow-hidden rounded-md border">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-accent"
			>
				<ChevronRight
					className={`size-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
					aria-hidden
				/>
				<span className="shrink-0 font-medium">개념 정리</span>
				{title && (
					<span className="min-w-0 text-sm text-muted-foreground">{title}</span>
				)}
			</button>

			{open && (
				<div className="border-t px-4 py-5">
					{/* 본문 크기를 문제 설명과 맞춘다. ChatMarkdown 기본값은 채팅
					    말풍선용이라 제목이 본문과 같은 크기로 나온다.

					    표는 ChatMarkdown 기본값이 `w-full` 이라 좁은 화면에서
					    넘치지는 않지만 칸이 짜부라진다. 호제법 표는 4칸이라
					    320px 에서 한 칸이 60px 도 안 된다. `block` +
					    `overflow-x-auto` 로 바꿔 넘치는 대신 가로 스크롤되게
					    한다 — CLAUDE.md 가 요구하는 "넘치더라도 스크롤 컨테이너
					    안" 이 이 경우다. */}
					<ChatMarkdown
						content={body}
						className="text-lg leading-[1.8] [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_li]:my-1 [&_p]:my-4 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0 [&_table]:block [&_table]:w-max [&_table]:max-w-full [&_table]:overflow-x-auto"
					/>
				</div>
			)}
		</section>
	);
}
