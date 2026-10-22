import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "@/components/commons/syntaxHighlighter";
import CopyCodeButton from "./CopyCodeButton";

// Hand-drawn code cell with a copy button so learners can grab
// reference/source snippets. Used by the MDX `code` handler.
//
// A server component on purpose: the highlighting is done here and arrives as
// HTML, so the grammars never reach the browser. Only the copy button, which
// needs the clipboard and a bit of state, is a client component.
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
  return (
    <div className="relative my-7">
      <CopyCodeButton code={code} />
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
