"use client";
import { ColumnDef } from "@tanstack/react-table";
import Text from "../Text";

interface colmn {
	title: string;
	desc: string;
}
export const editorColumns: ColumnDef<colmn>[] = [
	{
		accessorKey: "title",
		header: () => <Text weight="bold">특징</Text>,
		cell: ({row}) => <Text weight="bold">{row.getValue("title")}</Text>
	},
	{
		accessorKey: "desc",
		header: () => <Text weight="bold">설명</Text>,
		cell: ({row}) => <Text>{row.getValue("desc")}</Text>
	}
]

export const vscodeData = [
	{
		title: "무료",
		desc: "Microsoft가 만들었지만 완전 무료이고, 소스코드도 공개되어 있어요."
	},
	{
		title: "가볍고 빠름",
		desc: "무거운 IDE(IntelliJ, Eclipse 등)와 달리, 텍스트 에디터 기반이라 실행이 빠릅니다."
	},
	{
		title: "확장 프로그램",
		desc: "기본 기능은 단순하지만, 마켓플레이스에서 확장 프로그램을 설치해 원하는 기능을 추가할 수 있어요."
	},
	{
		title: "실시간 협업 가능",
		desc: "다른 사람과 같은 코드를 동시에 편집하는 기능도 지원해요."
	}
]

export const pycharmData= [
	{
		title: "강력한 분석 기능",
		desc: "타입 추론이 정확해서 자동완성 품질이 높음"
	},

	{
		title: "강력한 분석 기능",
		desc: "변수명 하나를 바꾸면 프로젝트 전체에서 관련된 곳을 자동으로 수정해줘요."
	},

	{
		title: "강력한 디버깅 기능",
		desc: "코드를 실행하면서 중간에 멈추고, 변수값을 실시간으로 확인할 수 있어요."
	},
]


export const djangoFeature= [
	{
		title: "관리자 패널",
		desc: "자동으로 관리자 페이지 생성"
	},

	{
		title: "ORM",
		desc: "SQL 대신 python 코드로 DB 제어"
	},

	{
		title: "인증 시스템",
		desc: "로그인, 회원가입 기능 내장"
	},
	{
		title: "보안",
		desc: "CSRF, XSS등 기본 보안"
	},
]

export const pygameFeature = [
	{
		title: "화면",
		desc: "게임 창 생성 및 관리",
	},
	{
		title: "그리기",
		desc: "사각형, 원, 선 등 도형 그리기",
	},
	{
		title: "이미지",
		desc: "스프라이트 이미지 불러오기",
	},
	{
		title: "입력",
		desc: "키보드, 마우스 입력 감지",
	},
	{
		title: "사운드",
		desc: "배경음악, 효과음 재생",
	},
	{
		title: "시간",
		desc: "FPS 조절",
	},
]

export const micropythonFeature = [
	{
		title: "문법",
		desc: "배운 파이썬 그대로 사용가능",
	},
	{
		title: "크기",
		desc: "초경량. 256KB RAM에서도 동작",
	},
	{
		title: "하드웨어 직접 제어",
		desc: "LED, 센서, 모터등 직접 조작",
	},
]

