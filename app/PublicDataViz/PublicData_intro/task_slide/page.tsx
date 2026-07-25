"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-sky-50 to-blue-50",
		script: "안녕하세요, 여러분. 오늘은 코드 없이 공공데이터포털을 직접 눈으로 탐험해보겠습니다. 회원가입부터 데이터 검색까지, 세 가지 미션을 약 20~25분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">공공데이터포털 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">데이터 탐험 떠나기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 20~25분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. 인터넷이 되는 컴퓨터와 회원가입에 쓸 이메일 주소가 필요합니다. 그리고 궁금한 주제를 한두 개 미리 생각해두면 좋습니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "인터넷이 되는 컴퓨터" },
						{ text: "이메일 주소 (회원가입용)" },
						{ text: "궁금한 주제 1~2개 미리 생각해두기" },
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
		title: "미션 1: 공공데이터포털 첫 방문 (5분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. 웹 브라우저를 열고 www.data.go.kr 로 들어가봅니다. 첫 화면에 검색창이 크게 보이는지, 데이터찾기나 국가데이터맵 같은 메뉴가 보이는지 확인합니다. 처음부터 다 이해하려 하지 말고, 오늘은 이런 곳이구나 정도만 느껴도 충분합니다. 5분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`www.data.go.kr`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-5">
					<p className="font-semibold text-lg text-gray-800">확인 사항</p>
					<p className="text-lg text-gray-600 mt-2">검색창과 데이터찾기 메뉴가 보이는가?</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 2: 회원가입 하기 (5~7분)",
		bg: "from-rose-50 to-pink-50",
		script: "두 번째 미션입니다. 오른쪽 위 회원가입 버튼을 눌러서 계정을 만듭니다. 다음 시간 3차시에 오픈 API 인증키를 신청할 때도 이 계정이 필요하니 꼭 기억해두어야 합니다. 이메일 인증까지 마치고 로그인에 성공했는지 확인하고, 아이디와 비밀번호를 안전한 곳에 적어두시기 바랍니다. 5~7분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="bg-white/70 rounded-xl p-5">
					<p className="text-xl text-gray-700">회원가입 → 이메일 인증 → 로그인 성공까지 확인!</p>
				</div>
				<div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
					<p className="text-lg text-gray-700">비밀번호를 안전한 곳에 적어두세요. 3차시에 로그인해서 인증키를 신청합니다.</p>
				</div>
			</div>
		),
	},
	{
		title: "미션 3: 데이터 검색해보기 (8~10분)",
		bg: "from-violet-50 to-purple-50",
		script: "세 번째 미션입니다. 검색창에 지하철을 검색해서 몇 건이 나오는지, 눈에 띄는 데이터셋 이름은 무엇인지 적어봅니다. 미세먼지도 검색해서 어떤 기관이 제공하는지 확인합니다. 마지막으로 내가 관심 있는 주제를 직접 검색해봅니다. 데이터셋 상세 페이지에서 다운로드 버튼이 있으면 파일 데이터, 활용신청 버튼이 있으면 오픈 API입니다. 8~10분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/60 rounded-xl p-4">
					<p className="text-lg text-gray-600"><strong>목표:</strong> 지하철, 미세먼지, 그리고 내 관심 주제를 검색하고 살펴봅니다.</p>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
						<thead>
							<tr className="bg-gray-800 text-white">
								<th className="p-4 text-left">보이는 버튼</th>
								<th className="p-4 text-left">데이터 종류</th>
							</tr>
						</thead>
						<tbody className="text-gray-700">
							<tr className="bg-white">
								<td className="p-4 font-semibold">다운로드</td>
								<td className="p-4">파일 데이터</td>
							</tr>
							<tr className="bg-gray-50">
								<td className="p-4 font-semibold">활용신청</td>
								<td className="p-4">Open API (인증키 필요)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. 공공데이터포털에 처음 방문해보고, 회원가입해서 로그인하고, 관심 있는 주제로 데이터를 검색하고 살펴보았습니다. 다음 시간에는 이 데이터를 쓸 때 무엇을 지켜야 하는지 알아보겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "공공데이터포털 첫 방문", color: "bg-rose-100" },
						{ num: "2", text: "회원가입하고 로그인하기", color: "bg-violet-100" },
						{ num: "3", text: "관심 주제로 데이터 검색하기", color: "bg-teal-100" },
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
		bg: "from-sky-50 to-blue-50",
		script: "오늘 실습을 마치겠습니다. 넓은 데이터 창고를 눈으로 확인했습니다. 다음 시간에는 이 데이터를 쓸 때 지켜야 할 약속, 공공누리 라이선스와 출처 표시를 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: 공공누리 라이선스와 출처 표시</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function PublicDataIntroTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
