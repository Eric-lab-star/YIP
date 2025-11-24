import { tv} from "tailwind-variants";

const inputBgLight = "bg-amber-200"
const inputBgDark = "bg-amber-300"
const TextColor = "text-zinc-500"
const HighLightColor = "text-orange-600"
const round = "rounded-lg"
const bg = "bg-amber-100"
// const padSize = "3"
//
export const errorMessage = tv({
	base: "text-red-700"
})

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
	base: `w-full  h-12  ${round} select-none flex justify-between items-center space-x-2 `,
})

const submit = tv({
	base: ` w-full shadow-2xl  p-2 ${inputBgLight} my-3 ${round} hover:${inputBgDark} hover:text-zinc-500 hover:cursor-pointer`
	
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
		base: `${inputBgLight} ${round} placeholder:text-gray-500 placeholder:italic placeholder:text-lg text-lg focus:outline-2 focus:outline-blue-400 py-3  pl-3 pr-10 h-10 `,
		time: `${inputBgLight} ${round} placeholder:text-gray-500 placeholder:italic focus:outline-2 focus:outline-blue-400 py-3  pl-3 pr-3 h-10 ${TextColor} `,
	},
	variants: {
		width: {
			"s":{
				base: "w-50",
				time: "w-15"
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
	},
	defaultVariants: {
		width: "s",
	}
})

export {form, layout, classDays, classDay, submit, input, label, container };
