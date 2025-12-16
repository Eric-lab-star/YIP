"use client";

import { deleteStudentAction } from "@/app/actions/studentAction";
import { Shredder } from "lucide-react";


export default function StudentDeleteBTN({ id }: { id: string }) {
	return <div onClick={()=>  deleteStudentAction(id)} className="hover:bg-accent hover:text-red-600 flex justify-center items-center space-x-1 p-2 bg-background border-b-amber-200 border-2">
		<Shredder className="size-4.5"/>
		<div  className="">삭제하기 </div>
	</div>
}
