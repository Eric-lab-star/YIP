export interface Lesson {
	/** Sidebar display name */
	name: string;
	/** Folder name under app/PublicDataViz/ */
	slug: string;
	/** Short description shown in metadata */
	description: string;
}

// 32차시 전체 계획은 course_outline 참고 (기초 14 + 프로젝트 5x3 + 캡스톤 3).
// 아직 만들지 않은 차시는 여기에 추가하지 않는다 — 사이드바가 없는 페이지로
// 링크하면 404가 뜨기 때문에, 실습 페이지를 만든 챕터만 순서대로 등록한다.
export const PublicDataVizCurriculum: Lesson[] = [
	{
		name: "공공데이터가 뭐냥?",
		slug: "PublicData_intro",
		description:
			"공공데이터가 무엇이고 왜 중요한지 알아보고, 공공데이터포털을 직접 둘러보자냥!",
	},
	{
		name: "공공누리 라이선스와 출처 표시",
		slug: "OpenLicense_source",
		description:
			"공공누리 제1유형이 뭔지 이해하고, 데이터를 쓸 때 출처를 표시하는 법을 배워보자냥!",
	},
	{
		name: "Open API 인증키 발급받기",
		slug: "APIKey_issue",
		description:
			"공공데이터포털에 가입하고 인증키를 신청해서, API를 쓸 준비를 마쳐보자냥!",
	},
	{
		name: "파이썬으로 API 호출하기",
		slug: "API_call",
		description:
			"발급받은 인증키로 진짜 공공 API를 호출해서, JSON 데이터를 받아와보자냥!",
	},
	{
		name: "CSV와 한글 인코딩",
		slug: "CSV_encoding",
		description:
			"공공데이터포털에서 CSV 파일을 내려받고, 한글이 깨지지 않게 인코딩을 맞춰서 불러와보자냥!",
	},
	{
		name: "pandas 기초 (1) — DataFrame과 Series",
		slug: "Pandas1_dataframe",
		description:
			"pandas의 핵심인 DataFrame과 Series가 무엇인지 이해하고, 열과 행에 직접 접근해보자냥!",
	},
	{
		name: "pandas 기초 (2) — 조건 필터링과 정렬",
		slug: "Pandas2_filter",
		description:
			"원하는 조건에 맞는 데이터만 골라내고, 크기 순서로 줄 세우는 법을 배워보자냥!",
	},
	{
		name: "pandas 기초 (3) — 그룹으로 묶어 요약하기",
		slug: "Pandas3_groupby",
		description:
			"구별, 노선별로 데이터를 그룹으로 묶어서 평균과 합계를 한눈에 요약해보자냥!",
	},
	{
		name: "데이터 클리닝 — 빈 값과 중복 정리하기",
		slug: "DataCleaning",
		description:
			"공공데이터에 흔히 숨어있는 빈 값과 중복된 행을 찾아서 깨끗하게 정리해보자냥!",
	},
	{
		name: "matplotlib 기초 — 첫 그래프 그리기",
		slug: "Matplotlib_basics",
		description:
			"matplotlib으로 선 그래프와 막대 그래프를 그리고, 한글이 깨지지 않게 설정해보자냥!",
	},
	{
		name: "seaborn — 더 예쁜 그래프 그리기",
		slug: "Seaborn_style",
		description:
			"seaborn으로 matplotlib보다 더 예쁘고 편리한 그래프를 그려보자냥!",
	},
	{
		name: "plotly — 마우스로 만지는 인터랙티브 그래프",
		slug: "Plotly_interactive",
		description:
			"plotly로 마우스를 올리면 값이 보이고, 확대·축소도 되는 인터랙티브 그래프를 그려보자냥!",
	},
	{
		name: "folium — 지도 위에 데이터 그리기",
		slug: "Folium_map",
		description:
			"folium으로 진짜 지도 위에 마커를 찍어서, 위치 데이터를 한눈에 살펴보자냥!",
	},
	{
		name: "streamlit — 나만의 데이터 앱 만들기",
		slug: "Streamlit_dataapp",
		description:
			"지금까지 배운 걸 모두 모아서, 누구나 브라우저에서 써볼 수 있는 데이터 앱을 만들어보자냥!",
	},
	{
		name: "프로젝트 1 — 지하철 승하차 데이터 수집·정제",
		slug: "Subway_collect",
		description:
			"진짜 서울시 지하철 승하차 데이터를 살펴보고, 필요한 열만 골라 깨끗하게 정리해보자냥!",
	},
];

/** Look up a lesson by slug. Useful in MDX metadata. */
export function getLesson(slug: string): Lesson | undefined {
	return PublicDataVizCurriculum.find((l) => l.slug === slug);
}
