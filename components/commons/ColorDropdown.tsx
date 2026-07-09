
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Editor } from "@tiptap/core";
import { Ban, Highlighter } from "lucide-react"
import { tv } from "tailwind-variants";

export default function ColorDropDown({className, editor}:{className: string; editor: Editor}) {
	const handleColor = (color: string) => {
		editor.chain().focus().toggleHighlight({color}).run()
	}
	const unsetColor = () => {
		editor.chain().focus().unsetHighlight().run()
	}
	return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button type="button" aria-label="형광펜" className={className}><Highlighter strokeWidth={"2"} size={"18"}/> </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>형광펜</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-auto" align="start">
          <DropdownMenuLabel>형광펜</DropdownMenuLabel>
					<div className="grid grid-cols-5 items-center gap-1 p-1">
						<button type="button" onClick={() => handleColor("oklch(80.8% 0.114 19.571)")} className={colorPallet()}>
							<div className={colorIcon({color: "red"})}/>
						</button>
						<button type="button" onClick={() => handleColor("oklch(80.9% 0.105 251.813)")} className={colorPallet()}>
							<div className={colorIcon({color: "blue"})}/>
						</button>
						<button type="button" onClick={() => handleColor("oklch(87.1% 0.15 154.449)")} className={colorPallet()}>
							<div className={colorIcon({color: "green"})}/>
						</button>
						<button type="button" onClick={() => handleColor("oklch(90.5% 0.182 98.111)")} className={colorPallet()}>
							<div className={colorIcon({color: "yellow"})}/>
						</button>
						<button type="button" onClick={() => unsetColor()} className={colorPallet({ban: true})}>
							<Ban className={"text-zinc-500"} strokeWidth="2.5px" />
						</button>
					</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const colorPallet = tv({
	base: "p-1 h-8 w-8 rounded-md flex justify-center items-center hover:bg-zinc-100 transition-colors",
	variants: {
		ban:{
			true: "",
			false: "",
		}
	},

	defaultVariants: {
		ban: false
	}
})

const colorIcon = tv({
	base: "h-5 w-5 bg-white rounded-full border border-zinc-200",
	variants: {
		color: {
			red: "bg-red-300",
			blue: "bg-blue-300",
			green: "bg-green-300",
			yellow: "bg-yellow-300",
		}
	}
})
