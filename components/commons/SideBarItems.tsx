"use client";
import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FileTextIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Folder {
  kind: "folder";
  name: string;
  files: SideBarTreeItem[];
}
interface FileItem {
  kind: "file";
  name: string;
  url: string;
}

export type SideBarTreeItem = Folder | FileItem;

export function SideBarTree({
  sideBarTree,
}: {
  sideBarTree: SideBarTreeItem[];
}) {
  return (
    <div className="flex flex-col gap-1 px-3">
      {sideBarTree.map((item, i) => (
        <TreeItem key={item.name + (i + 1)} fileItem={item} />
      ))}
    </div>
  );
}

const stripHash = (url: string) => url.split("#")[0].replace(/\/$/, "");

/** True if any descendant file of this tree points at the current page. */
function containsActivePath(item: SideBarTreeItem, pathname: string): boolean {
  if ("files" in item) {
    return item.files.some((child) => containsActivePath(child, pathname));
  }
  return stripHash(item.url) === pathname;
}

function TreeItem({ fileItem }: { fileItem: SideBarTreeItem }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";

  if ("files" in fileItem) {
    return <FolderItem key={fileItem.name} fileItem={fileItem} />;
  }

  const isActive = stripHash(fileItem.url) === pathname;

  return (
    <Button
      variant="link"
      size="sm"
      className={cn(
        "w-full justify-start text-foreground",
        isActive && "font-bold text-amber-500 no-underline"
      )}
      asChild
    >
      <Link
        key={fileItem.name}
        href={fileItem.url}
        aria-current={isActive ? "page" : undefined}
      >
        {fileItem.name.endsWith(".py") ? (
          <FontAwesomeIcon icon={faPython} color="gray" size={"sm"} />
        ) : (
          <FileTextIcon />
        )}
        <span>{fileItem.name}</span>
      </Link>
    </Button>
  );
}

function FolderItem({ fileItem }: { fileItem: Folder }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const hasActive = containsActivePath(fileItem, pathname);
  const [isOpen, setIsOpen] = useState(hasActive);

  // Auto-open (never auto-close) the folder holding the current lesson,
  // including after client-side navigation.
  useEffect(() => {
    if (hasActive) setIsOpen(true);
  }, [hasActive]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} key={fileItem.name}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
        >
          {isOpen ? (
            <FolderOpenIcon className="mr-2" />
          ) : (
            <FolderIcon className="mr-2" />
          )}
          <div>{fileItem.name}</div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 ml-5 ">
        <div className="flex flex-col gap-1">
          {fileItem.files.map((item) => (
            <TreeItem key={item.name} fileItem={item} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
