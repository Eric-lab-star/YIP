"use client";

import Link from "next/link";
import Title from "./Title";
import { LogInIcon, NotebookPen, PanelLeftClose, PanelLeftOpen, UserRoundCog } from "lucide-react";
import { useLayoutCtx } from "./LayoutContexWrapper";
import useUser from "../SWR/auth/user";
import { Skeleton } from "../ui/skeleton";
import { logoutAction } from "@/app/actions/authAction";
import { Noto_Sans_KR } from "next/font/google";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const kr_font = Noto_Sans_KR({ weight: "700", style: "normal" })



export default function Header() {
	const pathname = usePathname()
	const { isSideBarOpen, setIsSideBarOpen } = useLayoutCtx()
	const handleSideBar = () => {
		setIsSideBarOpen(!isSideBarOpen)
	}
	const [showSideBarIcon, setSideBarIcon] = useState(true)

	useEffect(() => {
		switch (true) {
			case pathname === "/":
			case pathname === "/login":
			case pathname.startsWith("/students"):
				setSideBarIcon(false)
				setIsSideBarOpen(false)
				break;
			default:
				setSideBarIcon(true)
		}
	}, [pathname])

	return (
		<div className="px-3 h-15 w-full  bg-linear-to-r from-[#0f172a] via-[#1e3a5f] to-[#0f172a] select-none flex justify-between">
			<div className="flex space-x-2 items-center">
				{
					showSideBarIcon && <button onClick={handleSideBar} className="p-2 hover:bg-zine-400 rounded-full text-white hover:text-zinc-500">
						{
							isSideBarOpen ?
								<PanelLeftClose strokeWidth={"1.3px"} />
								: <PanelLeftOpen strokeWidth={"1.3px"} />
						}
					</button>
				}
				<Link className="" href={"/"}>
					<Title style="text-white">YIP</Title>
				</Link>
			</div>
			<UserProfile />
		</div>
	)
}

function UserProfile() {
	const { user, isLoading, userMutate } = useUser()
	console.log(user)

	const handleLogout = async () => {
		await logoutAction();
		userMutate();
	}

	if (isLoading) {
		return (
			<div className="w-fit flex ">
				<Skeleton className="w-15 h-15  rounded-full" />
				<div className="flex flex-col justify-center space-y-2">
					<Skeleton className="w-20 h-5  rounded-md" />
					<Skeleton className="w-20 h-5 rounded-md" />
				</div>
			</div>
		)
	} else {
		return (
			<div className="text-white flex gap-2 justify-center items-center ">
				{user?.success &&
					<>
						{user.role === "admin" &&
							<Link href={`/dashBoard`}>
								<UserRoundCog size={30} strokeWidth={"1.5px"} />
							</Link>
						}
						<Link href={`/students/${user.id}`}>
							<NotebookPen size={30} strokeWidth={"1.5px"} />
						</Link>
						<div className=" w-20 flex justify-center flex-col items-center">
							<div className={`${kr_font.className} text-lg`}>{user.name}</div>
							<Button size={"xs"} className="hover:animate-pulse" onClick={handleLogout}> 로그아웃</Button>
						</div>
					</>
				}
				{
					user?.success === false && (
						<Link className="text-white" href={`/login`}>
							<LogInIcon size={30} strokeWidth={"2px"} />
						</Link>)

				}
			</div>

		)
	}
}




