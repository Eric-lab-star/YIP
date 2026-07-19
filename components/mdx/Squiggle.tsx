import { ink } from "./doodle";

/**
 * A wobbly hand-drawn line. Used as the underline beneath page/section titles
 * and as a section divider, so headings outside MDX (e.g. the problem-solving
 * page) can carry the same doodle treatment as the lesson pages.
 *
 * Stretches to whatever box it is placed in — give it a width and height.
 */
export default function Squiggle({
	color = ink,
	className = "",
}: {
	color?: string;
	className?: string;
}) {
	return (
		<svg
			className={className}
			viewBox="0 0 300 14"
			fill="none"
			preserveAspectRatio="none"
			aria-hidden
		>
			<path
				d="M3 8 Q 30 2, 58 7 T 116 7 Q 150 12, 184 6 T 242 7 Q 270 2, 297 8"
				stroke={color}
				strokeWidth="4.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}
