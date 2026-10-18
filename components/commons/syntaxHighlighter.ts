import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

// The full `Prism` build bundles every grammar Prism ships (~300, 215KB gzip)
// into each page that renders a code block. Lessons use python, bash, json,
// toml and markdown; the AI chat adds whatever the model answers in. Register
// that set here and import the highlighter from this module only. A language
// left out is not an error — it renders as plain, unhighlighted text, which is
// also what `text` fences get.
const languages = {
	bash,
	c,
	cpp,
	css,
	java,
	javascript,
	json,
	jsx,
	markdown,
	markup,
	python,
	sql,
	toml,
	tsx,
	typescript,
	yaml,
	// Fence names people actually type for the grammars above.
	sh: bash,
	shell: bash,
	html: markup,
	xml: markup,
	js: javascript,
	ts: typescript,
	py: python,
	md: markdown,
	yml: yaml,
};

for (const [name, grammar] of Object.entries(languages)) {
	SyntaxHighlighter.registerLanguage(name, grammar);
}

export default SyntaxHighlighter;
