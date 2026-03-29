import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";

export default async function Page() {
	
	return (
		<div className="p-5 mb-30">
		<Title my="m">함수 연습하기</Title>

		<Title size="h2">Level 1 </Title>
		<Text>개념 확인 문제를 풀어보면서 실력을 쌓으세요.</Text>


		<QuizzWithOptions answer={4} question="1. 아래 함수의 이름으로 올바른 것을 고르세요.">
			<CodeBlock code={
				`
def say_hello():
    print("hello")
				`
			}/>
			<Option value={1}>hello</Option>
			<Option value={2}>def</Option>
			<Option value={3}>say</Option>
			<Option value={4}>say_hello</Option>
		</QuizzWithOptions>

		<QuizzWithOptions answer={3} question="2. 아래 함수의 이름으로 올바른 것을 고르세요.">
			<CodeBlock code={
				`
def main(x,y):
	"""함수이름 """
    print("This is main function")
    print("header")
    print("body")
    print("footer")
				`
			}/>
			<Option value={1}>print</Option>
			<Option value={2}>header</Option>
			<Option value={3}>main</Option>
			<Option value={4}>say_hello</Option>
		</QuizzWithOptions>


		<QuizzWithOptions answer={3} question="3. 아래 함수를 실행하는 방법으로 올바른 것을 고르세요.">

			<CodeBlock code={
				`
def title(text):
    print(text.center(30, "="))
				`
			}/>
			<Option value={1}>coffee(20)</Option>
			<Option value={2}>body([])</Option>
			<Option value={3}>title("python")</Option>
			<Option value={4}>title()</Option>
		</QuizzWithOptions>


		<QuizzWithOptions answer={3} question="4. 아래 함수를 실행하는 방법으로 올바른 것을 고르세요.">
			<CodeBlock code={
				`
def createBox(w,h,c="black"):
    if type(w) is not int:
        raise TypeError

    if type(h) is not int:
        raise TypeError
				`
			}/>
			<Option value={1}>createBox(10)</Option>
			<Option value={2}>createBox()</Option>
			<Option value={3}>createBox(100, 100)</Option>
			<Option value={4}>start()</Option>
		</QuizzWithOptions>


		<QuizzWithOptions answer={3} question="5. 다음 설명 중 틀린 것을 고르세요.">
			<CodeBlock code={
				`
def createBox():
    width = 20
    height = 5

    print("┌" + "─" * (width - 2) + "┐")
    for _ in range(height - 2):
        print("│" + " " * (width - 2) + "│")
    print("└" + "─" * (width - 2) + "┘")


createMsg(msg):
    return msg.center(20)

def main():
    createMsg("")
    createBox()

main()
				`
			}/>
			<Option value={1}> 12번째 줄에서 def가 없어서 오류가 생긴다.</Option>
			<Option value={2}>width와 height는 createBox 안에서 만 사용할 수 있다.</Option>
			<Option value={3}>19번째 줄에서 main함수를 새롭게 정의하고 있다.</Option>
			<Option value={4}>createMsg의 매개변수는 msg이다.</Option>
		</QuizzWithOptions>


		<QuizzWithOptions answer={2} question="6. 다음 설명 중 틀린 것을 고르세요.">
			<CodeBlock code={
				`
def ice_maker(str):
    return "ice " + str

drink = "coffee"

drink = ice_maker(drink)

print(drink)
				`
			}/>

			<Option value={1}>drink는 변수이다.</Option>
			<Option value={2}>위 코드를 실행하면 ice_coffee가 출력된다.</Option>
			<Option value={3}>return은 ice_maker 함수를 종료 시키고, "ice" + str 값을 반환한다.</Option>
			<Option value={4}>ice_maker에서 return이 없다면 drink의 값은 None가 된다.</Option>
		</QuizzWithOptions>

		<QuizzWithOptions answer={2} question="다음 설명 중 틀린 것을 고르세요.">
			<Option value={1}>함수를 정의할 때는 def를 반드시 입력해야한다.</Option>
			<Option value={2}>함수를 정의하면 함수가 자동으로 실행된다.</Option>
			<Option value={3}>매개변수는 함수안에서만 사용할 수 있다.</Option>
			<Option value={4}>return은 함수 내부의 값을 외부로 반환한다.</Option>
		</QuizzWithOptions>
		</div>
	)
}
