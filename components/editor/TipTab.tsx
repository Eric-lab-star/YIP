"use client";
import { Indent } from "@/lib/tiptapIndent";
import { Placeholder } from "@tiptap/extensions";
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import DragHandle from '@tiptap/extension-drag-handle-react'
import Youtube from '@tiptap/extension-youtube'
import {useEditor, EditorContent, Editor, useEditorState, } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from '@tiptap/extension-highlight'
import { AArrowDown, AArrowUp, Bold, Code, CodeXml, Grip, GripVertical, Italic, List, ListIndentDecrease, ListIndentIncrease, ListOrdered, Minus, Pilcrow, Redo, TextQuote, Undo} from "lucide-react";
import { tv } from "tailwind-variants";
import {all, createLowlight} from 'lowlight';
import YoutubeURLDialog from "../commons/YoutubeURLDialog";
import LinkDialog from "../commons/LinkDialog";
import ColorDropDown from "../commons/ColorDropdown";
import HeaderDropdown from "../commons/HeaderDropdown";
import ImageUploadDialog from "../commons/ImageDialog";
const lowlight = createLowlight(all)

const NESTED_CONFIG = { edgeDetection: { threshold: -16 } }
export default function TipTab() {
	const editor = useEditor({
		extensions: [
			TextStyle,
			Image.configure({
				inline: false,
				allowBase64: false,
				resize: {
					enabled: true,
					directions: ['top', 'bottom', 'left', 'right'], 
					minWidth: 50,
					minHeight: 50,
					alwaysPreserveAspectRatio: true,
				}
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
					levels: [1,2,3,4,5,6],
				},
				codeBlock: false,
				link: {
					protocols: ['https']
				}
			}),
			Placeholder.configure({
				placeholder: "기억보다 기록을 합시다."
			}),
			CodeBlockLowlight.configure({
				lowlight,
				enableTabIndentation: true,
			})
		],
		immediatelyRender: false,
		injectCSS: true
	})


	if (!editor) {
		return <div> loading </div>
	}

	return (
		<>
			<MenuBar editor={editor}/>
			<DragHandle editor={editor} nested={NESTED_CONFIG}>
				<GripVertical className="hover:cursor-grab"/>
			</DragHandle>
			<EditorContent className="p-3 border-zinc-400 border-dashed border-2 h-8/12 overflow-y-auto" editor={editor}/>
		</>
	)
}

function MenuBar({editor}: { editor: Editor}) {

	const editorState = useEditorState({
		editor,
		selector: ({editor}) => {
			if (!editor) return null;
			return {
				currentContent: editor.getJSON(),
				isBold: editor.isActive('bold'),
				isBlockQuote: editor.isActive('blockquote'),
				isHeading: editor.isActive('heading'),
				isBulletList: editor.isActive('bulletList'),
				isOrderedList: editor.isActive('orderedList'),
				isCodeBlock: editor.isActive("codeBlock"),
				isHorizontal: editor.isActive("horizontalRule"),
				isItalic: editor.isActive("italic"),
				isLink: editor.isActive("link"),
				isCode: editor.isActive("code"),
				isHighlight: editor.isActive("highlight"),
				canUndo: editor.can().chain().focus().undo().run(),
				canRedo: editor.can().chain().focus().redo().run(),
			}
		}
	})


	const bold = () => {
		editor.chain().focus().toggleBold().run()
	}

	const italic = () => {
		editor.chain().focus().toggleItalic().run()
	}

  const getCurrentFontSize = () => {
    const fontSize = editor.getAttributes('textStyle').fontSize
    return fontSize ? parseInt(fontSize) : 16
  }

  const increaseFontSize = () => {
    const current = getCurrentFontSize()
    const newSize = Math.min(50, current + 2) 
    editor.chain().focus().setFontSize(`${newSize}px`).run()
  }

  const decreaseFontSize = () => {
    const current = getCurrentFontSize()
    const newSize = Math.max(8, current - 2) 
    editor.chain().focus().setFontSize(`${newSize}px`).run()
  }


	const code = () => {
		editor.chain().focus().toggleCode().run()
	}

	const blockquote = () => {
		editor.chain().focus().toggleBlockquote().run()
	}

	const paragraph = () => {
		editor.chain().focus().setParagraph().run()
	}

	const undo = () => {
		editor.chain().focus().undo().run()
	}
	const redo = () => {
		editor.chain().focus().redo().run()
	}



	const indent = () => {
		editor.chain().focus().indent().run()
	}
	const outdent = () => {
		editor.chain().focus().outdent().run()
	}

	const listOrdered = () => {
		editor.chain().focus().toggleOrderedList().run()
	}

	const listBullet = () => {
		editor.chain().focus().toggleBulletList().run()
	}
	const codeBlock = () => {
		editor.chain().focus().toggleCodeBlock().run()
	}
	const horizontalRule = () => {
		editor.chain().focus().setHorizontalRule().run()
	}


	return (
		<div className="h-7 flex items-center relative  divide-zinc-400 my-3  rounded-sm bg-zinc-500">
			<button onClick={undo} className={editorButton({isActive: editorState?.canUndo, className: "rounded-l-sm"})}>
				<Undo strokeWidth={"2"} size={"16"}/>
			</button>
			<button onClick={redo} className={editorButton({isActive: editorState?.canRedo})}>
				<Redo strokeWidth={"2"} size={"16"}/>
			</button>
			<HeaderDropdown editor={editor} className={editorButton({ isActive: editorState?.isHeading})}/>

			<button onClick={paragraph} className={editorButton()}>
				<Pilcrow strokeWidth={"2"} size={"16"}/>
			</button>
			<button onClick={bold} className={editorButton({isActive: editorState?.isBold})}>
				<Bold strokeWidth={"3"} size={"16"}/>
			</button>

			<button onClick={italic} className={editorButton({isActive: editorState?.isItalic})}>
				<Italic strokeWidth={"2"} size={"16"} />
			</button>

			<button onClick={increaseFontSize} className={editorButton()}>
				<AArrowUp strokeWidth={"2"} size={"16"} />
			</button>
			<button onClick={decreaseFontSize} className={editorButton()}>
				<AArrowDown strokeWidth={"2"} size={"16"} />
			</button>

			<button onClick={code} className={editorButton({isActive: editorState?.isCode})}>
				<Code strokeWidth={"2"} size={"16"} />
			</button>
			<button onClick={codeBlock} className={editorButton({isActive: editorState?.isCodeBlock})}>
				<CodeXml strokeWidth={"2"} size={"16"} />
			</button>


			<div>
				<LinkDialog className={editorButton({isActive: editorState?.isLink})} editor={editor}/>
			</div>
			<ColorDropDown editor={editor} className={editorButton({isActive: editorState?.isHighlight})}/>
			<button onClick={blockquote} className={editorButton({isActive: editorState?.isBlockQuote})}>
				<TextQuote strokeWidth={"2"} size={"16"} />
			</button>
			<button onClick={indent} className={editorButton()}>
				<ListIndentIncrease  strokeWidth={"2"} size={"16"} />
			</button>
			<button onClick={outdent} className={editorButton()}>
				<ListIndentDecrease strokeWidth={"2"} size={"16"} />
			</button>
			<button onClick={listOrdered} className={editorButton({isActive: editorState?.isOrderedList})}>
				<ListOrdered strokeWidth={"2"} size={"16"} />
			</button>

			<button onClick={listBullet } className={editorButton({isActive: editorState?.isBulletList})}>
				<List strokeWidth={"2"} size={"16"} />
			</button>


			<button onClick={horizontalRule} className={editorButton({isActive: editorState?.isHorizontal})}>
				<Minus strokeWidth={"2"} size={"16"} />
			</button>
			<div>
				<YoutubeURLDialog className={editorButton()} editor={editor} />
			</div>
			<div>
				<ImageUploadDialog editor={editor} className={editorButton()}/>
			</div>
		</div>
	)
}

const editorButton = tv({
	base: "group p-1 h-full hover:text-white",
	variants: {
		isActive: {
			true: "bg-black text-white",
			false: "",
		},
	},
	defaultVariants: {
		isActive: false
	}
})

