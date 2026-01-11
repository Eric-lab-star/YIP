import { title } from "@/app/lib/tv/commons";

type size = "h1" | "h2" | "h3"| "h4"
type weight = "light" | "semi" | "bold" 
type levels = "l" | "m" | "s" |"x"

interface Title {
	my?:levels,
	mx?: levels,
	weight?: weight,
	children: React.ReactNode,
	size?: size
}

export default function Title({my="x", mx="x", children, weight="bold", size="h1"}: Title) {
	return (
		<div className={title({size, weight, my, mx})}>{children}</div>
	)
}
