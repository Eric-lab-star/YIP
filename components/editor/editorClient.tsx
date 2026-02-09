"use client";

import { useEffect, useRef } from 'react';
import Header from "@editorjs/header";
import { BlockToolConstructable } from '@editorjs/editorjs';
import { Inter }  from "next/font/google"

const inter = Inter({subsets: ['latin']})

export default function Editor() {
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let editor: any;

    (async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default;

      editor = new EditorJS({
        holder: holderRef.current!, // 또는 holder: 'editor'
				tools: {
					header: {
						class: Header as unknown as BlockToolConstructable,
						shortcut: 'CMD + SHIFT + H',
						config: {
							levels: [2, 3, 4],
							defaultLevel: 3,
							placeholder: "Enter a header"

						}
					}
				}
      });
    })();

    return () => {
      editor?.destroy?.();
    };
  }, []);

  return <div className={inter.className} ref={holderRef} />;
}
