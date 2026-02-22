"use client";
import { Indent } from "@/lib/tiptapIndent";
import { Placeholder } from "@tiptap/extensions";
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import Youtube from '@tiptap/extension-youtube'
import {useEditor, EditorContent, Editor, useEditorState, } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from '@tiptap/extension-highlight'
import { AArrowDown, AArrowUp, Bold, Code, CodeXml, Italic, List, ListIndentDecrease, ListIndentIncrease, ListOrdered, Minus, Pilcrow, Redo, Save, TextAlignCenter, TextAlignEnd, TextAlignStart, TextQuote, Undo} from "lucide-react";
import { tv } from "tailwind-variants";
import {all, createLowlight} from 'lowlight';
import YoutubeURLDialog from "../commons/YoutubeURLDialog";
import LinkDialog from "../commons/LinkDialog";
import ColorDropDown from "../commons/ColorDropdown";
import HeaderDropdown from "../commons/HeaderDropdown";
import ImageUploadDialog from "../commons/ImageDialog";
import SaveDialog from "../commons/SaveDialog";
import { Skeleton } from "../ui/skeleton";
const lowlight = createLowlight(all)
const ICON_SIZE = 20;
const ICON_STROKE = 2;

export default function TipTab({content} : {content?: JSON}) {
	const editor = useEditor({
		editable: content ? false: true,
		content: content ? content : "",
		extensions: [
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
			TextStyle,
			Image.configure({
				inline: false,
				allowBase64: false,
				resize: {
					enabled: content ? false : true,
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
				placeholder: ({node}) => {
					switch (node.type.name) {
						case "heading":
							return "제목"
						default:	
							return "기억보다 기록을"
					}
				}
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
		return (
			<div className="p-5 space-y-3">
				<Skeleton className="w-full h-15 bg-zinc-300"/>
				<Skeleton className="w-full h-[580px] bg-zinc-300"/>
				<Skeleton className="w-full h-20 bg-zinc-300"/>
			</div>
		)

	}

	return (
		<>
			{!content && <MenuBar editor={editor}/>}
			<div onClick={() => {
				const json = editor.getJSON()
				Object.entries(json.content).filter(v => v[1].type === "image").forEach(v => console.log(v))
			}}>get Content</div>
			<EditorContent className={`p-3 border-zinc-400 ${!content && "border-dashed border-2"}`} editor={editor}/>
			<div className="h-30"/>
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

	const textAlignStart = () => {
		editor.chain().focus().toggleTextAlign('left').run()
	}
	const textAlignCenter = () => {
		editor.chain().focus().toggleTextAlign('center').run()
	}
	const textAlignEnd = () => {
		editor.chain().focus().toggleTextAlign('right').run()
	}



	return (
		<div className=" flex flex-col space-y-1   my-3">
			<div className="w-full overflow-clip grid grid-cols-10 justify-self-center self-center bg-primary text-primary-foreground rounded-lg border-2 border-black">
				<button onClick={undo} className={editorButton({isActive: editorState?.canUndo})}>
					<Undo strokeWidth={"2"} size={ICON_SIZE}/>
				</button>
				<button onClick={redo} className={editorButton({isActive: editorState?.canRedo})}>
					<Redo strokeWidth={"2"} size={ICON_SIZE}/>
				</button>
				<HeaderDropdown editor={editor} className={editorButton({ isActive: editorState?.isHeading})}/>

				<button onClick={paragraph} className={editorButton()}>
					<Pilcrow strokeWidth={"2"} size={ICON_SIZE}/>
				</button>
				<button onClick={bold} className={editorButton({isActive: editorState?.isBold})}>
					<Bold strokeWidth={"3"} size={ICON_SIZE}/>
				</button>

				<button onClick={italic} className={editorButton({isActive: editorState?.isItalic})}>
					<Italic strokeWidth={"2"} size={ICON_SIZE} />
				</button>

				<button onClick={increaseFontSize} className={editorButton()}>
					<AArrowUp strokeWidth={"2"} size={ICON_SIZE} />
				</button>
				<button onClick={decreaseFontSize} className={editorButton()}>
					<AArrowDown strokeWidth={"2"} size={ICON_SIZE} />
				</button>

				<button onClick={code} className={editorButton({isActive: editorState?.isCode})}>
					<Code strokeWidth={"2"} size={ICON_SIZE} />
				</button>
				<button onClick={codeBlock} className={editorButton({isActive: editorState?.isCodeBlock})}>
					<CodeXml strokeWidth={"2"} size={ICON_SIZE} />
				</button>


					<LinkDialog className={editorButton({isActive: editorState?.isLink})} editor={editor}/>
				<ColorDropDown editor={editor} className={editorButton({isActive: editorState?.isHighlight})}/>
				<button onClick={blockquote} className={editorButton({isActive: editorState?.isBlockQuote})}>
					<TextQuote strokeWidth={"2"} size={ICON_SIZE} />
				</button>
				<button onClick={indent} className={editorButton()}>
					<ListIndentIncrease  strokeWidth={"2"} size={ICON_SIZE} />
				</button>
				<button onClick={outdent} className={editorButton()}>
					<ListIndentDecrease strokeWidth={"2"} size={ICON_SIZE} />
				</button>
				<button onClick={listOrdered} className={editorButton({isActive: editorState?.isOrderedList})}>
					<ListOrdered strokeWidth={"2"} size={ICON_SIZE} />
				</button>

				<button onClick={listBullet } className={editorButton({isActive: editorState?.isBulletList})}>
					<List strokeWidth={"2"} size={ICON_SIZE} />
				</button>

				<button onClick={textAlignStart} className={editorButton()}>
					<TextAlignStart strokeWidth={"2"} size={ICON_SIZE} />
				</button>
				<button onClick={textAlignCenter} className={editorButton()}>
					<TextAlignCenter strokeWidth={"2"} size={ICON_SIZE} />
				</button>
				<button onClick={textAlignEnd} className={editorButton()}>
					<TextAlignEnd strokeWidth={"2"} size={ICON_SIZE} />
				</button>


				<button onClick={horizontalRule} className={editorButton({isActive: editorState?.isHorizontal})}>
					<Minus strokeWidth={"2"} size={ICON_SIZE} />
				</button>
					<YoutubeURLDialog className={editorButton()} editor={editor} />
					<ImageUploadDialog editor={editor} className={editorButton()}/>
			</div>
			<SaveDialog editor={editor}/>
		</div>
	)
}

const editorButton = tv({
	base: "flex justify-center items-center group p-1 h-full hover:text-foreground hover:bg-zinc-100",
	variants: {
		isActive: {
			true: "bg-purple-700 text-white",
			false: "",
		},
	},
	defaultVariants: {
		isActive: false
	}
})


