import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Smile} from "lucide-react";
import Link from "next/link";

export default function Page(){
	return (
		<div className="mb-50">
			<Title my="m" > CLI app 고양이 또는 강아지를 추천해드려요 </Title>
			<Text my="l" >
				와~~~ 지금까지 파이썬에 대해서 정말 많은 것을 배웠어요.
				<Smile className="inline text-orange-300 mx-1 "/>
				우선 가장먼저 변수에 대해서 배웠고, 그 다음에 함수, <Code>input()</Code>, <Code>type()</ Code> <Code>int()</Code>, <Code>if</Code>, <Code>else</Code>, 마지막으로 <Code>elif</ Code>까지 정말 많은 것을 배웠네요! 이 만큼 배웠으면 이제 배운 것들을 열심히 조립해서 더 멋있는 프로그램을 만들 준비가 되었네요. 이번에 만들어볼 프로그램은 고양이나, 강아지의 품종을 추천해 주는 프로그램을 만들어 볼 거예요.
			</Text>
			<Text>웹에서 코드를 작성해야한다면 <Link target="_blank" href={"https://codesandbox.io"} className="text-orange-500"> codesandbox.io 에서 코드를 작성하세요 🔗</Link></Text>
			<Title my="m" size="h2">완성 예시</Title>
			<div className="flex justify-center items-center">
				<video src={`${IMAGE_BASE_URL}/cat_or_dog.mp4`} preload="metadata" controls={true} className="bg-zinc-700 h-70 "/>
			</div>
			<Text my="m">
				이렇게 문자로만 되어 있을 프로그램을 cli app이라고 해요. cli는 command line interface의 약자로 gui와는 대비되는 앱이에요. 그래픽이 없는 제한된 환경에서 주로 사용되며, 개발자들이 편리하게 개발할 수 있게 도와주는 도구들이 많이 있어요. <Link className="text-orange-500" target="_blank" href={"https://github.com/agarrharr/awesome-cli-apps"}>더  많은 cli 앱을 구경하고 싶으면 여기를 클릭 🔗</Link> 
			</Text>
			<Text my="m">이번에 만들 프로그램은 간단하지만 재미있는 프로그램이에요. 이 프로그램은 3가지 질문을 사용자에게 해서 사용자에게 고양이나 강아지를 추천할 거예요.</Text>
			<Text>
			1. 고양이가 좋아 강아지가 좋아?
			</Text>

			<Text>
			2. 검은색이 좋아 흰색이 좋아?
			</Text>
			<Text>
			3. 원하는 크기있어?
			</Text>

			<Text my="m">
			 하지만 우리가 만드는 프로그램은 몇가지 제약이 있어요.  
			</Text>

			 <Text my="m">
			 1. 인공지능이 아니기 때문에 사람의 언어롤 모두 이해할 수 없어요.
			 </Text>
			 <Text my="m">
			 2. 사용자는 정확한 단어를 입력해야되요. 
			 </Text>
			 <Text my="m">
			 3. 버그가 많이 발생한다.
			 </Text>
			 
			 <Title my="m" size="h2"> 학습 목표 </Title>
			 <Text my="m">
			 정확하지도 않으며 불편한 여러가지 제약이 있는 프로그램을 왜 만들까요? 간단한 프로젝트를 만들면서 python 프로그래밍 언어에 익숙해지는 것이 목표에요. 구체적으로 이런 것들이 있어요.
			</Text>
			<Text>1. <Code>input()</Code>을 사용해서 사용자의 입력을 처리하는 방법을 배운다.</Text>
			<Text>2. <Code> if..elif...else</Code> 의 사용 방법을 학습한다. </Text>
			<Text>3. 함수를 사용해서 코드를 정리하는 방법을 익힌다.</Text>

			<Title my="m" size="h2"> start() 함수 만들기 </Title>
			<CodeBlock code={
`def start():
	print("반려견 또는 반려묘를 추천해 드려요.")
`} />
			<Text> 함수를 배운지 너무 오래되어서 잊어버린건 아닌가요? 우리 프로그램의 모든 코드는 <Code>start()</Code>함수가 실행 될 때 실행하도록 만들거에요. <Code>print()</Code>는 그냥 사용해도 문제가 없는데 왜 함수안에서 넣었을까요? 아직은 배우지 않은 개념이지만 프로그램의 안정성을 위해서 만드는거예요. 더 구체적인 이유는 천천히 알아가도록하고 지금은 이런 방식도 있구나 정도로 알아두세요.
			</Text>
			<Text>이제 프로그램을 실행해서 출력창에 {"\"반려견 또는 반려묘를 추천해 드려요.\""}라는 문장이 나오는지 확인해보세요.</Text>
			

			<Title my="m" size="h2"> cat or dog </Title>
			<Text>이제 사용자가 원하는게 고양이인지 강이지인지 확인을 해야겠네요. <Code>input()</Code>를 사용해서 쉽게 사용자가 무엇을 원하는지 확인할 수 있겠네요.</Text>
			<CodeBlock code={
`def start():
	print("반려견 또는 반려묘를 추천해 드려요.")
	cat_dog = input("고양이가 좋아 강아지가 좋아?\\n 고양이 또는 강아지 입력: ") # <--- 새롭게 추가됨
`}/>
			<Text>하지만 지금은 조금 문제가 생겼네요. 우리는 고양이나  강아지를 입력받기를 원하는데 만약 사용자가 코끼리를 입력해도 해결할 방법이 없네요.</Text>
			<Text>이렇게 코드가 조금씩 늘어나고 새로운 기능을 추가해야한다면 새로운 함수를 만들어서 분리하는게 좋은 방법이에요. </Text>

			<CodeBlock code={
`
def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()

def cat_or_dog():
	cat_dog = input("고양이가 좋아 강아지가 좋아?\\n 고양이 또는 강아지 입력: ")
	return cat_dog.strip()
`}/>
			<Text my="m">이렇게 분리를 함으로써, start 함수를 더 간결하게 유지할 수 있고, cat_or_dog 함수만 수정하고 start함수는 그대로 유지할 수 있게되었어요. </Text>
			<CodeBlock code={
`
def cat_or_dog():
    cat_dog = input("고양이가 좋아 강아지가 좋아?\\n 고양이 또는 강아지 입력: ").strip() # <-- 추가
    if not (cat_dog == "고양이" or  cat_dog  == "강아지"): # <-- 추가
        raise ValueError("오류!!!!!") # <-- 추가
    return cat_dog
`}/>
			<Text>
				이번에는 오류를 잡아낼 수 있는 몇가지 새로운 코드를 넣어봤어요. 가장 먼저, <Code>.strip()</Code> 이라는 코드를 볼까요? 이 코드는 공백을 제거하는 기능을 해요. 단어 앞뒤에 있을 수 있는 공백을 제거하는 기능을 해요. 공백 또한 코드로 인식을 하기 때문에 공백이 있는 단어와 없는 단어는 서로 같은 값이 아니에요. <Link href={"https://docs.python.org/3/library/stdtypes.html#str.strip"} target="_blank" className="text-orange-500"> 클릭해서 .strip() 더 알아보기</Link>
			</Text>
			<div className="my-3"/>
			<Text> 그 다음으로는 입력한 값이 고양이도 아니고 강아지도 아닌 조건을 판단해주는 if 조건문을 추가했어요. cat_or_dog 에 고양이라는 값이 있다면 조건문 <Code>cat_dog == "고양이" or  cat_dog  == "강아지"</Code>이 참이 되요. 강아지 일 때도 참이 되지요. 하지만 앞에 <Code>not</Code>을 추가해서 참인 값을 거짓으로 반전시켜버렸어요. 결국 고양이나, 강아지가 아닌 값이라면 if의 조건문이 참이 되는 거에요. 이 상황은 프로그램이 원하는 상황이 아님으로 의도적으로 에러를 발생시켜서 프로그램을 중단시켜버릴거에요. 그 코드가 다음에 나오는 <Code>raise ValueError()</Code>에요. 이렇게 하면 고양이 또는 강아지만 값으로 얻을 수 있게되었네요.</Text> 
			




			<Title my="m"> black or white </Title>
			<Text> 그 다음으로는 어떤 색을 원하는지 확인할 거예요. 간단한 프로그램을 작성하기 위해서 흰색하고 검정색 만 입력받을 수 있다고 제한을 했어요 </Text>
			<Text>이번에도 앞에서 고양이와 강아지를 구별하고 잘못된 값은 걸러낸 방식을 그대로 사용할 수 있겠네요.  한번 스스로 만들어 볼까요?</Text>
				
			<CodeBlock code={
`
def black_or_white():
    color = input("검정색과 흰색중 하나를 입력하세요\\n 검정색 또는 흰색 입력: ").strip()
    if not (color == "검정색" or  color == "흰색"):
        raise ValueError("오류!!!!!")
    return color
`}/>

			<Title my="m" size="h2"> small_medium_large()</Title>
			<Text>이번에는 크기를 확인할 거예요. 이것도 같은 방식으로 함수를 만들어 주세요.</Text>
			<CodeBlock code={
`
def small_medium_large():
    size= input("원하는 크기가 있어?: \n 소형 또는 중형 또는 대형 입력: ").strip()
    if not (size == "소형" or size == "중형" or size == "대형"):
        raise ValueError("오류!!!!")
    return size
`}/>
			<Title my="m" size="h2">중간 점검 </Title>
			<Text my="m">잘 따라오고 있나요? 지금까지 설명한 내용을 모두 작성했으면 아래와 같은 코드가 나왔을 거예요.</Text>
			<CodeBlock code={
`
def cat_or_dog():
    cat_dog = input("고양이가 좋아 강아지가 좋아?\n 고양이 또는 강아지 입력: ").strip()
    if not (cat_dog == "고양이" or  cat_dog  == "강아지"):
        raise ValueError("오류!!!!!")
    return cat_dog

def black_or_white():
    color = input("검정색과 흰색중 하나를 입력하세요\n 검정색 또는 흰색 입력: ").strip()
    if not (color == "검정색" or  color == "흰색"):
        raise ValueError("오류!!!!!")
    return color

def small_medium_large():
    size= input("원하는 크기가 있어?: \n 소형 또는 중형 또는 대형 입력: ").strip()
    if not (size == "소형" or size == "중형" or size == "대형"):
        raise ValueError("오류!!!!")
    return size


def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()
    color = black_or_white()
    size = small_medium_large()
				`}/>
			<NextAndPrev
				prev="/pythonWebScrapper/if"
				prevPage="if, else, elif"
				next="/pythonWebScrapper/cat_or_dog2"
				nextPage="고양이와 강아지 2"
			/>
		</div>
	)
}
