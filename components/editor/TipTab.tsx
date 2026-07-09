"use client";
import { Indent } from "@/lib/tiptapIndent";
import { InlineSuggestion } from "@/lib/InlineSuggestion";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import {
	useEditor,
	EditorContent,
	Editor,
	useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import {
	AArrowDown,
	AArrowUp,
	Bold,
	Code,
	CodeXml,
	Italic,
	List,
	ListIndentDecrease,
	ListIndentIncrease,
	ListOrdered,
	Minus,
	Pilcrow,
	Redo,
	Sparkles,
	TextAlignCenter,
	TextAlignEnd,
	TextAlignStart,
	TextQuote,
	Undo,
} from "lucide-react";
import { tv } from "tailwind-variants";
import { all, createLowlight } from "lowlight";
import YoutubeURLDialog from "../commons/YoutubeURLDialog";
import LinkDialog from "../commons/LinkDialog";
import ColorDropDown from "../commons/ColorDropdown";
import HeaderDropdown from "../commons/HeaderDropdown";
import ImageUploadDialog from "../commons/ImageDialog";
import SaveDialog from "../commons/SaveDialog";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useRef, type ReactNode } from "react";
const lowlight = createLowlight(all);
const ICON_SIZE = 18;

interface TibTabInterface {
	id?: string;
	content?: JSON;
	title?: string;
	editable: boolean;
}

export default function TipTab({
	id,
	title,
	content,
	editable,
}: TibTabInterface) {
	const editor = useEditor({
		editable,
		content,
		extensions: [
			TextAlign.configure({
				types: ["heading", "paragraph", "image"],
			}),
			TextStyle,
			Image.configure({
				inline: false,
				allowBase64: false,
				resize: {
					enabled: content ? false : true,
					directions: ["top", "bottom", "left", "right"],
					minWidth: 50,
					minHeight: 50,
					alwaysPreserveAspectRatio: true,
				},
			}),
			FontSize,
			Highlight.configure({
				multicolor: true,
			}),
			Youtube,
			Indent.configure({
				types: ["paragraph", "heading"],
				max: 8,
				step: 24,
			}),
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3, 4, 5, 6],
				},
				codeBlock: false,
				link: {
					protocols: ["https"],
				},
			}),
			// Placeholder.configure({}),
			CodeBlockLowlight.configure({
				lowlight,
				enableTabIndentation: true,
			}),
			// 편집 가능할 때만 Copilot 스타일 AI 자동완성을 활성화한다.
			...(editable
				? [
					InlineSuggestion.configure({
						debounce: 600,
						fetchSuggestion: async ({ before, after }) => {
							const res = await fetch("/api/editor/complete", {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({ before, after }),
							});
							if (!res.ok) return "";
							const data = await res.json();
							return (data.suggestion as string) ?? "";
						},
					}),
				]
				: []),
		],
		immediatelyRender: false,
		injectCSS: true,
	});

	if (!editor) {
		return (
			<div className="mx-auto max-w-4xl p-5 space-y-3">
				<Skeleton className="w-full h-12 rounded-xl bg-zinc-200" />
				<Skeleton className="w-full h-[580px] rounded-xl bg-zinc-200" />
			</div>
		);
	}

	if (!editable) {
		return (
			<article className="mx-auto w-full max-w-3xl">
				<EditorContent editor={editor} />
			</article>
		);
	}

	return (
		<div className="mx-auto w-full max-w-4xl px-3 pb-24 sm:px-5">
			<MenuBar id={id} editor={editor} title={title} />
			<div className="mt-4 rounded-2xl border border-zinc-200 bg-white shadow-sm">
				<div className="flex items-center gap-1.5 px-5 pt-4 text-xs text-zinc-400">
					<Sparkles size={13} className="text-purple-500" />
					<span>
						AI 자동완성 — 입력을 멈추면 회색 추천이 나타납니다 ·{" "}
						<kbd className="rounded border border-zinc-300 bg-zinc-50 px-1 font-semibold text-zinc-500">
							Tab
						</kbd>{" "}
						수락 ·{" "}
						<kbd className="rounded border border-zinc-300 bg-zinc-50 px-1 font-semibold text-zinc-500">
							Esc
						</kbd>{" "}
						취소
					</span>
				</div>
				<EditorContent className="px-2 pb-6 sm:px-4" editor={editor} />
			</div>
		</div>
	);
}

function MenuBar({
	id,
	title,
	editor,
}: {
	id?: string;
	editor: Editor;
	title?: string;
}) {
	const uploadedImageKeys = useRef<string[]>([]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			if (uploadedImageKeys.current.length <= 0) return;
			navigator.sendBeacon(
				"/api/r2",
				JSON.stringify({ keys: uploadedImageKeys.current }),
			);
		};

		const cleanup = () => {
			if (uploadedImageKeys.current.length <= 0) return;
			navigator.sendBeacon(
				"/api/r2",
				JSON.stringify({
					keys: uploadedImageKeys.current,
				}),
			);
		};
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			cleanup();
		};
	}, []);

	const editorState = useEditorState({
		editor,
		selector: ({ editor }) => {
			if (!editor) return null;
			return {
				currentContent: editor.getJSON(),
				isBold: editor.isActive("bold"),
				isBlockQuote: editor.isActive("blockquote"),
				isHeading: editor.isActive("heading"),
				isBulletList: editor.isActive("bulletList"),
				isOrderedList: editor.isActive("orderedList"),
				isCodeBlock: editor.isActive("codeBlock"),
				isHorizontal: editor.isActive("horizontalRule"),
				isItalic: editor.isActive("italic"),
				isLink: editor.isActive("link"),
				isCode: editor.isActive("code"),
				isHighlight: editor.isActive("highlight"),
				canUndo: editor.can().chain().focus().undo().run(),
				canRedo: editor.can().chain().focus().redo().run(),
			};
		},
	});

	const bold = () => editor.chain().focus().toggleBold().run();
	const italic = () => editor.chain().focus().toggleItalic().run();

	const getCurrentFontSize = () => {
		const fontSize = editor.getAttributes("textStyle").fontSize;
		return fontSize ? parseInt(fontSize) : 16;
	};
	const increaseFontSize = () => {
		const newSize = Math.min(50, getCurrentFontSize() + 2);
		editor.chain().focus().setFontSize(`${newSize}px`).run();
	};
	const decreaseFontSize = () => {
		const newSize = Math.max(8, getCurrentFontSize() - 2);
		editor.chain().focus().setFontSize(`${newSize}px`).run();
	};

	const code = () => editor.chain().focus().toggleCode().run();
	const blockquote = () => editor.chain().focus().toggleBlockquote().run();
	const paragraph = () => editor.chain().focus().setParagraph().run();
	const undo = () => editor.chain().focus().undo().run();
	const redo = () => editor.chain().focus().redo().run();
	const indent = () => editor.chain().focus().indent().run();
	const outdent = () => editor.chain().focus().outdent().run();
	const listOrdered = () => editor.chain().focus().toggleOrderedList().run();
	const listBullet = () => editor.chain().focus().toggleBulletList().run();
	const codeBlock = () => editor.chain().focus().toggleCodeBlock().run();
	const horizontalRule = () => editor.chain().focus().setHorizontalRule().run();
	const textAlignStart = () =>
		editor.chain().focus().toggleTextAlign("left").run();
	const textAlignCenter = () =>
		editor.chain().focus().toggleTextAlign("center").run();
	const textAlignEnd = () =>
		editor.chain().focus().toggleTextAlign("right").run();

	return (
		<TooltipProvider delayDuration={300}>
			<div className="sticky top-15 z-20 flex flex-wrap items-center gap-1 rounded-2xl border border-zinc-200 bg-white/90 p-1.5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70">
				{/* 실행 취소 / 다시 실행 */}
				<ToolGroup>
					<ToolButton
						label="실행 취소"
						onClick={undo}
						disabled={!editorState?.canUndo}
					>
						<Undo size={ICON_SIZE} />
					</ToolButton>
					<ToolButton
						label="다시 실행"
						onClick={redo}
						disabled={!editorState?.canRedo}
					>
						<Redo size={ICON_SIZE} />
					</ToolButton>
				</ToolGroup>

				<ToolDivider />

				{/* 문단 / 제목 */}
				<ToolGroup>
					<HeaderDropdown
						editor={editor}
						className={editorButton({ isActive: editorState?.isHeading })}
					/>
					<ToolButton label="본문" onClick={paragraph}>
						<Pilcrow size={ICON_SIZE} />
					</ToolButton>
				</ToolGroup>

				<ToolDivider />

				{/* 인라인 서식 */}
				<ToolGroup>
					<ToolButton label="굵게" onClick={bold} active={editorState?.isBold}>
						<Bold size={ICON_SIZE} strokeWidth={2.5} />
					</ToolButton>
					<ToolButton
						label="기울임"
						onClick={italic}
						active={editorState?.isItalic}
					>
						<Italic size={ICON_SIZE} />
					</ToolButton>
					<ToolButton
						label="인라인 코드"
						onClick={code}
						active={editorState?.isCode}
					>
						<Code size={ICON_SIZE} />
					</ToolButton>
					<LinkDialog
						className={editorButton({ isActive: editorState?.isLink })}
						editor={editor}
					/>
					<ColorDropDown
						editor={editor}
						className={editorButton({ isActive: editorState?.isHighlight })}
					/>
				</ToolGroup>

				<ToolDivider />

				{/* 글자 크기 */}
				<ToolGroup>
					<ToolButton label="글자 크게" onClick={increaseFontSize}>
						<AArrowUp size={ICON_SIZE} />
					</ToolButton>
					<ToolButton label="글자 작게" onClick={decreaseFontSize}>
						<AArrowDown size={ICON_SIZE} />
					</ToolButton>
				</ToolGroup>

				<ToolDivider />

				{/* 블록 요소 */}
				<ToolGroup>
					<ToolButton
						label="인용구"
						onClick={blockquote}
						active={editorState?.isBlockQuote}
					>
						<TextQuote size={ICON_SIZE} />
					</ToolButton>
					<ToolButton
						label="코드 블록"
						onClick={codeBlock}
						active={editorState?.isCodeBlock}
					>
						<CodeXml size={ICON_SIZE} />
					</ToolButton>
					<ToolButton
						label="구분선"
						onClick={horizontalRule}
						active={editorState?.isHorizontal}
					>
						<Minus size={ICON_SIZE} />
					</ToolButton>
				</ToolGroup>

				<ToolDivider />

				{/* 목록 / 들여쓰기 */}
				<ToolGroup>
					<ToolButton
						label="번호 목록"
						onClick={listOrdered}
						active={editorState?.isOrderedList}
					>
						<ListOrdered size={ICON_SIZE} />
					</ToolButton>
					<ToolButton
						label="글머리 목록"
						onClick={listBullet}
						active={editorState?.isBulletList}
					>
						<List size={ICON_SIZE} />
					</ToolButton>
					<ToolButton label="들여쓰기" onClick={indent}>
						<ListIndentIncrease size={ICON_SIZE} />
					</ToolButton>
					<ToolButton label="내어쓰기" onClick={outdent}>
						<ListIndentDecrease size={ICON_SIZE} />
					</ToolButton>
				</ToolGroup>

				<ToolDivider />

				{/* 정렬 */}
				<ToolGroup>
					<ToolButton label="왼쪽 정렬" onClick={textAlignStart}>
						<TextAlignStart size={ICON_SIZE} />
					</ToolButton>
					<ToolButton label="가운데 정렬" onClick={textAlignCenter}>
						<TextAlignCenter size={ICON_SIZE} />
					</ToolButton>
					<ToolButton label="오른쪽 정렬" onClick={textAlignEnd}>
						<TextAlignEnd size={ICON_SIZE} />
					</ToolButton>
				</ToolGroup>

				<ToolDivider />

				{/* 삽입 */}
				<ToolGroup>
					<YoutubeURLDialog className={editorButton()} editor={editor} />
					<ImageUploadDialog
						uploadedImageKeys={uploadedImageKeys}
						editor={editor}
						className={editorButton()}
					/>
				</ToolGroup>

				{/* 저장: 오른쪽 끝으로 밀착 */}
				<div className="ml-auto">
					<SaveDialog
						posterTitle={title}
						postId={id}
						editor={editor}
						uploadedImageKeys={uploadedImageKeys}
					/>
				</div>
			</div>
		</TooltipProvider>
	);
}

// 툴팁이 달린 단일 버튼
function ToolButton({
	label,
	onClick,
	active,
	disabled,
	children,
}: {
	label: string;
	onClick: () => void;
	active?: boolean;
	disabled?: boolean;
	children: ReactNode;
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					onClick={onClick}
					disabled={disabled}
					aria-label={label}
					className={editorButton({ isActive: active })}
				>
					{children}
				</button>
			</TooltipTrigger>
			<TooltipContent>{label}</TooltipContent>
		</Tooltip>
	);
}

function ToolGroup({ children }: { children: ReactNode }) {
	return <div className="flex items-center gap-0.5">{children}</div>;
}

function ToolDivider() {
	return (
		<Separator orientation="vertical" className="mx-0.5 !h-6 bg-zinc-200" />
	);
}

const editorButton = tv({
	base: "flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-30",
	variants: {
		isActive: {
			true: "bg-purple-100 text-purple-700 hover:bg-purple-100 hover:text-purple-700",
			false: "",
		},
	},
	defaultVariants: {
		isActive: false,
	},
});
