export const Booklist = {
  "Tour of Python": {
    title: "Tour of Python",
    link: "/tourOfPython",
    imagekey: "python-logo-only.png",
    state: "기초",
    description:
      "기본적인 파이썬 문법을 둘러보면서 파이썬 코드를 이해할 수 있는 수준으로 성장하는 것을 목표로 합니다.",
  },
  "Spaceship Captain": {
    title: "Spaceship Captain",
    link: "/spaceshipCaptain",
    imagekey: "spaceship.png",
    state: "기초 2",
    description:
      "pygame으로 게임을 만들어보면서 게임 프로그래밍에서 자주 사용되는 알고리즘을 학습하는 것을 목표로 합니다.",
  },
  "Simple Web Dev": {
    title: "Simple Web Dev",
    link: "/simpleWebDev",
    imagekey: "simpleWebDev.jpg",
    state: "기초 2",
    description:
      "streamlit으로 간단한 웹사이트를 만들어보면서 웹사이트를 이루는 기본적인 구성요소를 학습하는 것을 목표로 합니다.",
  },
  "AI Developer": {
    title: "AI Developer",
    link: "/AIDeveloper",
    imagekey: "AIDeveloper/AIDevloperLogoTrans.png",
    state: "기초 2",
    description:
      "간단한 AI 서비스를 만들어보면서 AI 개발에 필요한 기본적인 지식과 기술을 학습하는 것을 목표로 합니다.",
  },
  Algorithm: {
    title: "Algorithm",
    link: "/Algorithm",
    imagekey: "algorithm.png",
    state: "기초 2",
    description:
      "문법은 배웠지만 문제 앞에서 막막한 학생을 위한 수업입니다. 자주 쓰이는 풀이 뼈대를 익히고 채점기에 직접 제출해보는 것을 목표로 합니다.",
  },
};

/** 교재 선택 드롭다운 옵션. Booklist 에서 파생시켜 두 곳이 어긋나지 않게 한다. */
export const BOOK_TITLES = (
  Object.keys(Booklist) as (keyof typeof Booklist)[]
).map((title) => ({ value: title, label: title }));
