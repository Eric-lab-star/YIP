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
  {
    name: "스택과 큐",
    slug: "stack_queue",
    description:
      "나중에 넣은 걸 먼저 꺼내는 스택과 먼저 넣은 걸 먼저 꺼내는 큐로 괄호 검사부터 오큰수까지 풀어보자냥!",
  },
  {
    name: "BFS와 DFS",
    slug: "graph_search",
    description:
      "큐로 가까운 곳부터 퍼지는 BFS와 끝까지 파고드는 DFS로 섬을 세고 미로의 최단 거리를 구해보자냥!",
  },
  {
    name: "완전탐색",
    slug: "bruteforce",
    description:
      "경우의 수를 먼저 세고, 중첩 반복문과 itertools 와 재귀로 모든 경우를 만들어보고, 가지치기로 살려내자냥!",
  },
  {
    name: "그리디",
    slug: "greedy",
    description:
      "정렬 기준 하나로 답이 갈리는 그리디를 배우고, 언제 되고 언제 안 되는지 반례로 확인해보자냥!",
  },
  {
    name: "동적계획법",
    slug: "dp",
    description:
      "겹치는 부분 문제를 표에 적어두는 DP를 배우고, 상태와 점화식 세우는 법을 계단과 배낭과 동전으로 익혀보자냥!",
  },
  {
    name: "누적합과 투 포인터",
    slug: "prefix_sum",
    description:
      "누적합으로 구간 합을 O(1)에 구하고, 투 포인터와 슬라이딩 윈도우로 이중 반복문을 한 번의 훑기로 바꿔보자냥!",
  },
  {
    name: "트리 기초",
    slug: "tree",
    description:
      "간선만 주어진 트리를 루트에서 훑어 부모·깊이·서브트리 크기를 구하고, 이진 트리 순회와 지름까지 익혀보자냥!",
  },
  {
    name: "유니온 파인드",
    slug: "union_find",
    description:
      "서로소 집합을 대표로 관리하는 유니온 파인드를 배우고, 경로 압축과 크기 세기, 사이클 판별까지 익혀보자냥!",
  },
  {
    name: "최소 신장 트리",
    slug: "mst",
    description:
      "간선을 싼 것부터 골라 사이클 없이 잇는 크루스칼로 최소 신장 트리를 만들고, 연결·최대 간선·두 그룹 나누기까지 익혀보자냥!",
  },
  {
    name: "최단 경로",
    slug: "dijkstra",
    description:
      "가중치 있는 그래프에서 최단 거리를 구하는 다익스트라를 우선순위 큐로 익히고, 경유·다중 출발·역방향까지 다뤄보자냥!",
  },
  {
    name: "위상 정렬",
    slug: "topological_sort",
    description:
      "진입 차수로 선후 관계를 지키며 순서를 정하는 위상 정렬을 배우고, 사전순·유일성·사이클 판별·임계 경로까지 익혀보자냥!",
  },
  {
    name: "비트마스킹",
    slug: "bitmask",
    description:
      "정수의 비트로 집합을 표현해 넣고 빼고 확인하고, 2의 n제곱 부분집합을 훑고, 비트 DP까지 익혀보자냥!",
  },
];
