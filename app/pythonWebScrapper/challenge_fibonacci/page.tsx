import NextAndPrev from "@/components/commons/NextAndPrev";

export default function Page(){
	return (
		<div>

			<NextAndPrev 
				next="/"
				nextPage="파이썬"
				prev="/pythonWebScrapper/challenge_binary_search"
				prevPage="도전! 이진 탐색이란?"
			/>
		</div>
	)
}
