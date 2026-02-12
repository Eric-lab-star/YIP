"use client";

import { useEffect, useRef, useState } from 'react';
import Header from "@editorjs/header";
import { OutputData, type ToolConstructable } from '@editorjs/editorjs';
import { Inter }  from "next/font/google"
import ColorPicker from 'editorjs-color-picker';
import EditorJS from '@editorjs/editorjs';
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import CodeTool from "@editorjs/code";
import Quote from"@editorjs/quote";
import Warning from"@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import EditorJsList from"@editorjs/list";
import TextVariantTune from"@editorjs/text-variant-tune";
import Marker from "@editorjs/marker";
import { Loader, Save } from 'lucide-react';
const inter = Inter({subsets: ['latin']})

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

export default function Editor({data} : {data?: OutputData}) {

  const holderRef = useRef<HTMLDivElement | null>(null);
	const editorRef = useRef<EditorJS | null>(null);
	const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const run = async () => {
			if (!holderRef.current) return;
			if (editorRef.current) return;
			holderRef.current.className = "h-230 overflow-y-auto"

      editorRef.current = new EditorJS({
        holder: holderRef.current, 
				placeholder: "/ 를 입력하면 다양한 편집도구를 사용할 수 있어요.",
				autofocus: false,
				tools,
				tunes: ['textVariant'],
				inlineToolbar: true,
				data: data,
				onReady: () => {
					console.log("editor is ready")
				}
			});

    }

		run();

    return () => {
      const instance = editorRef.current;
			if (instance) {
				instance.isReady
				.then(()=> instance.destroy())
				editorRef.current = null;
			}
			if (holderRef.current) {
				holderRef.current.innerHTML = ""
			}
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
			setIsSaving(false)

		} catch(e) {
			setIsSaving(false)
		}
	}

  return (
		<div className='border-2'>
			<div className={inter.className} ref={holderRef} />
			<div className='border-t-2 box-border p-3'>
				<button className='border-2 bg-gray-400 outline-1 hover:outline-blue-800 hover:outline-2 text-zinc-100 px-4 py-1 rounded-lg' onClick={e => save()} >
				{isSaving ?
					<div>
						<Loader className=' animate-spin'/>
						<div>처리중</div>
					</div> : 
				<div className='hover:animate-pulse flex justify-center items-center space-x-1'>
					<Save /> <div>저장</div>
				</div>
				}

				</button>
			</div>
		</div>
	)
}
