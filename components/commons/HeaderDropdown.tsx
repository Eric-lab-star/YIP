
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Editor } from "@tiptap/core";
import { Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Highlighter } from "lucide-react"
import { tv } from "tailwind-variants";

export default function HeaderDropdown({className, editor}:{className: string; editor: Editor}) {
	const handleHeaderSize= (level: 1 | 2 | 3 | 4 | 5| 6) => {
		editor.chain().focus().toggleHeading({level}).run()
	}
	return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
				<button className={className}>
					<Heading strokeWidth={"2"} size={"16"}/>
				</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35 bg-zinc-400" align="start">
          <DropdownMenuLabel className="text-zinc-200">제목 크기</DropdownMenuLabel>
					<div className="grid gap-2 grid-cols-4 items-center">
						<div onClick={() => handleHeaderSize(1)} className={colorPallet()}>
							<Heading1 className={headings()}/> 
						</div>
						<div onClick={() => handleHeaderSize(2)} className={colorPallet()}>
							<Heading2 className={headings()}/> 
						</div>
						<div onClick={() => handleHeaderSize(3)} className={colorPallet()}>
							<Heading3 className={headings()}/> 
						</div>
						<div onClick={() => handleHeaderSize(4)} className={colorPallet()}>
							<Heading4 className={headings()}/> 
						</div>
						<div onClick={() => handleHeaderSize(4)} className={colorPallet()}>
							<Heading4 className={headings()}/> 
						</div>
						<div onClick={() => handleHeaderSize(5)} className={colorPallet()}>
							<Heading5 className={headings()}/> 
						</div>
						<div onClick={() => handleHeaderSize(6)} className={colorPallet()}>
							<Heading6 className={headings()}/> 
						</div>
					</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const colorPallet = tv({
	base: "p-1 hover:bg-white bg-zinc-300 h-6 w-6 rounded-lg flex justify-center items-center"
})

const headings = tv({
	base: "",
})
