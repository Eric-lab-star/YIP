"use client";

import SlideShell, { type Slide } from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-emerald-50 to-teal-50",
		script: "안녕하세요, 여러분. 오늘은 실제 데이터셋의 라이선스를 확인하고, 출처 표시 문장을 직접 써보는 실습을 진행하겠습니다. 두 가지 미션을 약 20~25분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">라이선스 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">출처 표시 문장 써보기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 20~25분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. 지난 시간에 만든 공공데이터포털 계정으로 로그인하고, 활동지를 작성할 종이나 메모장을 준비합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "공공데이터포털 계정으로 로그인" },
						{ text: "종이나 메모장 준비 (활동지 작성용)" },
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
		title: "미션 1: 데이터셋 라이선스 확인하기 (8~10분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 지하철 승하차나 미세먼지로 검색한 뒤 데이터셋 하나를 클릭해서 상세 페이지의 라이선스 정보를 찾아봅니다. 데이터셋 이름, 제공 기관, 공공누리 유형, 상업적 이용 가능 여부를 적어봅니다. 라이선스 마크를 못 찾겠다면 이용허락범위나 저작권정책 링크를 살펴봅니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/60 rounded-xl p-4">
					<p className="text-lg text-gray-600"><strong>목표:</strong> 데이터셋의 공공누리 유형과 제공 기관을 확인합니다.</p>
				</div>
				<div className="bg-white/70 rounded-xl p-5 space-y-2">
					<p className="text-lg text-gray-700">1. 검색한 데이터셋 이름은?</p>
					<p className="text-lg text-gray-700">2. 제공 기관은?</p>
					<p className="text-lg text-gray-700">3. 공공누리 유형은?</p>
					<p className="text-lg text-gray-700">4. 상업적 이용이 가능한가요?</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 출처 표시 문장 완성하기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 미션 1에서 확인한 정보로 출처 표시 문장을 완성합니다. 본 자료는 제공 기관에서 개방한 데이터셋 이름 데이터를 공공누리 유형에 따라 이용하였습니다, 라는 형식입니다. 이 문장 형식은 이번 학기 우리가 만드는 모든 프로젝트에서 계속 사용하게 되니 오늘 확실히 익혀두면 좋습니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/60 rounded-xl p-4">
					<p className="text-lg text-gray-600"><strong>목표:</strong> 나만의 출처 표시 문장을 완성합니다.</p>
				</div>
				<div className="bg-gray-900 text-green-300 rounded-xl p-5 text-lg font-mono leading-relaxed">
					본 자료는 ____(제공 기관)____에서 개방한
					<br />
					「____(데이터셋 이름)____」 데이터를
					<br />
					공공누리 ____(유형)____에 따라 이용하였습니다.
					<br />
					(출처: 공공데이터포털)
				</div>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">이 문장 형식은 이번 학기 모든 프로젝트에서 계속 사용합니다!</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 두 가지 미션을 모두 수행했습니다. 데이터셋의 공공누리 라이선스 유형을 확인하고, 출처 표시 문장을 직접 완성했습니다. 데이터를 책임감 있게 쓰는 법을 배웠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "데이터셋 라이선스 유형 확인하기", color: "bg-rose-100" },
						{ num: "2", text: "출처 표시 문장 완성하기", color: "bg-violet-100" },
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
		bg: "from-emerald-50 to-teal-50",
		script: "오늘 실습을 마치겠습니다. 데이터를 책임감 있게 쓰는 법을 배웠습니다. 다음 시간에는 드디어 오픈 API 인증키를 발급받아보겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: Open API 인증키 발급받기</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function OpenLicenseSourceTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
