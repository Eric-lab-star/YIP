import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import NextAndPrev from "@/components/commons/NextAndPrev";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";

export default function Page(){
	return (
		<div className="mb-50">
			<Title my="m" > CLI app 고양이 또는 강아지를 추천해드려요 2 </Title>
			<Title my="m" size="h2">이어서 작성하기</Title>
			<Text> 고양이와 강아지 1의 마지막 부분에서 계속 코드를 이어서 작성해 볼거에요. 코드가 사라졌거나 기억이 나지 않는다면 아래의 코드를 다시 입력해주세요.</Text>
			<CodeBlock code={
`
def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()
    color = black_or_white()
    size = small_medium_large()

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

`}/>
			<Text> 우리의 목표는 고양이나 강아지를 추천해주는 거였어요. 현제 우리가 알고 있는 정보는 모두 3 가지에요. 우선 고양이와 강아지중 어느 것을 원하는지 알고 있어요. 두번째로 흰색과 검정색중 어는 것을 원하는지 확인했어요. 마지막으로 원하는 크기도 확인했어요. 이제 수집한 정보를 바탕으로 추천을 해주면 될거 같네요.</Text>

			<Title size="h2" my="m">suggest()</Title>
			<TwoColumn>
			<CodeBlock code={
`
def suggest(animal, color, size):
    print(f"너에게 알맞는 {size} {color} {animal}는")
`}/>

			<Text my="m">우선 suggest함수를 만들어서 추천 동물을 출력하는 함수를 만들거에요. 여기 print 함수를 보면 <Code>{`f \"너에게 알맞는 {size} {color} {animal}는\"`}</Code> 이라고 쓰여 있는 처음보는 코드가 있어요. 이 코드는 문자열에 변수를 넣을 수 있게 만들어 주는 코드에요. 앞에 f를 쓰면 <Code>{"\{ \}"}</Code> 이 부분은 변수로 인식해요. 다시 말해서 <Code>{"\{animal\}"}</Code>으로 되어 있는 부분의 코드는 함수가 실행 될 때 <Code>고양이</Code> 또는 <Code>강아지</Code>로 바뀌게 됩니다.</Text> 
			</TwoColumn>

			<TwoColumn>
				<CodeBlock code={
`def suggest(animal, color, size):
	print(f"너에게 알맞는 {size} {color} {animal}는")
	if animal == "고양이":
		print("고양이 선택")
	elif animal == "강아지":
		print("강아지 선택")
`}/>
				<Text>3가지 조건중 우선 강아지와 고양이중 어느것을 선택했는지 구별해야겠어요. <Code>if</Code> 를 사용해서 animal 값을 판별해주었어요. </Text>
			</TwoColumn>
		<TwoColumn>
			<CodeBlock code={
`
def suggest(animal, color, size):
    print(f"너에게 알맞는 {size} {color} {animal}는")
    if animal == "고양이":
        if color == "검정색":
				elif color == "흰색":
		elif animal == "강아지":
        if color == "검정색":
				elif color == "흰색":
`}/>
			<Text>그 다음으로는 색을 판단해요. 흑 또는 백. 고양이 또는 강아지. 단 두가지 상황이기에 <Code>if..else</Code>를 사용해도 문제가 되지 않을 수 있지만 의미를 분명하게 하고 나중에 수정이 필요한 상황이 있다면 빠르고 편하게 수정가능하도록 <Code>elif</Code>를 사용했어요. 이제 마지막으로 크기를 반별해주면 되겠네요.</Text> 
		</TwoColumn>
		<TwoColumn>
				<CodeBlock code={
`
if color == "검정색":
		if size == "소형":
				print("1. 봄베이")
				print("2. 아메리칸 쇼트헤어")
				print("3. 코니시 렉스")
		elif size == "중형":
				print("1. 버미즈")
				print("2. 오리엔탈 쇼트헤어")
				print("3. 봄베이")
		elif size == "대형":
				print("1. 메인쿤")
				print("2. 브리티시 쇼트헤어")
				print("3. 차우시")
elif color == "흰색":
		if size == "소형":
				print("1. 봄베이")
				print("2. 아메리칸 쇼트헤어")
				print("3. 코니시 렉스")
		elif size == "중형":
				print("1. 버미즈")
				print("2. 오리엔탈 쇼트헤어")
				print("3. 봄베이")
		elif size == "대형":
				print("1. 메인쿤")
				print("2. 브리티시 쇼트헤어")
				print("3. 차우시")
`}/>
				<Text> 크기를 판단하는 조건식을 넣어주고 각각 적절한 고양이 품종을 작성해줬어요. 같은 방식으로 강아지도 만들면 프로그램이 완셩됩니다. </Text>
			</TwoColumn>
			<Title size="h2" my="l">모든 코드</Title>
			<Text my="l">와 이제 파이썬을 이용해서 작은 프로젝트를 만들 수 있는 단계까지 왔네요. 혹시 여기까지 따라오면서 잘 안된 부분이 있다면 아래의 코드를 보고 본인이 작성한 코드와 비교해보세요. 참고로 정해진 정답은 없어요. 그러니 변경하고 싶은 부분이 있다면 과감하게 변경을 시도해보세요. </Text>
			<CodeBlock code={`
def start():
    print("반려견 또는 반려묘를 추천해 드려요.")
    animal = cat_or_dog()
    color = black_or_white()
    size = small_medium_large()
    suggest(animal, color, size)



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


def suggest(animal, color, size):
    print(f"너에게 알맞는 {size} {color} {animal}는")

    if animal == "고양이":
        if color == "검정색":
            if size == "소형":
                print("1. 봄베이")
                print("2. 아메리칸 쇼트헤어")
                print("3. 코니시 렉스")
            elif size == "중형":
                print("1. 버미즈")
                print("2. 오리엔탈 쇼트헤어")
                print("3. 봄베이")
            elif size == "대형":
                print("1. 메인쿤")
                print("2. 브리티시 쇼트헤어")
                print("3. 차우시")
        elif color == "흰색":
            if size == "소형":
                print("1. 봄베이")
                print("2. 아메리칸 쇼트헤어")
                print("3. 코니시 렉스")
            elif size == "중형":
                print("1. 버미즈")
                print("2. 오리엔탈 쇼트헤어")
                print("3. 봄베이")
            elif size == "대형":
                print("1. 메인쿤")
                print("2. 브리티시 쇼트헤어")
                print("3. 차우시")
    elif animal == "강아지":
        if color == "검정색":
            if size == "소형":
                print("1. 슈니펠케")
                print("2. 아펜핀셔")
                print("3. 스코티시 테리어")
            elif size == "중형":
                print("1. 래브라도 리트리버")
                print("2. 플랫코티드 리트리버")
                print("3. 보더콜리")
            elif size == "대형":
                print("1. 플랫 코티드 리트리버")
                print("2. 자이언트 슈나우저")
                print("3. 그레이트 데인")
        elif color == "흰색":
            if size == "소형":
                print("1. 몰티즈")
                print("2. 비숑 프리제")
                print("3. 하바네즈")
            elif size == "중형":
                print("1. 아메리칸 에스키모 도그")
                print("2. 재패니즈 스피츠")
                print("3. 사모예드")
            elif size == "대형":
                print("1. 그레이트 피레니즈")
                print("2. 쿠바스")
                print("3. 아크바시")

start()
				`}/>
				<Text> 혹시 코드를 보면서 조금 비효율 적이라고 생각했나요? 아니면 코드가 더럽다라고 생각했나요? 네 정답이에요. 수집한 정보를 더 이쁘고 깨끗하고 멋있게 다루기 위해서 앞으로 자료구조(data structure)도 공부를 해볼거에요. 기대하세요 😏 </Text>

			<NextAndPrev
				prev="/pythonWebScrapper/cat_or_dog"
				prevPage="고양이와 강아지 1"
				next="/pythonWebScrapper/if_challenge"
				nextPage="도전! 자율 과제"
			/>
		</div>
	)
}
