
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
      <DropdownMenuTrigger asChild>
				<button className={className}><Highlighter strokeWidth={"2"} size={"16"}/> </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 bg-zinc-400" align="start">
          <DropdownMenuLabel className="text-zinc-200">형광팬</DropdownMenuLabel>
					<div className="grid grid-cols-4 items-center">
						<div onClick={() => handleColor("oklch(80.8% 0.114 19.571)")} className={colorPallet()}>
							<div className={colorIcon({color: "red"})}/> 
						</div>
						<div onClick={() => handleColor("oklch(80.9% 0.105 251.813)")} className={colorPallet()}>
							<div className={colorIcon({color: "blue"})}/> 
						</div>
						<div onClick={() => handleColor("oklch(87.1% 0.15 154.449)")} className={colorPallet()}>
							<div className={colorIcon({color: "green"})}/> 
						</div>
						<div onClick={() => handleColor("oklch(90.5% 0.182 98.111)")} className={colorPallet()}>
							<div className={colorIcon({color: "yellow"})}/> 
						</div>
						<div onClick={() => unsetColor()} className={colorPallet({ban: true})}>
							<Ban className={"text-white"}  strokeWidth="2.5px" /> 
						</div>
					</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const colorPallet = tv({
	base: "p-1 hover:bg-zinc-100 rounded-lg flex justify-center items-center",
	variants: {
		ban:{
			true: "hover:bg-zinc-500",
			false: "",
		} 
	},

	defaultVariants: {
		ban: false
	}
})

const colorIcon = tv({
	base: "h-5 w-5 bg-white rounded-full",
	variants: {
		color: {
			red: "bg-red-300",
			blue: "bg-blue-300",
			green: "bg-green-300",
			yellow: "bg-yellow-300",
		}
	}
})
