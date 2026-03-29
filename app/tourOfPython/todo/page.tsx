import CodeBlock from "@/components/commons/CodeBlock.lazy";
import Title from "@/components/commons/Title";
import Link from "next/link";

export default function Page() {
	return (
		<div className="p-5">
			<Link href="/tourOfPython/todo/#title" id="title">
				<Title> To-Do App 만들기</Title>
			</Link>

			<Link href="/tourOfPython/todo/#result" id="result"/>
			<CodeBlock code={
`#main.py
import os

heading = ["title", "state"] 
todos = []
WIDTH = 100
INDEX_ROW_PADDING = 3
PADDING = (WIDTH - INDEX_ROW_PADDING) // len(heading)

def banner(message=""):
    """
    앱을 실행할 때 나오는 멋있는 배너을 만드는 함수
    """
    print("=".center(WIDTH, "="))
    print(f"|{message.center(WIDTH - 2)}|")
    print("=".center(WIDTH, "="))

def show_list(todos):
    """
    format_item 함수를 이용해서 todo 리스트를 표 형태로 보여주는 함수
    """
    index = "n".center(INDEX_ROW_PADDING )
    title = "title".center(PADDING - 2)
    state = "state".center(PADDING - 1)
    
    print(f"|{index}|{title}|{state}|") # table heading
    print("-".center(WIDTH, "-"))

    if len(todos) <= 0:
        print(f"|{'No items'.center(WIDTH - 2)}|")
    else: 
        for i, item in enumerate(todos):
            format_item(i, item["title"], item["state"])

def format_item(index, title, state):
    """
    index, title, state를 받아서 표 형태로 보여주는 함수
    """
    n = str(index + 1).center(INDEX_ROW_PADDING)
    t = title[:PADDING -2].center(PADDING - 2)
    s = state.center(PADDING - 1)
    row = f"|{n}|{t}|{s}|"
    print(row)

def header():
    """
    표의 헤더 부분을 보여주는 함수
    """
    banner("To-Do List")

def body(todos):
    """
    표의 바디 부분을 보여주는 함수
    """
    show_list(todos)

def footer():
    """
    표의 마지막 부분을 보여주는 함수
    """
    banner("You are Special")

def table(todos):
    header()
    body(todos)
    footer()


def clear():
    """
    터미널 화면을 지우는 함수
    """
    os.system("cls" if os.name == "nt" else "clear")

def create_item(title):
    """
    아이템을 생성하는 함수, title을 받아서 state는 "todo"로 초기화해서 딕셔너리 형태로 반환
    """
    return {"title": title, "state": "todo"}

def add_item(todos, item):
    """
    아이템을 리스트에 추가하는 함수, todos 리스트와 item 딕셔너리를 받아서 todos 리스트에 item을 추가
    """
    todos.append(item)

def delete_item(todos, title):
    """
    아이템을 리스트에서 삭제하는 함수, todos 리스트와 title을 받아서 title과 일치하는 아이템을 todos 리스트에서 제거하고 새로운 리스트를 반환
    """
    return [item for item in todos if item["title"] != title]

def mark_item(todos, title):
    """
    아이템의 상태를 변경하는 함수, todos 리스트와 title을 받아서 title과 일치하는 아이템의 state를 "todo"에서 "done"으로 또는 "done"에서 "todo"로 변경
    """
    for i, item in enumerate(todos):
        if item["title"] == title:
            todos[i]["state"] = "done" if item["state"] == "todo" else "todo"
            break

def parser(todos, prompt):
    """
    사용자의 입력을 받아서 명령어와 제목을 분리하는 함수, todos 리스트와 prompt 문자열을 받아서 prompt를 공백으로 분리해서 명령어와 제목을 추출하고 명령어에 따라 add_item, delete_item, mark_item 함수를 호출해서 todos 리스트를 업데이트하고 업데이트된 todos 리스트를 반환
    """
    prompt_list = prompt.strip().split(" ", 1)
    command = prompt_list[0]
    title = prompt_list[1] if len(prompt_list) > 1  else ""

    if command == "show":
        pass
    elif command == "add" and title != "":
        new_item = create_item(title)
        add_item(todos, new_item)
    elif command == "delete" and title != "":
        todos = delete_item(todos, title)
    elif command == "mark" and title != "":
        mark_item(todos, title)
    return todos

def main():
    """
    def main() 함수는 프로그램의 진입점으로, 무한 루프를 돌면서 사용자로부터 명령어를 입력받고, 입력된 명령어에 따라 todo 리스트를 업데이트하고, 업데이트된 리스트를 표 형태로 보여주는 역할을 합니다. 사용자가 Ctrl+C를 눌러 프로그램을 종료할 때까지 계속 실행됩니다.
    """
    global todos
    try:
        while True:
            table(todos)
            prompt = input("""
todo commands:
add [todo]   : add new items to list.
delete [todo]: delete item from list.
mark [todo]  : mark item as done.
show         : show todo list items.\n""")
            todos = parser(todos, prompt)
            clear()
    except KeyboardInterrupt:
        print("\rbye".center(WIDTH, " "))

if __name__ == "__main__":
    """
    이 함수는 이 파일이 직접 실행될 때 main() 함수를 호출하는 역할을 합니다. 다른 파일에서 이 파일을 import할 때는 main() 함수가 자동으로 실행되지 않도록 하는 역할도 합니다.

    """
    main()

				`}/>
		</div>
	)
}
