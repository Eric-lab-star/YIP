"use client";
import { ColumnDef } from "@tanstack/react-table";
import Text from "../Text";

interface colmn {
	title: string;
	desc: string;
}
export const editorColumns: ColumnDef<colmn>[] = [
	{
		accessorKey: "title",
		header: () => <Text weight="bold">특징</Text>,
		cell: ({row}) => <Text weight="bold">{row.getValue("title")}</Text>
	},
	{
		accessorKey: "desc",
		header: () => <Text weight="bold">설명</Text>,
		cell: ({row}) => <Text>{row.getValue("desc")}</Text>
	}
]

export const vscodeData = [
	{
		title: "무료",
		desc: "Microsoft가 만들었지만 완전 무료이고, 소스코드도 공개되어 있어요."
	},
	{
		title: "가볍고 빠름",
		desc: "무거운 IDE(IntelliJ, Eclipse 등)와 달리, 텍스트 에디터 기반이라 실행이 빠릅니다."
	},
	{
		title: "확장 프로그램",
		desc: "기본 기능은 단순하지만, 마켓플레이스에서 확장 프로그램을 설치해 원하는 기능을 추가할 수 있어요."
	},
	{
		title: "실시간 협업 가능",
		desc: "다른 사람과 같은 코드를 동시에 편집하는 기능도 지원해요."
	}
]

export const pycharmData= [
	{
		title: "강력한 분석 기능",
		desc: "타입 추론이 정확해서 자동완성 품질이 높음"
	},

	{
		title: "강력한 분석 기능",
		desc: "변수명 하나를 바꾸면 프로젝트 전체에서 관련된 곳을 자동으로 수정해줘요."
	},

	{
		title: "강력한 디버깅 기능",
		desc: "코드를 실행하면서 중간에 멈추고, 변수값을 실시간으로 확인할 수 있어요."
	},
]
