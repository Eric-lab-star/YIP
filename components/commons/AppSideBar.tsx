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

export default function AppSideBar() {
	const pathname = usePathname();
	const section = pathname.split("/")[1];
	const title = getTitle(section);
	const sidebarItems = getSidebarItems(section);

	return (
		<Sidebar side="left" variant={"floating"}>
			<SidebarHeader>
				<SidebarMenu>
					<Title size="h2"> {title} </Title>
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
	}
}

function getSidebarItems(section: string) {
	switch (section) {
		case "tourOfPython":
			return pythonLangCurriculum;
		case "spaceshipCaptain":
			return spaceshipCaptainTree;
	}
}
