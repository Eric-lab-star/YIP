import { tv } from "tailwind-variants";
import { Noto_Sans_KR } from "next/font/google";

const kr_800 = Noto_Sans_KR({weight: "800", style: "normal"})
const kr_500 = Noto_Sans_KR({weight: "500", style: "normal"})
const kr_300 = Noto_Sans_KR({weight: "300", style: "normal"})

export const text = tv({
	variants:{
		weight: {
			bold: kr_500.className,
			base: kr_300.className,
		},
		size:{
			md: "text-base",
			sm: "text-sm",
			xs: "text-xs",
		},
		my:{
			l: "my-6",
			m: "my-3",
			s: "my-1",
		},
		mx:{
			l: "mx-6",
			m: "mx-3",
			s: "mx-1",
		},

	},
	defaultVariants:{
		weight: "base",
		size: "md",
		my: "m",
		mx: "m",
	}
})


export const title = tv({
	variants:{
		size:{
			h1: "text-2xl",
			h2: "text-xl",
			h3: "text-lg",
			h4: "text-md",
		},
		weight: {
			bold: kr_800.className,
			semi: kr_500.className,
			light: kr_300.className,
		},
		my:{
			l: "my-6",
			m: "my-3",
			s: "my-1",
			x: "",
		},
		mx:{
			l: "mx-6",
			m: "mx-3",
			s: "mx-1",
			x: "",
		},

	},
	defaultVariants:{
		size: "h1",
		weight: "bold",
		my: "m",
		mx: "m",
	}
})


export const container = tv({
	variants: {
		my:{
			xl: "my-8",
			l: "my-6",
			m: "my-3",
			s: "my-1",
		},
		mx:{
			l: "mx-6",
			m: "mx-3",
			s: "mx-1",
		},
	},
	defaultVariants: {
		my: "s",
		mx: "s",
	}
})
