"use client";

import { usePathname } from 'next/navigation'
import { useLayoutCtx } from "./LayoutContexWrapper";
import Link from 'next/link';
import Title from './Title';
import { Baby, Globe } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function SideBar(){
	const pathname = usePathname()
	const {isSideBarOpen} = useLayoutCtx()
	console.log(pathname.split("/")[1])
	const items = sidebarItems(pathname.split("/")[1])
	return (
		<>
			{
				isSideBarOpen && 
				<div className="w-50 bg-zinc-200">
					{items}

				</div>
			}
		</>
	)
}

function sidebarItems(pathname: string) {
	let item = null
	switch (pathname) {
		case "pythonWebScrapper":
			item  = pythonWebscrapperList.map((t, i) => (
							<div key={i} className='px-3'> 
								<Title style='flex space-x-2' my='m' size='h4'> 
									{icons[i]} <div>{Object.keys(t)[0]}</div>
									</Title> 
								<div className='flex flex-col'>
								{
									Object.values(t)[0].map(
										( tl: string[], i:number) => 
											<Link key={i} className='hover:bg-zinc-100 px-3 py-1' href={`/pythonWebScrapper/${tl[1]}`} > {tl[0]}
											</Link>
									)
								}
								</div>
							</div>))
				break;
		case "students":
			item = mypageList.map(v => (
				<div className='px-3' key={v.id}>
					<Title style='flex space-x-2' my='m' size='h4'>{v.title}</Title>
				</div>
		))
			break;
		default:
			item = null
	}
	return item

}




const icons = [
	<Baby strokeWidth={2} color='#8470e6'/>,
	<Globe strokeWidth={2} color='#24cc8b'/>,
]

const pythonWebscrapperList = [
	{
		"기본 문법":[
			["변수와 함수", "day_1"],
			["조건문", "day_2"],
			["반복문", "day_3"],
			["자료구조", "day_4"],
			["졸업 과제 만들기", "day_5"],
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

const mypageList = [
	{
		title: "기억보다 기록",
		id: uuidv4()
	},
]
