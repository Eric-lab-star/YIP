"use client";
import { StudentData } from "@/types";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";


const colums: ColumnDef<StudentData>[] = [
	{
		accessorKey: "name",
		header: () => <div className="font-extrabold pl-5 text-left">이름</div>,
		cell: ({ row }) => <div className="pl-5 text-left">{row.getValue("name")}</div>
	},
	{
		accessorKey: "studentPhoneNumber",
		header: () => <div className="font-extrabold text-center">전화번호</div>,
		cell: ({ row }) =>{
			const {studentPhoneNumber} = row.original
			return (
				<div className="text-center">
					{studentPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1 - $2 - $3")}
				</div>
			)}
	},
	{
		accessorKey: "role",
		header: () => <div className="font-extrabold pr-5 text-right">권한</div>,
		cell: ({ row }) => <div className="pr-5 text-right">{row.getValue("role")}</div>
	}
]


export default function StudentsTable({ students }: { students: StudentData[] }) {
	return (
		<div className="container mx-auto">
			<DataTable columns={colums} data={students} />

		</div>
	)
}
