import { text as textStyle } from '@/app/lib/tv/commons';


type size = "md"| "sm"| "xs"
type levels = "l" | "m" | "s" | "x"
type weight = "bold" | "base"

export default function Text({style, weight="base", my="x", mx="m", children,  size="md"}:{style?: string, weight?: weight, my?:levels, mx?: levels,  children: React.ReactNode, size?: size}) {
	return (
		<div className={textStyle({size, my, mx, weight, class: style})}>{children}</div>
	)
}
