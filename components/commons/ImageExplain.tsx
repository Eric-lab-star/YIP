import Image from "next/image";
import Text from "./Text";
import TwoColumn from "./TwoColumn";

export default function ImageExplain({src, children}:{src:string, children: React.ReactNode}){
	return <TwoColumn>
		<Image src={src} className="w-full" width={500} height={400} alt=""/>
		<Text my="s">
			{children}
		</Text>
	</TwoColumn>
}
