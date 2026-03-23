"use client";

import { usePathname } from 'next/navigation'
import { useLayoutCtx } from "./LayoutContexWrapper";
import { SideBarTree, SideBarTreeItem } from './SideBarItems';
import Title from './Title';
import { useEffect, useState } from 'react';
import useUser from '../SWR/auth/user';
import { pythonLangCurriculum } from '@/utils/sideBarTree/tourOfPythonTree';
import { spaceshipCaptainTree } from '@/utils/sideBarTree/spaceshipCaptainTree';
import Link from 'next/link';

export default function SideBar() {
	const pathname = usePathname()
	const root = pathname.split("/")[1]
	const { isSideBarOpen } = useLayoutCtx()
	const [items, setItems] = useState<SideBarTreeItem[]>([])
	const { userMutate } = useUser()

	useEffect(() => {
		userMutate()
		setItems(itemSelector(root))
	}, [pathname])

	const [title, setTitle] = useState("")

	useEffect(() => {
		setTitle(titleSelector(root))
	}, [root])


	return (
		<>
			{
				isSideBarOpen &&
				<div className=" w-65 bg-zinc-200 overflow-y-scroll">
					<Link href={`/${root}`}>
						<Title size='h2' my='m' mx={"m"} weight='semi'>{title} </Title>
					</Link>
					<SideBarTree sideBarTree={items} />
				</div>
			}
		</>
	)
}

const titleSelector = (root: string) => {
	switch (root) {
		case "students":
			return "My Info"
		case "tourOfPython":
			return "Tour of Python"
		case "login":
			return "Login"
		case "spaceshipCaptain":
			return "Spaceship Captain"
		default:
			return ""
	}

}

const itemSelector = (path: string) => {
	switch (path) {
		case "tourOfPython":
			return pythonLangCurriculum
		case "students":
			return studentPage
		case "spaceshipCaptain":
			return spaceshipCaptainTree
		case "login":
			return []
		default:
			return []
	}
}



const studentPage: SideBarTreeItem[] = [
]


