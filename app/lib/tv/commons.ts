import { tv } from "tailwind-variants";

import { IBM_Plex_Sans_KR } from "next/font/google";

const kr = IBM_Plex_Sans_KR(
	{
		weight: "400",
		style: "normal",
		subsets: ['latin', 'latin-ext'],
		fallback: ["sans-serif", "arial", "system-ui"],
	})

const kr_700 = IBM_Plex_Sans_KR({
	weight: "700",
	style: "normal",
	subsets: ['latin', 'latin-ext'],
	fallback: ["sans-serif", "arial", "system-ui"],
})
const kr_500 = IBM_Plex_Sans_KR({
	weight: "500",
	style: "normal",
	subsets: ['latin', 'latin-ext'],
	fallback: ["sans-serif", "arial", "system-ui"],

})
const kr_300 = IBM_Plex_Sans_KR({
	weight: "300",
	style: "normal",
	subsets: ['latin', 'latin-ext'],
	fallback: ["sans-serif", "arial", "system-ui"],
})

export const text = tv({
	variants: {
		weight: {
			bold: kr_500.className,
			base: kr.className,
		},
		size: {
			md: "text-lg",
			sm: "text-base",
			xs: "text-sm",
		},
		my: {
			l: "my-6",
			m: "my-3",
			s: "my-1",
			x: "",
		},
		mx: {
			l: "mx-6",
			m: "mx-3",
			s: "mx-1",
			x: "",
		},

	},
	defaultVariants: {
		weight: "base",
		size: "md",
		my: "x",
		mx: "x",
	}
})


export const title = tv({
	variants: {
		size: {
			h1: "text-2xl",
			h2: "text-xl",
			h3: "text-lg",
			h4: "text-md",
		},
		weight: {
			bold: kr_700.className,
			semi: kr_500.className,
			light: kr_300.className,
		},
		my: {
			l: "my-6",
			m: "my-3",
			s: "my-1",
			x: "",
		},
		mx: {
			l: "mx-6",
			m: "mx-3",
			s: "mx-1",
			x: "",
		},

	},
	defaultVariants: {
		size: "h1",
		weight: "bold",
		my: "m",
		mx: "m",
	}
})


export const container = tv({
	variants: {
		my: {
			xl: "my-8",
			l: "my-6",
			m: "my-3",
			s: "my-1",
		},
		mx: {
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
