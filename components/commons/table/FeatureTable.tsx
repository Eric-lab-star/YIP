"use client";
import { ColumnDef } from "@tanstack/react-table";
import Text from "../Text";

interface colmn {
	title: string;
	desc: string;
}
export const vscodeColumns: ColumnDef<colmn>[] = [
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
		desc: "vscode는 무료로 사용할 수 있는 IDE입니다. 유료버전인 vscode pro도 있지만 일반적으로는 무료버전을 많이 사용합니다."
	}
]
