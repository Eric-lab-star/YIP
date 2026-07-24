import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CopyCodeBlock from "@/components/mdx/CopyCodeBlock";
import Squiggle from "@/components/mdx/Squiggle";

/* ── Doodle tokens (mirror app/styles/theme.css) ─────────────────── */
const ink = "#263D5B"; // secondary — hand-drawn ink line / text
const sky = "#49B6E5"; // primary — playful accent

const doodleBox: React.CSSProperties = {
	border: `2.5px solid ${ink}`,
	borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
};

/**
 * Doodle-styled MDX element map. Every `.mdx` route under app/ renders through
 * this, so the hand-drawn look is centralized here rather than per-file. Body
 * font (Gaegu) and ink color are inherited from the global styles.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Page container — paper + dot-grid come from the global body styles.
		wrapper: ({ children }: { children: ReactNode }) => (
			<article className="mx-auto w-full max-w-3xl px-6 py-14 lg:py-20 leading-relaxed">
				{children}
			</article>
		),

		h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
			<h1
				className="relative inline-block text-3xl md:text-4xl font-bold mb-10 leading-[1.15]"
				{...props}
			>
				{children}
				<Squiggle
					color={ink}
					className="absolute -bottom-3 left-0 w-full h-3.5"
				/>
			</h1>
		),

		h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
			<h2
				className="text-2xl md:text-3xl font-bold mt-14 mb-5 flex items-center gap-3"
				{...props}
			>
				<span>{children}</span>
			</h2>
		),

		h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
			<h3 className="text-xl md:text-2xl font-bold mt-10 mb-4" {...props}>
				{children}
			</h3>
		),

		p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
			<p className="text-lg leading-[1.85] my-5" {...props}>
				{children}
			</p>
		),

		a: ({ children, ...props }: ComponentPropsWithoutRef<"a">) => (
			<a
				className="underline decoration-2 underline-offset-4"
				style={{ color: sky, textDecorationColor: sky }}
				{...props}
			>
				{children}
			</a>
		),

		strong: ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => (
			<strong className="font-bold" style={{ color: ink }} {...props}>
				{children}
			</strong>
		),

		ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
			<ul className="my-5 space-y-2.5 pl-1" {...props}>
				{children}
			</ul>
		),
		ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
			<ol
				className="my-5 space-y-2.5 list-decimal list-inside marker:font-bold"
				{...props}
			>
				{children}
			</ol>
		),
		li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
			<li className="text-lg leading-[1.7] pl-1" {...props}>
				{children}
			</li>
		),
		img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => (
			<Image
				src={typeof src === "string" ? src : ""}
				alt={alt ?? ""}
				width={800}
				height={500}
				className="rounded-xl"
			/>
		),

		blockquote: ({
			children,
			...props
		}: ComponentPropsWithoutRef<"blockquote">) => (
			<blockquote
				className="my-7 px-6 py-4 text-lg"
				style={{
					...doodleBox,
					backgroundColor: "#e6f4fb",
					borderColor: sky,
					borderStyle: "dashed",
				}}
				{...props}
			>
				{children}
			</blockquote>
		),

		// Fenced code (```python) carries a `language-*` class and its children is
		// the raw code string — syntax-highlight it in a hand-drawn cell. Inline
		// code (no language class) becomes a sky sticker chip. Code stays
		// selectable so learners can copy reference/source snippets.
		code: ({ children, className }: ComponentPropsWithoutRef<"code">) => {
			const match = /language-(\w+)/.exec(className ?? "");
			if (match) {
				return (
					<CopyCodeBlock
						language={match[1]}
						code={String(children).replace(/\n$/, "")}
					/>
				);
			}
			return (
				<code
					className="px-1.5 py-0.5 text-[0.95em] font-mono whitespace-pre-wrap"
					style={{
						backgroundColor: "#e6f4fb",
						color: ink,
						borderRadius: "8px 3px 8px 3px / 3px 8px 3px 8px",
						border: `1.5px solid ${sky}`,
					}}
				>
					{children}
				</code>
			);
		},

		// The code handler renders SyntaxHighlighter (its own <pre>), so the MDX
		// <pre> wrapper just passes through to avoid nesting two <pre> elements.
		pre: ({ children }: ComponentPropsWithoutRef<"pre">) => <>{children}</>,

		hr: () => (
			<div className="my-12 flex justify-center" aria-hidden>
				<Squiggle color={ink} className="w-1/2 h-4" />
			</div>
		),

		// GFM table → hand-drawn grid.
		//
		// `min-w-full` rather than `w-full`: with `w-full` the table is pinned to
		// the wrapper's width, so on a narrow screen the columns squeeze and the
		// cells wrap instead of the wrapper scrolling — a two-column table ends up
		// with a header several lines tall. `min-w-full` lets the table grow past
		// the wrapper when the content needs it, and `overflow-x-auto` then does
		// its job.
		table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
			<div className="my-8 overflow-x-auto">
				<table
					className="min-w-full border-collapse text-lg"
					style={{ ...doodleBox, overflow: "hidden" }}
					{...props}
				>
					{children}
				</table>
			</div>
		),
		thead: ({ children, ...props }: ComponentPropsWithoutRef<"thead">) => (
			<thead style={{ backgroundColor: ink, color: "#fff" }} {...props}>
				{children}
			</thead>
		),
		th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
			// Headers stay on one line; a wrapped header makes the row taller than
			// the data it labels. The wrapper scrolls instead. The `[&_code]` part
			// is needed because the inline-code chip sets `whitespace-pre-wrap`
			// itself, which otherwise overrides the inherited `nowrap` and splits a
			// short token like `len(단어)` across two lines.
			<th
				className="px-4 py-3 text-left font-bold whitespace-nowrap [&_code]:whitespace-nowrap"
				{...props}
			>
				{children}
			</th>
		),
		// Cells wrap (prose belongs in them) but not below a readable width. With
		// no floor, a narrow screen squeezes a Korean phrase down to two
		// characters per line — "리스/트로/세기/…" stacked seven rows deep. The
		// floor pushes the table past the wrapper instead, which then scrolls.
		td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
			<td
				className="min-w-[8rem] px-4 py-3 align-top"
				style={{ borderTop: `2px dashed ${ink}33` }}
				{...props}
			>
				{children}
			</td>
		),

		...components,
	};
}
