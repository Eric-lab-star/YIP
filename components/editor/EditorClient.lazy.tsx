"use client";
import dynamic from "next/dynamic";

const LazyEditorClient = dynamic(() => import("./EditorClient"), {ssr:false})
export default LazyEditorClient


