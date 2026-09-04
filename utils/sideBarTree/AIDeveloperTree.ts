import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { AIDeveloperCurriculum } from "@/utils/curriculum/AIDeveloper";

/**
 * 최종 프로젝트의 실습은 10차시짜리라 한 장에 담으면 너무 길다. 여섯 장으로
 * 나누고 사이드바에도 그대로 펼친다 — 목록에서 "지금 몇 번째 장"인지 보이지
 * 않으면, 나눠 놓아도 학생은 여전히 길을 잃는다.
 *
 * `/task` 는 지우지 않고 여섯 장을 안내하는 목차로 남겼다. 나머지 챕터와 링크
 * 모양이 같아야 하고, 이미 이 주소를 열어 둔 사람이 404 를 보지 않는다.
 */
const FINAL_PROJECT_PARTS: { name: string; slug: string }[] = [
  { name: "실습 1 · 기획 1", slug: "plan1" },
  { name: "실습 2 · 기획 2", slug: "plan2" },
  { name: "실습 3 · 제작 1", slug: "build1" },
  { name: "실습 4 · 제작 2", slug: "build2" },
  { name: "실습 5 · 중간 점검", slug: "review" },
  { name: "실습 6 · 발표와 회고", slug: "present" },
];

export const aIDeveloperTree: SideBarTreeItem[] = AIDeveloperCurriculum.map(
  ({ name, slug }) => ({
    kind: "folder",
    name,
    files: [
      { kind: "file", name: "학습 목표", url: `/AIDeveloper/${slug}/goal` },
      { kind: "file", name: "학습 슬라이드", url: `/AIDeveloper/${slug}/goal_slide` },
      ...(slug === "FinalProject_guide"
        ? [
            {
              kind: "file" as const,
              name: "실습 과제 (목차)",
              url: `/AIDeveloper/${slug}/task`,
            },
            ...FINAL_PROJECT_PARTS.map((p) => ({
              kind: "file" as const,
              name: p.name,
              url: `/AIDeveloper/${slug}/task/${p.slug}`,
            })),
          ]
        : [
            {
              kind: "file" as const,
              name: "실습 과제",
              url: `/AIDeveloper/${slug}/task`,
            },
          ]),
      { kind: "file", name: "실습 슬라이드", url: `/AIDeveloper/${slug}/task_slide` },
    ],
  })
);
