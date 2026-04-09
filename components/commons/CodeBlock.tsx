"use client";

import { container } from '@/app/lib/tv/commons';
import { d2coding } from '@/fonts/local';
import clsx from 'clsx';
import { Prism as SyntaxHighlighter }from 'react-syntax-highlighter';
import { oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
	code,
	select = true,
}:{
	code: string
	select?: boolean
	
}){
	const cls = clsx([d2coding.className, select ? "" : "select-none"])
		return <div className={container({mx: "s", className: cls}) }>
		<SyntaxHighlighter language="python" style={oneDark} showLineNumbers={true}>{code}</SyntaxHighlighter>
	</div>
}
