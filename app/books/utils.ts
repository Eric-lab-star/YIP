export interface IbookPath {
	path: string;
	label: string;
	tags: string;
}

export const smartFactory: IbookPath[] = [
	{
		path: "/books/smartFactory/1",
		label: "시작하기",
		tags: "",
	}
]

export const bookPaths: IbookPath[] = [
	{
		path: "wireGame",
		label: "와이어 게임",
		tags: "basic",
	},
	{
		path: "circuit",
		label: "회로 기초",
		tags: "basic",
	},
	{
		path:"arduino",
		label:"아두이노",
		tags: "basic",
	},
	{
		path: "arduboy",
	  label: "아두보이",
		tags: "intermediate",
	},
	{
		path: "layzer",
		label: "레이저 터렛",
		tags: "intermediate",
	},
	{
		path: "moodLight",
		label: "무드등",
		tags: "intermediate",
	},
	{
		path: "smartFactory",
		label: "스마트 팩토리",
		tags: "advanced"
	}, 
	{
		path: "waterPollution",
	  label: "수질 오염",
		tags: "intermediate"
	},
]
