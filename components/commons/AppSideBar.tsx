"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "../ui/sidebar";
import Title from "./Title";
import { usePathname } from "next/navigation";
import { pythonLangCurriculum } from "@/utils/sideBarTree/tourOfPythonTree";
import { spaceshipCaptainTree } from "@/utils/sideBarTree/spaceshipCaptainTree";
import { SideBarTree } from "./SideBarItems";
import { aIDeveloperTree } from "@/utils/sideBarTree/AIDeveloperTree";
import ChatRoomList from "./ChatRoomList";
import Link from "next/link";

export default function AppSideBar() {
  const pathname = usePathname();
  const section = pathname.split("/")[1];

  if (section === "chat") {
    return (
      <Sidebar side="left" variant={"floating"}>
        <SidebarContent className="pb-50">
          <ChatRoomList />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  const title = getTitle(section);
  const sidebarItems = getSidebarItems(section);

  return (
    <Sidebar side="left" variant={"floating"}>
      <SidebarHeader>
        <SidebarMenu>
          <Link href={`/${section}`}>
            <Title size="h2"> {title} </Title>
          </Link>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pb-50">
        {sidebarItems && <SideBarTree sideBarTree={sidebarItems} />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function getTitle(section: string) {
  switch (section) {
    case "tourOfPython":
      return "파이썬 탐험하기";
    case "spaceshipCaptain":
      return "우주의 수호자";
    case "AIDeveloper":
      return "인공 지능 입문";
  }
}

function getSidebarItems(section: string) {
  switch (section) {
    case "tourOfPython":
      return pythonLangCurriculum;
    case "spaceshipCaptain":
      return spaceshipCaptainTree;
    case "AIDeveloper":
      return aIDeveloperTree;
  }
}
