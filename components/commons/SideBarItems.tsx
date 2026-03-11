"use client"
import { Button } from "@/components/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FileIcon, FileTextIcon, FolderIcon, FolderOpenIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Folder { name: string; files: File[]; }
interface File { name: string; url: string; }
export type SideBarTreeItem = Folder | File

export function SideBarTree({ sideBarTree }: { sideBarTree: SideBarTreeItem[] }) {
	const renderItem = (fileItem: SideBarTreeItem) => {
		const [isOpen, setIsOpen] = useState(false)
		if ("files" in fileItem) {
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
							{fileItem.files.map((child) => renderItem(child))}
						</div>
					</CollapsibleContent>
				</Collapsible>
			)
		}
		return (
			<Button
				key={fileItem.name}
				variant="link"
				size="sm"
				className="w-full justify-start text-foreground"
			>
				<Link href={fileItem.url} className="flex gap-2">
					<FileTextIcon />
					<span>{fileItem.name}</span>
				</Link>
			</Button>
		)
	}

	return (
		<div className="flex flex-col gap-1 px-3">
			{sideBarTree.map((item) => renderItem(item))}
		</div>
	)
}

