import { SideBarTreeItem } from "@/components/commons/SideBarItems";

export const spaceshipCaptainTree: SideBarTreeItem[] = [
  {
    kind: "folder",
    name: "프로젝트 설정하기",
    files: [
      {
        kind: "file",
        name: "uv 설치",
        url: "/spaceshipCaptain/setup#uv_setup",
      },
      {
        kind: "file",
        name: "uv 실행",
        url: "/spaceshipCaptain/setup#uv_init",
      },
      {
        kind: "file",
        name: "pygame-ce 설치하기",
        url: "/spaceshipCaptain/setup#pygame-ce",
      },
      {
        kind: "file",
        name: "main.py: 파이게임 초기화",
        url: "/spaceshipCaptain/setup#pygame-init",
      },
      {
        kind: "file",
        name: "main.py: display_surface",
        url: "/spaceshipCaptain/setup#display_surface",
      },
      {
        kind: "file",
        name: "main.py: while 루프",
        url: "/spaceshipCaptain/setup#while-setup",
      },
      {
        kind: "file",
        name: "main.py: 이벤트",
        url: "/spaceshipCaptain/setup#event",
      },
      {
        kind: "file",
        name: "결과 확인하기",
        url: "/spaceshipCaptain/setup#result",
      },
    ],
  },

  {
    kind: "folder",
    name: "surface 이해하기",
    files: [
      {
        kind: "file",
        name: "창: display",
        url: "/spaceshipCaptain/surface/#display",
      },
      {
        kind: "file",
        name: "창 제목: caption",
        url: "/spaceshipCaptain/surface/#caption",
      },
      {
        kind: "file",
        name: "창 업데이트: flip()",
        url: "/spaceshipCaptain/surface/#flip",
      },
      {
        kind: "file",
        name: "창 색칠하기: fill()",
        url: "/spaceshipCaptain/surface/#fill",
      },
      {
        kind: "file",
        name: "모양 추가하기: Surface()",
        url: "/spaceshipCaptain/surface/#surface",
      },
      {
        kind: "file",
        name: "결과 확인하기",
        url: "/spaceshipCaptain/surface/#result",
      },
    ],
  },
  {
    kind: "file",
    name: "색바꾸기 과제",
    url: "/spaceshipCaptain/surface_challenge",
  },
  {
    kind: "folder",
    name: "우주선 이미지",
    files: [
      {
        kind: "file",
        name: "이미지 저장하기",
        url: "/spaceshipCaptain/playerSurf#download",
      },
      {
        kind: "file",
        name: "이미지 코드",
        url: "/spaceshipCaptain/playerSurf#image_surf",
      },
      {
        kind: "file",
        name: "이미지 코드 점검",
        url: "/spaceshipCaptain/playerSurf#checkpoint1",
      },
      {
        kind: "file",
        name: "연습하기",
        url: "/spaceshipCaptain/playerSurf#practice",
      },
      {
        kind: "file",
        name: "배경 추가하기",
        url: "/spaceshipCaptain/playerSurf#addingBG",
      },
      {
        kind: "file",
        name: "Frect",
        url: "/spaceshipCaptain/playerSurf#getFrect",
      },
      {
        kind: "file",
        name: "Center Frect ",
        url: "/spaceshipCaptain/playerSurf#frectCenter",
      },
      {
        kind: "file",
        name: "Move Frect",
        url: "/spaceshipCaptain/playerSurf#moveFrect",
      },
      {
        kind: "file",
        name: "확인하기",
        url: "/spaceshipCaptain/playerSurf#result",
      },
    ],
  },
  {
    kind: "file",
    name: "우주선 이동시키기 과제",
    url: "/spaceshipCaptain/moveSpaceShipChallenge",
  },
];
