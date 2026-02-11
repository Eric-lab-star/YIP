"use client";

import { useEffect, useRef } from 'react';
import Header from "@editorjs/header";
import { type ToolConstructable } from '@editorjs/editorjs';
import { Inter }  from "next/font/google"
import ColorPicker from 'editorjs-color-picker';

const inter = Inter({subsets: ['latin']})

export default function Editor() {
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let editor: any;
    (async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default;
			const LinkTool = (await import("@editorjs/link")).default;
			const ImageTool = (await import('@editorjs/image')).default;

			const tools = {

				ColorPicker: {
					class: ColorPicker
				},
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
						placeholder: "제목을 입력하세요",
						levels: [1,2,3,4],
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
      editor = new EditorJS({
        holder: holderRef.current!, 
				placeholder: "기억보다 기록을 합시다...",
				autofocus: true,
				tools,
      });
    })();

    return () => {
      editor?.destroy?.();
    };

  }, []);

  return <div id='editorjs' className={inter.className + ""} ref={holderRef} />;
}
