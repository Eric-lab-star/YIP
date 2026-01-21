import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Smile} from "lucide-react";

export default function Page(){
	return (
		<div className="mb-50">
			<Title my="m" >고양이 또는 강아지를 추천해드려요</Title>
			<Text >
				와~~~ 지금까지 파이썬에 대해서 정말 많은 것을 배웠어요.
				<Smile className="inline text-orange-300 mx-1 "/>
				우선 가장먼저 변수에 대해서 배웠고, 그 다음에 함수, <Code>input()</Code>, <Code>type()</ Code> <Code>int()</Code>, <Code>if</Code>, <Code>else</Code>, 마지막으로 <Code>elif</ Code>까지 정말 많은 것을 배웠네요! 이 만큼 배웠으면 이제 배운 것들을 열심히 조립해서 더 멋있는 프로그램을 만들 준비가 되었네요. 이번에 만들어볼 프로그램은 고양이나, 강아지의 품종을 추천해 주는 프로그램을 만들어 볼 거예요.
			</Text>
			<video src={`${IMAGE_BASE_URL}/cat_or_dog.mp4`} preload="metadata" controls={true} className="w-full h-60"/>
		
			<NextAndPrev
			prev="/pythonWebScrapper/if"
			prevPage="if, else, elif"
			next="/pythonWebScrapper"
			nextPage="파이썬"
			/>
		</div>
	)
}
