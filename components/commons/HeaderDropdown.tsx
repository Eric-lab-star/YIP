
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Editor } from "@tiptap/core";
import { Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react"
import { tv } from "tailwind-variants";

export default function HeaderDropdown({className, editor}:{className: string; editor: Editor}) {
	const handleHeaderSize= (level: 1 | 2 | 3 | 4 | 5| 6) => {
		editor.chain().focus().toggleHeading({level}).run()
	}
	return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
				<button type="button" aria-label="제목 크기" className={className}>
					<Heading strokeWidth={"2"} size={"18"}/>
				</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuLabel>제목 크기</DropdownMenuLabel>
					<div className="grid gap-1 grid-cols-3 items-center p-1">
						<button type="button" onClick={() => handleHeaderSize(1)} className={colorPallet()}>
							<Heading1 className={headings()}/>
						</button>
						<button type="button" onClick={() => handleHeaderSize(2)} className={colorPallet()}>
							<Heading2 className={headings()}/>
						</button>
						<button type="button" onClick={() => handleHeaderSize(3)} className={colorPallet()}>
							<Heading3 className={headings()}/>
						</button>
						<button type="button" onClick={() => handleHeaderSize(4)} className={colorPallet()}>
							<Heading4 className={headings()}/>
						</button>
						<button type="button" onClick={() => handleHeaderSize(5)} className={colorPallet()}>
							<Heading5 className={headings()}/>
						</button>
						<button type="button" onClick={() => handleHeaderSize(6)} className={colorPallet()}>
							<Heading6 className={headings()}/>
						</button>
					</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const colorPallet = tv({
	base: "p-1 h-9 w-full rounded-md flex justify-center items-center text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
})

const headings = tv({
	base: "",
})
