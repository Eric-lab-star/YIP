"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-amber-50 to-orange-50",
		script: "안녕하세요, 여러분. 오늘은 Open API를 쓰기 위한 열쇠, 인증키를 직접 발급받아보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">🔑</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					Open API 인증키 발급받기
				</h1>
				<p className="text-2xl text-gray-500 mt-2">나만의 API 열쇠 만들기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, 인증키가 왜 필요한지 설명할 수 있어야 합니다. 둘째, 공공데이터포털에서 오픈 API 활용신청을 하는 방법을 알아야 합니다. 셋째, 발급받은 인증키를 어디서 확인하는지 알아야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "인증키가 왜 필요한지 설명할 수 있다" },
					{ num: "2", text: "Open API 활용신청 방법을 안다" },
					{ num: "3", text: "인증키를 어디서 확인하는지 안다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "인증키가 뭐고 왜 필요하냥?",
		bg: "from-blue-50 to-indigo-50",
		script: "도서관에서 책을 빌리려면 회원증이 필요합니다. Open API도 마찬가지입니다. 아무나 무제한으로 요청할 수 있게 열어두면 서버에 부담이 커지기 때문에, 공공데이터포털은 인증키라는 열쇠를 나눠줍니다. 이 열쇠를 요청에 함께 보내야 정식으로 등록된 사용자임을 확인하고 데이터를 내어줍니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="bg-white/60 rounded-xl p-6 text-center">
					<p className="text-2xl text-gray-800 font-semibold">도서관 회원증 = API 인증키</p>
				</div>
				<div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
					<p className="text-lg text-gray-700">⚠️ 인증키는 나만의 비밀번호와 같습니다. 함부로 공유하지 마세요!</p>
				</div>
			</div>
		),
	},
	{
		title: "인증키 발급 네 단계",
		bg: "from-green-50 to-emerald-50",
		script: "인증키를 받는 과정은 네 단계입니다. 첫째 로그인, 둘째 데이터셋 찾기, 셋째 활용신청, 넷째 승인 확인입니다. 대부분의 공공데이터포털 API는 신청 즉시 자동으로 승인됩니다.",
		content: (
			<div className="flex flex-col gap-5">
				{[
					{ num: "1", title: "로그인", desc: "공공데이터포털 계정으로 로그인" },
					{ num: "2", title: "데이터셋 찾기", desc: "쓰고 싶은 Open API 검색" },
					{ num: "3", title: "활용신청", desc: "사용 목적을 입력하고 신청" },
					{ num: "4", title: "승인 확인", desc: "마이페이지에서 인증키 확인 (대부분 자동 즉시 승인)" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-4 flex items-center gap-4">
						<span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">{item.num}</span>
						<div>
							<p className="text-lg font-semibold text-gray-800">{item.title}</p>
							<p className="text-base text-gray-600">{item.desc}</p>
						</div>
					</div>
				))}
			</div>
		),
	},
	{
		title: "인증키는 어떻게 생겼냥?",
		bg: "from-cyan-50 to-blue-50",
		script: "발급받은 인증키는 영문자와 숫자가 섞인 64자리 문자열입니다. 마이페이지의 Open API, 인증키 발급현황에서 확인합니다. 일반이라고 적힌 키 하나만 나오는데, 그것을 그대로 쓰면 됩니다. 옛 자료에는 Decoding 키를 쓰라는 설명이 많은데, 그것은 기호가 섞여 있던 예전 형식 이야기입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`81e63f94...(생략)...ffa9a4000

마이페이지 → Open API → 인증키 발급현황
구분: 일반   ← 이 키를 그대로 쓴다`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">영문자·숫자뿐이라 Encoding/Decoding 구분이 없다</p>
				</div>
			</div>
		),
	},
	{
		title: "인증키, 안전하게 보관하는 법",
		bg: "from-red-50 to-orange-50",
		script: "인증키는 나만의 비밀번호입니다. 다른 사람에게 함부로 알려주지 말고, 코드를 인터넷에 공유할 때는 인증키를 지우고 올려야 합니다. 만약 유출된 것 같으면 마이페이지에서 재발급받을 수 있습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
					<p className="text-xl text-gray-800">🔒 인증키는 절대 다른 사람과 공유하지 않기</p>
				</div>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-700">코드를 인터넷에 올릴 때는 인증키를 지우고 공유하기</p>
				</div>
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">유출된 것 같으면? 마이페이지에서 재발급 가능!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. 인증키는 API를 쓰기 위한 열쇠이며 서버 보호를 위해 필요합니다. 발급은 로그인, 데이터셋 찾기, 활용신청, 승인 확인 네 단계입니다. 발급된 키는 그대로 쓰면 되고, 안전하게 보관해야 합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 인증키 = API를 쓰기 위한 열쇠</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 발급: 로그인 → 데이터셋 찾기 → 활용신청 → 승인 확인</p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 발급된 키를 그대로 쓰고, 안전하게 보관하기</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-amber-50 to-orange-50",
		script: "오늘 강의를 마치겠습니다. Open API를 쓰기 위한 진짜 열쇠를 손에 넣을 준비를 마쳤습니다. 다음 시간에는 이 열쇠로 파이썬 코드에서 진짜 데이터를 받아오겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 파이썬으로 API 호출하기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function APIKeyIssueGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
