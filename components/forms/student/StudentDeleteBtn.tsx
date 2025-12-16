"use client";

import { Shredder } from "lucide-react";


export default function StudentDeleteBTN({id}: {id: string}) {
	return <div className="flex justify-center items-center space-x-1 p-2 bg-background border-b-amber-200 border-2">
		<Shredder className="size-4.5"/>
		<div onClick={()=>{}}>삭제하기 </div>
	</div>
}
