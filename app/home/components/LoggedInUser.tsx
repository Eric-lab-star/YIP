"use client";
import Book from "@/app/components/Book";
import Docs from "@/app/components/Docs";
import { LoginJWTPayload, logoutAction } from "@/app/lib/actions";
import { blackHanSans } from "@/app/stores/font";
import Link from "next/link";

export default function LoggedInUser({user}:{user:LoginJWTPayload}) {
	const {userId, name} = user

	return <div className={`${blackHanSans.className} text-sm select-none grid grid-cols-3 grid-rows-2  gap-3  items-center h-44 p-3 bg-amber-50 rounded-md`}>
		<div className="text-sm col-span-1 h-full rounded-md bg-amber-400">
			<Link href={`/todo/${userId}`} >
			{name} 오늘의 과제
			</Link>
			</div>
			<Link href={`/report/${userId}`}  
			className="flex flex-col items-center justify-center col-span-1 h-full bg-amber-300 rounded-md">
				<Book className="stroke-1 w-24 h-24"/>
				<div className=""> 교재방 </div>
			</Link>
		<div className="col-span-1 h-full bg-amber-300 rounded-md"> 
			<Link href={`/mindmap/${userId}`} >
				마인드맵
			</Link>
		</div>
		<div className="col-span-1 h-full bg-amber-300 rounded-md">
			<Link href={`/mypage/${userId}`} >
			 마이 페이지
			</Link>
		</div>
			<Link href={`/report/${userId}`}  
			className="flex flex-col items-center justify-center col-span-1 h-full bg-amber-300 rounded-md">
				<Docs className="stroke-1 w-24 h-24"/>
				<div className=""> {name} 보고서 </div>
			</Link>
		<div className="col-span-1 h-full bg-amber-300 rounded-md" 
		onClick={async()=> await logoutAction()}> 로그아웃 </div>
	</div>
}



