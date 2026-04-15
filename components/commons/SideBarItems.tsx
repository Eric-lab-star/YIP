"use client"
import { Button } from "@/components/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FileTextIcon, FolderIcon, FolderOpenIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Folder { kind: "folder"; name: string; files: FileItem[]; }
interface FileItem { kind: "file"; name: string; url: string; }

export type SideBarTreeItem = Folder | FileItem

export function SideBarTree({ sideBarTree }: { sideBarTree: SideBarTreeItem[] }) {
	return (
		<div className="flex flex-col gap-1 px-3">
			{sideBarTree.map((item, i) => <TreeItem key={item.name + (i + 1)} fileItem={item} />)}
		</div>
	)
}



function TreeItem({ fileItem }: { fileItem: SideBarTreeItem }) {
	if ("files" in fileItem) {
		return (
			<FolderItem key={fileItem.name} fileItem={fileItem} />
		)
	}

	return (
		<Button
			variant="link"
			size="sm"
			className="w-full justify-start text-foreground"
			asChild
		>
			<Link key={fileItem.name} href={fileItem.url} className="">
				<FileTextIcon />
				<span>{fileItem.name}</span>
			</Link>
		</Button>
	)
}

function FolderItem({ fileItem }: { fileItem: Folder }) {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} key={fileItem.name}>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
				>
					{isOpen ? <FolderOpenIcon className="mr-2" /> : <FolderIcon className="mr-2" />}
					<div>{fileItem.name}</div>
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="mt-1 ml-5 ">
				<div className="flex flex-col gap-1">
					{fileItem.files.map((item) => <TreeItem key={item.name} fileItem={item} />)}
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}
