"use client";

import Link from "next/link";
import Title from "./Title";
import {
	Gamepad2,
	LogInIcon,
	LogOut,
	MessageCircleIcon,
	NotebookPen,
	UserRoundCog,
} from "lucide-react";
import useUser from "../SWR/auth/user";
import { Skeleton } from "../ui/skeleton";
import { logoutAction } from "@/app/actions/authAction";
import { redirect, usePathname } from "next/navigation";

import { SidebarContext, SidebarTrigger } from "../ui/sidebar";
import { sidebarOpenFor } from "./SidebarShell";
import { useContext, useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
	const pathname = usePathname();
	const sidebarCtx = useContext(SidebarContext);

	// Derived, not stateful: `showIcon` used to start at `true` and be corrected
	// in an effect, so routes without a sidebar rendered the trigger for one
	// frame. SidebarShell decides the same thing from the same pathname, so the
	// server and the first client render already agree.
	const shouldOpen = sidebarOpenFor(pathname);
	const showIcon = shouldOpen;

	// Only for client-side navigation. On first load the provider was already
	// initialised to `shouldOpen`, so this is a no-op and nothing shifts; moving
	// between sections still opens/closes the sidebar as before.
	useEffect(() => {
		sidebarCtx?.setOpen(shouldOpen);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldOpen]);

	return (
		<div className="sm:h-15 shrink-0 w-full border-b-[2.5px] border-foreground bg-[#fffdf7]/85 sticky top-0 backdrop-blur z-50 select-none flex justify-between px-10 py-2">
			<div className="flex space-x-2 items-center">
				{showIcon && <SidebarTrigger className="" />}
				<Link className="hidden sm:block" href={"/"}>
					<Title style="text-md sm:text-xl sm:inline-block">
						놀면 뭐 하니,
					</Title>
					<Title style="text-md sm:text-xl sm:inline-block sm:px-2">
						그냥 하는거야.
					</Title>
				</Link>
			</div>
			<UserProfile />
		</div>
	);
}

function UserProfile() {
	const { user, isLoading, userMutate } = useUser();

	const handleLogout = async () => {
		await logoutAction();
		userMutate();
		redirect("/");
	};

	if (isLoading) {
		// Must occupy the same height as the resolved state below, otherwise the
		// whole page jumps when /api/auth/user lands. The header is only height-
		// locked from `sm` up (`sm:h-15`), so on phones its height came straight
		// from this placeholder: measured at 390px, the old avatar-plus-two-lines
		// skeleton made the header 87.5px against a settled 42.5px, and the 45px
		// collapse was the single largest layout shift on the site (CLS 0.142 on
		// mobile, reproduced in 6/6 Lighthouse runs).
		//
		// A single 20px bar matches the settled icon row exactly — both render the
		// header at 42.5px — and it also describes the real UI better than an
		// avatar placeholder, since no avatar is ever shown here.
		return (
			<div className="pr-3 flex gap-2 justify-center items-center">
				<Skeleton className="h-5 w-24 rounded-md" />
			</div>
		);
	} else {
		return (
			<div className="pr-3 flex gap-2 justify-center items-center ">
				{user?.success && (
					<>
						{user.role === "admin" && (
							<Link href={`/dashBoard`}>
								<UserRoundCog
									className="size-5 sm:size-6"
									strokeWidth={"1.5px"}
								/>
							</Link>
						)}
						<Link href={`/games/vamsurlike`} aria-label="뱀서라이크 게임">
							<Gamepad2 className="size-5 sm:size-6" strokeWidth={"1.5px"} />
						</Link>
						<Link href={`/chat`}>
							<MessageCircleIcon
								className="size-5 sm:size-6"
								strokeWidth={"1.5px"}
							/>
						</Link>

						<Link href={`/students/${user.id}`}>
							<NotebookPen className="size-5 sm:size-6" strokeWidth={"1.5px"} />
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className="text-lg font-bold cursor-pointer">
									{user.name}
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-10" align="end">
								<DropdownMenuItem>
									<div
										className="flex justify-between items-center w-full"
										onClick={handleLogout}
									>
										<div className="text-sm font-medium text-zinc-800">
											로그아웃
										</div>
										<LogOut color={"black"} size={12} />
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				)}
				{user?.success === false && (
					<Link className="size-5 sm:size-6" href={`/login`}>
						<LogInIcon size={30} strokeWidth={"2px"} />
					</Link>
				)}
			</div>
		);
	}
}
