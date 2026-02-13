"use client";

import Link from "next/link";

import Title from "./Title";
import { Menu } from "lucide-react";
import { useLayoutCtx } from "./LayoutContexWrapper";
import { useAuthCtx } from "./AuthProvider";

export default function Header() {
	const {isSideBarOpen, setIsSideBarOpen} = useLayoutCtx()
	const handleSideBar = () => {
		setIsSideBarOpen(!isSideBarOpen)
	}
	const auth = useAuthCtx()

	return (
		<div className="h-15 w-full bg-zinc-200 py-2 px-3 flex justify-between">
			<div className="flex space-x-2 items-center">
				<div onClick={handleSideBar} className="p-2 hover:bg-zine-400 rounded-full text-zinc-800 hover:text-zinc-500">
					<Menu />
				</div>
				<Link className="select-none" href={"/"}>
					<Title> YIP Coding </Title>
				</Link>
			</div>
			<div className=" w-100 h-full">
				<div>{auth.name}</div>
				<div>{auth.id}</div>
			</div>
		</div>
	)
}
