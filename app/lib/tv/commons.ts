import { tv } from "tailwind-variants";

// Doodle: type inherits the global handwritten font (Gaegu) from base.css.
// Gaegu ships 300/400/700, so we lean on weight utilities only.
export const text = tv({
	variants: {
		weight: {
			bold: "font-bold",
			base: "font-normal",
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
			bold: "font-bold",
			semi: "font-bold",
			light: "font-light",
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
