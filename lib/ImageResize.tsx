"use client";

// 이미지 위치/크기 편집을 지원하는 커스텀 Image 노드.
// - 정렬(왼쪽/가운데/오른쪽) 및 텍스트 감싸기(좌/우 플로트): `align` 속성
// - 드래그로 이동/순서 변경: 노드 draggable + [data-drag-handle] 핸들
// - 크기 조절: 오른쪽 아래 코너 핸들 드래그 → `width` 속성(px)
import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	GripVertical,
	PanelLeft,
	PanelRight,
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Align = "left" | "center" | "right" | "float-left" | "float-right";

// 정렬 값 → 래퍼(블록)의 위치 클래스. Tailwind 유틸리티라 에디터 img CSS보다 우선한다.
const ALIGN_CLASS: Record<Align, string> = {
	left: "mr-auto",
	center: "mx-auto",
	right: "ml-auto",
	"float-left": "float-left mr-4",
	"float-right": "float-right ml-4",
};

const ALIGN_BUTTONS: {
	value: Align;
	label: string;
	Icon: typeof AlignLeft;
}[] = [
	{ value: "left", label: "왼쪽 정렬", Icon: AlignLeft },
	{ value: "center", label: "가운데 정렬", Icon: AlignCenter },
	{ value: "right", label: "오른쪽 정렬", Icon: AlignRight },
	{ value: "float-left", label: "왼쪽에 두고 글 감싸기", Icon: PanelLeft },
	{ value: "float-right", label: "오른쪽에 두고 글 감싸기", Icon: PanelRight },
];

function ImageNodeView({
	node,
	updateAttributes,
	selected,
	editor,
}: NodeViewProps) {
	const { src, alt, title, width, align } = node.attrs as {
		src: string;
		alt?: string;
		title?: string;
		width?: number | null;
		align: Align;
	};
	const imgRef = useRef<HTMLImageElement>(null);
	const showControls = editor.isEditable && selected;

	// 오른쪽 아래 핸들을 끌어 너비를 조절한다(비율은 height:auto로 유지).
	const startResize = (e: React.PointerEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const startX = e.clientX;
		const startWidth = imgRef.current?.offsetWidth ?? 0;
		const onMove = (ev: PointerEvent) => {
			const next = Math.max(50, Math.round(startWidth + (ev.clientX - startX)));
			updateAttributes({ width: next });
		};
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	return (
		<NodeViewWrapper
			className={cn("relative my-4 w-fit", ALIGN_CLASS[align] ?? "mr-auto")}
			data-align={align}
		>
			{/* TipTap 노드뷰가 직접 제어하는 요소라 next/image 사용 불가 */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				ref={imgRef}
				src={src}
				alt={alt ?? ""}
				title={title ?? undefined}
				draggable={false}
				style={{
					width: width ? `${width}px` : undefined,
					marginTop: 0,
					marginBottom: 0,
				}}
				className={cn(
					"block max-w-full rounded-md",
					showControls && "ring-2 ring-purple-400 ring-offset-2",
				)}
			/>

			{showControls && (
				<>
					{/* 드래그해서 이동 */}
					<div
						data-drag-handle
						contentEditable={false}
						title="드래그해서 이동"
						className="absolute top-1/2 -left-3 flex h-7 w-6 -translate-y-1/2 cursor-grab items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 shadow-sm active:cursor-grabbing"
					>
						<GripVertical size={16} />
					</div>

					{/* 정렬 / 감싸기 컨트롤 바 */}
					<div
						contentEditable={false}
						className="absolute -top-11 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border border-zinc-200 bg-white p-1 shadow-md"
					>
						{ALIGN_BUTTONS.map(({ value, label, Icon }) => (
							<button
								key={value}
								type="button"
								title={label}
								aria-label={label}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => updateAttributes({ align: value })}
								className={cn(
									"flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100",
									align === value &&
										"bg-purple-100 text-purple-700 hover:bg-purple-100",
								)}
							>
								<Icon size={16} />
							</button>
						))}
					</div>

					{/* 크기 조절 핸들 */}
					<div
						onPointerDown={startResize}
						contentEditable={false}
						title="드래그해서 크기 조절"
						className="absolute -right-1.5 -bottom-1.5 h-4 w-4 cursor-nwse-resize rounded-full border-2 border-white bg-purple-500 shadow"
					/>
				</>
			)}
		</NodeViewWrapper>
	);
}

export const ResizableImage = Image.extend({
	draggable: true,

	addAttributes() {
		return {
			...this.parent?.(),
			width: {
				default: null,
				parseHTML: (el) => {
					const w = (el as HTMLElement).style.width || el.getAttribute("width");
					return w ? parseInt(w, 10) || null : null;
				},
				renderHTML: (attrs) =>
					attrs.width ? { style: `width: ${attrs.width}px` } : {},
			},
			align: {
				default: "left",
				parseHTML: (el) =>
					(el as HTMLElement).getAttribute("data-align") || "left",
				renderHTML: (attrs) => ({ "data-align": attrs.align }),
			},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(ImageNodeView);
	},
});
