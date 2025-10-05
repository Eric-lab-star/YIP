"use client";
import { LoginJWTPayload, logoutAction } from "@/app/lib/actions";

/* 
	*  블로그
	* 교재 
	* 출석
	* 마인드맵 
	* 발표 
	* 로그아웃 
	* */
export default function LoggedInUser({user}:{user:LoginJWTPayload}) {
	return <div className=" grid grid-cols-3 grid-rows-2  gap-3  items-center h-44 p-3 bg-amber-50 rounded-md">
		<div className="col-span-1 h-full rounded-md bg-amber-400">오늘의 과제</div>	
		<div className="flex flex-col col-span-1 p-3 h-full bg-amber-300 rounded-md">
			교재방
		</div>
		<div className="col-span-1 h-full bg-amber-300 rounded-md"> 마인드 맵 </div>
		<div className="col-span-1 h-full bg-amber-300 rounded-md"> 개인화면 </div>
		<div className="col-span-1 h-full bg-amber-300 rounded-md"> 보고서 </div>
		<div className="col-span-1 h-full bg-amber-300 rounded-md" 
		onClick={async()=> await logoutAction()}> 로그아웃 </div>
	</div>
}
