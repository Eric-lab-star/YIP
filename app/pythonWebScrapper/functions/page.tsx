import Code from "@/components/commons/Code";
import CodeExplain from "@/components/commons/CodeExplain";
import Title from "@/components/commons/Title";

export default function Page() {
	return (
		<div>
			<Title my="m">함수 Function</Title>
			<Title  my="l" size="h2" weight="semi">함수를 만들자</Title>
			<CodeExplain code={
`def game_over():
	print("You are dead. Game over")
`}>
이제 함수를 만들어 봐요. 함수를 만들 때는 변수를 만드는 것하고 조금 달라요. 먼저 <Code>def</Code> 를 적어야 되요. <Code>def</Code> 다음에 함수의 이름을 적어요. 왼쪽에 <Code>game_over</Code> 는 함수 이름이에요. 꼭 <Code>game_over</Code> 라고 적지 않아도 되요. 이름은 자유롭게 바꾸어도 좋아요
			</CodeExplain>

			<CodeExplain code={
` # 올바른 작성방법
def get_year():
	#함수 몸통, function body
	print("2026")

# 잘 못된 작성 방법
# 1. def로 시작하지 않음
get_time():
	print(14)

#2. 콜론이 없음 
def say_name()
	print("rina")

#3. 바디에 공백이 없음 
def say_hello():
print("hello")

`}>
이름을 만든 다음에는 <Code>( )</Code> 괄호를 입력하고, <Code>:</Code> 콜론을 입력해야 되요. 
<Code>:</Code> 콜론을 작성한 다음, 밑에 줄 부터는 함수의 바디가 되는 부분이에요. 바디를 입력할 때는 탭을 한번 눌러야 되요. 
<div className="h-3" />
<Code>def</Code>는 영어 define 을 의미해요. 한국어로 정의하다라는 의미에요. 다시 말해 파이썬을 이용해서 “game_over를 정의해” 라고 컴퓨터에게 작성하고 있는 거에요.
			</CodeExplain>

			<CodeExplain code={
`#say_hello 함수
def say_hello():
	print("hello")

say_hello()
`}>
아래에 <Code>say_hello()</Code> 라고 입력하고 실행을 시켜봐요. 이제 함수가 실행되는 것을 확인할 수 있어요. 
<div className="h-2"/>
함수를 실행하기 위해서는 <Code>()</Code> 콜론이 함수 이름 뒤에 반드시 있어야 해요.  콜론이 없으면 함수가 실행되지 않아요.
			</CodeExplain>

			<CodeExplain code={`
def paint_text():
	print("""
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur augue in neque placerat, at scelerisque ex sodales. Pellentesque feugiat lacus ut ante accumsan, sed consectetur urna vestibulum. In feugiat auctor nulla vitae tristique. Maecenas tincidunt diam mi, quis aliquet tortor bibendum in. Proin fringilla justo sit amet iaculis efficitur. Morbi et pulvinar purus, vitae volutpat arcu. Proin blandit sodales pretium. Quisque fringilla libero sit amet augue ultrices luctus. Curabitur nunc mauris, varius nec ante a, scelerisque accumsan tortor. Vivamus et accumsan magna, semper mattis neque. Praesent id urna eu sapien suscipit euismod at eget enim. Suspendisse non interdum leo.

Mauris quis purus eu enim porttitor pharetra. Etiam vitae diam eu tortor lobortis dignissim. Mauris et massa feugiat, lacinia nulla gravida, vestibulum lectus. Morbi tincidunt metus lectus. Praesent cursus vestibulum ornare. Suspendisse sed odio ut enim posuere mattis. Nullam tristique ipsum vel mauris rhoncus finibus. Nunc tincidunt, augue non pharetra sagittis, libero justo condimentum nisl, eget pellentesque odio dolor in mi. Sed accumsan ex ex, quis pulvinar mi lobortis nec. Sed porta nisl leo, sed luctus massa lacinia ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus turpis, finibus eu magna vel, molestie accumsan odio. Nam enim augue, rutrum et nisi id, convallis feugiat sem.

Pellentesque nibh ligula, condimentum at tristique nec, consequat ac purus. Aliquam vel convallis metus. Curabitur feugiat tellus neque, nec ultrices nisl vestibulum id. Donec pretium, lectus id imperdiet ullamcorper, nunc elit cursus dui, et volutpat urna sapien vitae felis. Mauris ac gravida metus. Sed eu arcu porttitor, feugiat odio non, aliquet neque. Aliquam dapibus dapibus ipsum. Aenean eleifend diam id bibendum ultricies. Integer non consectetur urna.

Donec non congue urna, a fringilla nisl. Phasellus condimentum eget arcu eu maximus. Nullam vitae ex efficitur, mattis tellus non, mattis est. Vestibulum vel nisl sit amet sapien eleifend pellentesque. Pellentesque quis ipsum ac nisi posuere ornare. Etiam quis porta quam. Vestibulum quis fringilla arcu, sed molestie metus. Suspendisse porta, arcu eu congue posuere, nulla odio dignissim dolor, ac interdum sem enim id ex. Curabitur scelerisque metus purus, nec accumsan justo convallis eu. Sed id mollis est. Nullam sed vestibulum quam.

Praesent commodo orci non velit pellentesque, sed mollis leo luctus. Nunc blandit hendrerit lectus a convallis. Aliquam fringilla sollicitudin libero sed lobortis. Donec mattis placerat eros, ut placerat lacus iaculis non. Vestibulum dignissim, lacus eget varius iaculis, leo libero ultricies arcu, sit amet laoreet velit lectus sit amet lectus. Suspendisse eleifend luctus suscipit. In odio tortor, porttitor sit amet risus eget, vestibulum vehicula augue. Proin et orci condimentum, sollicitudin augue et, auctor orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur justo diam, placerat in magna ac, pharetra sollicitudin quam.
	""")

paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
paint_text()
`}>
함수를 만들면 한번 작성한 코드를 재사용 할 수 있어요. 지금은 함수가 간단하기 때문에 좋다고 못 느낄 수 있지만 100줄 200줄 넘어간다고 생각해보세요. 반복적으로 쓰면 손이 아플거에요. 대신 함수 바디에 넣어주면  편리하게 사용할 수 있게되요. 
<div className="h-3"/>
왼쪽에 있는 코드를 실행시켜 볼까요?
			</CodeExplain>

			<Title my="l" size="h2" weight="semi"> 들여쓰기 - whitespaces, indentation, tab </Title>
			<CodeExplain code={
`def say_start():
	print("start")

def say_end():
	print("end")
	
`}>
왼쪽에는 두개의 함수가 정의되어 있어요.이 두 함수는 모두 올바르게 동작해요.
			</CodeExplain>
			<CodeExplain code={
`# 오류!
def say_start():
print("start")

def say_end():
print("end")
				`}>
하지만 여기 왼쪽에 있는 코드는 잘 못된 코드에요. 이유가 뭘까요?
<div className="h-3"/>
<Code>print</Code> 라는 단어 앞에 공백이 없기 때문이에요. 파이썬은 공백에 아주 민감한 언어예요. 탭을 한번 눌러서 공백을 만들 수도 있고 스페이스바를 눌러서 공백을 만들 수 있어요.
			</CodeExplain>

			<CodeExplain code={
`def say_start():
print("start")
`}>
이 코드는 왜 오류가 생기는 걸까요? 
<div className="h-2"/>
함수를 정의할 때는 반드시 함수 바디에 무언가 입력해야 되요.  함수 바디는 공백으로 시작하는데  공백으로 시작되는 함수 바디가 없기 때문에 오류가 생기는 거에요.
			</CodeExplain>
			<CodeExplain code={
`def say_start():
	pass
print("start")
` }>
함수 바디에 어떤 것도 넣고 싶지 않다면, pass 를 넣어도 좋아요.  pass 가 뭔지 이해가 아직 안 되겠지만 지금은 오류를 무시해주는 마법이라고 생각하세요
			</CodeExplain>



		</div>
	)
}
