"use client";

import Link from "next/link";
import Title from "./Title";
import { LogInIcon, LogOut, NotebookPen, UserRoundCog } from "lucide-react";
import useUser from "../SWR/auth/user";
import { Skeleton } from "../ui/skeleton";
import { logoutAction } from "@/app/actions/authAction";
import { redirect, usePathname } from "next/navigation";

import { IBM_Plex_Sans_KR } from "next/font/google";
import { SidebarContext, SidebarTrigger } from "../ui/sidebar";
import { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const kr_font = IBM_Plex_Sans_KR({
  weight: "700",
  style: "normal",
  subsets: ["latin", "latin-ext"],
  fallback: ["sans-serif", "arial", "system-ui"],
});
export default function Header() {
  const pathname = usePathname();
  const sidebarCtx = useContext(SidebarContext);
  const [showIcon, setShowIcon] = useState(true);

  const section = pathname.split("/")[1];
  useEffect(() => {
    switch (section) {
      case "":
      case "students":
      case "login":
      case "editor":
        sidebarCtx?.setOpen(false);
        setShowIcon(false);
        break;
      default:
        sidebarCtx?.setOpen(true);
        setShowIcon(true);
    }
  }, [section]);

  return (
    <div className="sm:h-15 shrink-0 w-full border-b  bg-white/80 sticky top-0 backdrop-blur z-50 select-none flex justify-between px-10 py-2">
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
    return (
      <div className="w-fit flex ">
        <Skeleton className="w-15 h-15  rounded-full" />
        <div className="flex flex-col justify-center space-y-2">
          <Skeleton className="w-20 h-5  rounded-md" />
          <Skeleton className="w-20 h-5 rounded-md" />
        </div>
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
            <Link href={`/students/${user.id}`}>
              <NotebookPen className="size-5 sm:size-6" strokeWidth={"1.5px"} />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className={`${kr_font.className} text-lg`}>
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
