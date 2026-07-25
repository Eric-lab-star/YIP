"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-lime-50 to-green-50",
		script: "안녕하세요, 여러분. 오늘은 3차시에 발급받은 인증키로 진짜 미세먼지 데이터를 받아오는 실습을 진행하겠습니다. 세 가지 미션을 약 25~30분에 걸쳐 수행합니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800">API 호출 실습</h1>
				<p className="text-2xl text-gray-500 mt-2">우리 동네 미세먼지 가져오기</p>
				<p className="text-lg text-gray-400">총 소요 시간: 약 25~30분</p>
			</div>
		),
	},
	{
		title: "실습 전 준비 사항",
		bg: "from-yellow-50 to-amber-50",
		script: "준비물을 확인하겠습니다. requests 패키지와, 3차시에 발급받은 에어코리아 API 인증키(Decoding)가 필요합니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="space-y-4">
					{[
						{ text: "requests 패키지 설치 (pip install requests)" },
						{ text: "3차시에 발급받은 에어코리아 API 인증키(Decoding)" },
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
		title: "미션 1: 환경 준비 (5분)",
		bg: "from-rose-50 to-orange-50",
		script: "첫 번째 미션입니다. requests가 잘 깔렸는지 확인합니다. pip install requests를 실행한 후, import requests를 실행하여 에러 없이 준비 완료가 출력되는지 확인합니다. 5분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`import requests
print("requests 준비 완료!")`}</CodeBlock>
			</div>
		),
	},
	{
		title: "미션 2: API 요청 보내기 (10~12분)",
		bg: "from-violet-50 to-purple-50",
		script: "두 번째 미션입니다. 3차시에 발급받은 인증키로 진짜 요청을 보냅니다. 빈칸에는 문자열로 된 본인의 인증키를 넣으면 됩니다. 상태 코드가 200으로 출력되는지 확인합니다. 200이 아니라면 인증키 오타, 승인 대기 중, Encoding/Decoding 혼동을 확인해봅니다. 10~12분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="bg-white/60 rounded-xl p-4">
					<p className="text-lg text-gray-600"><strong>목표:</strong> 인증키로 진짜 API 요청을 보내고 상태 코드를 확인합니다.</p>
				</div>
				<CodeBlock>{`url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty"

params = {
    "serviceKey": ____,  # 본인의 인증키(Decoding)
    "returnType": "json",
    "numOfRows": 10,
    "pageNo": 1,
    "sidoName": "서울",
    "ver": "1.0",
}

response = requests.get(url, params=params)
print("상태 코드:", response.status_code)`}</CodeBlock>
			</div>
		),
	},
	{
		title: "미션 3: 원하는 데이터 꺼내기 (10~13분)",
		bg: "from-teal-50 to-cyan-50",
		script: "세 번째 미션입니다. JSON 응답에서 원하는 값만 꺼내봅니다. 빈칸에는 실제 데이터 리스트가 들어있는 키, items를 넣으면 됩니다. 서울 각 지역의 측정소 이름과 미세먼지 수치가 잘 출력되는지 확인합니다. sidoName을 다른 지역으로 바꿔서도 실행해봅니다. 10~13분 드리겠습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`data = response.json()
items = data["response"]["body"][____]

for item in items:
    station = item["stationName"]
    pm10 = item["pm10Value"]
    print(f"{station} 측정소 - 미세먼지(PM10): {pm10}")`}</CodeBlock>
				<div className="bg-white/70 rounded-xl p-4">
					<p className="text-lg text-gray-600">빈칸: &quot;items&quot;</p>
				</div>
			</div>
		),
	},
	{
		title: "오늘의 실습 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 세 가지 미션을 모두 수행했습니다. requests로 진짜 공공 API에 요청을 보내고, JSON 응답에서 원하는 데이터를 꺼냈으며, 요청 실패 시 원인을 확인하는 법을 익혔습니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="space-y-3">
					{[
						{ num: "1", text: "requests 환경 준비하기", color: "bg-rose-100" },
						{ num: "2", text: "인증키로 API 요청 보내기", color: "bg-violet-100" },
						{ num: "3", text: "JSON에서 원하는 데이터 꺼내기", color: "bg-teal-100" },
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
		bg: "from-lime-50 to-green-50",
		script: "오늘 실습을 마치겠습니다. 나라가 열어준 데이터를 코드로 직접 불러왔습니다. 다음 시간부터는 pandas로 데이터를 표 형태로 정리하는 법을 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<h1 className="text-5xl font-bold text-gray-800">실습을 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: CSV 파일과 인코딩 문제</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다!</p>
			</div>
		),
	},
];

export default function APICallTaskSlidePage() {
	return <SlideShell slides={slides} />;
}
