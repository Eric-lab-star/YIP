import { tv, VariantProps } from "tailwind-variants";

const formtv = tv({
	base: "bg-amber-100 pt-3 flex justify-center items-center space-y-1 flex-col"
})


const dayContainertv= tv({
	base: "flex min-w-150 justify-around"
})


const day = tv({
	base: "p-1 w-15 h-12  rounded-2xl select-none flex justify-center items-center ",
	variants: {
		click: {
			false: "bg-zinc-200 text-zinc-500",
			true: "bg-amber-300 text-zinc-200",
		}
 },
})

const submittv = tv({
	base: "w-150 shadow-2xl  p-2 bg-amber-50 mb-2 rounded-2xl"
})


const inputtv = tv({
	base: "p-2 bg-amber-50",
	variants: {
		size: {
			s: "w-50",
			r: "w-100",
			l: "w-150"
		},
	},
})

export {formtv, dayContainertv, day, submittv, inputtv };
