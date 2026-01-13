
"use client";

import dynamic from "next/dynamic";

const CodeBlock = dynamic(() => import("./CodeBlock"), {
  ssr: false,
  loading: () => <div className="h-30 p-4">코드 불러오는 중...</div>,
});

export default CodeBlock;
