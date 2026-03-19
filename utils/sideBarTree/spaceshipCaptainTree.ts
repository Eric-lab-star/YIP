import { SideBarTreeItem } from "@/components/commons/SideBarItems";

export const spaceshipCaptainTree: SideBarTreeItem[] = [
	{
		name: "프로젝트 설정하기",
		files: [
			{
				name: "uv 설치",
				url: "/spaceshipCaptain/setup#uv"
			},
			{
				name: "pygame 설치",
				url: "/spaceshipCaptain/setup#pygame"
			},
			{
				name: "실행하기",
				url: "/spaceshipCaptain/setup#run"
			},
		]
	},

	{
		name: "pygame 화면 만들기",
		files: [
			{
				name: "무한 루프 만들기",
				url: "/spaceshipCaptain/displaySurface/#while"
			}
		],
	}

]
