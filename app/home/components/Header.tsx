/*
	* Logo
	* 
	* */
import { blackHanSans } from "@/app/stores/font"
import Link from "next/link"


export default function Header() {
	return (
		<div 
		className={`select-none rounded-md gap-3 h-44 px-3 py-1 my-3 flex flex-col justify-center 
			items-center bg-amber-50`}>
			<div className="flex flex-col justify-center items-center">
					
				<div 
				className={
					`${blackHanSans.className} 
					hover:text-shadow-md/50 text-shadow-amber-300 text-5xl select-none
					`}>
					<Link href={"/"}> 똑똑 코딩 </Link>
				</div>
				<div> 눈으로 보고 손으로 만지면서 배우는 똑똑한 코딩 </div>
			</div>
			<div className="flex space-x-2 text-zinc-200">
				<div className="bg-blue-500 px-3 py-1 rounded-2xl hover:shadow-md hover:shadow-blue-300 ">
					<Link href={"/ddokddokboard"}> 똑똑보드 </Link>
					</div>
				<div className="bg-green-500 px-3 py-1 rounded-2xl hover:shadow-md hover:shadow-green-300">
					<Link href={"https://playentry.org"}> 엔트리 </Link>
				</div>
				<div className="bg-red-500 px-3 py-1 rounded-2xl hover:shadow-md hover:shadow-red-300">
					<Link href={"https://docs.arduino.cc"}> 아두이노 </Link>
				</div>
			</div>
		</div>
	)
}
