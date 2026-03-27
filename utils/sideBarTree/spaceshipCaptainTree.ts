import { SideBarTreeItem } from "@/components/commons/SideBarItems";

export const spaceshipCaptainTree: SideBarTreeItem[] = [
	{
		name: "프로젝트 설정하기",
		files: [
			{
				name: "uv 설치",
				url: "/spaceshipCaptain/setup#uv_setup"
			},
			{
				name: "uv 실행",
				url: "/spaceshipCaptain/setup#uv_init"
			},
			{
				name: "pygame-ce 설치하기",
				url: "/spaceshipCaptain/setup#pygame-ce"
			},
			{
				name: "main.py: 파이게임 초기화",
				url: "/spaceshipCaptain/setup#pygame-init",
			},
			{
				name: "main.py: display_surface",
				url: "/spaceshipCaptain/setup#display_surface",
			},
			{
				name: "main.py: while 루프",
				url: "/spaceshipCaptain/setup#while-setup",
			},
			{
				name: "main.py: 이벤트",
				url: "/spaceshipCaptain/setup#event"
			},
			{
				name: "결과 확인하기",
				url: "/spaceshipCaptain/setup#result",
			}
		]
	},

	{
		name: "surface 이해하기",
		files: [
			{
				name: "창: display",
				url: "/spaceshipCaptain/surface/#display"
			},
			{
				name: "창 제목: caption",
				url: "/spaceshipCaptain/surface/#caption"
			},
			{
				name: "창 업데이트: flip()",
				url: "/spaceshipCaptain/surface/#flip"
			},
			{
				name: "창 색칠하기: fill()",
				url: "/spaceshipCaptain/surface/#fill"
			},
			{
				name: "모양 추가하기: Surface()",
				url: "/spaceshipCaptain/surface/#surface"
			},
			{
				name: "결과 확인하기",
				url: "/spaceshipCaptain/surface/#result"
			},

		],
	},
	{
		name: "색바꾸기 과제",
		url: "/spaceshipCaptain/surface_challenge",
	},
	{
		name: "우주선 조종하기",
		files: [
			{
				name: "이미지 가져오기",
				url: "/spaceshipCaptain/playerSurf",

			}
		],
	}

]
