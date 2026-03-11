"use client";

import { usePathname } from 'next/navigation'
import { useLayoutCtx } from "./LayoutContexWrapper";
import { SideBarTree, SideBarTreeItem } from './SideBarItems';

export default function SideBar() {
	const pathname = usePathname()
	const { isSideBarOpen } = useLayoutCtx()
	return (
		<>
			{
				isSideBarOpen &&
				<div className="w-65 bg-zinc-200">
					<SideBarTree sideBarTree={pythonLangCurriculum} />
				</div>
			}
		</>
	)
}






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
				name: "",
				url: "",
			}
		]
	}

]


