import { SideBarTreeItem } from "@/components/commons/SideBarItems";
import { buildLessonPages } from "./pageSequence";

export interface Lesson {
  /** Sidebar display name */
  name: string;
  /** Folder name under app/simpleWebDev/ */
  slug: string;
  /** Short description shown in metadata */
  description: string;
}

export interface Part {
  /** Sidebar folder name, e.g. "1부 · 첫 화면 만들기" */
  name: string;
  lessons: Lesson[];
}

/**
 * Streamlit 웹 개발 입문 커리큘럼 (32강).
 *
 * tourOfPython 으로 문법을 끝낸 학생이 "내가 만든 걸 링크로 남에게 보여주는"
 * 데까지 가는 것이 목표다. 축은 Streamlit 함수 나열이 아니라 **웹사이트를
 * 이루는 구성요소**(페이지 → 상호작용 → 상태 → 데이터 → 사이트)를 하나씩
 * 얻어가는 순서로 잡았다.
 *
 * 다른 교재와 다른 점이 둘 있다.
 *
 * - 채점기와 짝을 이루지 않는다. Piston 샌드박스는 순수 파이썬만 돌리고
 *   Streamlit 앱은 채점 대상이 아니라, Algorithm 처럼 goal/task 로 나누지 않고
 *   챕터당 한 페이지로 간다.
 * - 실습이 로컬 설치 전제다. 브라우저 샌드박스(react-py)로도 Streamlit 은
 *   못 띄우므로 1강을 설치와 실행 트러블슈팅에 통째로 쓴다.
 */
export const simpleWebDevCurriculum: Part[] = [
  {
    name: "1부 · 첫 화면 만들기",
    lessons: [
      {
        name: "웹사이트는 무엇으로 되어 있냥",
        slug: "setup",
        description:
          "Streamlit 을 설치하고 streamlit run 으로 첫 화면을 띄워보자냥!",
      },
      {
        name: "글자 보여주기",
        slug: "text_display",
        description:
          "title, header, write 로 화면에 글자를 띄우고 print 와 뭐가 다른지 알아보자냥!",
      },
      {
        name: "마크다운으로 꾸미기",
        slug: "markdown",
        description:
          "마크다운으로 표와 링크를 만들고 st.code 로 코드를 예쁘게 보여주자냥!",
      },
      {
        name: "화면을 나누는 법",
        slug: "layout_column",
        description:
          "columns 와 container 로 화면을 좌우로 나누고 묶어보자냥!",
      },
      {
        name: "사이드바·탭·확장 패널",
        slug: "layout_sidebar",
        description:
          "sidebar, tabs, expander 로 많은 내용을 깔끔하게 정리해보자냥!",
      },
    ],
  },
  {
    name: "2부 · 사용자에게 입력받기",
    lessons: [
      {
        name: "글자 입력받기",
        slug: "input_text",
        description:
          "text_input 과 text_area 로 사용자에게 글자를 받아보자냥!",
      },
      {
        name: "선택하게 하기",
        slug: "input_choice",
        description:
          "selectbox, radio, checkbox, multiselect 로 고르게 만들어보자냥!",
      },
      {
        name: "숫자와 날짜 입력",
        slug: "input_number",
        description:
          "slider, number_input, date_input 으로 숫자와 날짜를 받아보자냥!",
      },
      {
        name: "버튼을 누르면 무슨 일이 일어나냥",
        slug: "rerun",
        description:
          "버튼을 누르면 코드가 위에서 아래로 전부 다시 실행된다냥! Streamlit 의 가장 중요한 규칙이라냥.",
      },
      {
        name: "연습하기 Level 1",
        slug: "exercise_level1",
        description: "지금까지 배운 화면 구성과 입력 위젯을 직접 조합해보자냥!",
      },
      {
        name: "미니 프로젝트 · BMI 계산기",
        slug: "mini_bmi",
        description:
          "입력받고 계산해서 보여주는 앱 하나를 처음부터 끝까지 만들어보자냥!",
      },
    ],
  },
  {
    name: "3부 · 기억하는 앱",
    lessons: [
      {
        name: "값을 기억하게 하기",
        slug: "session_state",
        description:
          "st.session_state 로 다시 실행돼도 사라지지 않는 값을 만들어보자냥!",
      },
      {
        name: "목록을 쌓기 · 방명록 만들기",
        slug: "state_list",
        description:
          "session_state 에 리스트를 담아 남긴 글이 아래로 쌓이는 방명록을 만들어보자냥!",
      },
      {
        name: "한 번에 제출하기",
        slug: "form",
        description:
          "st.form 으로 여러 입력을 모아 버튼 한 번에 제출해보자냥!",
      },
      {
        name: "위젯 콜백",
        slug: "callback",
        description:
          "on_change 와 on_click 으로 위젯이 바뀔 때 함수를 실행시켜보자냥! (심화)",
      },
      {
        name: "연습하기 Level 2",
        slug: "exercise_level2",
        description: "상태를 기억하는 앱을 직접 설계하고 만들어보자냥!",
      },
    ],
  },
  {
    name: "4부 · 데이터 다루기",
    lessons: [
      {
        name: "표와 지표",
        slug: "data_display",
        description:
          "dataframe, table, metric 으로 리스트와 딕셔너리를 표로 보여주자냥!",
      },
      {
        name: "CSV 읽어오기",
        slug: "csv_read",
        description:
          "파일에 저장된 데이터를 pandas 로 읽어서 화면에 띄워보자냥!",
      },
      {
        name: "표를 검색하고 걸러내기",
        slug: "data_filter",
        description:
          "입력 위젯과 표를 연결해서 원하는 행만 골라 보여주자냥!",
      },
      {
        name: "편집 가능한 표",
        slug: "data_editor",
        description:
          "st.data_editor 로 사용자가 표를 직접 고칠 수 있게 만들어보자냥! (심화)",
      },
      {
        name: "그래프 그리기",
        slug: "chart_basic",
        description:
          "line_chart 와 bar_chart 로 숫자를 한눈에 보이는 그림으로 바꿔보자냥!",
      },
      {
        name: "미니 프로젝트 · 데이터 대시보드",
        slug: "mini_dashboard",
        description:
          "표·필터·그래프를 모아 진짜 대시보드 한 장을 완성해보자냥!",
      },
    ],
  },
  {
    name: "5부 · 진짜 앱처럼",
    lessons: [
      {
        name: "이미지와 파일 업로드",
        slug: "media",
        description:
          "st.image 로 사진을 띄우고 file_uploader 로 파일을 받아보자냥!",
      },
      {
        name: "여러 페이지로 나누기",
        slug: "multipage",
        description:
          "pages 폴더로 앱을 여러 장으로 나눠 진짜 웹사이트 모양을 만들어보자냥!",
      },
      {
        name: "페이지 이동과 링크",
        slug: "navigation",
        description:
          "st.navigation 과 page_link 로 페이지 사이를 오가게 만들어보자냥!",
      },
      {
        name: "느린 앱을 빠르게",
        slug: "cache",
        description:
          "@st.cache_data 로 매번 다시 하던 무거운 일을 한 번만 하게 만들어보자냥! (심화)",
      },
      {
        name: "기다림을 보여주기",
        slug: "status",
        description:
          "spinner, progress, toast 로 앱이 일하는 중이라는 걸 알려주자냥!",
      },
      {
        name: "페이지 설정·테마와 비밀값",
        slug: "config_secrets",
        description:
          "set_page_config 와 테마로 앱을 꾸미고, st.secrets 로 비밀번호를 안전하게 숨겨보자냥! (심화)",
      },
    ],
  },
  {
    name: "6부 · 나만의 사이트",
    lessons: [
      {
        name: "기획하고 화면 뼈대 잡기",
        slug: "capstone_plan",
        description:
          "만들 사이트를 정하고 페이지 구성과 화면 뼈대를 먼저 그려보자냥!",
      },
      {
        name: "기능 붙이기",
        slug: "capstone_build",
        description:
          "뼈대 위에 입력·상태·데이터를 붙여 실제로 동작하게 만들어보자냥!",
      },
      {
        name: "다듬기",
        slug: "capstone_polish",
        description:
          "캐시·테마·빈 화면 처리까지 챙겨서 남에게 보여줄 만하게 다듬어보자냥!",
      },
      {
        name: "세상에 공개하기",
        slug: "deploy",
        description:
          "Community Cloud 에 배포하고 내 사이트 링크를 친구에게 보내보자냥!",
      },
    ],
  },
];

/** 부 구분 없이 순서대로 펼친 32강 목록. 사이트맵·진행률 계산에 쓴다. */
export const simpleWebDevLessons: Lesson[] = simpleWebDevCurriculum.flatMap(
  (part) => part.lessons
);

/** Sidebar tree: 부가 폴더, 강이 파일. */
export const simpleWebDevTree: SideBarTreeItem[] = simpleWebDevCurriculum.map(
  ({ name, lessons }) => ({
    kind: "folder",
    name,
    files: lessons.map((lesson) => ({
      kind: "file" as const,
      name: lesson.name,
      url: `/simpleWebDev/${lesson.slug}`,
    })),
  })
);

/** Flat prev/next sequence for the Simple Web Dev lessons (see buildLessonPages). */
export const simpleWebDevPages = buildLessonPages(simpleWebDevTree, {
  url: "/simpleWebDev",
  label: "소개",
});
