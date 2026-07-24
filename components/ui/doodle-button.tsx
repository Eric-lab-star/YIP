import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { doodleButtonRadius, ink, palette } from "@/components/mdx/doodle";

/**
 * Button in the hand-drawn style used by the lesson pages: ink outline, wobbly
 * asymmetric corners, and a small press-down on click.
 *
 * The radius is applied as an inline style rather than a class on purpose.
 * `buttonVariants` re-declares `rounded-md` in its `size` group, which cva
 * emits *after* the variant group, so a class-based radius here would be
 * overridden for every size except the default.
 */
const tones = {
	/** Primary action — sky fill. */
	primary: "bg-primary text-primary-foreground hover:bg-primary/85",
	/** Secondary action — paper fill. */
	outline: "bg-background hover:bg-accent",
	/** Destructive action — red ink and text, paper fill. */
	danger: "bg-background text-destructive hover:bg-destructive/10",
} as const;

export type DoodleButtonTone = keyof typeof tones;

export function DoodleButton({
	tone = "outline",
	className,
	style,
	...props
}: React.ComponentProps<typeof Button> & { tone?: DoodleButtonTone }) {
	return (
		<Button
			// `ghost` contributes no border or background of its own, so the tone
			// classes below fully determine the look.
			variant="ghost"
			className={cn(
				"border-[2.5px] font-bold transition-transform active:translate-y-[1px]",
				tones[tone],
				className,
			)}
			style={{
				borderRadius: doodleButtonRadius,
				borderColor: tone === "danger" ? palette.red : ink,
				...style,
			}}
			{...props}
		/>
	);
}
