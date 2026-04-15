"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '../ui/sidebar';
import Title from './Title';
import { ChevronDown, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pythonLangCurriculum } from '@/utils/sideBarTree/tourOfPythonTree';

export default function AppSideBar() {
	const pathname = usePathname();
	const section = pathname.split("/")[1]
	const title = getTitle(section)
	const sidebarItems = getSidebarItems(section)


	return (
		<Sidebar side="left">
			<SidebarHeader >
				<SidebarMenu>
					<Title size='h2'> {title} </Title>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>

				{
					sidebarItems && sidebarItems.map((item, i) => (
						<Collapsible className='group/collapsible' key={i}>
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger>
										{item.name}
										<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
									</CollapsibleTrigger>
								</SidebarGroupLabel>

								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenu>
											{item.kind == "folder" && item.files.map((v, i) => (
												<SidebarMenuItem key={v.name}>
													<SidebarMenuButton asChild isActive>
														<Link href={v.url}>{v.name}</Link>
													</SidebarMenuButton>
													<SidebarMenuAction>
														<Plus />
													</SidebarMenuAction>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					))
				}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					username
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}


function getTitle(section: string) {
	switch (section) {
		case "tourOfPython":
			return "파이썬 탐험하기"
	}
}

function getSidebarItems(section: string) {
	switch (section) {
		case "tourOfPython":
			return pythonLangCurriculum
	}

}
