"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import ChatMarkdown from "@/components/commons/ChatMarkdown";
import { doodleBox, palette } from "@/components/mdx/doodle";

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

// Callout 의 `goal`(학습 목표)과 같은 하늘색 조합이다. 개념 안내라는 뜻이
// 강의 페이지의 색 약속과 어긋나지 않게 맞췄다.
const TINT = "#E6F4FB";
const BORDER = palette.sky;

/**
 * 문제 페이지의 접히는 "개념 정리".
 *
 * 기본이 접힘인 것이 요점이다. 문제 페이지의 주인공은 문제이고, 개념은 필요한
 * 학생만 펼쳐 보면 된다. 펼친 채로 두면 이미 아는 학생에게는 문제까지 가는
 * 길이 길어지고, 에디터가 있는 오른쪽 칸과 높이가 크게 어긋난다.
 *
 * 처음에는 `/problems` 목록의 주제 섹션과 같은 회색 실선 테두리였는데, 긴 문제
 * 설명 아래에 놓이니 **눈에 띄지 않아 학생이 그냥 지나쳤다.** 그래서 이 페이지가
 * 예시 테스트 카드에 쓰는 손그림 상자(`doodleBox`)에 하늘색 톤을 입히고, 제목을
 * 예시 테스트 제목과 같은 크기로 키우고, 오른쪽에 "펼치기" 를 눌러야 할 것으로
 * 보이게 뒀다. 접힌 상태가 화면에서 하나의 덩어리로 읽히는 것이 목적이다.
 *
 * 펼친 본문은 흰 종이 위에 둔다. 5,000px 넘는 글 전체에 색을 깔면 읽기 힘들다.
 */
export default function TheorySection({ markdown }: { markdown: string }) {
	const [open, setOpen] = useState(false);
	const { title, body } = splitLeadingHeading(markdown);

	return (
		<section
			className="mt-10 overflow-hidden"
			style={{ ...doodleBox, borderColor: BORDER }}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors"
				style={{ backgroundColor: TINT }}
			>
				<BookOpen
					className="size-6 shrink-0"
					style={{ color: BORDER }}
					aria-hidden
				/>

				<span className="min-w-0 flex-1">
					<span className="block text-xl leading-tight font-bold">
						개념 정리
					</span>
					{title && (
						<span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
							{title}
						</span>
					)}
				</span>

				{/* 펼칠 수 있다는 것을 글자로도 말해 준다. 삼각형만으로는 긴 설명
				    아래에서 그냥 장식으로 지나간다. */}
				<span
					className="flex shrink-0 items-center gap-1 text-sm font-bold"
					style={{ color: BORDER }}
				>
					{open ? "접기" : "펼치기"}
					<ChevronDown
						className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
						aria-hidden
					/>
				</span>
			</button>

			{open && (
				<div
					className="px-5 py-6"
					style={{ borderTop: `2px dashed ${BORDER}` }}
				>
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
