"use client";
import { StudentData } from "@/types";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ko } from 'date-fns/locale'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilePenLineIcon, MoreHorizontal, Trash2Icon, UserRound } from "lucide-react";
import { WithId } from "mongodb";
import Link from "next/link";
import { deleteStudentAction } from "@/app/actions/studentAction";

const koDatesTable = {
	mon: "월요일",
	tue: "화요일",
	wed: "수요일",
	thur: "목요일",
	fri: "금요일",
	sat: "토요일",
	sun: "일요일",
}

const koClassTable = {
	python: "파이썬",
	bridge: "도브",
	hd_class: "수업",
	research: "연구"
}

const colums: ColumnDef<StudentTableData>[] = [
	{
		accessorKey: "name",
		header: () => <div className="font-extrabold pl-5 text-left">이름</div>,
		cell: ({ row }) => <div className="pl-5 text-left">{row.getValue("name")}</div>
	},
	{
		accessorKey: "class",
		header: () => <div className="font-extrabold pl-5 text-center">수업 일정</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{row.original.class && row.original.class.map(
					(v, i) => <div className="flex justify-center gap-2" key={i}>
						<div>{koClassTable[v.title as keyof typeof koClassTable]}</div>
						<div>{koDatesTable[v.day as keyof typeof koDatesTable]}</div>
						<div className="flex gap-1">
							<div>{v.startTime}</div>
							<div>~</div>
							<div>{v.endTime}</div>
						</div>
					</div>
				)}
			</div>
		)

	},
	{
		accessorKey: "studentPhoneNumber",
		header: () => <div className="font-extrabold text-center">전화번호</div>,
		cell: ({ row }) => {
			const { studentPhoneNumber } = row.original
			return (
				<div className="text-center">
					{studentPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1 - $2 - $3")}
				</div>
			)
		}
	},
	{
		accessorKey: "birthday",
		header: () => <div className="font-extrabold text-center">생년월일</div>,
		cell: ({ row }) => <div className="text-center">{row.getValue("birthday") ? format(row.getValue("birthday"), "yy/MM/dd", { locale: ko }) : "x"}</div>

	},
	{
		id: "actions",
		cell: ({ row }) => {
			const student = row.original
			student._id
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem asChild>
							<Link href={`/students/${student._id}`}>
								<UserRound />
								학생 페이지
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href={`/dashBoard/${student._id}`}>
								<FilePenLineIcon />
								정보 수정
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={async () => deleteStudentAction(student._id)}>
							<Trash2Icon />
							삭제
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	}
]

type StudentTableData = { _id: string } & StudentData

export default function StudentsTable({ students }: { students: StudentTableData[] }) {
	return (
		<div className="container mx-auto">
			<DataTable options={{ btn: true, height: "h-fit" }} columns={colums} data={students} />
		</div>
	)
}
