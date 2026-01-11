import CodeBlock from "./CodeBlock";
import Text from "./Text";
import TwoColumn from "./TwoColumn";

export default function CodeExplain({code, children}:{code:string, children: React.ReactNode}){
	return <TwoColumn>
		<CodeBlock code={code}/>
		<Text my="s">
			{children}
		</Text>
	</TwoColumn>
	
}
