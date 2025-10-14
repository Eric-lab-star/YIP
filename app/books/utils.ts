export interface IbookPath {
	path: string;
	label: string;
	tags?: string;
}


export const books: IbookPath[] = [
	{
		path: "/books/wireGame",
		label: "와이어 게임",
		tags: "basic",
	},
	{
		path: "/books/circuit",
		label: "회로 기초",
		tags: "basic",
	},
	{
		path:"/books/arduino",
		label:"아두이노",
		tags: "basic",
	},
	{
		path: "/books/arduboy",
	  label: "아두보이",
		tags: "intermediate",
	},
	{
		path: "/books/layzer",
		label: "레이저 터렛",
		tags: "intermediate",
	},
	{
		path: "/books/moodLight",
		label: "무드등",
		tags: "intermediate",
	},
	{
		path: "/books/smartFactory",
		label: "스마트 팩토리",
		tags: "advanced"
	}, 
	{
		path: "/books/waterPollution",
	  label: "수질 오염",
		tags: "intermediate"
	},
]

