"use client";

import { useEffect, useRef, useState } from 'react';
import Header from "@editorjs/header";
import { OutputData, type ToolConstructable } from '@editorjs/editorjs';
import { Inter }  from "next/font/google"
import ColorPicker from 'editorjs-color-picker';
import type EditorJS from '@editorjs/editorjs';
const inter = Inter({subsets: ['latin']})

export default function Editor({data} : {data?: OutputData}) {
  const holderRef = useRef<HTMLDivElement | null>(null);
	const editorRef = useRef<EditorJS | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	

  useEffect(() => {
    (async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default;
			const LinkTool = (await import("@editorjs/link")).default;
			const ImageTool = (await import('@editorjs/image')).default;
			const CodeTool = (await import("@editorjs/code")).default;
			const Quote = (await import("@editorjs/quote")).default;
			const Warning = (await import("@editorjs/warning")).default;
			const Delimiter = (await import("@editorjs/delimiter")).default;
			const EditorJsList = (await import("@editorjs/list")).default;
			const TextVariantTune = (await import("@editorjs/text-variant-tune")).default;
			const Marker = (await import("@editorjs/marker")).default;

			const tools = {
				Marker: Marker,
				textVariant: TextVariantTune,
				List: {
					class: EditorJsList,
					inlineToolBar: true,
				},
				quote: Quote,
				ColorPicker: {
					class: ColorPicker
				},
				delmiter: Delimiter,
				warning: Warning,
				code: CodeTool,
				image: {
					class: ImageTool,
					config: {
						endpoints: {
							byFile: "/api/editorjs/image",
						},
						field: "/api/editorjs/image"
					},
				},

				header: {
					class: Header as unknown as ToolConstructable,
					shortcut: "CTRL + SHIFT + H",
					inlineToolbar: ['link'],
					config: {
						placeholder: "기억보다 기록",
						levels: [1,2,3],
						defaultLevel: 1
					}
				},

				linkTool: {
					class: LinkTool,
					config: {
						endpoint: "/api/editorjs/link",
					}
				}
			}

			if (!holderRef.current) return;
			holderRef.current.className = " h-230 overflow-y-auto"

      editorRef.current = new EditorJS({
        holder: holderRef.current!, 
				placeholder: "기억보다 기록을 합시다...",
				autofocus: true,
				tools,
				tunes: ['textVariant'],
				inlineToolbar: true,
				data: data || { 
					blocks: [{
					type: "header",
					data:{
						text: "",
						level: 2
					}
				}]},
				onReady: () => {
					console.log("editor is ready")
				}
			});
    })();

    return () => {
      editorRef.current?.destroy?.();
			editorRef.current = null;
    };
  }, []);


	const save = async () => {
		const editor = editorRef.current;
		if (!editor) return;

		setIsSaving(true);

		try {
			const data = await editor.save();
			const res = await fetch("/api/editorjs/document", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					content: data
				})
			})
			console.log(await res.json())
			setIsSaving(false)

		} catch(e) {
			console.log(e)
			setIsSaving(false)
		}
	}

  return (
		<div className=''>
			<div id='editorjs' className={inter.className} ref={holderRef} />
			<input className='border-2 border-amber-300  text-zinc-800 w-20 h-13 rounded-lg' value={isSaving ? "저장중..": "저장"} onClick={e => save()} type='button' />
		</div>
	)
}
