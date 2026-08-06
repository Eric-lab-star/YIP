const BASE_URL = "https://r2.kimkyungsub.com/AIDeveloper/nyang";

/**
 * 코딩냥이의 상황별 표정. `<NyangSpeech mood="ASK">` 로 고른다.
 *
 * 말풍선 아바타는 100px 원형으로 렌더되므로, 전신 일러스트(`CatIcon` 이 쓰는
 * Coolonfident / big_smile / walking)와 달리 얼굴 클로즈업으로 그렸다. 그
 * 크기에서는 몸통이 거의 보이지 않아 표정이 읽히지 않기 때문이다.
 *
 * 각 표정이 어떤 대사에 붙는지:
 *
 * | mood        | 쓰는 곳                                        |
 * | ----------- | ---------------------------------------------- |
 * | `WELCOME`   | 차시 첫 인사 — "안녕, 나 코딩냥이다냥!"        |
 * | `TEACH`     | 개념 설명, 비유 풀이                           |
 * | `ASK`       | 질문 던지기, 퀴즈 안내                         |
 * | `THINK`     | "지난 시간을 떠올려보자냥" 같은 회상·고민      |
 * | `DISCOVER`  | 핵심을 짚거나 반전을 밝힐 때                   |
 * | `CHEER`     | 실습으로 넘어가며 응원 — "발톱 준비됐냥?"      |
 * | `WARN`      | 주의·경고 (개인정보, 환각, 흔한 함정)          |
 * | `OOPS`      | AI가 틀리거나 못 하는 걸 멋쩍게 인정할 때      |
 * | `CELEBRATE` | 실습 완주 후 성취 축하                         |
 * | `WRAP`      | 차분한 마무리·정리                             |
 */
export const nyangMoodSrc = {
	WELCOME: `${BASE_URL}/welcome.png`,
	TEACH: `${BASE_URL}/teach.png`,
	ASK: `${BASE_URL}/ask.png`,
	THINK: `${BASE_URL}/think.png`,
	DISCOVER: `${BASE_URL}/discover.png`,
	CHEER: `${BASE_URL}/cheer.png`,
	WARN: `${BASE_URL}/warn.png`,
	OOPS: `${BASE_URL}/oops.png`,
	CELEBRATE: `${BASE_URL}/celebrate.png`,
	WRAP: `${BASE_URL}/wrap.png`,
} as const;

export type NyangMood = keyof typeof nyangMoodSrc;
