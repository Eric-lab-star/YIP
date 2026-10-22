"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

// The interactive half of CopyCodeBlock, split out so the highlighter itself
// can stay on the server.
export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "복사됨" : "코드 복사"}
      className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-xs font-medium text-white/80 backdrop-blur transition hover:bg-white/25 hover:text-white"
    >
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? "복사됨" : "복사"}
    </button>
  );
}
