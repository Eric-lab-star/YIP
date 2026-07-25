"use client";

import SlideShell, { type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-amber-50 to-orange-50",
		script: "안녕하세요, 여러분. 오늘은 실제로 Open API에 활용신청을 하고 나만의 인증키를 발급받는 실습을 진행하겠습니다. 세 가지 미션을 약 20~25분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">인증키 발급 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">나의 첫 API 열쇠 받기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 20~25분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. 공공데이터포털 계정으로 로그인되어 있어야 하고, 인증키를 적어둘 메모장이 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "공공데이터포털 계정 (로그인 상태)" },
						{ text: "인증키를 적어둘 메모장이나 노트" },
					].map((item, i) => (
						<div key={i} className="bg-white/70 rounded-xl p-5 flex items-center gap-4">
							<p className="text-xl text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "미션 1: 미세먼지 정보 API 찾기 (5분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 한국환경공단 에어코리아 대기오염정보로 검색해서, 우리가 앞으로 쓸 미세먼지 관련 API를 찾습니다. 오픈API 라벨이 붙은 데이터셋을 찾고, 상세 페이지에 활용신청 버튼이 보이는지 확인합니다. 5분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-gray-900 text-green-300 rounded-xl p-5 text-lg font-mono">
					한국환경공단_에어코리아_대기오염정보
				</div>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">검색 결과가 많다면 &quot;오픈API&quot; 필터로 좁혀보세요.</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 활용신청 하기 (7~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 활용신청 버튼을 눌러 신청서를 작성합니다. 활용목적은 학습 또는 연구를 선택하고, 상세 목적에는 공공데이터를 활용한 파이썬 데이터 분석 교육 실습용이라고 적습니다. 신청 즉시 대부분 자동으로 승인됩니다. 7~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/60 rounded-xl p-4">
					<p className="text-lg text-gray-600"><strong>목표:</strong> 활용신청서를 작성하고 제출합니다.</p>
				</div>
				<div className="bg-white/70 rounded-xl p-5 space-y-2">
					<p className="text-lg text-gray-700">활용목적: 학습/연구</p>
					<p className="text-lg text-gray-700">상세 목적: &quot;공공데이터를 활용한 파이썬 데이터 분석 교육 실습용으로 사용합니다.&quot;</p>
					<p className="text-lg text-gray-700">시스템 유형: 일반 (개인 개발/학습용)</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 인증키 확인하고 보관하기 (8~10분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. 마이페이지의 개발계정 또는 오픈API 메뉴에서 발급된 인증키를 확인합니다. 발급된 키를 안전한 곳에 옮겨 적습니다. 인증키는 절대 다른 사람과 공유하거나 인터넷에 올리면 안 됩니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/60 rounded-xl p-4">
					<p className="text-lg text-gray-600"><strong>목표:</strong> 인증키를 확인하고 안전하게 보관합니다.</p>
				</div>
				<div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
					<p className="text-lg text-gray-700">인증키는 절대 공유하거나 인터넷에 올리지 마세요!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 미세먼지 정보 API를 찾고, 활용신청서를 작성하고, 인증키를 확인해서 안전하게 보관했습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "미세먼지 정보 API 찾기", color: "bg-rose-100" },
						{ num: "2", text: "활용신청서 작성하고 제출하기", color: "bg-violet-100" },
						{ num: "3", text: "인증키 확인하고 안전하게 보관하기", color: "bg-teal-100" },
					].map((item) => (
						<div key={item.num} className={`${item.color} rounded-xl p-4 flex items-center gap-4`}>
							<span className="text-lg font-bold text-gray-500">미션 {item.num}</span>
							<p className="text-lg text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-amber-50 to-orange-50",
		script: "오늘 실습을 마치겠습니다. 진짜 열쇠를 손에 넣었습니다. 다음 시간에는 파이썬 코드로 이 열쇠를 사용해서 진짜 데이터를 받아오겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 파이썬으로 API 호출하기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function APIKeyIssueTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
