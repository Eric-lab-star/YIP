"use client";

import LoginForm from "./LoginForm";

export default function AccountInfo() {
	
	return(
		<div className={`flex flex-col space-y-3 lg:col-span-2 lg:order-last md:order-first rounded-md
			p-2 md:mb-3 lg:mb-0 `}>
			<LoginForm />
			<div className="bg-amber-50 h-50 w-full rounded-md p-3"> 달력 </div>
			<div className="bg-amber-50 h-50 w-full rounded-md p-3"> 뉴스  </div>
			<div className="bg-amber-50 h-50 w-full rounded-md p-3"> 지식 / 교육 영상 </div>
			<div className="bg-amber-50 h-50 w-full rounded-md p-3">  상담 문의 </div>
		</div>
	)
}


