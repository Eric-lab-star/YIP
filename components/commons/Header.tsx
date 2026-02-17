"use client";

import Link from "next/link";
import Title from "./Title";
import { NotebookPen, PanelLeftClose, PanelLeftOpen} from "lucide-react";
import { useLayoutCtx } from "./LayoutContexWrapper";
import useUser from "../SWR/auth/user";
import { Skeleton } from "../ui/skeleton";
import { logoutAction } from "@/app/actions/authAction";
import { Noto_Sans_KR } from "next/font/google";
import { Button } from "../ui/button";
const kr_font = Noto_Sans_KR({weight: "700", style: "normal"})



export default function Header() {
	const {isSideBarOpen, setIsSideBarOpen} = useLayoutCtx()
	const handleSideBar = () => {
		setIsSideBarOpen(!isSideBarOpen)
	}

	return (
		<div className="px-3 h-15 w-full bg-zinc-200 select-none flex justify-between">
			<div className="flex space-x-2 items-center">
				<button onClick={handleSideBar} className="p-2 hover:bg-zine-400 rounded-full text-zinc-800 hover:text-zinc-500">
					{
						isSideBarOpen ? 
							<PanelLeftClose/>
							: <PanelLeftOpen />

					}
				</button>
				<Link className="" href={"/"}>
					<Title>YIP</Title>
				</Link>
			</div>
			<UserProfile />
		</div>
	)
}

function UserProfile() {
	const {user, isLoading, userMutate} = useUser()
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
			<div className="flex justify-center items-center ">
				{user?.success &&
					<>
						<Link href={`/students/${user.id}`}>
							<NotebookPen size={40} strokeWidth={"1px"}/>
						</Link>
						<div className=" w-20 flex justify-center flex-col items-center">
							<div className={`${kr_font.className} text-lg`}>{user.name}</div>
							<Button size={"xs"} className="hover:animate-pulse" onClick={handleLogout}> 로그아웃</Button>
						</div>
					</>
				}
			</div>
			
		)
	}
}




