import { tv } from "tailwind-variants";

export default function HorizontalLine({ my }: { my?: "s" | "m" | "l" }) {
	const s = style({ my: my ? my : "m" })

	return (
		<div className={s} />
	)
}

const style = tv({
	base: "border-b-zinc-400 border-b-2 border-dashed",
	variants: {
		my: {
			"s": "my-3",
			"m": "my-10",
			"l": "my-20",
		}

	},
	defaultVariants: { my: "m" }
})


