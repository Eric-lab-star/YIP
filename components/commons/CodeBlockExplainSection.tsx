import CodeBlock from "./CodeBlock.lazy";
import TwoColumn from "./TwoColumn";
import TwoColumnDes from "./TwoColumnDes";

export default function CodeBlockExplainSection({code,title, des}:{code: string; title: string; des: React.ReactNode
}) {
	return (
		<TwoColumn pb={false}>
			<CodeBlock code={code}/>
			<TwoColumnDes title={title} des={des}/>
		</TwoColumn>
	)
}
