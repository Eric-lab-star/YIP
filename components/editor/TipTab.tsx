"use client";
import { Indent } from "@/lib/tiptapIndent";
import { Placeholder } from "@tiptap/extensions";
import {useEditor, EditorContent, Editor, useEditorState, isActive} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Pilcrow, Quote, Redo, TextQuote, Undo } from "lucide-react";
import { useState } from "react";
import { tv } from "tailwind-variants";


export default function TipTab() {
	const editor = useEditor({
		extensions: [
			Indent.configure({
				types: ["paragraph", "heading"],
				max: 8,
				step: 24,
			}),
			StarterKit.configure({
				heading: {
					levels: [1,2,3,4,5,6],
				},
			}),
			Placeholder.configure({
				placeholder: "기억보다 기록을 합시다."
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
				canUndo: editor.can().chain().focus().undo().run(),
				canRedo: editor.can().chain().focus().redo().run(),
			}
		}
	})

	const [showHeadings, setShowHeadings] = useState(false)

	const bold = () => {
		editor.chain().focus().toggleBold().run()
	}

	const blockquote = () => {
		editor.chain().focus().toggleBlockquote().run()
	}

	const heading = (e: React.MouseEvent, {level}: {level: 1 | 2 | 3 | 4 | 5 | 6}) => {
		editor.chain().focus().toggleHeading({level}).run()
		setShowHeadings(false)
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


	const handleHeadingBlur = (e: React.FocusEvent) => {
		setShowHeadings(false)
	}



	return (
		<div className="h-7 flex items-center relative  divide-zinc-400 my-3  rounded-sm bg-zinc-500">
			<button onClick={undo} className={editorButton({isActive: editorState?.canUndo, className: "rounded-l-sm"})}>
				<Undo strokeWidth={"2"} size={"16"}/>
			</button>
			<button onClick={redo} className={editorButton({isActive: editorState?.canRedo})}>
				<Redo strokeWidth={"2"} size={"16"}/>
			</button>
			<button 
			onBlur={(e) => handleHeadingBlur(e)} 
			onClick={()=> setShowHeadings((prev) => !prev)} 
			className={editorButton({ isActive: editorState?.isHeading})}>
				<Heading strokeWidth={"2"} size={"16"}/>
			</button>
				{
					showHeadings && <div className="absolute z-10 bg-zinc-500 divide-y-1 left-13 top-8 rounded-sm">
						<Heading1 onMouseDown={(e)=> e.preventDefault()} onClick={(e) => heading(e, {level:1})} strokeWidth={"2"} size={"16"} className={header()}/>
						<Heading2 onMouseDown={(e)=> e.preventDefault()} onClick={(e) => heading(e, {level:2})} strokeWidth={"2"} size={"16"} className={header()}/>
						<Heading3 onMouseDown={(e)=> e.preventDefault()} onClick={(e) => heading(e, {level:3})} strokeWidth={"2"} size={"16"} className={header()}/>
						<Heading4 onMouseDown={(e)=> e.preventDefault()} onClick={(e) => heading(e, {level:4})} strokeWidth={"2"} size={"16"} className={header()}/>
						<Heading5 onMouseDown={(e)=> e.preventDefault()} onClick={(e) => heading(e, {level:5})} strokeWidth={"2"} size={"16"} className={header()}/>
						<Heading6 onMouseDown={(e)=> e.preventDefault()} onClick={(e) => heading(e, {level:6})} strokeWidth={"2"} size={"16"} className={header()}/>
					</div>
				}
			<button onClick={paragraph} className={editorButton()}>
				<Pilcrow strokeWidth={"2"} size={"16"}/>
			</button>
			<button onClick={bold} className={editorButton({isActive: editorState?.isBold})}>
				<Bold strokeWidth={"3"} size={"16"}/>
			</button>
			<button onClick={blockquote} className={editorButton({isActive: editorState?.isBlockQuote})}>
				<TextQuote strokeWidth={"2"} size={"16"} />
			</button>
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

const header = tv({
	base: "h-7 m-1 hover:text-white"
})
