import { SideBarTreeItem } from "@/components/commons/SideBarItems";

export const aIDeveloperTree: SideBarTreeItem[] = [
  {
    kind: "folder",
    name: "Jupyter NoteBook",
    files: [
      {
        kind: "file",
        name: "학습 목표",
        url: "/AIDeveloper/noteBook/goal",
      },
      {
        kind: "file",
        name: "실습 과제",
        url: "/AIDeveloper/noteBook/task",
      },
    ],
  },
];
