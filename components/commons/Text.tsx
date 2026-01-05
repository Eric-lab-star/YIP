import { text as textStyle } from '@/app/lib/tv/commons';


type size = "md"| "sm"| "xs"
type levels = "l" | "m" | "s"
type weight = "bold" | "base"

export default function Text({weight="base", my="m", mx="m", text,  size="md"}:{weight?: weight, my?:levels, mx?: levels,  text: string, size?: size}) {
	return (
		<div className={textStyle({size, my, mx, weight})}>{text}</div>
	)
}
