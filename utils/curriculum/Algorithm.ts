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
];
