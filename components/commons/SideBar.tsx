"use client";

import { usePathname } from 'next/navigation'
import { useLayoutCtx } from "./LayoutContexWrapper";
import Link from 'next/link';
import Title from './Title';

export default function SideBar(){
	const pathname = usePathname()
	console.log(pathname.startsWith("/pythonWebScrapper"))
	const {isSideBarOpen} = useLayoutCtx()
	return (
		<>
			{
				isSideBarOpen && 
				<div className="w-50 bg-zinc-200">
				{
					pathname.startsWith("/pythonWebScrapper") && 
						pythonWebscrapperList.map((t) => (
							<Link key={t[0]} href={`/pythonWebScrapper/${t[1]}`}>
								<Title style='hover:bg-zinc-100 py-2 px-5' size='h2'> {t[0]} </Title>
							</Link>
					))
					
				}
			</div>
			}
		</>
	)
}

const pythonWebscrapperList = [
	["Day 1", "day_1"],
	["Day 2", "day_2"],
	["Day 3", "day_3"],
	["Day 4", "day_4"],
	["Day 5", "day_5"],
	["Day 6", "day_6"],
	["Day 7", "day_7"],
	["Day 8", "day_8"],
]
