import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { PublicDataVizCurriculum } from "@/utils/curriculum/PublicDataViz";

export const publicDataVizTree: SideBarTreeItem[] = PublicDataVizCurriculum.map(
	({ name, slug }) => ({
		kind: "folder",
		name,
		files: [
			{ kind: "file", name: "학습 목표", url: `/PublicDataViz/${slug}/goal` },
			{ kind: "file", name: "학습 슬라이드", url: `/PublicDataViz/${slug}/goal_slide` },
			{ kind: "file", name: "실습 과제", url: `/PublicDataViz/${slug}/task` },
			{ kind: "file", name: "실습 슬라이드", url: `/PublicDataViz/${slug}/task_slide` },
		],
	})
);
