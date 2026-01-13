"use client";

import { container } from '@/app/lib/tv/commons';
import { Prism as SyntaxHighlighter }from 'react-syntax-highlighter';
import { oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
	code,
}:{
	code: string
}){
		return <div className={container({mx: "s"})}>
		<SyntaxHighlighter language="python" style={oneDark} showLineNumbers={true}>{code}</SyntaxHighlighter>
	</div>
}
