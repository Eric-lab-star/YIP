import NextAndPrev from "@/components/commons/NextAndPrev";

export default function Page(){
	return (
		<div>

			<NextAndPrev 
				next="/tourOfPython"
				nextPage="파이썬"
				prev="/tourOfPython/challenge_binary_search"
				prevPage="도전! 이진 탐색이란?"
			/>
		</div>
	)
}
