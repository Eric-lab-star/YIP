import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { AIDeveloperCurriculum } from "@/utils/curriculum/AIDeveloper";

export const aIDeveloperTree: SideBarTreeItem[] = AIDeveloperCurriculum.map(
  ({ name, slug }) => ({
    kind: "folder",
    name,
    files: [
      { kind: "file", name: "학습 목표", url: `/AIDeveloper/${slug}/goal` },
      { kind: "file", name: "학습 슬라이드", url: `/AIDeveloper/${slug}/goal_slide` },
      { kind: "file", name: "실습 과제", url: `/AIDeveloper/${slug}/task` },
      { kind: "file", name: "실습 슬라이드", url: `/AIDeveloper/${slug}/task_slide` },
    ],
  })
);
