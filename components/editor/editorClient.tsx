// components/editor/Editor.client.tsx
"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

export default function EditorClient() {
  const holderId = "editorjs";
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: holderId,
      // tools: {...}  // 필요하면 여기
    });

    editorRef.current = editor;

    return () => {
      editorRef.current?.destroy?.();
      editorRef.current = null;
    };
  }, []);

  return <div id={holderId} />;
}


