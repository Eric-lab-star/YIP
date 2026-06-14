import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { AIDeveloperCurriculum } from "@/utils/curriculum/AIDeveloper";

export const aIDeveloperTree: SideBarTreeItem[] = AIDeveloperCurriculum.map(
  ({ name, slug }) => ({
    kind: "folder",
    name,
    files: [
      { kind: "file", name: "학습 목표", url: `/AIDeveloper/${slug}/goal` },
      { kind: "file", name: "실습 과제", url: `/AIDeveloper/${slug}/task` },
    ],
  })
);
