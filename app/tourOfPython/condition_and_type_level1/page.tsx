import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Title from "@/components/commons/Title";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";

export default function() {
	return (
		<div className="p-5 mb-100">
			<Title>조건문과 타입 Level 1</Title>

			<QuizzWithOptions answer={4} question={`1. 코드 실행 결과 "사망"이 출력 되도록 하는 score의 값으로 올바른 것을 고르세요.`}>
				<CodeBlock code={
					`
if score > 50:
    print("생존")
else:
    print("사망")
				`
				} />
				<Option value={1}>80</Option>
				<Option value={2}>70</Option>
				<Option value={3}>60</Option>
				<Option value={4}>50</Option>
			</QuizzWithOptions>

			<QuizzWithOptions answer={2} question={`2. 다음 코드에 관한 설명으로 틀린 것을 고르세요.`}>
				<CodeBlock code={
					`
if distance <= 20:
    print("너무 가까워요.")
else:
    print("사회적 거리두기를 실천중인가요?")
				`
				} />
				<Option value={1}>distance의 값이 100이라면 else 안에 있는 코드가 실행된다.</Option>
				<Option value={2}>distance의 값이 20이라면 else 안에 있는 코드가 실행된다.</Option>
				<Option value={3}>distance의 값이 19라면 if 안에 있는 코드가 실행된다.</Option>
				<Option value={4}>if 다음에 오는 조건이 참인 경우 else 안에 있는 코드는 실행되지 않는다.</Option>
			</QuizzWithOptions>

			<QuizzWithOptions answer={4} question={`3. 다음 코드에 관한 설명으로 틀린 것을 고르세요.`}>
				<CodeBlock code={
					`
if time >= 50:
    print("초록불")
elif time >= 20:
    print("노란불")
else:
    print("빨간불")
				`
				} />
				<Option value={1}>if 의 조건이 참이 되면 초록불이 출력된다.</Option>
				<Option value={2}>time의 값이 20이라면 노란불이 출력된다.</Option>
				<Option value={3}>time의 값이 0 이라면 빨간불이 출력된다.</Option>
				<Option value={4}>빨간불은 조건 없이 항상 출력된다.</Option>
			</QuizzWithOptions>

			<QuizzWithOptions answer={3} question={`4. 다음 코드에 관한 설명으로 틀린 것을 고르세요.`}>
				<CodeBlock code={
					`
def main():
    selected_food = input(
        """
원하는 음식의 번호를 선택하세요.:
1. 피자
2. 햄버거
3. 샐러드 
"""
    )

    if selected_food == "1":
        print("피자를 선택하셨습니다.")
    elif selected_food == "2":
        print("햄버거를 선택하셨습니다.")
    elif selected_food == "3":
        print("샐러드를 선택하셨습니다.")
				`
				} />
				<Option value={1}>selected_food의 타입은 문자열이다.</Option>
				<Option value={2}>코드를 실행후 input함수는 입력을 받을 때까지 기다린다.</Option>
				<Option value={3}>12를 입력할 경우 프로그램이 강제로 종료된다.</Option>
				<Option value={4}>main함수를 실행하지 않으면 어떤 글자도 출력되지 않는다.</Option>
			</QuizzWithOptions>
			<QuizzWithOptions answer={3} question={`5. 다음 코드에 관한 설명으로 틀린 것을 고르세요.`}>
				<CodeBlock code={
					`
try:
    number = int(input("숫자를 입력하세요:  "))
    if number % 2 == 0:
        print("짝수입니다")
    else:
        print("홀수입니다")
except ValueError:
    print("숫자만 입력해주세요")
				`
				} />
				<Option value={1}>number의 값은 문자열이 될 수 없다.</Option>
				<Option value={2}>input함수의 값이 "A"라면 ValueError가 생긴다.</Option>
				<Option value={3}>%는 퍼센트를 의미한다.</Option>
				<Option value={4}>try..except는 오류를 처리해준다.</Option>
			</QuizzWithOptions>

			<QuizzWithOptions answer={3} question={`6. 다음 코드에 관한 설명으로 틀린 것을 고르세요.`}>
				<CodeBlock code={
					`
def main():
    try:
        korean = int(input("국어 성적: "))
        math = int(input("수학 성적: "))
        english = int(input("영어 성적: "))

        if korean < 0 or math < 0 or english < 0:
            print("성적은 음수가 될 수 없습니다.")
            return
        if korean > 100 or math > 100 or english > 100:
            print("성적은 100을 초과할 수 없습니다.")
            return

        if korean >= 90 and math >= 90 and english >= 90:
            print("A")
        elif korean >= 80 and math >= 80 and english >= 80:
            print("B")
        elif korean >= 70 and math >= 70 and english >= 70:
            print("C")
        elif korean >= 60 and math >= 60 and english >= 60:
            print("D")
    except ValueError:
        print("성적은 숫자로 입력해야 합니다.")
				`
				} />
				<Option value={1}> 국어, 영어, 수학 성적에 따라서 등급을 매기는 프로그램이다. </Option>
				<Option value={2}> 3과목 중 한개라도 100보다 큰 값을 입력하면 등급이 나오지 않는다. </Option>
				<Option value={3}>3 과목 중 두개 이상 70점이면 C 등급이 된다.</Option>
				<Option value={4}>int함수는 오류를 만들수 있다.</Option>
			</QuizzWithOptions>
		</div>
	)
}
