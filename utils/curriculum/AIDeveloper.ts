export interface Lesson {
  /** Sidebar display name */
  name: string;
  /** Folder name under app/AIDeveloper/ */
  slug: string;
  /** Short description shown in metadata */
  description: string;
}

export const AIDeveloperCurriculum: Lesson[] = [
  {
    name: "Jupyter NoteBook",
    slug: "noteBook",
    description: ".py 파일과 .ipynb(주피터 노트북) 파일이 뭐가 다른지 코딩냥이 쉽게 알려주는 강의",
  },
  {
    name: "API가 뭐냥?",
    slug: "API_basics",
    description: "날씨 API와 제미나이 API를 코드로 직접 연결해서 날씨 코멘트를 자동으로 만들어보자냥!",
  },
  {
    name: "Streamlit으로 화면 만들기",
    slug: "Streamlit_UI",
    description: "Streamlit으로 날씨 앱에 UI를 입혀서 실제로 쓸 수 있는 웹 앱으로 완성해보자냥!",
  },
  {
    name: "LangChain 에이전트",
    slug: "LangChain_agent",
    description: "LangChain으로 도구를 스스로 선택하는 AI 에이전트를 만들어보자냥!",
  },
  {
    name: "좋은 프롬프트 작성법",
    slug: "Prompt_engineering",
    description: "AI에게 더 잘 부탁하는 법, 프롬프트 엔지니어링을 배워보자냥!",
  },
  {
    name: "RAG와 임베딩",
    slug: "RAG1_embedding",
    description: "텍스트를 숫자로 바꾸는 임베딩과 RAG의 기본 개념을 배워보자냥!",
  },
  {
    name: "청킹과 유사도 검색",
    slug: "RAG2_chunking_search",
    description: "문서를 잘게 나누고 관련 내용을 찾아내는 방법을 실습해보자냥!",
  },
  {
    name: "벡터DB 구축하기",
    slug: "RAG3_vectorDB",
    description: "임베딩 벡터를 저장하고 검색하는 벡터 데이터베이스를 만들어보자냥!",
  },
  {
    name: "RAG 챗봇 완성하기",
    slug: "RAG4_full_pipeline",
    description: "검색 + 생성 파이프라인을 연결해서 나만의 RAG 챗봇을 완성해보자냥!",
  },
  {
    name: "블로그 앱 만들기 (1부)",
    slug: "BlogApp_part1",
    description: "주제로부터 블로그 글의 구조를 만들고 본문을 채워보자냥!",
  },
  {
    name: "블로그 앱 만들기 (2부)",
    slug: "BlogApp_part2",
    description: "블로그 글에 이미지를 추가하고 완성도를 높여보자냥!",
  },
  {
    name: "수학 봇 만들기 (1부)",
    slug: "MathBot_part1",
    description: "수학 문제를 풀어주는 AI 봇의 기초를 만들어보자냥!",
  },
  {
    name: "수학 봇 만들기 (2부)",
    slug: "MathBot_part2",
    description: "수학 봇에 단계별 풀이 설명 기능을 추가해보자냥!",
  },
  {
    name: "수학 봇 만들기 (3부)",
    slug: "MathBot_part3",
    description: "수학 봇을 완성하고 다양한 문제 유형에 대응해보자냥!",
  },
  {
    name: "영어 대화 앱 (1부)",
    slug: "EnglishChat_part1",
    description: "AI와 영어로 대화 연습을 할 수 있는 챗봇을 만들어보자냥!",
  },
  {
    name: "영어 대화 앱 (2부)",
    slug: "EnglishChat_part2",
    description: "영어 대화 앱에 교정 기능과 힌트를 추가해보자냥!",
  },
  {
    name: "윤리적인 AI (1부)",
    slug: "AIEthics_part1",
    description: "AI가 사회에 미치는 영향과 편향 문제를 생각해보자냥!",
  },
  {
    name: "윤리적인 AI (2부)",
    slug: "AIEthics_part2",
    description: "책임감 있는 AI 개발 원칙과 실제 사례를 살펴보자냥!",
  },
  {
    name: "최종 프로젝트",
    slug: "FinalProject_guide",
    description: "지금까지 배운 모든 것을 활용해 나만의 AI 앱을 만들어보자냥!",
  },
];

/** Look up a lesson by slug. Useful in MDX metadata. */
export function getLesson(slug: string): Lesson | undefined {
  return AIDeveloperCurriculum.find((l) => l.slug === slug);
}
