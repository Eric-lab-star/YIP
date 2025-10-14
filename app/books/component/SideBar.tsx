"use client";
import { notosansKorean_500 } from "@/app/stores/font"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { books } from "../utils";
import { smartFactoryPath } from "../smartFactory/utils";



export default function SideBar(
	{ className = "" }:{ className?: string }
) {
	const links: link[] = getLinks()
	return (
		<div className={` h-full w-44 flex gap-1 flex-col flex-none ${className}`}>
			<SidebarItmes links={links} />
		</div>
	)
}


function getLinks(){
	const path = usePathname()
	switch (true){
		case path.startsWith("/books/smartFactory"):
			return smartFactoryPath;
		case path.startsWith("/books"):
			return books;
		default:
			return [];
	}
}

interface link {
	path: string;
	label: string;
}

function SidebarItmes({links}: {links: link[]} ) {
	 return links.map((link) =>linkmapper(link)) 
}

function linkmapper(link: link){
	return (
		<Link key={link.path} 
		className={`${notosansKorean_500.className} text-lg rounded-md min-h-10  bg-amber-300 flex items-center justify-center `} 
		href={`${link.path}`}>
			<div className="">{link.label}</div>
		</Link>

	)
}
