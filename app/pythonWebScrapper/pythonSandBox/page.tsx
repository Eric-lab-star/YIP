import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";



export default async function Page() {

	return (
		<div className="pb-30">


			<Text my="l" children="이렇게 나왔으면 성공이에요. 이제부터 파이썬 공부를 시작합니다.  " />
			<NextAndPrev 
			prev={"/pythonWebScrapper"}
			prevPage="파이썬 시작하기"
			next={"/pythonWebScrapper/variable_string_boolean"}
			nextPage="변수, 문자열 불리안"
			/>
		</div>
	)
}
