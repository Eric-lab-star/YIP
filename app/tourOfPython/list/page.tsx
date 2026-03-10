import Code from "@/components/commons/Code";
import CodeBlock from "@/components/commons/CodeBlock";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import TwoColumn from "@/components/commons/TwoColumn";
import TwoColumnDes from "@/components/commons/TwoColumnDes";

export default function Page() {
	return (
		<div className="p-5 mb-100">
			<Title my="m" size="h1"> 리스트list [a, b, c] </Title>
			<Text>
지금까지 우리는 숫자랑 글자(문자열)에 대해서 배웠는데요, 숫자랑 글자만으로는 불편한 경우가 생겨요! 예를 들어 1부터 10까지 숫자 중에서 홀수만 모아보면 1, 3, 5, 7, 9가 되는데, 이걸 숫자나 글자로 표현하려면 너무 불편하겠죠? 마치 소풍 갈 때 가방 없이 김밥, 음료수, 과자를 손으로 들고 가는 것처럼요! 그래서 파이썬에는 여러 가지를 한 번에 담을 수 있는 가방 같은 것이 있는데, 그게 바로 오늘 배울 <Text weight="bold" style="inline-block" mx="x" size="sm">리스트(list)</Text>예요!
			</Text>
			<Title  my="l" size="h2">리스트 만드는 방법 </Title>
			<CodeBlock code={
`#리스트 만들기 
numbers = [1, 2, 3, 4, 5]
`
			}/>
			<Text my="l">
			리스트를 만들 때는 대괄호(`[]`)를 가방이라고 생각하면 돼요. 가방 안에 물건을 넣을 때 하나씩 쉼표(`,`)로 구분해서 넣어주면 끝이에요! 예를 들어 소풍 가방을 싼다면 <Code>["김밥", "음료수", "과자"]</Code> 이렇게 만들 수 있어요! 참 쉽죠? 
			</Text>

			<Title size="h2">리스트의 특징</Title>

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


			<Title size="h2" my="m">리스트의 연산</Title>
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
				}/>
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
				}/>
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
				}/>
				<TwoColumnDes
					title="3. 길이 구하기"
					des={
						<>
파이썬에서는 <Code>len()</Code> 함수를 이용해서 리스트 안에 몇 개의 값이 들어있는지 쉽게 알 수 있어요. 마치 가방 안에 물건이 몇 개 들어있는지 세어보는 것처럼, <Code>len()</Code> 함수에 리스트를 넣으면 리스트의 길이를 숫자로 알려줘요. 예를 들어 <Code>fruits = ["사과", "바나나", "딸기", "포도"]</Code> 라는 리스트가 있을 때 <Code>len(fruits)</Code> 라고 하면 리스트 안에 4개의 값이 들어있기 때문에 <Code>4</Code> 를 반환해줘요. 이러한 <Code>len()</Code> 함수는 리스트의 마지막 요소에 접근하거나 반복문에서 리스트의 끝을 정할 때처럼 실제 프로그래밍에서 매우 자주 활용되는 유용한 함수랍니다.
						</>
					}
				/>
			</TwoColumn>

		</div>
	)
}
