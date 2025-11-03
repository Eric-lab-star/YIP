"use client";
import { LoginJWTPayload, logoutAction } from "@/app/actions/loginAction";
import { notosansKorean_500 } from "@/app/stores/font";
import Link from "next/link";
import {BookImage, LogOut, BrainCircuit, FileText, Rocket, User } from "lucide-react";

export default function LoggedInUser({user}:{user:LoginJWTPayload}) {
	const { name} = user

	return <div className={`${notosansKorean_500.className} text-xs select-none grid grid-cols-3 grid-rows-2 gap-2 items-center h-44 p-3 bg-amber-50 rounded-md`}>
			<Link href={`/todo`} 
			className=" flex flex-col justify-center items-center col-span-1 h-full gap-2  rounded-md hover:bg-amber-400 hover:text-amber-50 p-2">
				<Rocket className="w-10 h-10 stroke-1 " />
				<div> {name}의 과제 </div>
			</Link>
			<Link href={`/books`}  
			className="flex flex-col gap-2 items-center justify-center col-span-1 h-full  rounded-md hover:bg-amber-400 hover:text-amber-50 p-2">
				<BookImage className="stroke-1 w-12 h-12"/>
				<div className=""> 학원 교재방 </div>
			</Link>
			<Link href={`/mindmap`} className="p-2 flex flex-col gap-2 justify-center items-center col-span-1 h-full  rounded-md hover:bg-amber-400 hover:text-amber-50" >
				<BrainCircuit className="w-12 h-12 stroke-1" />
				<div>{name}의 마인드맵 </div>
			</Link>
			<Link href={`/myPage`} className="p-2 col-span-1 gap-2 h-full  rounded-md flex-col flex justify-center items-center hover:bg-amber-400 hover:text-amber-50" >
				<User className="stroke-1 w-12 h-12"/>{name} 페이지
			</Link>
			<Link href={`/report`}  
			className="p-2 flex flex-col items-center justify-center col-span-1 gap-2 h-full  rounded-md hover:bg-amber-400 hover:text-amber-50">
				<FileText className="stroke-1 w-12	h-12"/>
				<div className=""> {name}의 보고서 </div>
			</Link>
		<div className="p-2 col-span-1 h-full  rounded-md flex flex-col justify-center gap-2 items-center hover:bg-amber-400 hover:text-amber-50" 
		onClick={async()=> await logoutAction()}> <LogOut className="w-12 h-12 stroke-1"/> 로그아웃 </div>
	</div>
}



