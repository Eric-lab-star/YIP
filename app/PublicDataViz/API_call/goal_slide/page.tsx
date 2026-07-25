"use client";

import SlideShell, {
	CodeBlock,
	type Slide,
} from "@/components/slide/SlideShell";

const slides: Slide[] = [
	{
		title: "",
		bg: "from-lime-50 to-green-50",
		script: "안녕하세요, 여러분. 지난 시간에 발급받은 인증키로, 오늘은 진짜 공공 API를 파이썬 코드로 직접 호출해서 실시간 미세먼지 데이터를 받아보겠습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📡</span>
				<h1 className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
					파이썬으로 API 호출하기
				</h1>
				<p className="text-2xl text-gray-500 mt-2">requests로 진짜 데이터 받아오기</p>
			</div>
		),
	},
	{
		title: "오늘의 학습 목표",
		bg: "from-yellow-50 to-amber-50",
		script: "오늘의 학습 목표입니다. 첫째, requests 라이브러리로 API에 데이터를 요청할 수 있어야 합니다. 둘째, JSON 응답의 구조를 읽고 원하는 값을 꺼낼 수 있어야 합니다. 셋째, 요청이 실패했을 때 원인을 확인하는 법을 알아야 합니다.",
		content: (
			<div className="flex flex-col gap-6">
				{[
					{ num: "1", text: "requests로 API에 데이터를 요청할 수 있다" },
					{ num: "2", text: "JSON 응답에서 원하는 값을 꺼낼 수 있다" },
					{ num: "3", text: "요청 실패 시 원인을 확인하는 법을 안다" },
				].map((item) => (
					<div key={item.num} className="bg-white/70 rounded-xl p-5 flex items-start gap-4">
						<span className="bg-lime-500 text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0 font-bold text-lg">{item.num}</span>
						<p className="text-xl text-gray-700">{item.text}</p>
					</div>
				))}
			</div>
		),
	},
	{
		title: "API 호출, 어떻게 하냥?",
		bg: "from-blue-50 to-indigo-50",
		script: "API를 부르는 건 식당에서 주문하는 것과 비슷합니다. 이 주소로, 이런 조건으로 데이터를 달라고 부탁하면 API가 데이터를 돌려줍니다. 파이썬에서는 requests 라이브러리로 이 부탁을 보냅니다. 필요한 건 주소와 파라미터, 두 가지입니다.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="bg-white/60 rounded-xl p-6 text-center">
					<p className="text-2xl text-gray-800 font-semibold">주소(URL) + 파라미터(params) = API 요청</p>
				</div>
				<CodeBlock>{`pip install requests`}</CodeBlock>
			</div>
		),
	},
	{
		title: "코드로 요청 보내기",
		bg: "from-green-50 to-emerald-50",
		script: "실제 코드를 살펴보겠습니다. 3차시에 인증키를 발급받았던 에어코리아 대기오염정보 API를 불러봅니다. params 딕셔너리에 인증키, 결과 형식, 지역 등을 담아서 requests.get으로 요청을 보냅니다. status_code가 200이면 성공입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`import requests

url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty"
params = {
    "serviceKey": "본인의 인증키(Decoding)",
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
		title: "JSON 응답, 이렇게 생겼다냥",
		bg: "from-cyan-50 to-blue-50",
		script: "공공데이터포털의 API는 대부분 비슷한 모양의 JSON을 돌려줍니다. response 안에 header와 body가 있고, body 안의 items 리스트에 실제 데이터가 들어있습니다. resultCode가 00이면 성공입니다.",
		content: (
			<div className="flex flex-col gap-5">
				<div className="overflow-x-auto">
					<table className="w-full text-lg border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-sm">
						<thead>
							<tr className="bg-gray-800 text-white">
								<th className="p-4 text-left">키</th>
								<th className="p-4 text-left">뜻</th>
							</tr>
						</thead>
						<tbody className="text-gray-700">
							{[
								["response.header.resultCode", '요청 성공 여부 ("00"이면 성공)'],
								["response.body.totalCount", "전체 측정소 개수"],
								["response.body.items", "실제 데이터가 담긴 리스트"],
								['items[0]["pm10Value"]', "첫 측정소의 미세먼지(PM10) 값"],
							].map(([k, v], i) => (
								<tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
									<td className="p-4 font-mono text-base">{k}</td>
									<td className="p-4">{v}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		),
	},
	{
		title: "원하는 값 꺼내기",
		bg: "from-indigo-50 to-violet-50",
		script: "response.json()으로 JSON을 딕셔너리로 바꾼 다음, items 리스트를 반복문으로 돌면서 원하는 값을 꺼냅니다. pm10Value처럼 숫자로 보이는 값도 사실 문자열로 오기 때문에, 계산이 필요하면 int나 float으로 바꿔줘야 합니다.",
		content: (
			<div className="flex flex-col gap-5">
				<CodeBlock>{`data = response.json()
items = data["response"]["body"]["items"]

for item in items:
    print(item["stationName"], "PM10:", item["pm10Value"])`}</CodeBlock>
				<div className="bg-amber-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">💡 pm10Value는 문자열(<code>&quot;30&quot;</code>)입니다. 계산하려면 int()로 바꿔주세요!</p>
				</div>
			</div>
		),
	},
	{
		title: "요청이 실패했다면?",
		bg: "from-red-50 to-orange-50",
		script: "API를 부르다 보면 실패할 때도 있습니다. 흔한 원인은 등록 안 된 인증키, 승인 대기 중, Encoding과 Decoding 키 혼동입니다. 인증키를 정확히 복사했는지, 앞뒤 공백은 없는지, 활용신청이 승인됐는지 확인해보세요.",
		content: (
			<div className="flex flex-col gap-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					<div className="bg-red-50 rounded-xl p-5">
						<p className="font-semibold text-red-700 mb-2">자주 만나는 에러</p>
						<p className="text-gray-600">SERVICE_KEY_IS_NOT_REGISTERED_ERROR</p>
						<p className="text-gray-600">status_code가 200이 아님</p>
					</div>
					<div className="bg-green-50 rounded-xl p-5">
						<p className="font-semibold text-green-700 mb-2">확인할 것</p>
						<p className="text-gray-600">인증키 오타·공백 확인</p>
						<p className="text-gray-600">Decoding 키를 썼는지 확인</p>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "오늘 배운 내용 정리",
		bg: "from-orange-50 to-red-50",
		script: "오늘 배운 내용을 정리하겠습니다. API 호출에는 주소와 파라미터가 필요합니다. status_code 200은 성공을 뜻합니다. 공공데이터포털 API의 실제 데이터는 response.body.items에 들어있습니다. 숫자처럼 보이는 값도 문자열로 온다는 점을 기억해야 합니다.",
		content: (
			<div className="flex flex-col gap-4">
				<div className="bg-green-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ requests.get(url, params=...)로 API 요청</p>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ <code>response.json()[&quot;response&quot;][&quot;body&quot;][&quot;items&quot;]</code></p>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<p className="text-lg text-gray-700">✅ 숫자 값도 문자열로 옴 → int()/float() 변환 필요</p>
				</div>
			</div>
		),
	},
	{
		title: "",
		bg: "from-lime-50 to-green-50",
		script: "오늘 강의를 마치겠습니다. 나라가 열어준 데이터를 코드로 직접 불러왔습니다. 다음 시간부터는 이렇게 받아온 데이터를 표 형태로 정리하는 도구, pandas를 배우겠습니다. 수고하셨습니다.",
		content: (
			<div className="flex flex-col items-center justify-center h-full gap-6 text-center">
				<span className="text-8xl">📘</span>
				<h1 className="text-5xl font-bold text-gray-800">개념 강의를 마칩니다</h1>
				<p className="text-xl text-gray-600 mt-4">다음 시간: CSV 파일과 인코딩 문제</p>
				<p className="text-2xl text-gray-500 mt-4">수고하셨습니다! 🐾</p>
			</div>
		),
	},
];

export default function APICallGoalSlidePage() {
	return <SlideShell slides={slides} />;
}
