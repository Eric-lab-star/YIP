import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { buildLessonPages } from "@/utils/curriculum/pageSequence";
import { tourOfPythonCurriculum } from "@/utils/curriculum/tourOfPython";

/**
 * 사이드바 트리. AIDeveloper / PublicDataViz 와 똑같이 커리큘럼 배열에서
 * 파생시킨다 — 챕터당 goal / goal_slide / task / task_slide 네 줄.
 *
 * `legacyPages` 를 든 챕터는 대신 그 페이지들을 링크한다. 지금은 해당하는
 * 챕터가 없지만, 새 챕터를 4종이 갖춰지기 전에 먼저 등록할 때 쓰는 길이다.
 */
export const pythonLangCurriculum: SideBarTreeItem[] = tourOfPythonCurriculum.map(
	({ name, slug, legacyPages }): SideBarTreeItem => ({
		kind: "folder",
		name,
		files: legacyPages
			? legacyPages.map((page) => ({
					kind: "file" as const,
					name: page.name,
					url: page.url,
				}))
			: [
					{ kind: "file", name: "학습 목표", url: `/tourOfPython/${slug}/goal` },
					{
						kind: "file",
						name: "학습 슬라이드",
						url: `/tourOfPython/${slug}/goal_slide`,
					},
					{ kind: "file", name: "실습 과제", url: `/tourOfPython/${slug}/task` },
					{
						kind: "file",
						name: "실습 슬라이드",
						url: `/tourOfPython/${slug}/task_slide`,
					},
				],
	}),
);

/** Flat prev/next sequence for the Tour of Python lessons (see buildLessonPages). */
export const tourOfPythonPages = buildLessonPages(pythonLangCurriculum, {
	url: "/tourOfPython",
	label: "소개",
});
