"use client";
import dynamic from "next/dynamic";

const EditorClient = dynamic(() => import("./editorClient"), {ssr:false})
export default EditorClient


