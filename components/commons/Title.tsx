import { title } from "@/app/lib/tv/commons";

type size = "h1" | "h2" | "h3"| "h4"
type weight = "light" | "semi" | "bold" 
type levels = "l" | "m" | "s" |"x"

export default function Title({my="m", mx="m", text, weight="bold", size="h1"}:{my?:levels, mx?: levels, weight?: weight,  text: string, size?: size}) {
	return (
		<div className={title({size, weight, my, mx})}>{text}</div>
	)
}
