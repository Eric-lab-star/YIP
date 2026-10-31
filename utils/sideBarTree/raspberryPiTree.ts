import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { RaspberryPiCurriculum } from "../curriculum/RapberryPi";

// 1차시는 실습 대신 라즈베리파이로 만든 프로젝트를 소개한다.
const PROJECTS_CHAPTER = "what_is_raspberryPi";

export const raspberryPiTree: SideBarTreeItem[] = RaspberryPiCurriculum.map(
  ({ name, slug }) => ({
    kind: "folder",
    name,
    files: [
      { kind: "file", name: "학습하기", url: `/RaspberryPi/${slug}/goal` },
      { kind: "file", name: "확인하기", url: `/RaspberryPi/${slug}/check` },
      slug === PROJECTS_CHAPTER
        ? {
            kind: "file",
            name: "프로젝트 둘러보기",
            url: `/RaspberryPi/${slug}/projects`,
          }
        : { kind: "file", name: "실습하기", url: `/RaspberryPi/${slug}/task` },
    ],
  }),
);
