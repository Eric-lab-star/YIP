"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

// Hand-drawn code cell — same look as before, now with a copy button so
// learners can grab reference/source snippets. Used by the MDX `code` handler.
const doodleBox: React.CSSProperties = {
  border: "2.5px solid #263D5B",
  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
};

export default function CopyCodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
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
    <div className="relative my-7">
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
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          ...doodleBox,
          margin: 0,
          padding: "1.25rem",
          fontSize: "1rem",
        }}
        codeTagProps={{
          style: {
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
