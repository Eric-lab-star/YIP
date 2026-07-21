// Seed the 동적계획법 problems used by the Algorithm course's 13th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-dp-problems.mjs            seed
//   node scripts/seed-dp-problems.mjs --print    preview without the DB
//   node scripts/seed-dp-problems.mjs --json     full cases, for checking solutions
//
// The five problems follow the chapter's five steps: 1D counting (climbing
// stairs, the tribonacci that chapter 7's fib was heading toward), a 1D min
// recurrence (make-one, where greedy picks the wrong divisor), a 2D table
// (knapsack, which is chapter 11's include/exclude with a cache), and finally
// two coin problems on the same input — fewest coins and number of ways — so
// the same state carries two different recurrences (min vs sum) and the ways
// version exposes the combination-vs-permutation loop-order trap.

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

// See piston/docker-compose.yml (PISTON_OUTPUT_MAX_SIZE) — Piston kills rather
// than truncates a run that overruns its per-stream cap.
const STDOUT_CAP = 1_048_576;
// Piston mounts body_parser.json() with no limit, so Express's 100 KB default
// caps the whole request — and the submitted source shares that budget with
// stdin. Measured: 102,240 bytes of stdin passes, 102,241 is a 400.
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄에 정수 하나 — 1, 2번이 쓴다.
	oneInt: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0].trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄에 n, W. 이어서 n개의 줄에 무게와 가치 — 3번이 쓴다.
	knapsack: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, cap = map(int, input().split())\nitems = [tuple(map(int, input().split())) for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, cap] = lines[0].trim().split(/\\s+/).map(Number);\nconst items = [];\nfor (let i = 1; i <= n; i++) {\n  const [w, v] = lines[i].trim().split(/\\s+/).map(Number);\n  items.push([w, v]);\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, cap;\n    cin >> n >> cap;\n    vector<int> w(n), v(n);\n    for (int i = 0; i < n; i++) cin >> w[i] >> v[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int cap = Integer.parseInt(st.nextToken());\n        int[] w = new int[n], v = new int[n];\n        for (int i = 0; i < n; i++) {\n            st = new StringTokenizer(br.readLine());\n            w[i] = Integer.parseInt(st.nextToken());\n            v[i] = Integer.parseInt(st.nextToken());\n        }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, cap int\n\tfmt.Fscan(reader, &n, &cap)\n\tw := make([]int, n)\n\tv := make([]int, n)\n\tfor i := 0; i < n; i++ {\n\t\tfmt.Fscan(reader, &w[i], &v[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄에 n, k. 둘째 줄에 n개의 동전 — 4, 5번이 쓴다. 두 문제가 입력을
	// 공유하는 게 요점이라 시작 코드도 같다.
	pairAndList: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, k = map(int, input().split())\ncoins = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, k] = lines[0].trim().split(/\\s+/).map(Number);\nconst coins = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, k;\n    cin >> n >> k;\n    vector<int> coins(n);\n    for (int i = 0; i < n; i++) cin >> coins[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int k = Integer.parseInt(st.nextToken());\n        int[] coins = new int[n];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) coins[i] = Integer.parseInt(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, k int\n\tfmt.Fscan(reader, &n, &k)\n\tcoins := make([]int, n)\n\tfor i := range coins {\n\t\tfmt.Fscan(reader, &coins[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

/** Deterministic pseudo-random (LCG) so generated cases are reproducible. */
function lcg(seed) {
	let x = seed >>> 0;
	return () => {
		x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
		return x / 4294967296;
	};
}

const P = [
	{
		slug: "s-climb-stairs",
		title: "계단 오르기",
		shape: "oneInt",
		visible: 2,
		description:
			"# 계단 오르기\n\n첫 줄에 계단의 칸 수 `n` (1 이상 60 이하) 이 주어집니다.\n\n한 번에 **1칸, 2칸, 또는 3칸**을 오를 수 있습니다.\n맨 아래에서 `n`번째 칸까지 오르는 **서로 다른 방법의 수**를 출력하세요.\n\n오르는 칸 수의 순서가 다르면 다른 방법입니다. 예를 들어 `1 + 2` 와 `2 + 1` 은 다릅니다.",
		// 7장의 fib 가 향하던 곳 — dp[i] = dp[i-1] + dp[i-2] + dp[i-3]. 초기값을
		// 잘못 잡으면 작은 n 에서 바로 틀린다. n=60 이어도 값이 int64/2^53 안이다.
		inputs: ["3", "1", "5", "2", "60"],
		solve: (s) => {
			const n = Number(s.trim());
			const dp = [1, 1, 2];
			for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
			return String(dp[n]);
		},
	},
	{
		slug: "s-make-one",
		title: "1로 만들기",
		shape: "oneInt",
		visible: 2,
		description:
			"# 1로 만들기\n\n첫 줄에 정수 `n` (1 이상 1000000 이하) 이 주어집니다.\n\n정수 `n` 에 다음 세 연산을 적용할 수 있습니다.\n\n- `3` 으로 나누어떨어지면 `3` 으로 나눈다\n- `2` 로 나누어떨어지면 `2` 로 나눈다\n- `1` 을 뺀다\n\n`n` 을 `1` 로 만드는 데 필요한 **연산의 최소 횟수**를 출력하세요.",
		// min 점화식의 대표. '나눌 수 있으면 무조건 나눈다' 는 그리디가 틀린다 —
		// 10 은 그리디가 4번(÷2, -1, ÷2, ÷2), 최적은 3번(-1, ÷3, ÷3)이다.
		inputs: ["10", "1", "2", "27", "1000000"],
		solve: (s) => {
			const n = Number(s.trim());
			const dp = new Array(n + 1).fill(0);
			for (let i = 2; i <= n; i++) {
				let best = dp[i - 1] + 1;
				if (i % 2 === 0) best = Math.min(best, dp[i / 2] + 1);
				if (i % 3 === 0) best = Math.min(best, dp[i / 3] + 1);
				dp[i] = best;
			}
			return String(dp[n]);
		},
	},
	{
		slug: "s-knapsack",
		title: "배낭 채우기",
		shape: "knapsack",
		visible: 2,
		description:
			"# 배낭 채우기\n\n첫 줄에 물건의 개수 `n` (1 이상 100 이하) 과 배낭이 버티는 무게 `W` (1 이상 10000 이하) 가 주어집니다.\n이어서 `n`개의 줄에 각 물건의 무게와 가치가 주어집니다. 무게와 가치는 1 이상 1000 이하입니다.\n\n무게의 합이 `W` 를 넘지 않게 물건을 고를 때 (각 물건은 **한 번만** 담을 수 있습니다),\n담은 물건들의 **가치 합의 최댓값**을 출력하세요.",
		// 11장의 '고른다/안 고른다' 재귀에 표를 씌운 것. 무게순/가치순/비율순
		// 그리디는 모두 틀린다. 공개된 첫 케이스가 비율 그리디를 바로 잡고,
		// 4번 케이스는 고전적인 비율 함정이다 — 비율이 가장 높은 (10,60)을
		// 먼저 담으면 (20,100)+(30,120)=220 을 놓치고 160 에 그친다.
		inputs: [
			"4 7\n6 13\n4 8\n3 6\n5 12",
			"1 5\n10 100",
			"3 10\n5 10\n4 40\n6 30",
			"3 50\n10 60\n20 100\n30 120",
			// n*W 표를 채우므로 W 를 10000 으로 잡는다 — 100*10000=10^6 은 파이썬으로도
			// Piston 에서 넉넉하다. 100000 은 10^7 이라 참조 풀이가 5초 제한에 TLE 났다.
			(() => {
				const rnd = lcg(20261001);
				const rows = [];
				for (let i = 0; i < 100; i++) rows.push(`${1 + Math.floor(rnd() * 1000)} ${1 + Math.floor(rnd() * 1000)}`);
				return `100 10000\n${rows.join("\n")}`;
			})(),
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const [n, cap] = lines[0].trim().split(/\s+/).map(Number);
			const dp = new Array(cap + 1).fill(0);
			for (let i = 1; i <= n; i++) {
				const [w, v] = lines[i].trim().split(/\s+/).map(Number);
				for (let c = cap; c >= w; c--) dp[c] = Math.max(dp[c], dp[c - w] + v);
			}
			return String(dp[cap]);
		},
	},
	{
		slug: "s-coin-min",
		title: "동전 최소 개수",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 동전 최소 개수\n\n첫 줄에 동전의 종류 `n` (1 이상 100 이하) 과 만들 금액 `k` (1 이상 10000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 동전 금액이 주어집니다. 동전 금액은 1 이상 10000 이하이고 서로 다릅니다.\n\n동전을 몇 개든 쓸 수 있을 때, 합이 정확히 `k` 가 되게 하는 **가장 적은 동전 개수**를 출력하세요.\n\n어떤 동전을 골라도 `k` 를 만들 수 없으면 `-1` 을 출력합니다.",
		// 12장 그리디 동전의 뒤집기. 배수 조건이 없어서 그리디는 틀린다 —
		// 1, 3, 4 로 6 을 만들면 그리디는 3개(4+1+1), 정답은 2개(3+3)다.
		// -1(불가) 케이스도 넣어 초기값 처리를 강제한다.
		inputs: [
			"3 6\n1 3 4",
			"3 11\n1 5 6",
			"2 7\n2 4",
			"1 10\n10",
			"5 10000\n1 12 33 87 250",
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const k = Number(lines[0].trim().split(/\s+/)[1]);
			const coins = lines[1].trim().split(/\s+/).map(Number);
			const INF = Infinity;
			const dp = new Array(k + 1).fill(INF);
			dp[0] = 0;
			for (let a = 1; a <= k; a++) {
				for (const c of coins) if (c <= a && dp[a - c] + 1 < dp[a]) dp[a] = dp[a - c] + 1;
			}
			return String(dp[k] === INF ? -1 : dp[k]);
		},
	},
	{
		slug: "s-coin-ways",
		title: "동전으로 만드는 방법의 수",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 동전으로 만드는 방법의 수\n\n첫 줄에 동전의 종류 `n` (1 이상 100 이하) 과 만들 금액 `k` (1 이상 100 이하) 가 주어집니다.\n둘째 줄에 `n`개의 동전 금액이 주어집니다. 동전 금액은 1 이상 100 이하이고 서로 다릅니다.\n\n동전을 몇 개든 쓸 수 있을 때, 합이 `k` 가 되게 만드는 **방법의 수**를 출력하세요.\n\n동전을 고르는 **순서는 따지지 않습니다.** `1 + 2` 와 `2 + 1` 은 같은 방법입니다.\n만들 수 없으면 `0` 을 출력합니다.",
		// 4번과 입력 형식이 같은데 질문이 다르다 (min → 방법의 수). 반복문 순서가
		// 요점 — 동전을 바깥, 금액을 안으로 돌려야 조합이다. 뒤집으면 순서를 세서
		// 틀린다. 첫 공개 케이스 (1,2 로 3) 가 정답 2, 순열 버그면 3 이다.
		// k <= 100 이라 방법의 수가 2^53 을 넘지 않는다.
		inputs: [
			"2 3\n1 2",
			"3 10\n2 3 5",
			"1 7\n3",
			"2 100\n1 2",
			"5 100\n1 2 5 10 20",
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const k = Number(lines[0].trim().split(/\s+/)[1]);
			const coins = lines[1].trim().split(/\s+/).map(Number);
			const dp = new Array(k + 1).fill(0);
			dp[0] = 1;
			for (const c of coins) {
				for (let a = c; a <= k; a++) dp[a] += dp[a - c];
			}
			return String(dp[k]);
		},
	},
];

/** 예시 block is generated from the first test case so the two cannot drift. */
function exampleSection(p) {
	const stdin = p.inputs[0];
	return `\n\n## 예시\n\n**입력**\n\`\`\`\n${stdin}\n\`\`\`\n\n**출력**\n\`\`\`\n${p.solve(stdin)}\n\`\`\``;
}

function toProblem(p, now) {
	const testcases = p.inputs.map((stdin, i) => ({
		stdin: stdin + "\n",
		expectedOutput: p.solve(stdin) + "\n",
		hidden: i >= p.visible,
	}));

	for (const [i, tc] of testcases.entries()) {
		if (tc.expectedOutput.length > STDOUT_CAP) {
			throw new Error(
				`${p.slug} case ${i}: 기대 출력 ${tc.expectedOutput.length}바이트 > 출력 상한 ${STDOUT_CAP}바이트`
			);
		}
		if (tc.stdin.length > STDIN_CAP) {
			throw new Error(
				`${p.slug} case ${i}: 입력 ${tc.stdin.length}바이트 > 요청 본문 상한 ${STDIN_CAP}바이트`
			);
		}
	}
	return {
		slug: p.slug,
		title: p.title,
		description: p.description + exampleSection(p),
		difficulty: "medium",
		languages: LANGS,
		starterCode: STARTERS[p.shape],
		testcases,
		timeLimit: 5,
		memoryLimit: 256000,
		createdBy: "seed",
		updatedAt: now,
	};
}

if (process.argv.includes("--json")) {
	const out = {};
	for (const p of P) out[p.slug] = toProblem(p, new Date()).testcases;
	console.log(JSON.stringify(out));
	process.exit(0);
}

if (process.argv.includes("--print")) {
	for (const p of P) {
		console.log(`\n===== ${p.slug} =====`);
		for (const tc of toProblem(p, new Date()).testcases) {
			const inn =
				tc.stdin.length > 50 ? tc.stdin.slice(0, 30).replace(/\n/g, "\\n") + `... (${tc.stdin.length}자)` : tc.stdin;
			console.log(
				`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(inn)} -> ${JSON.stringify(tc.expectedOutput)}`
			);
		}
	}
	process.exit(0);
}

loadEnv();
const uri = process.env.YIPDB_MONGODB_URI;
if (!uri) {
	console.error("YIPDB_MONGODB_URI is not set");
	process.exit(1);
}

const client = new MongoClient(await resolveMongoUri(uri));
try {
	await client.connect();
	const col = client.db("yipDB").collection("problems");
	await col.createIndex({ slug: 1 }, { unique: true });
	const now = new Date();
	for (const def of P) {
		const doc = toProblem(def, now);
		await col.updateOne(
			{ slug: doc.slug },
			{ $set: doc, $setOnInsert: { createdAt: now } },
			{ upsert: true }
		);
	}
	console.log(`Seeded ${P.length} dp problems.`);
} finally {
	await client.close();
}
