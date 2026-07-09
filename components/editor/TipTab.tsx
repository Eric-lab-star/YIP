"use client";
import { Indent } from "@/lib/tiptapIndent";
import { InlineSuggestion } from "@/lib/InlineSuggestion";
import TextAlign from "@tiptap/extension-text-align";
import { ResizableImage } from "@/lib/ImageResize";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { TableKit } from "@tiptap/extension-table";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import {
	useEditor,
	EditorContent,
	Editor,
	useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
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
import TableDropdown from "../commons/TableDropdown";
import EditorChatPanel from "./EditorChatPanel";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
	const [postTitle, setPostTitle] = useState(title ?? "");
	// 왼쪽 AI 글쓰기 도우미 패널 열림 상태 (데스크톱 기본 열림)
	const [chatOpen, setChatOpen] = useState(true);
	const editor = useEditor({
		editable,
		content,
		extensions: [
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			TextStyle,
			ResizableImage.configure({
				inline: false,
				allowBase64: false,
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
			Placeholder.configure({
				placeholder: "내용을 입력하세요…",
			}),
			CodeBlockLowlight.configure({
				lowlight,
				enableTabIndentation: true,
			}),
			// 표: 크기 조절 가능한 헤더 있는 표. HTML <table>도 그대로 파싱된다.
			TableKit.configure({
				table: { resizable: true },
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
			<div className="mx-auto w-full max-w-4xl px-3 sm:px-5">
				<Skeleton className="h-14 w-full rounded-2xl bg-zinc-200" />
				<div className="mt-4 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
					<Skeleton className="h-9 w-2/3 bg-zinc-200" />
					<Skeleton className="h-[520px] w-full bg-zinc-200" />
				</div>
			</div>
		);
	}

	if (!editable) {
		return (
			<article className="mx-auto w-full max-w-3xl px-5 py-2">
				{title ? (
					<h1 className="mb-6 border-b border-zinc-200 pb-4 text-3xl font-bold break-words text-zinc-800 sm:text-4xl">
						{title}
					</h1>
				) : null}
				<EditorContent editor={editor} />
			</article>
		);
	}

	return (
		<div className="flex min-h-[calc(100dvh-3.75rem)] w-full flex-col bg-zinc-50 px-4 pt-4 pb-4 sm:px-6 lg:h-[calc(100dvh-3.75rem)] lg:overflow-hidden">
			{/* 메뉴바: 작업 공간 상단에 고정 */}
			<div className="shrink-0">
				<MenuBar
					id={id}
					editor={editor}
					title={postTitle}
					setTitle={setPostTitle}
					chatOpen={chatOpen}
					onToggleChat={() => setChatOpen((v) => !v)}
				/>
			</div>

			{/* 본문 + AI 채팅: 남은 높이를 채우고 각 칼럼이 내부에서만 스크롤된다. */}
			<div className="mt-3 flex min-h-0 flex-1 flex-col gap-5 lg:flex-row">
				{chatOpen && (
					<EditorChatPanel
						editor={editor}
						onClose={() => setChatOpen(false)}
						className="hidden lg:flex"
					/>
				)}
				<div
					className={cn(
						"flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm",
						// 패널이 닫히면 본문을 읽기 좋은 폭으로 가운데 정렬한다.
						!chatOpen && "lg:mx-auto lg:w-full lg:max-w-3xl",
					)}
				>
				<input
					type="text"
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
					placeholder="제목을 입력하세요"
					aria-label="제목"
					className="w-full border-b border-zinc-100 bg-transparent px-6 pt-6 pb-3 text-2xl font-bold text-zinc-800 placeholder:text-zinc-300 focus:outline-none"
				/>
				<div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50/60 px-6 py-2.5 text-[11px] text-zinc-400">
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
					{/* 본문: 이 영역만 내부 스크롤된다. */}
					<div className="min-h-0 flex-1 overflow-y-auto">
						<EditorContent
							className="min-h-full px-6 pt-5 pb-14"
							editor={editor}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function MenuBar({
	id,
	title,
	setTitle,
	editor,
	chatOpen,
	onToggleChat,
}: {
	id?: string;
	editor: Editor;
	title: string;
	setTitle: (v: string) => void;
	chatOpen?: boolean;
	onToggleChat?: () => void;
}) {
	const uploadedImageKeys = useRef<string[]>([]);
	// 사용자가 편집을 한 뒤 저장하지 않았는지 추적한다.
	const isDirty = useRef(false);

	useEffect(() => {
		const cleanupImages = () => {
			if (uploadedImageKeys.current.length <= 0) return;
			navigator.sendBeacon(
				"/api/r2",
				JSON.stringify({ keys: uploadedImageKeys.current }),
			);
		};

		const markDirty = () => {
			isDirty.current = true;
		};
		editor.on("update", markDirty);

		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			// 업로드했지만 본문에 쓰이지 않은 이미지는 정리한다.
			cleanupImages();
			// 저장 안 된 편집이 있으면 브라우저 기본 이탈 확인창을 띄운다.
			if (isDirty.current) {
				e.preventDefault();
				e.returnValue = "";
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			editor.off("update", markDirty);
			window.removeEventListener("beforeunload", handleBeforeUnload);
			cleanupImages();
		};
	}, [editor]);

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
				isTable: editor.isActive("table"),
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
			<div className="sticky top-15 z-20 flex flex-nowrap items-center gap-1 overflow-x-auto rounded-2xl border border-zinc-200 bg-white/90 p-1.5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 sm:flex-wrap sm:overflow-x-visible">
				{/* AI 글쓰기 도우미 패널 토글 (데스크톱 전용) */}
				{onToggleChat && (
					<div className="hidden shrink-0 items-center gap-0.5 lg:flex">
						<ToolButton
							label={chatOpen ? "AI 도우미 닫기" : "AI 도우미 열기"}
							onClick={onToggleChat}
							active={chatOpen}
						>
							<Sparkles size={ICON_SIZE} />
						</ToolButton>
						<ToolDivider />
					</div>
				)}

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
					<TableDropdown
						editor={editor}
						className={editorButton({ isActive: editorState?.isTable })}
					/>
				</ToolGroup>

				{/* 저장: 오른쪽 끝으로 밀착 */}
				<div className="ml-auto shrink-0">
					<SaveDialog
						title={title}
						setTitle={setTitle}
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
	return <div className="flex shrink-0 items-center gap-0.5">{children}</div>;
}

function ToolDivider() {
	return (
		<Separator
			orientation="vertical"
			className="mx-0.5 !h-6 shrink-0 bg-zinc-200"
		/>
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
