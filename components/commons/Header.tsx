"use client";

import Link from "next/link";
import Title from "./Title";
import { LogInIcon, NotebookPen, UserRoundCog } from "lucide-react";
import useUser from "../SWR/auth/user";
import { Skeleton } from "../ui/skeleton";
import { logoutAction } from "@/app/actions/authAction";
import { Button } from "../ui/button";
import { redirect, usePathname } from "next/navigation";

import { IBM_Plex_Sans_KR } from "next/font/google";
import { SidebarContext, SidebarTrigger } from "../ui/sidebar";
import { useContext, useEffect, useState } from "react";

const kr_font = IBM_Plex_Sans_KR({
	weight: "700",
	style: "normal",
	subsets: ['latin', 'latin-ext'],
	fallback: ["sans-serif", "arial", "system-ui"],
})
export default function Header() {
	const pathname = usePathname()
	const sidebarCtx = useContext(SidebarContext)
	const [showIcon, setShowIcon] = useState(true)

	const section = pathname.split("/")[1]
	useEffect(() => {
		switch (section) {
			case "":
			case "students":
			case "login":
				sidebarCtx?.setOpen(false)
				setShowIcon(false)
				break;
			default:
				sidebarCtx?.setOpen(true)
				setShowIcon(true)

		}
	}, [section])

	return (
		<div className="px-3 h-20 w-full bg-accent  select-none flex justify-between">
			<div className="flex space-x-2 items-center">
				{showIcon && <SidebarTrigger className="" />}
				<Link className="" href={"/"}>
					<Title style="">불안 걱정말고 Just Do It</Title>
				</Link>
			</div>
			<UserProfile />
		</div>
	)
}

function UserProfile() {
	const { user, isLoading, userMutate } = useUser()

	const handleLogout = async () => {
		await logoutAction();
		userMutate();
		redirect("/")
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
			<div className=" flex gap-2 justify-center items-center ">
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
						<Link className="" href={`/login`}>
							<LogInIcon size={30} strokeWidth={"2px"} />
						</Link>)

				}
			</div>

		)
	}
}
