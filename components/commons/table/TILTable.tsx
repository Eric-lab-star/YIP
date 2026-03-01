"use client";

import { tv } from "tailwind-variants";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";


interface post {
	title: string;
	date: string;
	index: number;
	id: string;
}

const cell = tv({
	base: "",
	variants: {
		align: {
			left: "pl-5 text-left",
			center: "text-center",
			right: "pr-5 text-right",
		}
	},
	defaultVariants: {
		align: "center"
	}
})

const header = tv({
	base: "font-extrabold",
	variants: {
		align: {
			left: "pl-5 text-left",
			center: "text-center",
			right: "pr-5 text-right",
		}
	},
	defaultVariants: {
		align: "center"
	}
})


const colums: ColumnDef<post>[] = [
	{
		accessorKey: "index",
		header: () => <div className={header({align: "left"})}>번호</div>,
		cell: ({row}) => <div className={cell({align: "left"})}>{row.getValue("index")}</div>
	},
	{ 
		accessorKey: "title",
		header: ()=> <div className={header({align: "center"})}>제목</div>,
		cell: ({row}) => <Link href={`/editor/${row.original.id}`}> <div className={cell({align: "center"})}>{row.getValue("title")}</div> </Link>
	},
	{ 
		accessorKey: "date",
		header: () => <div className={header({align: "right"})}>날짜</div>,
		cell: ({row}) => <div className={cell({align: "right"})}>{row.getValue("date")}</div>
	},
]

export default function TILTable({posts}: {posts: {id: string; title: string; createdAt: Date}[]}) {
	const filtered = posts.map((v,i) => ({id: v.id, index: i + 1, title: v.title, date: v.createdAt.toLocaleDateString("ko-kr")}))
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={colums} data={filtered}/>
		</div>
	)
}

