import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { RaspberryPiCurriculum } from "../curriculum/RapberryPi";

export const raspberryPiTree: SideBarTreeItem[] = RaspberryPiCurriculum.map(
  ({ name, slug }) => ({
    kind: "folder",
    name,
    files: [
      { kind: "file", name: "학습하기", url: `/RaspberryPi/${slug}/goal` },
      { kind: "file", name: "실습하기", url: `/RaspberryPi/${slug}/task` },
    ],
  }),
);
