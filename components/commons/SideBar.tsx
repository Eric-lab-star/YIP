"use client";

import { usePathname } from 'next/navigation'
import { useLayoutCtx } from "./LayoutContexWrapper";
import Link from 'next/link';
import Title from './Title';

export default function SideBar(){
	const pathname = usePathname()
	const {isSideBarOpen} = useLayoutCtx()
	return (
		<>
			{
				isSideBarOpen && 
				<div className="w-50 bg-zinc-200">
				{
					pathname.startsWith("/pythonWebScrapper") && 
						pythonWebscrapperList.map((t, i) => (
							<div key={i} className='px-3'> 
								<Title my='m' size='h4'>{Object.keys(t)[0]}</Title> 
								<div className='flex flex-col'>
								{
									Object.values(t)[0].map(
										( tl: string[], i:number) => 
											<Link key={i} className='hover:bg-zinc-100 px-3 py-1' href={`/pythonWebScrapper/${tl[1]}`} > {tl[0]}
											</Link>
									)
								}
								</div>
							</div>
					))
					
				}
			</div>
			}
		</>
	)
}

const pythonWebscrapperList = [
	{
		"기본 문법":[
			["Day 1", "day_1"],
			["Day 2", "day_2"],
			["Day 3", "day_3"],
			["Day 4", "day_4"],
			["Day 5", "day_5"],
		],
	},
	{
		"웹사이트 제작": [
			["Day 6", "day_6"],
			["Day 7", "day_7"],
			["Day 8", "day_8"],
		]
	}
]
