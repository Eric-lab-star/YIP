// Maps a Tour of Python chapter (the last path segment of its route) to a few
// hand-picked judge problems that reinforce that chapter's concept, so learners
// can "learn then practice" without hunting the problem list. Chapters with no
// good match are simply omitted — the related-problems section then renders
// nothing. Slugs come from scripts/seed-simple-problems.mjs.

export interface RelatedProblem {
	slug: string;
	title: string;
}

export const TOUR_PROBLEMS: Record<string, RelatedProblem[]> = {
	helloworld: [
		{ slug: "s-hello-world", title: "Hello, World!" },
		{ slug: "s-echo-line", title: "입력 그대로 출력" },
	],
	input_type_int: [
		{ slug: "s-echo-line", title: "입력 그대로 출력" },
		{ slug: "s-sum-two", title: "두 수의 합" },
	],
	variable_string_boolean: [
		{ slug: "s-string-length", title: "문자열 길이" },
		{ slug: "s-to-upper", title: "대문자로 변환" },
		{ slug: "s-reverse-string", title: "문자열 뒤집기" },
		{ slug: "s-count-vowels", title: "모음의 개수" },
		{ slug: "s-palindrome", title: "회문 판별" },
	],
	challenge_arithmetic: [
		{ slug: "s-sum-two", title: "두 수의 합" },
		{ slug: "s-sub-two", title: "두 수의 차" },
		{ slug: "s-mul-two", title: "두 수의 곱" },
		{ slug: "s-floor-div", title: "몫 구하기" },
		{ slug: "s-remainder", title: "나머지 구하기" },
	],
	and_or_not: [
		{ slug: "s-even-odd", title: "짝수 홀수" },
		{ slug: "s-sign", title: "부호 판별" },
	],
	if: [
		{ slug: "s-max-two", title: "두 수 중 큰 값" },
		{ slug: "s-min-two", title: "두 수 중 작은 값" },
		{ slug: "s-even-odd", title: "짝수 홀수" },
		{ slug: "s-sign", title: "부호 판별" },
	],
	if_challenge: [
		{ slug: "s-abs", title: "절댓값" },
		{ slug: "s-max-two", title: "두 수 중 큰 값" },
	],
	loop: [
		{ slug: "s-sum-1-to-n", title: "1부터 n까지의 합" },
		{ slug: "s-countdown", title: "카운트다운" },
		{ slug: "s-factorial", title: "팩토리얼" },
		{ slug: "s-gugudan", title: "구구단" },
		{ slug: "s-sum-digits", title: "각 자리 숫자의 합" },
	],
	functions: [
		{ slug: "s-square", title: "제곱" },
		{ slug: "s-abs", title: "절댓값" },
	],
	functionExcercise: [
		{ slug: "s-factorial", title: "팩토리얼" },
		{ slug: "s-gcd", title: "최대공약수" },
	],
	functionExcerciseLevel2: [
		{ slug: "s-fib-nth", title: "n번째 피보나치 수" },
		{ slug: "s-gcd", title: "최대공약수" },
	],
	list: [
		{ slug: "s-sum-array", title: "배열의 합" },
		{ slug: "s-max-array", title: "배열의 최댓값" },
		{ slug: "s-count-even", title: "짝수의 개수" },
	],
	listExcerciseLevel1: [
		{ slug: "s-sum-array", title: "배열의 합" },
		{ slug: "s-max-array", title: "배열의 최댓값" },
	],
	listExcerciseLevel2: [{ slug: "s-count-even", title: "짝수의 개수" }],
};

/** Related practice problems for a Tour of Python chapter path segment, if any. */
export function getRelatedProblems(chapter: string | undefined): RelatedProblem[] {
	return (chapter && TOUR_PROBLEMS[chapter]) || [];
}
