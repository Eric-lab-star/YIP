import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { AlgorithmCurriculum } from "@/utils/curriculum/Algorithm";

/**
 * Only the two MDX pages each chapter actually ships. AIDeveloper additionally
 * lists `goal_slide` / `task_slide`; those are separate .tsx decks, so linking
 * them here before they exist would put dead entries in the sidebar.
 */
export const algorithmTree: SideBarTreeItem[] = AlgorithmCurriculum.map(
  ({ name, slug }) => ({
    kind: "folder",
    name,
    files: [
      { kind: "file", name: "개념 배우기", url: `/Algorithm/${slug}/goal` },
      { kind: "file", name: "직접 풀어보기", url: `/Algorithm/${slug}/task` },
    ],
  })
);
