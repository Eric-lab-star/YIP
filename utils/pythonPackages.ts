/**
 * 강의에서 쓰는 파이썬 패키지 한 곳 모음.
 *
 * 실습 페이지의 `<PackageInstall />` 이 여기서 설치 명령과 버전을 만들어 쓴다.
 * 버전을 올리거나 패키지를 바꿀 일이 생기면 이 파일만 고치면 모든 실습
 * 페이지에 그대로 반영된다.
 *
 * `min` 은 "이 버전부터 교재의 예제 코드가 그대로 돌아간다"는 뜻의 하한선이다.
 * 상한은 두지 않으므로 `pip` 은 언제나 최신 호환 버전을 설치한다.
 *
 * 하한을 그렇게 잡은 이유가 있는 것들:
 * - `chromadb` 1.0 — 교재의 `GeminiEmbedding` 이 `name()` / `get_config()` /
 *   `build_from_config()` 를 구현한다. 1.0 부터 요구되는 형식이다.
 * - `langchain` 1.0 — 교재가 쓰는 `langchain.agents.create_agent` 가 1.0 에서
 *   들어왔다. 0.x 의 `initialize_agent` 와는 코드가 다르다.
 * - `langchain-google-genai` 3.0 — 이 버전부터 `langchain-core` 1.x 를 요구한다.
 *   그보다 낮으면 위의 `langchain` 1.x 와 같이 설치되지 않는다.
 * - `python-telegram-bot` 21.0 — 교재의 `Application.builder()` 는 20 부터
 *   쓰는 async 방식이다.
 * - `pypdf` 5.0 — 교재가 쓰는 `extract_text(extraction_mode="layout")` 이
 *   4.0 에 들어왔고, 5.x 가 현재 유지되는 계열이다.
 * - `pygame-ce` 2.5.3 — 우주선 선장 만들기 1강의 `pyproject.toml` 에 적힌 값과
 *   같은 값이다.
 *
 * PyPI 최신 버전 확인 시점: 2026-07-31.
 */

export type PythonPackage = {
  /** pip / uv 에 넘기는 배포 이름 */
  pip: string;
  /** 교재 예제가 도는 최소 버전 */
  min: string;
  /** 무엇에 쓰는 패키지인지 한 줄 설명 */
  what: string;
  /**
   * 설치 확인용 파이썬 한 줄. `python -c "..."` 안에 그대로 들어가므로
   * 따옴표는 작은따옴표만 쓴다.
   */
  check: string;
};

export const PYTHON_PACKAGES = {
  pandas: {
    pip: "pandas",
    min: "2.2",
    what: "표(DataFrame)로 데이터를 다루기",
    check: "import pandas; print(pandas.__version__)",
  },
  numpy: {
    pip: "numpy",
    min: "1.26",
    what: "숫자 계산과 결측치(NaN) 처리",
    check: "import numpy; print(numpy.__version__)",
  },
  matplotlib: {
    pip: "matplotlib",
    min: "3.8",
    what: "그래프 그리기",
    check: "import matplotlib; print(matplotlib.__version__)",
  },
  seaborn: {
    pip: "seaborn",
    min: "0.13",
    what: "matplotlib 위에서 통계 그래프를 예쁘게 그리기",
    check: "import seaborn; print(seaborn.__version__)",
  },
  plotly: {
    pip: "plotly",
    min: "5.22",
    what: "마우스로 움직이는 인터랙티브 그래프",
    check: "import plotly; print(plotly.__version__)",
  },
  folium: {
    pip: "folium",
    min: "0.17",
    what: "지도 위에 데이터 표시하기",
    check: "import folium; print(folium.__version__)",
  },
  streamlit: {
    pip: "streamlit",
    min: "1.40",
    what: "파이썬 코드로 웹 화면 만들기",
    check: "import streamlit; print(streamlit.__version__)",
  },
  requests: {
    pip: "requests",
    min: "2.32",
    what: "인터넷에서 데이터 받아오기(API 호출)",
    check: "import requests; print(requests.__version__)",
  },
  "google-genai": {
    pip: "google-genai",
    min: "1.0",
    what: "제미나이 API 부르기",
    check:
      "from importlib.metadata import version; print(version('google-genai'))",
  },
  chromadb: {
    pip: "chromadb",
    min: "1.0",
    what: "벡터 데이터베이스에 문서 저장·검색",
    check: "import chromadb; print(chromadb.__version__)",
  },
  pypdf: {
    pip: "pypdf",
    min: "5.0",
    what: "PDF 파일에서 글자 뽑아내기",
    check: "import pypdf; print(pypdf.__version__)",
  },
  langchain: {
    pip: "langchain",
    min: "1.0",
    what: "AI 에이전트와 도구(tool) 연결하기",
    check: "from importlib.metadata import version; print(version('langchain'))",
  },
  "langchain-google-genai": {
    pip: "langchain-google-genai",
    min: "3.0",
    what: "LangChain 에서 제미나이 모델 쓰기",
    check:
      "from importlib.metadata import version; print(version('langchain-google-genai'))",
  },
  "python-telegram-bot": {
    pip: "python-telegram-bot",
    min: "21.0",
    what: "텔레그램 봇 만들기",
    check: "import telegram; print(telegram.__version__)",
  },
  pillow: {
    pip: "pillow",
    min: "10.0",
    what: "이미지 파일 열고 다루기",
    check: "import PIL; print(PIL.__version__)",
  },
  "pygame-ce": {
    pip: "pygame-ce",
    min: "2.5.3",
    what: "게임 창·그림·소리 다루기",
    check: "import pygame; print(pygame.version.ver)",
  },
} as const satisfies Record<string, PythonPackage>;

export type PythonPackageId = keyof typeof PYTHON_PACKAGES;
