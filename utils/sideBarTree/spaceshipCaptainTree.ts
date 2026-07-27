import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { spaceshipCaptainCurriculum } from "@/utils/curriculum/spaceshipCaptain";
import { buildLessonPages } from "@/utils/curriculum/pageSequence";

/**
 * Reference dumps of the finished project. Not lessons, so they are not part of
 * spaceshipCaptainCurriculum — they hang off the end of the sidebar as their
 * own folder, exactly as they did before the restructure.
 */
const sourceCode: SideBarTreeItem = {
  kind: "folder",
  name: "모든 코드 확인하기",
  files: [
    {
      kind: "file",
      name: "main.py",
      url: "/spaceshipCaptain/source_code/main",
    },
    {
      kind: "file",
      name: "settings.py",
      url: "/spaceshipCaptain/source_code/settings",
    },
    {
      kind: "folder",
      name: "entity",
      files: [
        {
          kind: "file",
          name: "player.py",
          url: "/spaceshipCaptain/source_code/entity/player",
        },
        {
          kind: "file",
          name: "bg.py",
          url: "/spaceshipCaptain/source_code/entity/bg",
        },
        {
          kind: "file",
          name: "hud.py",
          url: "/spaceshipCaptain/source_code/entity/hud",
        },
        {
          kind: "file",
          name: "meteor.py",
          url: "/spaceshipCaptain/source_code/entity/meteor",
        },
        {
          kind: "file",
          name: "missile.py",
          url: "/spaceshipCaptain/source_code/entity/missile",
        },
      ],
    },
  ],
};

/** Same four-route folder per chapter that aIDeveloperTree builds. */
export const spaceshipCaptainTree: SideBarTreeItem[] = [
  ...spaceshipCaptainCurriculum.map<SideBarTreeItem>(({ name, slug }) => ({
    kind: "folder",
    name,
    files: [
      {
        kind: "file",
        name: "학습 목표",
        url: `/spaceshipCaptain/${slug}/goal`,
      },
      {
        kind: "file",
        name: "학습 슬라이드",
        url: `/spaceshipCaptain/${slug}/goal_slide`,
      },
      {
        kind: "file",
        name: "실습 과제",
        url: `/spaceshipCaptain/${slug}/task`,
      },
      {
        kind: "file",
        name: "실습 슬라이드",
        url: `/spaceshipCaptain/${slug}/task_slide`,
      },
    ],
  })),
  sourceCode,
];

/** Flat prev/next sequence for the Space Ship Captain lessons. */
export const spaceshipCaptainPages = buildLessonPages(spaceshipCaptainTree, {
  url: "/spaceshipCaptain",
  label: "소개",
});
