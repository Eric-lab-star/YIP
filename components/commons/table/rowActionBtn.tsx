"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function RowActionBtn({id}: {id: string}) {
	return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
            >
							<Link href={`/editor/edit/${id}`}>
              수정하기
							</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> console.log("delete")}>삭제하기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
	)
}
