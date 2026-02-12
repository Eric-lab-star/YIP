import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import LazyEditorClient from "@/components/editor/EditorClient.lazy";
import { Link as Link1 } from "lucide-react";
import Link from "next/link";



export default function Page() {
	return (
		<div>
			<Title my="m"> 이진 탐색 알고리즘이란? </Title>
			<Text my="m">
				알고리즘이라는 단어를 들어본 적 있나요? 알고리즘이란 어떤 문제를 해결하는 방법을 의미해요. 알고리즘도 다양한 분야가 있는데 그중에서 탐색 알고리즘의 한 종류인 이진 탐색 알고리즘을 연구해 보는게 이번 과제예요. 앞에서 만들었던 숫자 알아맞히기 게임은 이진 탐색 알고리즘과 연관이 되어있어요. 이 알고리즘을 이해하면 게임의 필승법을 파악할 수 있을 거예요.
			</Text>
			<Title my="m" size="h3"> 도움이 되는 자료 </Title>
			<ul className="space-y-1 px-3">
				<li>
					<Link className="flex space-x-1 items-center" href="https://www.geeksforgeeks.org/python/python-program-for-binary-search/" target="_blank">
							<div>1. geeksforgeeks</div>
							<Link1 size="15"/> 
					</Link>
				</li>
				<li>
					<Link className="flex space-x-1 items-center" href="https://www.w3schools.com/python/python_dsa_binarysearch.asp" target="_blank">
							<div>2. w3schools</div>
							<Link1 size="15"/> 
					</Link>

				</li>
				<li>
					<Link className="flex space-x-1 items-center" href="https://realpython.com/binary-search-python/" target="_blank">
							<div>3. realpython</div>
							<Link1 size="15"/> 
					</Link>
				</li>
			</ul>
			<div className="h-3 border-b border-dashed my-2 border-zinc-500"/>

			<Title size="h2" my="m"> 이진 탐색 알고리즘 조사 보고서 작성하기 </Title>
			<Text my="m"> 아래 입력란에 보고서를 작성해 주세요.</Text>
			<LazyEditorClient />
			<NextAndPrev
			next="challenge_fibonacci"
			nextPage="도전! 피보나치 수열 만들기"
			prev="numberGuessingGame"
			prevPage="숫자 맞히기 게임"
			/>
		</div>
	)
}
