
export const sections = [
	{ id: "hero", label: "홈" },
	{ id: "why-learn", label: "왜 배워야 할까?" },
	{ id: "ai-era", label: "AI시대와 코딩" },
	{ id: "careers", label: "진로 안내" },
	{ id: "contact", label: "상담 신청" },
];

export const whyCards = [
	{
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none" >
				<rect width="36" height="36" rx="8" fill="#E0F2FE" />
				<path d="M12 18l3 3 9-9" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		title: "논리적 사고력 향상",
		desc: "코딩은 문제를 작은 단계로 나누고 순서대로 해결하는 훈련입니다. 마치 레고 블록을 조립하듯, 복잡한 문제도 체계적으로 풀어낼 수 있는 힘을 길러줍니다.",
	},
	{
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none" >
				<rect width="36" height="36" rx="8" fill="#FEF3C7" />
				<circle cx="18" cy="18" r="6" stroke="#D97706" strokeWidth="2.5" />
				<path d="M18 12v-2M18 26v-2M24 18h2M10 18h2" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
			</svg>
		),
		title: "아두이노로 만드는 현실",
		desc: "화면 속 코드가 실제 LED를 켜고, 모터를 돌리고, 센서로 온도를 측정합니다. '내가 만든 코드가 진짜로 움직인다'는 경험은 어떤 교과서보다 강력한 동기부여가 됩니다.",
	},
	{
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none" >
				<rect width="36" height="36" rx="8" fill="#E0E7FF" />
				<path d="M13 14l-4 4 4 4M23 14l4 4-4 4M20 12l-4 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		title: "파이썬, 세계 1위 언어",
		desc: "파이썬은 인공지능, 데이터 분석, 웹 개발 등 가장 넓은 분야에서 쓰이는 프로그래밍 언어입니다. 배우기 쉬우면서도 전문가들이 실무에서 사용하는 '진짜' 언어입니다.",
	},
	{
		icon: (
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none" >
				<rect width="36" height="36" rx="8" fill="#FCE7F3" />
				<path d="M18 13v5l3 3" stroke="#DB2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
				<circle cx="18" cy="18" r="7" stroke="#DB2777" strokeWidth="2" />
			</svg>
		),
		title: "미래를 준비하는 시간",
		desc: "소프트웨어가 모든 산업에 스며들고 있는 시대, 코딩 능력은 선택이 아닌 필수가 되어가고 있습니다. 지금 시작하는 학생이 미래의 주인공이 됩니다.",
	},
];


export const aiReasons = [
	{
		num: "01",
		title: "AI는 도구일 뿐, 방향을 정하는 것은 사람입니다",
		desc: "AI가 코드를 생성해주더라도, 무엇을 만들지 결정하고 결과를 검증하는 것은 사람의 몫입니다. 코딩을 이해해야 AI에게 정확한 지시를 내릴 수 있습니다.",
		accent: "#0284C7",
	},
	{
		num: "02",
		title: "AI를 잘 쓰려면 코딩을 알아야 합니다",
		desc: "ChatGPT가 영어를 대신해주지 않듯, AI도 코딩을 대신해주지 않습니다. 오히려 코딩을 아는 사람이 AI를 10배 더 효과적으로 활용할 수 있습니다.",
		accent: "#7C3AED",
	},
	{
		num: "03",
		title: "계산기가 나와도 수학은 사라지지 않았습니다",
		desc: "계산기가 등장했을 때도 수학 교육은 없어지지 않았습니다. 오히려 더 높은 수준의 사고력이 필요해졌죠. AI 시대의 코딩도 마찬가지입니다.",
		accent: "#DC2626",
	},
	{
		num: "04",
		title: "코딩은 '사고방식'을 훈련하는 것입니다",
		desc: "코딩 교육의 핵심은 특정 언어를 암기하는 것이 아닙니다. 문제를 분석하고, 구조화하고, 해결하는 컴퓨팅 사고력을 기르는 것입니다. 이것은 AI가 대체할 수 없습니다.",
		accent: "#059669",
	},
];



export const careers = [
	{
		category: "소프트웨어 · 개발",
		items: [
			{ job: "소프트웨어 개발자", salary: "4,500~8,000만원", growth: "높음" },
			{ job: "AI/머신러닝 엔지니어", salary: "5,000~1억원+", growth: "매우 높음" },
			{ job: "데이터 사이언티스트", salary: "4,500~9,000만원", growth: "높음" },
			{ job: "백엔드 개발자", salary: "4,000~8,000만원", growth: "높음" },
		],
		color: "#0284C7",
		bg: "#E0F2FE",
	},
	{
		category: "하드웨어 · IoT",
		items: [
			{ job: "임베디드 시스템 엔지니어", salary: "4,000~7,500만원", growth: "높음" },
			{ job: "IoT 개발자", salary: "4,500~8,000만원", growth: "매우 높음" },
			{ job: "로봇 공학자", salary: "4,500~9,000만원", growth: "매우 높음" },
			{ job: "스마트팩토리 엔지니어", salary: "4,000~7,000만원", growth: "높음" },
		],
		color: "#7C3AED",
		bg: "#EDE9FE",
	},
];

export const universities = [
	{ name: "서울대학교", dept: "컴퓨터공학부 · 전기정보공학부", tag: "최상위" },
	{ name: "KAIST", dept: "전산학부 · 전기및전자공학부", tag: "최상위" },
	{ name: "포항공과대학교", dept: "컴퓨터공학과 · 전자전기공학과", tag: "최상위" },
	{ name: "성균관대학교", dept: "소프트웨어학과 · AI융합학과", tag: "상위" },
	{ name: "한양대학교", dept: "컴퓨터소프트웨어학부", tag: "상위" },
	{ name: "고려대학교", dept: "컴퓨터학과 · 데이터과학과", tag: "상위" },
	{ name: "연세대학교", dept: "컴퓨터과학과 · AI학과", tag: "상위" },
	{ name: "중앙대학교", dept: "소프트웨어학부 · AI학과", tag: "상위" },
];
