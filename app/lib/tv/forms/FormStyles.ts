import { orbit } from "@/app/stores/font";
import { tv} from "tailwind-variants";

const layout = tv({
	base: "w-full bg-blue-200"
})

const form = tv({
	base: "bg-amber-100"
})


const dayContainertv= tv({
	base: "flex space-y-2 min-w-150 justify-around"
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
	base: "w-full shadow-2xl  p-2 bg-amber-50 my-2 rounded-2xl"
})

const container = tv({
	base: "space-y-2 flex flex-col"
})

const label = tv({
	base: `${orbit.className} text-black text-lg`,
	variants: {
		inset: {
			right:  "right-0  absolute flex items-center pr-3 inset-y-0 h-10 text-base",
			left: "left-0  absolute flex items-center pr-3 inset-y-0 h-10 text-base"
		}
	}
})

const input = tv({
	slots: {
		base: "placeholder:text-gray-500 placeholder:italic focus:outline-2 focus:outline-blue-400 bg-amber-200 p-3 h-10  ",
		birth: "bg-amber-200 rounded-xl h-10 pl-3 pr-10 placeholder:italic",
	},
	variants: {
		fonts: {
			"orbit": {
				"base": `${orbit.className}`
			},
		},
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
		fonts: "orbit"
	}
})

export {form, layout, dayContainertv, day, submittv, input, label, container };
