"use client";
import { notosansKorean_500 } from "@/app/stores/font";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({className = ""}:{className?: string}) {
	const title = setTitle();
	

	return (
		<Link href={"/books"} 
		className={
			`${notosansKorean_500.className} 
			${className}
			my-3 text-2xl grow-0`}>
			<div>{title}</div>
		</Link>
	)
}

function setTitle(){
	const path = usePathname();
	switch (path) {
		case "/books/smartFactory":
			return "스마트 팩토리"	
		case "/books/wireGame":
			return "와이어 게임"
		case "/books/layzer":
			return "레이저 터렛";
		case "/books/circuit":
			return "회로";
		case "/books/moodLight":
			return "무드등";
		case "/books/waterPollution":
			return "수질 오염"
		case "/books/arduino":
			return "아두이노"
		case "/books":
			return "교재방"
		default:
			return "YIP 코딩"
	}
}
