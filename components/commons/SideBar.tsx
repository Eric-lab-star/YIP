"use client";

import { usePathname } from 'next/navigation'
import { useLayoutCtx } from "./LayoutContexWrapper";
import { SideBarTree, SideBarTreeItem } from './SideBarItems';
import Title from './Title';
import { useEffect, useState } from 'react';

export default function SideBar() {
	const pathname = usePathname()
	const root = pathname.split("/")[1]
	const { isSideBarOpen } = useLayoutCtx()
	const [items, setItems] = useState<SideBarTreeItem[]>([])

	useEffect(() => {
		setItems(itemSelector(root))
	}, [pathname])

	const [title, setTitle] = useState("")

	useEffect(() => {
		setTitle(titleSelector(root))
	}, [root])

	return (
		<>
			{
				isSideBarOpen &&
				<div className="w-65 bg-zinc-200 overflow-y-scroll">
					<Title size='h2' mx={"m"} weight='semi'>{title} </Title>
					<SideBarTree sideBarTree={items} />
				</div>
			}
		</>
	)
}

const titleSelector = (root: string) => {
	switch (root) {
		case "students":
			return "My Info"
		case "tourOfPython":
			return "Tour of Python"
		case "login":
			return "Login"
		default:
			return ""
	}

}

const itemSelector = (path: string) => {
	switch (path) {
		case "tourOfPython":
			return pythonLangCurriculum
		case "students":
			return studentPage
		case "login":
			return []
		default:
			return []
	}
}


const studentPage: SideBarTreeItem[] = [
]






const pythonLangCurriculum: SideBarTreeItem[] = [
	{
		name: "편집기",
		files: [
			{
				name: "편집기 소개",
				url: "/tourOfPython/helloworld"
			},
			{
				name: "대표편집기",
				url: "/tourOfPython/helloworld#editor"
			},
			{
				name: "vscode 실행하기",
				url: "/tourOfPython/helloworld#vscode"
			}
		]
	},
	{
		name: "변수, 문자열, 불리언",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/variable_string_boolean#title"
			},
			{
				name: "변수",
				url: "/tourOfPython/variable_string_boolean#variable"
			},
			{
				name: "문자열",
				url: "/tourOfPython/variable_string_boolean#string"
			},
			{
				name: "불리언",
				url: "/tourOfPython/variable_string_boolean#boolean"
			},
		],
	},
	{
		name: "파이썬 함수",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/functions#title"
			},
			{
				name: "함수를 만들자",
				url: "/tourOfPython/functions#create"
			},
			{
				name: "간단한 함수",
				url: "/tourOfPython/functions#simple_create"
			},
			{
				name: "왜 만들까?",
				url: "/tourOfPython/functions#why_create"
			},
			{
				name: "함수의 몸체",
				url: "/tourOfPython/functions#function_body"
			},
			{
				name: "매개변수와 인수",
				url: "/tourOfPython/functions#parameter"
			},
			{
				name: "퀴즈",
				url: "/tourOfPython/functions#quizz"
			}
		]
	},
	{
		name: "함수 연습문제",
		files: [
			{
				name: "도전! say_hello() ",
				url: "/tourOfPython/challenge_hello"
			},
			{
				name: "도전! 사칙연산",
				url: "/tourOfPython/challenge_arithmetic"
			},
		],
	},
	{
		name: "input(), type(), int(), try..catch",
		files: [
			{
				name: "입력받기  input()",
				url: "/tourOfPython/input_type_int#input",
			},

			{
				name: "형태 type()",
				url: "/tourOfPython/input_type_int#type",
			},

			{
				name: "정수형",
				url: "/tourOfPython/input_type_int#int",
			},
			{
				name: "예외처리",
				url: "/tourOfPython/input_type_int#try_catch"
			}
		]
	},
	{
		name: "if, else, elif",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/if#title",
			},
			{
				name: "왜 사용할까?",
				url: "/tourOfPython/if#why",
			},
			{
				name: "else",
				url: "/tourOfPython/if#else",
			},
			{
				name: "elif",
				url: "/tourOfPython/if#elif",
			},
			{
				name: "퀴즈",
				url: "/tourOfPython/if#quizz"
			}
		]
	},

	{
		name: "and or not",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/and_or_not#title"
			},
			{
				name: "and",
				url: "/tourOfPython/and_or_not#and",
			},
			{
				name: "or",
				url: "/tourOfPython/and_or_not#or"
			},
			{
				name: "not",
				url: "/tourOfPython/and_or_not#not"
			},
		]
	},

	{
		name: "강아지와 고양이 1",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/cat_or_dog#title",
			},
			{
				name: "start()",
				url: "/tourOfPython/cat_or_dog#start",
			},

			{
				name: "cat_or_dog()",
				url: "/tourOfPython/cat_or_dog#cat_or_dog",
			},
			{
				name: "에러 만들기",
				url: "/tourOfPython/cat_or_dog#raise_error"
			},
			{
				name: "중간점검",
				url: "/tourOfPython/cat_or_dog#checkpoint"
			},

		]
	},
	{
		name: "강아지와 고양이 2",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/cat_or_dog2#title"
			},
			{
				name: "suggest()",
				url: "/tourOfPython/cat_or_dog2#suggest"
			},
			{
				name: "모든 코드",
				url: "/tourOfPython/cat_or_dog2#birdEyeView"
			},
		],
	},
	{
		name: "반복문 loop",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/loop",
			},
			{
				name: "while",
				url: "/tourOfPython/loop#while",
			},
			{
				name: "for...in",
				url: "/tourOfPython/loop#for_in"
			},
			{
				name: "break",
				url: "/tourOfPython/loop#break",
			},
			{
				name: "continue",
				url: "/tourOfPython/loop#continue"
			},
			{
				name: "무한 루프",
				url: "/tourOfPython/loop#infinite_loop"
			},
			{
				name: "퀴즈",
				url: "/tourOfPython/loop#quiz"
			}
		]
	},
	{
		name: "파이썬 표준 라이브러리",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/library",
			},
			{
				name: "input()",
				url: "/tourOfPython/library#input"
			},
			{
				name: "int(), float()",
				url: "/tourOfPython/library#int_float"
			},
			{
				name: "len()",
				url: "/tourOfPython/library#len"
			},
			{
				name: "range()",
				url: "/tourOfPython/library#range"
			},
			{
				name: "min(), max()",
				url: "/tourOfPython/library#min_max"
			},
			{
				name: "표준 라이브러리",
				url: "/tourOfPython/library#standard_library"
			}
		],
	},
	{
		name: "숫자	맞추기 게임 만들기",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/numberGuessingGame"
			},
			{
				name: "타이틀 만들기",
				url: "/tourOfPython/numberGuessingGame#title",
			},
			{
				name: "while 루프",
				url: "/tourOfPython/numberGuessingGame#while"
			},
			{
				name: "랜덤숫자 생성하기",
				url: "/tourOfPython/numberGuessingGame#rand_number"
			},
			{
				name: "예외 처리하기",
				url: "/tourOfPython/numberGuessingGame#exception"
			},
			{
				name: "정답인가요?",
				url: "/tourOfPython/numberGuessingGame#answer_checker"
			},
			{
				name: "isCorrect() 함수 만들기",
				url: "/tourOfPython/numberGuessingGame#isCorrect"
			},
			{
				name: "전체 코드 확인하기",
				url: "/tourOfPython/numberGuessingGame#full_code"
			}
		],
	},
	{
		name: `리스트 ['a', 'b']`,
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/list#title"
			},
			{
				name: "만드는 방법",
				url: "/tourOfPython/list#how_to_make"
			},
			{
				name: "특징",
				url: "/tourOfPython/list#features",
			},
			{
				name: "연산",
				url: "/tourOfPython/list#plus_repeat",
			},
			{
				name: "수정과 삭제",
				url: "/tourOfPython/list#edit",
			},
			{
				name: "append()",
				url: "/tourOfPython/list#append",
			},
			{
				name: "sort()",
				url: "/tourOfPython/list#sort"
			},
			{
				name: "reverse()",
				url: "/tourOfPython/list#reverse"
			},
			{
				name: "index()",
				url: "/tourOfPython/list#index",
			},
			{
				name: "insert()",
				url: "/tourOfPython/list#insert"
			},
			{
				name: "remove()",
				url: "/tourOfPython/list#remove"
			},
			{
				name: "pop()",
				url: "/tourOfPython/list#pop"
			},
			{
				name: "count()",
				url: "/tourOfPython/list#count"
			}
		],
	},
	{
		name: `튜플 ('a', 'b')`,
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/tuple"
			},
			{
				name: "자료를 읽는 방법",
				url: "/tourOfPython/tuple#indexing",
			},
			{
				name: "더하기",
				url: "/tourOfPython/tuple#plus",
			},
			{
				name: "곱하기",
				url: "/tourOfPython/tuple#repeat",
			},
			{
				name: "길이 구하기",
				url: "/tourOfPython/tuple#len"
			}
		]
	},
	{
		name: `딕셔너리 {"age": 12}"`,
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/dictionary#title"
			},
			{
				name: "만들기",
				url: "/tourOfPython/dictionary#create"
			},
			{
				name: "추가하기",
				url: "/tourOfPython/dictionary#add",
			},
			{
				name: "삭제하기",
				url: "/tourOfPython/dictionary#delete"
			},
			{
				name: "keys()",
				url: "/tourOfPython/dictionary#keys"
			},
			{
				name: "values()",
				url: "/tourOfPython/dictionary#values"
			},
			{
				name: "items()",
				url: "/tourOfPython/dictionary#items"
			},
			{
				name: "clear()",
				url: "/tourOfPython/dictionary#clear"
			},
			{
				name: "get()",
				url: "/tourOfPython/dictionary#get"
			},
			{
				name: "x in y",
				url: "/tourOfPython/dictionary#in"
			},
			{
				name: "pop()",
				url: "/tourOfPython/dictionary#pop"
			},

		],
	},
	{
		name: "Todo App 만들기",
		files: [
			{
				name: "시작하기",
				url: "/tourOfPython/todo/#title",
			}
		]
	},
]
