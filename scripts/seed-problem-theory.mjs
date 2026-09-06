// 문제의 "개념 정리"(`problems.theory`)를 채운다.
//
// 문제 설명과 달리 이론은 문제마다 필요한 것이 아니라서, 여기에는 **필요한
// 문제만** 넣는다. 비어 있으면 문제 페이지에 개념 정리 섹션 자체가 나오지
// 않는다.
//
// 맨 앞의 `# 제목` 한 줄은 접힌 머리글의 부제로 쓰이고 본문에서는 빠진다
// (`components/judge/TheorySection.tsx`).
//
//   node scripts/seed-problem-theory.mjs            # 미리보기, DB 안 건드림
//   node scripts/seed-problem-theory.mjs --write    # 반영
//   node scripts/seed-problem-theory.mjs --write --only s-gcd
//
// slug 로 찾아 `theory` 만 갱신하므로 여러 번 돌려도 안전하다.

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const THEORY = {
	// 이 문제는 Tour of Python 의 "함수" 연습문제다(app/lib/tourProblems.ts).
	// 알고리즘 수강생이 아니라 함수를 갓 배운 학생이 읽는다는 뜻이라, 시간복잡도
	// 같은 말은 쓰지 않고 손으로 따라갈 수 있는 크기의 예로만 설명한다.
	"s-gcd": `# 최대공약수와 유클리드 호제법

## 최대공약수란?

어떤 수를 **나누어떨어지게** 하는 수를 그 수의 약수라고 합니다.

- 12의 약수: 1, 2, 3, 4, 6, 12
- 18의 약수: 1, 2, 3, 6, 9, 18

두 수에 **공통으로** 들어 있는 약수는 1, 2, 3, 6입니다. 이 중 가장 큰 6이
12와 18의 **최대공약수**입니다. 영어로 GCD(Greatest Common Divisor)라고 하며,
\`gcd(12, 18) = 6\` 처럼 씁니다.

12개짜리 사탕과 18개짜리 초콜릿을 남김없이 똑같이 나눠 담을 때, 만들 수 있는
가장 많은 봉지 수가 6개라고 생각하면 됩니다.

## 방법 1 — 작은 수부터 하나씩 확인하기

가장 먼저 떠오르는 방법입니다. 1부터 두 수 중 작은 값까지 세어 보면서, 둘 다
나누어떨어지는 수를 만날 때마다 답을 갱신합니다.

\`\`\`python
def gcd(a, b):
    answer = 1
    for i in range(1, min(a, b) + 1):
        if a % i == 0 and b % i == 0:
            answer = i
    return answer
\`\`\`

맞는 답을 주지만, 두 수가 10억쯤 되면 10억 번을 세야 합니다. 그래서 더 빠른
방법을 씁니다.

## 방법 2 — 유클리드 호제법

기원전 300년경 유클리드가 정리한 방법으로, **나머지**를 이용합니다. 핵심은
다음 한 줄입니다.

> a와 b의 최대공약수는, b와 (a를 b로 나눈 나머지)의 최대공약수와 같다.

식으로 쓰면 \`gcd(a, b) = gcd(b, a % b)\` 이고, **b가 0이 되면 남은 a가 답**입니다.

### 왜 성립하나요?

a를 b로 나눈 몫을 q, 나머지를 r이라고 하면 \`a = b * q + r\` 입니다.
어떤 수 d가 b와 r을 모두 나누어떨어지게 한다면, \`b * q + r\` 인 a도 나누어
떨어지게 합니다. 반대 방향도 마찬가지입니다. 즉 **(a, b)의 공약수 모임과
(b, r)의 공약수 모임이 완전히 같습니다.** 모임이 같으니 그중 가장 큰 값도
같습니다.

### 손으로 따라가 보기 — gcd(12, 18)

| a | b | a % b | 다음 단계 |
|---|---|---|---|
| 12 | 18 | 12 | gcd(18, 12) |
| 18 | 12 | 6 | gcd(12, 6) |
| 12 | 6 | 0 | gcd(6, 0) |
| 6 | 0 | — | **답은 6** |

첫 줄에서 a가 b보다 작아도 괜찮습니다. \`12 % 18\` 은 12라서 자리가 저절로
바뀝니다. 큰 수를 앞에 두려고 미리 정렬할 필요가 없습니다.

한 번 더, gcd(100, 40):

| a | b | a % b |
|---|---|---|
| 100 | 40 | 20 |
| 40 | 20 | 0 |
| 20 | 0 | 답은 20 |

100의 약수와 40의 약수를 모두 적어 비교하는 대신 두 줄로 끝났습니다.

## 파이썬으로 쓰기

반복문으로 쓰면 표의 각 줄이 그대로 한 번의 반복이 됩니다.

\`\`\`python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
\`\`\`

\`a, b = b, a % b\` 는 두 값을 **동시에** 바꿉니다. 오른쪽을 먼저 다 계산한 뒤
왼쪽에 넣기 때문에, a를 먼저 바꿔서 \`a % b\` 가 망가지는 일이 없습니다.
두 줄로 나눠 쓰면 틀립니다.

\`\`\`python
# 이렇게 쓰면 안 됩니다
a = b          # 여기서 a 가 이미 바뀌어 버려서
b = a % b      # 아래 줄의 a 는 원래 값이 아닙니다
\`\`\`

같은 규칙을 재귀로 쓸 수도 있습니다. \`gcd(a, b) = gcd(b, a % b)\` 를 그대로
옮긴 모양입니다.

\`\`\`python
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)
\`\`\`

## 자주 하는 실수

- **\`while b != 0\` 을 \`while a % b != 0\` 로 쓰기** — b가 0이 되는 순간
  \`a % b\` 에서 0으로 나누게 되어 오류가 납니다.
- **답으로 b를 돌려주기** — 반복이 끝난 시점의 b는 항상 0입니다. 답은 a입니다.
- **두 수를 미리 크기순으로 정렬하기** — 필요 없습니다. 위에서 본 것처럼 첫
  반복이 알아서 바꿔 줍니다.

## 참고 — 최소공배수

최대공약수를 구해 두면 최소공배수(LCM)는 나눗셈 한 번입니다.

\`\`\`python
lcm = a * b // gcd(a, b)
\`\`\`

파이썬 표준 라이브러리에도 \`math.gcd\` 가 있지만, 이 문제는 직접 구현해 보는
것이 목적입니다.
`,
};

const args = process.argv.slice(2);
const APPLY = args.includes("--write");
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

const entries = Object.entries(THEORY).filter(([slug]) => !ONLY || slug === ONLY);
if (entries.length === 0) {
	console.error(ONLY ? `no theory defined for "${ONLY}"` : "no theory defined");
	process.exit(1);
}

loadEnv();
const client = new MongoClient(await resolveMongoUri(process.env.YIPDB_MONGODB_URI));
await client.connect();
const col = client.db("yipDB").collection("problems");

for (const [slug, theory] of entries) {
	const problem = await col.findOne({ slug }, { projection: { slug: 1, title: 1, theory: 1 } });
	if (!problem) {
		console.log(`SKIP  ${slug} — 문제가 없습니다`);
		continue;
	}
	const heading = theory.match(/^\s*#\s+(.+)/)?.[1] ?? "(제목 없음)";
	const state = problem.theory ? `기존 ${problem.theory.length}자 → ` : "새로 ";
	console.log(`${APPLY ? "WRITE" : "DRY  "} ${slug} (${problem.title}) — ${state}${theory.length}자 · 부제 "${heading}"`);

	if (!APPLY) continue;
	const res = await col.updateOne({ slug }, { $set: { theory, updatedAt: new Date() } });
	console.log(`      matched ${res.matchedCount}, modified ${res.modifiedCount}`);
}

if (!APPLY) console.log("\n(dry run — 반영하려면 --write)");
await client.close();
