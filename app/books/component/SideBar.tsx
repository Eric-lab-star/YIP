"use client";
import { notosansKorean_500 } from "@/app/stores/font"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smartFactoryPath } from "../smartFactory/utils";



export default function SideBar(
	{ className = "" }:{ className?: string }
) {
	const path = usePathname()
	const links: link[] = getLinks(path)
	if (path == "/books") {
		return <div className="hidden"></div>
	}
	return (
		<div className={` h-full  w-44 flex gap-1 flex-col flex-none ${className}`}>
			<SidebarItmes links={links} />
		</div>
	)
}


function getLinks(path: string){
	switch (true){
		case path.startsWith("/books/smartFactory"):
			return smartFactoryPath;
		case path.startsWith("/books"):
			return [];
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
		className={`${notosansKorean_500.className} px-2 ${link.label.length >= 10 ? "text-sm": "text-base"} min-h-10  bg-amber-300 flex items-center justify-center `} 
		href={`${link.path}`}>
			<div className="">{link.label}</div>
		</Link>

	)
}
