export interface Lesson {
  /** Sidebar display name */
  name: string;
  /** Folder name under app/spaceshipCaptain/ */
  slug: string;
  /** Short description shown in metadata */
  description: string;
}

/**
 * Space Ship Captain, restructured to the four-route shape the AIDeveloper
 * curriculum uses (goal / goal_slide / task / task_slide).
 *
 * The old layout was 17 single long pages whose sidebar entries were ~90 links
 * to in-page anchors (`/setup#uv_setup`). Five of those pages were exercises
 * with no concept half (`surface_challenge`, `moveSpaceShipChallenge`,
 * `classExcerciseLevel1..3`, `backgroundClass`) and two were concept with no
 * exercise, so this is a regrouping rather than a 1:1 split: each exercise page
 * is folded into the `task` of the chapter that teaches it.
 *
 * The `source_code/*` reference dumps are not lessons and stay outside this
 * list — spaceshipCaptainTree appends them as their own folder.
 */
export const spaceshipCaptainCurriculum: Lesson[] = [
  {
    name: "프로젝트 설정하기",
    slug: "setup",
    description:
      "uv로 파이게임 프로젝트를 만들고, 창이 뜨는 main.py까지 직접 작성해보자냥!",
  },
  {
    name: "surface 이해하기",
    slug: "surface",
    description:
      "화면을 그리는 도화지 surface의 개념을 배우고, 창 색과 모양을 직접 바꿔보자냥!",
  },
  {
    name: "우주선 이미지 띄우기",
    slug: "playerSurf",
    description:
      "이미지를 surface로 불러오고 Frect로 위치를 다루며 우주선을 화면에 올려보자냥!",
  },
  {
    name: "FPS와 Vector",
    slug: "FPSAndVector",
    description:
      "벡터로 방향을 다루고 FPS·델타타임으로 컴퓨터마다 같은 속도가 되게 만들어보자냥!",
  },
  {
    name: "방향키로 움직이기",
    slug: "keyboardInput",
    description:
      "pygame.key로 키보드 입력을 받고, 벡터를 정규화해서 대각선 속도까지 맞춰보자냥!",
  },
  {
    name: "클래스: 개념과 연습",
    slug: "class",
    description:
      "클래스·인스턴스·상속의 개념을 익히고 레벨 1~3 문제로 손에 붙여보자냥!",
  },
  {
    name: "Sprite 클래스",
    slug: "spriteClass",
    description:
      "파이게임의 Sprite와 Group을 배우고 Player 클래스로 우주선을 다시 만들어보자냥!",
  },
  {
    name: "모듈과 패키지",
    slug: "moduleNPackage",
    description:
      "길어진 main.py를 모듈과 패키지로 나누고, 배경 클래스까지 직접 분리해보자냥!",
  },
  {
    name: "미사일 클래스",
    slug: "missileClass",
    description:
      "미사일 클래스를 만들고 스페이스바로 발사해서 우주선에 공격을 붙여보자냥!",
  },
  {
    name: "운석 클래스",
    slug: "meteorClass",
    description:
      "타이머 이벤트로 운석을 계속 만들어내고, 화면 밖 운석을 정리해 최적화해보자냥!",
  },
  {
    name: "충돌 처리하기",
    slug: "collision",
    description:
      "spritecollide로 우주선과 운석, 미사일과 운석의 충돌을 판정해보자냥!",
  },
  {
    name: "게임 오버와 재시작",
    slug: "gameOver",
    description:
      "HUD 클래스로 점수와 게임 오버를 표시하고 재시작까지 붙여 게임을 완성해보자냥!",
  },
];
