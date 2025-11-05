import { tv } from "tailwind-variants"

export const inputTV = tv({
	base: "p-2 bg-amber-50",
	variants: {
		size: {
			s: "w-50",
			r: "w-100",
			l: "w-150"
		}
	}
})

