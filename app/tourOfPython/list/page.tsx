import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import TwoColumnDes from "@/components/commons/TwoColumnDes";
import { Option } from "@/components/forms/quizz/Option";
import QuizzWithOptions from "@/components/forms/quizz/QuizzWithOptions";
import Link from "next/link";

export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Link href="/tourOfPython/list#title" id="title">
				<Title my="m" size="h1"> 리스트list [a, b, c] </Title>
			</Link>
			<Text>
				지금까지 우리는 숫자랑 글자(문자열)에 대해서 배웠는데요, 숫자랑 글자만으로는 불편한 경우가 생겨요! 예를 들어 1부터 10까지 숫자 중에서 홀수만 모아보면 1, 3, 5, 7, 9가 되는데, 이걸 숫자나 글자로 표현하려면 너무 불편하겠죠? 마치 소풍 갈 때 가방 없이 김밥, 음료수, 과자를 손으로 들고 가는 것처럼요! 그래서 파이썬에는 여러 가지를 한 번에 담을 수 있는 가방 같은 것이 있는데, 그게 바로 오늘 배울 <Text weight="bold" style="inline-block" mx="x" size="sm">리스트(list)</Text>예요!
			</Text>
			<Link href="/tourOfPython/list#how_to_make" id="how_to_make">
				<Title my="l" size="h2">리스트 만드는 방법 </Title>
			</Link>
			<CodeBlock code={
				`#리스트 만들기 
numbers = [1, 2, 3, 4, 5]
`
			} />
			<Text my="l">
				리스트를 만들 때는 대괄호(`[]`)를 가방이라고 생각하면 돼요. 가방 안에 물건을 넣을 때 하나씩 쉼표(`,`)로 구분해서 넣어주면 끝이에요! 예를 들어 소풍 가방을 싼다면 <Code>["김밥", "음료수", "과자"]</Code> 이렇게 만들 수 있어요! 참 쉽죠?
			</Text>


			<Link href={"/tourOfPython/list#features"} id="features">
				<Title size="h2">리스트의 특징</Title>
			</Link>

			<TwoColumn pb={false}>
				<CodeBlock code={
					`
any_list = [1, "안녕", True, 3.14]
`
				} />
				<TwoColumnDes
					title="1. 여러 자료형을 담을 수 있어요."
					des={
						<>
							Java나 C++ 같은 언어에서는 배열을 만들 때 숫자면 숫자, 문자열이면 문자열처럼 **한 가지 타입만** 담을 수 있어서 학생 정보 하나를 저장하려고 해도 이름 배열, 나이 배열, 성적 배열을 따로따로 만들어야 하는 불편함이 있어요. 하지만 파이썬 리스트는 <Code>["Alice", 15, 95.5, True]</Code>처럼 이름, 나이, 성적, 재학여부를 한 번에 하나의 리스트에 담을 수 있어서 코드가 훨씬 간결하고 편리해요.
						</>}
				/>
			</TwoColumn>

			<TwoColumn pb={false}>
				<CodeBlock code={
					`
fruits = ["사과", "바나나", "딸기"]
print(fruits[0])   # 사과  ← 0번부터 시작!
print(fruits[1])   # 바나나
print(fruits[-1])  # 딸기  ← 뒤에서 첫 번째
`
				} />
				<TwoColumnDes
					title="2. 순서가 있어요."
					des={
						<>
							파이썬 리스트의 재미있는 특징 중 하나는 바로 순서가 있다는 거예요. 마치 영화관 좌석처럼 리스트 안의 모든 값들은 자기만의 번호표(인덱스) 를 가지고 있어요. 예를 들어<Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트가 있으면 "사과"는 0번, "바나나"는 1번, "딸기"는 2번 자리에 앉아 있는 거예요! 그래서 <Code>fruits[0]</Code> 이라고 하면 "사과"를, <Code>fruits[1]</Code> 이라고 하면 "바나나"를 바로 꺼낼 수 있어요. 특히 파이썬은 뒤에서부터 세는 것도 가능해서 <Code>fruits[-1]</Code> 이라고 하면 맨 마지막에 있는 "딸기"를 가져올 수 있답니다!
						</>}
				/>

			</TwoColumn>



			<TwoColumn pb={false}>

				<CodeBlock code={
					`
fruits = ["사과", "바나나", "딸기"]
fruits[0] = "포도"
print(fruits)  # ["포도", "바나나", "딸기"]

`

				} />
				<TwoColumnDes
					title="3. 값을 바꿀 수 있어요."
					des={
						<>
							파이썬 리스트의 또 다른 특징은 바로 리스트 안에 있는 값을 자유롭게 바꿀 수 있다는 거예요. 마치 칠판에 적힌 글씨를 지우고 새로 쓰는 것처럼, 리스트 안의 값을 언제든지 원하는 값으로 수정할 수 있어요. 예를 들어 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트에서 "사과"를 "포도"로 바꾸고 싶다면 <Code>fruits[0] = "포도"</Code> 라고 입력하면 리스트가 <Code>["포도", "바나나", "딸기"]</Code> 로 바뀌게 돼요. 이렇게 값을 자유롭게 수정할 수 있는 특징을 프로그래밍에서는 뮤터블(mutable) 하다고 표현하는데, 이 덕분에 데이터를 훨씬 유연하게 다룰 수 있답니다.
						</>}
				/>



			</TwoColumn>

			<TwoColumn pb={false}>
				<CodeBlock code={
					`
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

print(matrix[0][1])  # 2
`
				} />
				<TwoColumnDes
					title="4. 리스트 안에 리스트가 가능해요."
					des={
						<>
							파이썬 리스트의 흥미로운 특징 중 하나는 리스트 안에 또 다른 리스트를 넣을 수 있다는 거예요. 마치 책상 서랍 안에 또 작은 서랍장을 넣는 것처럼, 리스트 안에 리스트를 중첩해서 담을 수 있어요. 예를 들어 <Code>classroom = [["Alice", 15, 95], ["Bob", 16, 87], ["Charlie", 15, 92]]</Code> 처럼 각 학생의 정보를 리스트로 만들고 그것을 다시 하나의 큰 리스트에 담을 수 있어요. 이때 특정 학생의 정보에 접근하려면 <Code>classroom[0]</Code> 으로 첫 번째 학생의 리스트 전체를 가져올 수 있고, <Code>classroom[0][2]</Code> 처럼 대괄호를 두 번 사용하면 첫 번째 학생의 성적인 95까지 바로 꺼낼 수 있답니다.
						</>}
				/>
			</TwoColumn>

			<TwoColumn pb={false}>

				<CodeBlock code={
					`
fruits = ["사과", "바나나"]

fruits.append("딸기")   # 추가
print(fruits)  # ["사과", "바나나", "딸기"]

fruits.remove("사과")   # 삭제
print(fruits)  # ["바나나", "딸기"]
`
				} />

				<TwoColumnDes
					title="5. 크기가 자유로워요"
					des={
						<>
							파이썬 리스트의 편리한 특징 중 하나는 리스트의 크기가 자유롭다는 거예요. 다른 언어에서는 배열을 만들 때 크기를 미리 정해야 하는 경우가 많지만, 파이썬 리스트는 언제든지 값을 추가하거나 삭제할 수 있어요. 마치 늘어나는 마법 가방처럼 필요할 때마다 물건을 넣고 뺄 수 있는 거죠. 예를 들어 <Code>fruits = ["사과", "바나나"]</Code> 라는 리스트에 새로운 과일을 추가하고 싶다면 <Code>fruits.append("딸기")</Code> 를 사용하면 <Code>["사과", "바나나", "딸기"]</Code> 로 늘어나고, 반대로 "사과"를 삭제하고 싶다면 <Code>fruits.remove("사과")</Code> 를 사용하면 <Code>["바나나", "딸기"]</Code> 로 줄어들어요. 이처럼 리스트는 크기에 제한이 없기 때문에 데이터가 얼마나 늘어나거나 줄어들지 미리 알 수 없는 상황에서 특히 유용하게 사용할 수 있답니다.
						</>
					}
				/>
			</TwoColumn>


			<TwoColumn pb={false}>
				<CodeBlock code={
					`
fruits = ["사과", "바나나"]

fruits.append("딸기")   # 추가
print(fruits)  # ["사과", "바나나", "딸기"]

fruits.remove("사과")   # 삭제
print(fruits)  # ["바나나", "딸기"]
`
				} />

				<TwoColumnDes
					title="6. 슬라이싱으로 잘라낼 수 있어요. "
					des={
						<>
							파이썬 리스트의 강력한 기능 중 하나는 슬라이싱을 이용해서 리스트의 원하는 부분만 잘라낼 수 있다는 거예요. 마치 김밥을 원하는 크기만큼 잘라서 먹는 것처럼, 리스트도 원하는 구간만큼 잘라서 사용할 수 있어요. 슬라이싱은 <Code>리스트[시작:끝]</Code> 형식으로 사용하는데, 예를 들어 <Code>numbers = [1, 2, 3, 4, 5]</Code> 라는 리스트에서 <Code>numbers[1:3]</Code> 이라고 하면 1번 인덱스부터 3번 인덱스 바로 앞까지인 <Code>[2, 3]</Code> 을 가져올 수 있어요. 또한 시작 번호를 생략하면 처음부터, 끝 번호를 생략하면 마지막까지 잘라주기 때문에 <Code>numbers[:3]</Code> 은 <Code>[1, 2, 3]</Code> 을, <Code>numbers[2:]</Code> 는 <Code>[3, 4, 5]</Code> 를 가져올 수 있답니다.
						</>}
				/>
			</TwoColumn>

			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [1, 1, 2, 2, 3, 3]  # 중복 OK! ✅
`
				} />

				<TwoColumnDes
					title="7. 중복된 값을 허용해요. "
					des={
						<>
							파이썬 리스트의 또 다른 특징은 중복된 값을 허용한다는 거예요. 즉, 리스트 안에 똑같은 값이 여러 번 들어가도 아무런 문제가 없어요. 마치 학급 명단에 같은 이름을 가진 학생이 여러 명 있을 수 있는 것처럼, 리스트도 동일한 값을 얼마든지 담을 수 있어요. 예를 들어 <Code>numbers = [1, 1, 2, 2, 3, 3]</Code> 처럼 같은 숫자가 여러 번 들어가도 되고, <Code>names = ["Alice", "Bob", "Alice", "Charlie"]</Code> 처럼 같은 이름이 반복되어도 괜찮아요. 이러한 특징은 예를 들어 학생들의 시험 점수를 기록할 때 여러 학생이 같은 점수를 받았더라도 모든 점수를 빠짐없이 저장할 수 있어서 실제 데이터를 다루는 상황에서 매우 유용하게 활용될 수 있답니다.
						</>
					}
				/>
			</TwoColumn>


			<Link href={"/tourOfPython/list#plus_repeat"} id="plus_repeat">
				<Title size="h2" my="m">리스트의 연산</Title>
			</Link>
			<Text>
				파이썬 리스트는 덧셈과 곱셈 연산이 가능하다는 재미있는 특징이 있어요. 먼저 두 개의 리스트를 더하면 두 리스트가 하나로 합쳐지는데, 예를 들어 <Code>["사과", "바나나"] + ["딸기", "포도"]</Code> 라고 하면 <Code>["사과", "바나나", "딸기", "포도"]</Code> 처럼 두 리스트가 하나로 연결돼요. 마치 두 줄로 서 있던 학생들이 하나의 줄로 합쳐지는 것처럼요. 또한 리스트에 숫자를 곱하면 리스트가 그 숫자만큼 반복되는데, <Code>[1, 2, 3] * 3</Code> 이라고 하면 <Code>[1, 2, 3, 1, 2, 3, 1, 2, 3]</Code> 처럼 리스트가 3번 반복된 결과를 얻을 수 있어요. 이러한 리스트 연산은 데이터를 합치거나 반복적인 초기값을 설정할 때 매우 편리하게 활용할 수 있답니다.
			</Text>


			<TwoColumn pb={false}>
				<CodeBlock
					code={
						`
a = [1,2,3]
b = [4,5,6]
`
					} />
				<TwoColumnDes
					title="1. 리스트 더하기"
					des={
						<>
							파이썬 리스트는 더하기 연산을 이용해서 두 개의 리스트를 하나로 합칠 수 있어요. 마치 두 반의 학생들을 한 반으로 합치는 것처럼, 더하기 연산자 <Code>+</Code> 를 사용하면 두 리스트가 순서대로 하나로 연결돼요. 예를 들어 <Code>a = [1, 2, 3]</Code> 과 <Code>b = [4, 5, 6]</Code> 이라는 두 리스트가 있을 때 <Code>a + b</Code> 라고 하면 <Code>[1, 2, 3, 4, 5, 6]</Code> 처럼 앞 리스트 뒤에 뒷 리스트가 순서대로 붙어서 하나의 새로운 리스트가 만들어져요. 이때 원래의 리스트인 <Code>a</Code> 와 <Code>b</Code> 는 변하지 않고 그대로 유지된다는 점도 기억해 두면 좋답니다.
						</>
					}
				/>
			</TwoColumn>
			<TwoColumn pb={false}>
				<CodeBlock
					code={
						`
a = [1] * 2
b = [2,3,5,7,11]
c = b * 3
`
					} />
				<TwoColumnDes
					title="2. 리스트 반복하기"
					des={
						<>
							파이썬 리스트는 곱하기 연산을 이용해서 리스트를 원하는 횟수만큼 반복할 수 있어요. 마치 같은 도장을 여러 번 찍는 것처럼, 곱하기 연산자 <Code>*</Code> 를 사용하면 리스트 안의 내용이 그 숫자만큼 반복된 새로운 리스트가 만들어져요. 예를 들어 <Code>a = [1, 2, 3]</Code> 이라는 리스트가 있을 때 <Code>a * 3</Code> 이라고 하면 <Code>[1, 2, 3, 1, 2, 3, 1, 2, 3]</Code> 처럼 리스트의 내용이 3번 반복된 결과를 얻을 수 있어요. 이러한 곱하기 연산은 예를 들어 <Code>[0] * 10</Code> 처럼 초기값이 0인 리스트를 한 번에 만들어야 할 때 매우 편리하게 활용할 수 있답니다.
						</>
					}
				/>
			</TwoColumn>
			<TwoColumn pb={false}>
				<CodeBlock
					code={
						`
numbers = [1,2,3,4]
l = len(numbers)
`
					} />
				<TwoColumnDes
					title="3. 길이 구하기"
					des={
						<>
							파이썬에서는 <Code>len()</Code> 함수를 이용해서 리스트 안에 몇 개의 값이 들어있는지 쉽게 알 수 있어요. 마치 가방 안에 물건이 몇 개 들어있는지 세어보는 것처럼, <Code>len()</Code> 함수에 리스트를 넣으면 리스트의 길이를 숫자로 알려줘요. 예를 들어 <Code>fruits = ["사과", "바나나", "딸기", "포도"]</Code> 라는 리스트가 있을 때 <Code>len(fruits)</Code> 라고 하면 리스트 안에 4개의 값이 들어있기 때문에 <Code>4</Code> 를 반환해줘요. 이러한 <Code>len()</Code> 함수는 리스트의 마지막 요소에 접근하거나 반복문에서 리스트의 끝을 정할 때처럼 실제 프로그래밍에서 매우 자주 활용되는 유용한 함수랍니다.
						</>
					}
				/>
			</TwoColumn>

			<Link id="edit" href={"/tourOfPython/list#edit"} >
				<Title size="h2" my="m">리스트의 수정과 삭제</Title>
			</Link>
			<Text>
				파이썬 리스트는 이미 들어있는 값을 자유롭게 수정하거나 삭제할 수 있어요. 먼저 값을 수정할 때는 인덱스를 이용해서 원하는 위치의 값을 새로운 값으로 바꿀 수 있는데, 예를 들어 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트에서 "바나나"를 "포도"로 바꾸고 싶다면 <Code>fruits[1] = "포도"</Code> 라고 하면 리스트가 <Code>["사과", "포도", "딸기"]</Code> 로 수정돼요. 값을 삭제할 때는 두 가지 방법을 사용할 수 있는데, <Code>remove()</Code> 를 사용하면 리스트에서 원하는 값을 직접 찾아서 삭제할 수 있고, 예를 들어 <Code>fruits.remove("사과")</Code> 라고 하면 "사과"가 리스트에서 사라져요. 또한 <Code>del</Code> 키워드를 사용하면 인덱스로 원하는 위치의 값을 삭제할 수 있는데, <Code>del fruits[0]</Code> 이라고 하면 0번 인덱스에 있는 값이 삭제된답니다.
			</Text>

			<TwoColumn pb={false}>
				<CodeBlock code={
					`
fruits = ['사과', '바나나', '딸기']
fruits[1] = '포도'

ive = ['장원영', '이서', '레이']
ive[0:2] = ['안유진', '리즈']

`}
				/>
				<TwoColumnDes title="리스트 수정" des={
					<>
						파이썬 리스트는 이미 들어있는 값을 원하는 값으로 자유롭게 수정할 수 있어요. 값을 수정할 때는 인덱스를 이용해서 원하는 위치를 지정한 다음 새로운 값을 대입하면 되는데, 마치 칠판에 적힌 글씨를 지우고 새로운 글씨를 쓰는 것처럼 간단하게 바꿀 수 있어요. 예를 들어 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트에서 "바나나"를 "포도"로 바꾸고 싶다면 <Code>fruits[1] = "포도"</Code> 라고 입력하면 리스트가 <Code>["사과", "포도", "딸기"]</Code> 로 수정돼요. 또한 한 번에 여러 개의 값을 수정하고 싶다면 슬라이싱을 이용해서 <Code>fruits[0:2] = ["수박", "포도"]</Code> 처럼 원하는 구간의 값을 한꺼번에 바꿀 수도 있답니다.
					</>
				} />
			</TwoColumn>

			<TwoColumn pb={false}>
				<CodeBlock code={
					`
colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        ] # 색깔 리스트

colors.remove('red') # red 삭제

del colors[0] # orange 삭제

colors.pop(0) # yellow 삭제
`}
				/>
				<TwoColumnDes title="리스트 값 삭제" des={
					<>
						파이썬 리스트에서 값을 삭제하는 방법은 크게 세 가지가 있어요. 첫 번째로 <Code>remove()</Code> 를 사용하면 삭제하고 싶은 값을 직접 지정해서 삭제할 수 있는데, 예를 들어 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트에서 <Code>fruits.remove("바나나")</Code> 라고 하면 "바나나"가 리스트에서 사라져 <Code>["사과", "딸기"]</Code> 가 돼요. 두 번째로 <Code>del</Code> 키워드를 사용하면 인덱스로 원하는 위치의 값을 삭제할 수 있는데, <Code>del fruits[0]</Code> 이라고 하면 0번 인덱스에 있는 "사과"가 삭제돼요. 세 번째로 <Code>pop()</Code> 을 사용하면 리스트의 맨 마지막 값을 삭제하면서 동시에 그 값을 반환해주는데, <Code>fruits.pop()</Code> 이라고 하면 맨 마지막에 있는 값이 삭제되면서 해당 값을 돌려줘서 삭제된 값을 다른 곳에서 활용할 수도 있답니다.
					</>
				} />
			</TwoColumn>

			<Link href={"/tourOfPython/list#method"} id="medthod">
				<Title size="h2" my="m"> 리스트 메소드 </Title>
			</Link>
			<Text>
				파이썬 리스트는 다양한 메소드를 제공해서 리스트를 더욱 편리하게 다룰 수 있어요. 마치 스마트폰에 여러 가지 기능이 내장되어 있는 것처럼, 리스트에도 자주 사용하는 기능들이 미리 만들어져 있어요. 값을 추가할 때는 <Code>append()</Code> 로 맨 뒤에 값을 추가하거나 <Code>insert()</Code> 로 원하는 위치에 값을 삽입할 수 있고, 값을 삭제할 때는 <Code>remove()</Code> 로 특정 값을 삭제하거나 <Code>pop()</Code> 으로 맨 마지막 값을 삭제할 수 있어요. 또한 <Code>sort()</Code> 를 사용하면 리스트의 값을 오름차순으로 정렬할 수 있고, <Code>reverse()</Code> 를 사용하면 리스트의 순서를 뒤집을 수 있으며, <Code>count()</Code> 를 사용하면 특정 값이 리스트 안에 몇 개 들어있는지 셀 수 있고, <Code>index()</Code> 를 사용하면 특정 값이 리스트의 몇 번째 인덱스에 있는지 찾을 수 있답니다.
			</Text>


			<Link href={"/tourOfPython/list#append"} id="append" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        ]
colors.append('purple')
`}
				/>
				<TwoColumnDes title="1. 덧붙이기 append()" des={
					<>
						파이썬 리스트에서 <Code>append()</Code> 는 리스트의 맨 끝에 새로운 값을 추가할 때 사용하는 메소드예요. 마치 줄을 서 있는 사람들의 맨 뒤에 새로운 사람이 줄을 서는 것처럼, <Code>append()</Code> 를 사용하면 리스트의 맨 마지막 자리에 값이 추가돼요. 예를 들어 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트에서 <Code>fruits.append("포도")</Code> 라고 하면 리스트가 <Code>["사과", "바나나", "딸기", "포도"]</Code> 로 바뀌어요. 또한 <Code>append()</Code> 는 숫자, 문자열뿐만 아니라 리스트도 추가할 수 있는데, <Code>fruits.append([1, 2, 3])</Code> 처럼 리스트를 넣으면 <Code>["사과", "바나나", "딸기", [1, 2, 3]]</Code> 처럼 리스트 안에 리스트가 통째로 추가된다는 점도 기억해 두면 좋답니다.
					</>} />
			</TwoColumn>

			<Link href={"/tourOfPython/list#sort"} id="sort" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [
    100,
    19,
    98,
    32,
    6,
    1,
]

n = sorted(numbers)
print(f"numbers: {numbers}")
`
				} />
				<TwoColumnDes title="2. 정렬하기 sort()" des={
					<>
						파이썬 리스트에서 <Code>sort()</Code> 는 리스트 안의 값들을 순서대로 정렬할 때 사용하는 메소드예요. 마치 키 순서대로 학생들을 줄 세우는 것처럼, <Code>sort()</Code> 를 사용하면 리스트 안의 값들이 자동으로 오름차순으로 정렬돼요. 예를 들어 <Code>numbers = [3, 1, 4, 1, 5, 9, 2, 6]</Code> 이라는 리스트에서 <Code>numbers.sort()</Code> 라고 하면 리스트가 <Code>[1, 1, 2, 3, 4, 5, 6, 9]</Code> 처럼 작은 수부터 큰 수 순서로 정렬돼요. 만약 반대로 큰 수부터 작은 수 순서인 내림차순으로 정렬하고 싶다면 <Code>numbers.sort(reverse=True)</Code> 처럼 <Code>reverse=True</Code> 옵션을 추가하면 되고, 문자열 리스트에서도 <Code>fruits.sort()</Code> 처럼 사용하면 알파벳 순서대로 정렬할 수 있어요. 단, <Code>sort()</Code> 는 원본 리스트 자체를 변경하기 때문에 원본 리스트를 유지하고 싶다면 <Code>sorted()</Code> 함수를 대신 사용하는 것이 좋답니다.
					</>} />
			</TwoColumn>
			<Link href={"/tourOfPython/list#reverse"} id="reverse" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [
    100,
    19,
    98,
    32,
    6,
    1,
]

n = numbers[::1]
numbers.reverse()
`
				} />

				<TwoColumnDes title="3. 리버스 reverse()" des={
					<>
						파이썬 리스트에서 <Code>reverse()</Code> 는 리스트 안의 값들의 순서를 거꾸로 뒤집을 때 사용하는 메소드예요. 마치 줄을 서 있는 사람들이 뒤돌아서 반대 방향으로 줄을 서는 것처럼, <Code>reverse()</Code> 를 사용하면 리스트 안의 값들이 반대 순서로 뒤집혀요. 예를 들어 <Code>numbers = [1, 2, 3, 4, 5]</Code> 라는 리스트에서 <Code>numbers.reverse()</Code> 라고 하면 리스트가 <Code>[5, 4, 3, 2, 1]</Code> 처럼 순서가 완전히 뒤집혀요. 문자열 리스트에서도 마찬가지로 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 에서 <Code>fruits.reverse()</Code> 를 사용하면 <Code>["딸기", "바나나", "사과"]</Code> 처럼 순서가 뒤집혀요. 단, <Code>sort()</Code> 와 마찬가지로 <Code>reverse()</Code> 도 원본 리스트 자체를 직접 변경하기 때문에 원본 리스트를 유지하고 싶다면 슬라이싱을 이용해서 <Code>numbers[::-1]</Code> 처럼 사용하는 것이 좋답니다.
					</>
				} />
			</TwoColumn>
			<Link href={"/tourOfPython/list#index"} id="index" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [
    100,
    19,
    98,
    32,
    6,
    1,
]

n = numbers.index(1)
`
				} />
				<TwoColumnDes title="4. 번호 알아내기 index()" des={
					<>
						파이썬 리스트에서 <Code>index()</Code> 는 리스트 안에서 원하는 값이 몇 번째 인덱스에 위치하고 있는지 찾아주는 메소드예요. 마치 책의 목차에서 원하는 내용이 몇 페이지에 있는지 찾아보는 것처럼, <Code>index()</Code> 를 사용하면 특정 값의 위치를 숫자로 알려줘요. 예를 들어 <Code>fruits = ["사과", "바나나", "딸기", "포도"]</Code> 라는 리스트에서 <Code>fruits.index("딸기")</Code> 라고 하면 "딸기"가 2번 인덱스에 있기 때문에 <Code>2</Code> 를 반환해줘요. 만약 리스트 안에 같은 값이 여러 개 있다면 <Code>index()</Code> 는 가장 먼저 발견된 값의 인덱스만 반환하고, 리스트 안에 없는 값을 찾으려고 하면 <Code>ValueError</Code> 라는 오류가 발생하기 때문에 찾으려는 값이 리스트 안에 있는지 먼저 확인한 후 사용하는 것이 좋답니다.
					</>
				} />
			</TwoColumn>
			<Link href={"/tourOfPython/list#insert"} id="insert" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [
    100,
    19,
    98,
    32,
    6,
    1,
]

numbers.insert(1, 3)
`
				} />
				<TwoColumnDes title="5. 삽입하기 insert()" des={
					<>
						파이썬 리스트에서 <Code>insert()</Code> 는 리스트의 원하는 위치에 새로운 값을 삽입할 때 사용하는 메소드예요. <Code>append()</Code> 가 무조건 맨 끝에만 값을 추가하는 것과 달리, <Code>insert()</Code> 는 원하는 위치를 직접 지정해서 값을 넣을 수 있어요. 마치 줄을 서 있는 사람들 사이에 새로운 사람이 원하는 자리에 끼어드는 것처럼요. 사용 방법은 <Code>insert(인덱스, 값)</Code> 형식으로 첫 번째 인자에는 삽입할 위치의 인덱스를, 두 번째 인자에는 삽입할 값을 넣으면 되는데, 예를 들어 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트에서 <Code>fruits.insert(1, "포도")</Code> 라고 하면 1번 인덱스 자리에 "포도"가 삽입되어 리스트가 <Code>["사과", "포도", "바나나", "딸기"]</Code> 로 바뀌어요. 이때 삽입된 위치 이후의 값들은 자동으로 한 칸씩 뒤로 밀려나기 때문에 기존의 값들이 사라지지 않고 그대로 유지된답니다.
					</>
				} />
			</TwoColumn>
			<Link href={"/tourOfPython/list#remove"} id="remove" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [100, 0, 1, 100]
numbers.remove(100)
`
				} />

				<TwoColumnDes title="6. 제거하기 remove() " des={
					<>
						파이썬 리스트에서 <Code>remove()</Code> 는 리스트 안에서 원하는 값을 찾아서 삭제할 때 사용하는 메소드예요. 인덱스로 위치를 지정해서 삭제하는 <Code>del</Code> 키워드와 달리, <Code>remove()</Code> 는 삭제하고 싶은 값을 직접 지정할 수 있어서 값의 위치를 몰라도 편리하게 삭제할 수 있어요. 마치 줄을 서 있는 사람들 중에서 이름을 불러서 그 사람만 줄에서 빠지게 하는 것처럼요. 예를 들어 <Code>fruits = ["사과", "바나나", "딸기", "포도"]</Code> 라는 리스트에서 <Code>fruits.remove("바나나")</Code> 라고 하면 "바나나"가 리스트에서 삭제되어 <Code>["사과", "딸기", "포도"]</Code> 로 바뀌어요. 단, 리스트 안에 같은 값이 여러 개 있을 경우 <Code>remove()</Code> 는 가장 먼저 발견된 값 하나만 삭제하고, 리스트 안에 없는 값을 삭제하려고 하면 <Code>ValueError</Code> 오류가 발생하기 때문에 삭제하려는 값이 리스트 안에 있는지 먼저 확인한 후 사용하는 것이 좋답니다.
					</>} />
			</TwoColumn>
			<Link href={"/tourOfPython/list#pop"} id="pop" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [100, 0, 1, 100]
numbers.pop(0)
`} />

				<TwoColumnDes title="7. 꺼내기  pop() " des={
					<>
						파이썬 리스트에서 <Code>pop()</Code> 은 리스트에서 특정 위치의 값을 삭제하면서 동시에 그 값을 반환해주는 메소드예요. 마치 줄의 맨 끝에 서 있는 사람을 불러내면서 그 사람이 누구인지 알려주는 것처럼, <Code>pop()</Code> 은 값을 삭제하는 동시에 삭제된 값을 돌려줘요. 기본적으로 인자 없이 <Code>fruits.pop()</Code> 처럼 사용하면 리스트의 맨 마지막 값이 삭제되면서 반환되는데, 예를 들어 <Code>fruits = ["사과", "바나나", "딸기"]</Code> 라는 리스트에서 <Code>fruits.pop()</Code> 을 사용하면 "딸기"가 삭제되면서 "딸기"를 반환하고 리스트는 <Code>["사과", "바나나"]</Code> 로 바뀌어요. 또한 <Code>fruits.pop(0)</Code> 처럼 인덱스를 직접 지정하면 해당 위치의 값을 삭제하면서 반환할 수도 있는데, 이처럼 삭제된 값을 반환해준다는 점이 <Code>remove()</Code> 나 <Code>del</Code> 과의 가장 큰 차이점이라고 할 수 있답니다.
					</>} />
			</TwoColumn>
			<Link href={"/tourOfPython/list#count"} id="count" />
			<TwoColumn pb={false}>
				<CodeBlock code={
					`
numbers = [100, 0, 1, 100]
a = numbers.count(100)
`} />

				<TwoColumnDes title="8. 갯수 파악하기  count() " des={

					<>
						파이썬 리스트에서 <Code>count()</Code> 는 리스트 안에 특정 값이 몇 번 들어있는지 세어주는 메소드예요. 마치 교실에서 같은 이름을 가진 학생이 몇 명인지 세어보는 것처럼, <Code>count()</Code> 를 사용하면 원하는 값이 리스트 안에 몇 개 있는지 숫자로 알려줘요. 예를 들어 <Code>numbers = [1, 2, 3, 2, 1, 2, 4, 5]</Code> 라는 리스트에서 <Code>numbers.count(2)</Code> 라고 하면 숫자 2가 리스트 안에 3번 들어있기 때문에 <Code>3</Code> 을 반환해줘요. 문자열 리스트에서도 마찬가지로 <Code>fruits = ["사과", "바나나", "사과", "딸기", "사과"]</Code> 에서 <Code>fruits.count("사과")</Code> 라고 하면 "사과"가 3번 들어있기 때문에 <Code>3</Code> 을 반환하고, 만약 리스트 안에 없는 값을 찾으려고 하면 오류 없이 <Code>0</Code> 을 반환해준다는 점이 <Code>index()</Code> 와의 차이점이라고 할 수 있답니다.
					</>} />
			</TwoColumn>

		</div>
	)
}
