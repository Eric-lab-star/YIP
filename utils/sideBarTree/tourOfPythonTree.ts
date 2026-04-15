import { SideBarTreeItem } from "@/components/commons/SideBarItems";

export const pythonLangCurriculum: SideBarTreeItem[] = [
	{
		kind: "folder",
		name: "편집기",
		files: [
			{
				kind: "file",
				name: "편집기 소개",
				url: "/tourOfPython/helloworld"
			},
			{
				kind: "file",
				name: "대표편집기",
				url: "/tourOfPython/helloworld#editor"
			},
			{
				kind: "file",
				name: "vscode 실행하기",
				url: "/tourOfPython/helloworld#vscode"
			}
		]
	},
	{

		kind: "folder",
		name: "변수, 문자열, 불리언",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/variable_string_boolean#title"
			},
			{
				kind: "file",
				name: "변수",
				url: "/tourOfPython/variable_string_boolean#variable"
			},
			{
				kind: "file",
				name: "문자열",
				url: "/tourOfPython/variable_string_boolean#string"
			},
			{
				kind: "file",
				name: "불리언",
				url: "/tourOfPython/variable_string_boolean#boolean"
			},
		],
	},
	{
		kind: "folder",
		name: "파이썬 함수",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/functions#title"
			},
			{
				kind: "file",
				name: "함수를 만들자",
				url: "/tourOfPython/functions#create"
			},
			{
				kind: "file",
				name: "간단한 함수",
				url: "/tourOfPython/functions#simple_create"
			},
			{
				kind: "file",
				name: "왜 만들까?",
				url: "/tourOfPython/functions#why_create"
			},
			{
				kind: "file",
				name: "함수의 몸체",
				url: "/tourOfPython/functions#function_body"
			},
			{
				kind: "file",
				name: "매개변수와 인수",
				url: "/tourOfPython/functions#parameter"
			},
			{
				kind: "file",
				name: "퀴즈",
				url: "/tourOfPython/functions#quizz"
			}
		]
	},
	{
		kind: "folder",
		name: "함수 연습하기",
		files: [
			{
				kind: "file",
				name: "Level 1",
				url: "/tourOfPython/functionExcercise"
			},
			{
				kind: "file",
				name: "Level 2",
				url: "/tourOfPython/functionExcerciseLevel2"
			},
		],
	},
	{
		kind: "folder",
		name: "input, type, int, try..except",
		files: [
			{
				kind: "file",
				name: "입력받기  input()",
				url: "/tourOfPython/input_type_int#input",
			},

			{
				kind: "file",
				name: "형태 type()",
				url: "/tourOfPython/input_type_int#type",
			},

			{
				kind: "file",
				name: "정수형",
				url: "/tourOfPython/input_type_int#int",
			},
			{
				kind: "file",
				name: "예외처리",
				url: "/tourOfPython/input_type_int#try_except"
			}
		]
	},
	{
		kind: "folder",
		name: "if, else, elif",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/if#title",
			},
			{
				kind: "file",
				name: "왜 사용할까?",
				url: "/tourOfPython/if#why",
			},
			{
				kind: "file",
				name: "else",
				url: "/tourOfPython/if#else",
			},
			{
				kind: "file",
				name: "elif",
				url: "/tourOfPython/if#elif",
			},
			{
				kind: "file",
				name: "퀴즈",
				url: "/tourOfPython/if#quizz"
			}
		]
	},

	{
		kind: "folder",
		name: "and or not",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/and_or_not#title"
			},
			{
				kind: "file",
				name: "and",
				url: "/tourOfPython/and_or_not#and",
			},
			{
				kind: "file",
				name: "or",
				url: "/tourOfPython/and_or_not#or"
			},
			{
				kind: "file",
				name: "not",
				url: "/tourOfPython/and_or_not#not"
			},
		]
	},
	{
		kind: "folder",
		name: "조건문과 타입 연습하기",
		files: [
			{
				kind: "file",
				name: "Level 1",
				url: "/tourOfPython/condition_and_type_level1",
			},
			{
				kind: "file",
				name: "Level 2",
				url: "/tourOfPython/condition_and_type_level2",
			},
			{
				kind: "file",
				name: "Level 3",
				url: "/tourOfPython/condition_and_type_level3",
			},
		]
	},
	{
		kind: "folder",
		name: "강아지와 고양이 1",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/cat_or_dog#title",
			},
			{
				kind: "file",
				name: "start()",
				url: "/tourOfPython/cat_or_dog#start",
			},

			{
				kind: "file",
				name: "cat_or_dog()",
				url: "/tourOfPython/cat_or_dog#cat_or_dog",
			},
			{
				kind: "file",
				name: "에러 만들기",
				url: "/tourOfPython/cat_or_dog#raise_error"
			},
			{
				kind: "file",
				name: "중간점검",
				url: "/tourOfPython/cat_or_dog#checkpoint"
			},

		]
	},
	{
		kind: "folder",
		name: "강아지와 고양이 2",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/cat_or_dog2#title"
			},
			{
				kind: "file",
				name: "suggest()",
				url: "/tourOfPython/cat_or_dog2#suggest"
			},
			{
				kind: "file",
				name: "모든 코드",
				url: "/tourOfPython/cat_or_dog2#birdEyeView"
			},
		],
	},
	{
		kind: "folder",
		name: "반복문 loop",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/loop",
			},
			{
				kind: "file",
				name: "while",
				url: "/tourOfPython/loop#while",
			},
			{
				kind: "file",
				name: "for...in",
				url: "/tourOfPython/loop#for_in"
			},
			{
				kind: "file",
				name: "break",
				url: "/tourOfPython/loop#break",
			},
			{
				kind: "file",
				name: "continue",
				url: "/tourOfPython/loop#continue"
			},
			{
				kind: "file",
				name: "무한 루프",
				url: "/tourOfPython/loop#infinite_loop"
			},
			{
				kind: "file",
				name: "퀴즈",
				url: "/tourOfPython/loop#quiz"
			}
		]
	},
	{
		kind: "folder",
		name: "파이썬 표준 라이브러리",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/library",
			},
			{
				kind: "file",
				name: "input()",
				url: "/tourOfPython/library#input"
			},
			{
				kind: "file",
				name: "int(), float()",
				url: "/tourOfPython/library#int_float"
			},
			{
				kind: "file",
				name: "len()",
				url: "/tourOfPython/library#len"
			},
			{
				kind: "file",
				name: "range()",
				url: "/tourOfPython/library#range"
			},
			{
				kind: "file",
				name: "min(), max()",
				url: "/tourOfPython/library#min_max"
			},
			{
				kind: "file",
				name: "표준 라이브러리",
				url: "/tourOfPython/library#standard_library"
			}
		],
	},
	{
		kind: "folder",
		name: "숫자	맞추기 게임 만들기",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/numberGuessingGame"
			},
			{
				kind: "file",
				name: "타이틀 만들기",
				url: "/tourOfPython/numberGuessingGame#title",
			},
			{
				kind: "file",
				name: "while 루프",
				url: "/tourOfPython/numberGuessingGame#while"
			},
			{
				kind: "file",
				name: "랜덤숫자 생성하기",
				url: "/tourOfPython/numberGuessingGame#rand_number"
			},
			{
				kind: "file",
				name: "예외 처리하기",
				url: "/tourOfPython/numberGuessingGame#exception"
			},
			{
				kind: "file",
				name: "정답인가요?",
				url: "/tourOfPython/numberGuessingGame#answer_checker"
			},
			{
				kind: "file",
				name: "isCorrect() 함수 만들기",
				url: "/tourOfPython/numberGuessingGame#isCorrect"
			},
			{
				kind: "file",
				name: "전체 코드 확인하기",
				url: "/tourOfPython/numberGuessingGame#full_code"
			}
		],
	},
	{
		kind: "folder",
		name: `리스트 ['a', 'b']`,
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/list#title"
			},
			{
				kind: "file",
				name: "만드는 방법",
				url: "/tourOfPython/list#how_to_make"
			},
			{
				kind: "file",
				name: "특징",
				url: "/tourOfPython/list#features",
			},
			{
				kind: "file",
				name: "연산",
				url: "/tourOfPython/list#plus_repeat",
			},
			{
				kind: "file",
				name: "수정과 삭제",
				url: "/tourOfPython/list#edit",
			},
			{
				kind: "file",
				name: "append()",
				url: "/tourOfPython/list#append",
			},
			{
				kind: "file",
				name: "sort()",
				url: "/tourOfPython/list#sort"
			},
			{
				kind: "file",
				name: "reverse()",
				url: "/tourOfPython/list#reverse"
			},
			{
				kind: "file",
				name: "index()",
				url: "/tourOfPython/list#index",
			},
			{
				kind: "file",
				name: "insert()",
				url: "/tourOfPython/list#insert"
			},
			{
				kind: "file",
				name: "remove()",
				url: "/tourOfPython/list#remove"
			},
			{
				kind: "file",
				name: "pop()",
				url: "/tourOfPython/list#pop"
			},
			{
				kind: "file",
				name: "count()",
				url: "/tourOfPython/list#count"
			}
		],
	},
	{
		kind: "folder",
		name: "리스트 연습하기",
		files: [
			{
				kind: "file",
				name: "Level 1",
				url: "/tourOfPython/listExcerciseLevel1",
			},
			{
				kind: "file",
				name: "Level 2",
				url: "/tourOfPython/listExcerciseLevel2",
			},
			{
				kind: "file",
				name: "Level 3",
				url: "/tourOfPython/listExcerciseLevel3",
			},
		],
	},
	{
		kind: "folder",
		name: `튜플 ('a', 'b')`,
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/tuple"
			},
			{
				kind: "file",
				name: "자료를 읽는 방법",
				url: "/tourOfPython/tuple#indexing",
			},
			{
				kind: "file",
				name: "더하기",
				url: "/tourOfPython/tuple#plus",
			},
			{
				kind: "file",
				name: "곱하기",
				url: "/tourOfPython/tuple#repeat",
			},
			{
				kind: "file",
				name: "길이 구하기",
				url: "/tourOfPython/tuple#len"
			}
		]
	},
	{
		kind: "folder",
		name: "튜플 연습하기",
		files: [
			{
				kind: "file",
				name: "Level 1",
				url: "/tourOfPython/tupleExcerciseLevel1",
			},
			{
				kind: "file",
				name: "Level 2",
				url: "/tourOfPython/tupleExcerciseLevel2",
			},
			{
				kind: "file",
				name: "Level 3",
				url: "/tourOfPython/tupleExcerciseLevel3",
			},
		],
	},
	{
		kind: "folder",
		name: `딕셔너리 {"age": 12}"`,
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/dictionary#title"
			},
			{
				kind: "file",
				name: "만들기",
				url: "/tourOfPython/dictionary#create"
			},
			{
				kind: "file",
				name: "추가하기",
				url: "/tourOfPython/dictionary#add",
			},
			{
				kind: "file",
				name: "삭제하기",
				url: "/tourOfPython/dictionary#delete"
			},
			{
				kind: "file",
				name: "keys()",
				url: "/tourOfPython/dictionary#keys"
			},
			{
				kind: "file",
				name: "values()",
				url: "/tourOfPython/dictionary#values"
			},
			{
				kind: "file",
				name: "items()",
				url: "/tourOfPython/dictionary#items"
			},
			{
				kind: "file",
				name: "clear()",
				url: "/tourOfPython/dictionary#clear"
			},
			{
				kind: "file",
				name: "get()",
				url: "/tourOfPython/dictionary#get"
			},
			{
				kind: "file",
				name: "x in y",
				url: "/tourOfPython/dictionary#in"
			},
			{
				kind: "file",
				name: "pop()",
				url: "/tourOfPython/dictionary#pop"
			},

		],
	},
	{
		kind: "folder",
		name: "딕셔너리 연습하기",
		files: [
			{
				kind: "file",
				name: "Level 1",
				url: "/tourOfPython/dictExcerciseLevel1",
			},
			{
				kind: "file",
				name: "Level 2",
				url: "/tourOfPython/dictExcerciseLevel2",
			},
			{
				kind: "file",
				name: "Level 3",
				url: "/tourOfPython/dictExcerciseLevel3",
			},
		],
	},
	{
		kind: "folder",
		name: "Todo App 만들기",
		files: [
			{
				kind: "file",
				name: "시작하기",
				url: "/tourOfPython/todo/#title",
			},
			{
				kind: "file",
				name: "결과확인",
				url: "/tourOfPython/todo/#result",
			}
		]
	},
]
