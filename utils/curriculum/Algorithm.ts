export interface Lesson {
  /** Sidebar display name */
  name: string;
  /** Folder name under app/Algorithm/ */
  slug: string;
  /** Short description shown in metadata */
  description: string;
}

/**
 * 알고리즘 입문 커리큘럼. tourOfPython 으로 문법을 끝낸 학생이 채점 문제를
 * 스스로 풀 수 있게 만드는 것이 목표라, 각 챕터는 /problems 의 문제와 짝을
 * 이루도록 설계한다.
 */
export const AlgorithmCurriculum: Lesson[] = [
  {
    name: "리스트 순회와 탐색",
    slug: "list_search",
    description:
      "리스트를 처음부터 끝까지 훑으면서 원하는 값을 찾는 법을 코딩냥이랑 배워보자냥!",
  },
  {
    name: "문자열 다루기",
    slug: "string_basics",
    description:
      "문자열을 리스트처럼 훑는 법과 슬라이싱으로 뒤집는 법을 배우고 회문 판별까지 만들어보자냥!",
  },
  {
    name: "반복과 누적",
    slug: "loop_accumulate",
    description:
      "range 를 자유롭게 쓰고 누적 상자의 시작값을 제대로 고르는 법을 배워보자냥!",
  },
  {
    name: "정렬",
    slug: "sorting",
    description:
      "sorted 와 key 로 원하는 기준으로 줄을 세우고, 정렬한 뒤 원하는 값을 꺼내보자냥!",
  },
  {
    name: "딕셔너리와 집합",
    slug: "counting",
    description:
      "딕셔너리로 개수를 세고 집합으로 본 것을 기억해서, 정렬보다 빠르게 답을 찾아보자냥!",
  },
  {
    name: "이분 탐색",
    slug: "binary_search",
    description:
      "반씩 줄여가며 찾는 법과 답 자체를 이분 탐색하는 법을 배워보자냥!",
  },
  {
    name: "재귀",
    slug: "recursion",
    description:
      "멈추는 조건과 자기 호출로 문제를 쪼개고, 재귀가 느려질 때 고치는 법을 배워보자냥!",
  },
  {
    name: "2차원 리스트",
    slug: "grid",
    description:
      "리스트 안의 리스트로 격자를 만들고, 행과 열을 훑고, 이웃 칸을 안전하게 들여다보자냥!",
  },
];
