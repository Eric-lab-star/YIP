"use client";
import { notosansKorean_500 } from "@/app/stores/font"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { smartFactoryPath } from "../books/utils";


interface Ilink {
	path: string;
	label: string;
}

export default function SideBar(
	{ className = "" }:{ className?: string }
) {
	const path = usePathname()
	const links: {hide: boolean; path:Ilink[]} = getLinks(path)

	if (links.hide) {
		return <div className="hidden"></div>
	}

	return (
		<div className={` h-full  w-44 flex gap-1 flex-col flex-none ${className}`}>
			<SidebarItmes links={links.path} />
		</div>
	)
}


/**
	* getLinks function returns links
	*/
function getLinks(path: string){
	switch (true) {
		case path.startsWith("/books/smartFactory"):
			return ({hide: false, path: smartFactoryPath });
		case path.startsWith("/books"):
		default:
			return {hide: true, path: []};
	}
}


function SidebarItmes({links}: {links: Ilink[]} ) {
	 return links.map((link) =>linkmapper(link)) 
}

function linkmapper(link: Ilink){
	return (
		<Link key={link.path} 
		className={linkermapperStyle(link)} 
		href={`${link.path}`}>
			<div className="">{link.label}</div>
		</Link>

	)
}

const linkermapperStyle = (link: Ilink) => clsx(
	'px-2  min-h-10  bg-amber-300 flex items-center justify-center',
	notosansKorean_500.className,
	link.label.length >= 10 ? "text-sm": "text-base",
)
