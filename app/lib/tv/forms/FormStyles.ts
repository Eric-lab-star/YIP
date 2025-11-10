import { tv} from "tailwind-variants";

const inputBgLight = "bg-amber-200"
const inputBgDark = "bg-amber-300"
const bg = "bg-amber-100"
// const padSize = "3"

const layout = tv({
	base: "w-full"
})

const form = tv({
	base: bg
})


const classDays= tv({
	base: "flex space-y-2 min-w-150 justify-around"
})


const classDay = tv({
	base: `p-1 w-15 h-12  rounded-2xl select-none flex justify-center items-center hover:${inputBgDark} `,
	variants: {
		click: {
			false: `${inputBgLight} text-zinc-500`,
			true: `${inputBgDark} text-zinc-100`,
		}
 },
})

const submit = tv({
	base: ` w-full shadow-2xl  p-2 ${inputBgLight} my-3 rounded-2xl hover:${inputBgDark} hover:text-zinc-500 hover:cursor-pointer`
})

const container = tv({
	base: "px-3 space-y-2 flex flex-col"
})

const label = tv({
	base: `text-black text-lg`,
	variants: {
		inset: {
			right:  "right-0  absolute flex items-center pr-3 inset-y-0 h-10 text-base",
			left: "left-0  absolute flex items-center pr-3 inset-y-0 h-10 text-base"
		},
		
	}
})

const input = tv({
	slots: {
		base: `${inputBgLight} rounded-xl placeholder:text-gray-500 placeholder:italic focus:outline-2 focus:outline-blue-400  pl-3 pr-10 h-10 `,
	},
	variants: {
		width: {
			"s":{
				base: "w-50"
			},
			"m": {
				base: "w-100"
			},
			"l": {
				base: "w-150"
			},
			"f": {
				base: "w-full"
			}
		},
		round: {
			true: {
				base: "rounded-xl"
			},
			false: {
				base: ""
			}
		}
	},
	defaultVariants: {
		width: "s",
		round: true,
	}
})

export {form, layout, classDays, classDay, submit, input, label, container };
