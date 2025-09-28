/*
	* Logo
	* 
	* */
import { Black_Han_Sans } from "next/font/google" 
import Link from "next/link"

const blackHandSans = Black_Han_Sans({weight: "400"})

export default function Header() {
	return (
		<div 
		className="select-none border-2 h-44 px-3 py-1 my-3 flex flex-col justify-center items-center">
			<div 
			className={
				`${blackHandSans.className} 
				hover:text-shadow-md/40 text-shadow-zinc-50 text-5xl select-none`}>
				<Link href={"/"}> 똑똑 코딩 </Link>
			</div>
			<div className="flex space-x-2 text-zinc-200">
				<div className="bg-blue-500 px-3 py-1 rounded-2xl hover:shadow-md ">
					<Link href={"/ddokddokboard"}> 똑똑보드 </Link>
					</div>
				<div className="bg-green-500 px-3 py-1 rounded-2xl hover:shadow-md">
					<Link href={"https://playentry.org"}> 엔트리 </Link>
				</div>
				<div className="bg-red-500 px-3 py-1 rounded-2xl hover:shadow-md">
					<Link href={"https://docs.arduino.cc"}> 아두이노 </Link>
				</div>
			</div>
		</div>
	)
}
