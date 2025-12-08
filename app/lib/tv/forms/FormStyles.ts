import { tv} from "tailwind-variants";


const inputBgLight = "bg-zinc-50"
const inputBgDark = "bg-amber-300"
const TextColor = "text-zinc-500"
const HighLightColor = "text-orange-600"
const round = "rounded-lg"
export const bg = "bg-zinc-100"
// const padSize = "3"
//
export const errorMessage = tv({
	base: "text-red-700 lg:col-start-4 lg:col-span-2 h-full  ",
	variants: {
		layout: {
			single: "lg:flex lg:items-center",
			multi: "lg:flex lg:flex-col"
		}
	},
	defaultVariants: {layout: "single"}

})

const layout = tv({
	base: "w-full"
})

const form = tv({
	base: " select-none min-w-[200px] lg:w-[1024px] mx-auto md:w-[768px] sm:w-[640px] w-[400px]"
})


const classDays= tv({
	base: "flex space-y-2 min-w-150 justify-around"
})


const classDay = tv({
	base: `w-full select-none flex justify-between items-center space-x-3 lg:grid lg:grid-cols-7`,
})

const submit = tv({
	base: ` w-full shadow-2xl  p-2 ${inputBgLight} my-3 ${round} hover:${inputBgDark} hover:text-zinc-500 hover:cursor-pointer`
})

const container = tv({
	base: "px-3 space-y-2 flex flex-col lg:grid lg:grid-cols-5 lg:gap-5 ",
	variants:{
		layout: {
			classDay: " lg:items-start"
		}
	}
})

const label = tv({
	base: `text-black text-lg lg:flex lg:items-center`,
	variants: {
		inset: {
			right:  "right-0  absolute flex items-center pr-3 inset-y-0 h-10 text-base",
			left: "left-0  absolute flex items-center pr-3 inset-y-0 h-10 text-base"
		},
		
	}
})

const input = tv({
	slots: {
		base: `${inputBgLight} border-b-2 border-zinc-500 focus:border-amber-300 focus:outline-0 placeholder:text-gray-500 placeholder:italic placeholder:text-lg text-lg   py-3  pl-3 pr-10 h-10 `,
		time: `${inputBgLight} border-b-2 border-zinc-500 focus:border-amber-300 focus:outline-0  placeholder:text-gray-500 placeholder:italic py-3  pl-3 pr-3 h-10 ${TextColor} `,
		phone: `${inputBgLight} border-b-2 border-zinc-500 focus:border-amber-300 focus:outline-0 placeholder:text-gray-500 placeholder:italic placeholder:text-lg text-lg  py-3  pl-3 pr-3 h-10 `,
		button: "border-1 border-zinc-400 p-2  bg-background hover:bg-amber-300 flex justify-center items-center select-none hover:text-zinc-50 text-zinc-800",
	},
	variants: {
		diabled: {
			true: "bg-zinc-500",
			false: "",
		},
		width: {
			"s":{
				base: "w-50",
				time: "w-15",
				phone: "w-15"
			},
			"m": {
				base: "w-100",
				phone: "w-17"
			},
			"l": {
				base: "w-150"
			},
			"f": {
				base: "w-full lg:col-span-2",
				button: "w-full"
			}
		},
	},
	defaultVariants: {
		width: "s",
	}
})

export {form, layout, classDays, classDay, submit, input, label, container };
