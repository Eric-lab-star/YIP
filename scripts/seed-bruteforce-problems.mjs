// Seed the 완전탐색 problems used by the Algorithm course's 11th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-bruteforce-problems.mjs            seed
//   node scripts/seed-bruteforce-problems.mjs --print    preview without the DB
//
// The five problems follow the chapter's five steps: nested loops over every
// triple, combinations, permutations (so the two are contrasted back to back),
// the include/exclude recursion from chapter 7, and finally n-queens, where
// generating every permutation is too slow and pruning is the point.

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
	// 첫 줄에 정수 두 개, 둘째 줄에 n개의 수 — 1, 2, 4번이 쓴다.
	pairAndList: {
		python:
			"import sys\ninput = sys.stdin.readline\n\na, b = map(int, input().split())\nnums = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [a, b] = lines[0].trim().split(/\\s+/).map(Number);\nconst nums = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int a;\n    long long b;\n    cin >> a >> b;\n    vector<long long> nums(a);\n    for (int i = 0; i < a; i++) cin >> nums[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int a = Integer.parseInt(st.nextToken());\n        long b = Long.parseLong(st.nextToken());\n        long[] nums = new long[a];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < a; i++) nums[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar a int\n\tvar b int64\n\tfmt.Fscan(reader, &a, &b)\n\tnums := make([]int64, a)\n\tfor i := range nums {\n\t\tfmt.Fscan(reader, &nums[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄에 정수 두 개뿐 — 3번이 쓴다.
	twoInts: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = lines[0].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    cin >> n >> m;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄에 정수 하나 — 5번이 쓴다.
	oneInt: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0].trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\n\t// 여기에 코드를 작성하세요\n}\n',
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

/** `count` integers drawn from [lo, hi], as a space-separated line. */
function randomInts(count, lo, hi, seed) {
	const rnd = lcg(seed);
	const out = [];
	for (let i = 0; i < count; i++) out.push(lo + Math.floor(rnd() * (hi - lo + 1)));
	return out.join(" ");
}

/** First line's two ints plus the second line's list. */
function parsePairAndList(s) {
	const lines = s.trim().split("\n");
	const [a, b] = lines[0].trim().split(/\s+/).map(Number);
	const nums = lines[1].trim().split(/\s+/).map(Number);
	return { a, b, nums };
}

/** Every k-sized combination of indices 0..n-1, in lexicographic order. */
function combinations(n, k) {
	const out = [];
	const cur = [];
	const go = (start) => {
		if (cur.length === k) {
			out.push(cur.slice());
			return;
		}
		for (let i = start; i < n; i++) {
			cur.push(i);
			go(i + 1);
			cur.pop();
		}
	};
	go(0);
	return out;
}

const P = [
	{
		slug: "s-three-card-sum",
		title: "세 장의 카드",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 세 장의 카드\n\n첫 줄에 카드의 장수 `n` (3 이상 100 이하) 과 목표 수 `m` (1 이상 300000 이하) 이 주어집니다.\n둘째 줄에 각 카드에 적힌 수가 주어집니다. 카드의 수는 1 이상 100000 이하입니다.\n\n서로 **다른 세 장**을 골라 합이 `m` 을 넘지 않게 하면서 **가장 크게** 만들었을 때\n그 합을 출력하세요.\n\n어떻게 골라도 합이 `m` 을 넘으면 `-1` 을 출력합니다.",
		// 이 챕터의 출발점 — 삼중 반복문으로 모든 조합을 훑는다. 인덱스를 i < j < k
		// 로 묶지 않으면 같은 카드를 두 번 고르거나 같은 조합을 여러 번 센다.
		// 3번 케이스가 '-1' 을 강제하므로 최댓값 시작값을 0 으로 두면 틀린다.
		inputs: [
			"5 21\n5 6 7 8 9",
			"10 500\n93 181 245 214 315 36 185 138 216 295",
			"3 5\n10 10 10",
			"6 12\n1 2 3 4 5 6",
			`100 250000\n${randomInts(100, 1, 100000, 20260801)}`,
		],
		solve: (s) => {
			const { a: n, b: m, nums } = parsePairAndList(s);
			let best = -1;
			for (let i = 0; i < n; i++) {
				for (let j = i + 1; j < n; j++) {
					for (let k = j + 1; k < n; k++) {
						const sum = nums[i] + nums[j] + nums[k];
						if (sum <= m && sum > best) best = sum;
					}
				}
			}
			return String(best);
		},
	},
	{
		slug: "s-choose-k-list",
		title: "고르는 모든 방법",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 고르는 모든 방법\n\n첫 줄에 수의 개수 `n` 과 고를 개수 `k` 가 주어집니다. `1 ≤ k ≤ n ≤ 10` 입니다.\n둘째 줄에 서로 다른 `n`개의 수가 주어집니다. 수는 1 이상 100 이하이며, 주어지는 순서는 정해져 있지 않습니다.\n\n`n`개 중 `k`개를 고르는 **모든 방법**을 한 줄에 하나씩 출력하세요.\n각 줄의 수는 **오름차순**으로, 줄과 줄 사이는 **사전순**으로 정렬합니다.\n\n고르는 것은 **순서를 따지지 않습니다.** `1 2` 와 `2 1` 은 같은 방법입니다.",
		// combinations 쪽. 입력이 정렬되어 있지 않으므로 먼저 정렬하지 않으면
		// 사전순이 깨진다 — 2번 케이스가 그것만 잡는다. permutations 로 풀면
		// 줄 수부터 달라진다.
		inputs: [
			"7 3\n1 2 3 4 5 6 7",
			"4 2\n7 3 9 1",
			"5 5\n5 4 3 2 1",
			"5 1\n10 20 30 40 50",
			"10 5\n42 17 93 8 61 30 75 24 56 3",
		],
		solve: (s) => {
			const { a: n, b: k, nums } = parsePairAndList(s);
			const sorted = nums.slice().sort((x, y) => x - y);
			return combinations(n, k)
				.map((idx) => idx.map((i) => sorted[i]).join(" "))
				.join("\n");
		},
	},
	{
		slug: "s-perm-list",
		title: "줄 세우는 모든 방법",
		shape: "twoInts",
		visible: 2,
		description:
			"# 줄 세우는 모든 방법\n\n첫 줄에 두 정수 `n` 과 `m` 이 주어집니다. `1 ≤ m ≤ n ≤ 7` 입니다.\n\n`1` 부터 `n` 까지의 수 중 **서로 다른 `m`개를 골라 줄을 세우는 모든 방법**을\n한 줄에 하나씩 출력하세요. 줄과 줄 사이는 **사전순**으로 정렬합니다.\n\n줄 세우기이므로 **순서가 다르면 다른 방법**입니다. `1 2` 와 `2 1` 은 서로 다릅니다.",
		// permutations 쪽. 2번과 나란히 두어 '순서를 따지냐' 하나로 답이 갈리는 걸
		// 보여준다. combinations 로 풀면 줄 수가 모자란다.
		inputs: ["3 1", "4 2", "1 1", "3 3", "7 7"],
		solve: (s) => {
			const [n, m] = s.trim().split(/\s+/).map(Number);
			const out = [];
			const cur = [];
			const used = new Array(n + 1).fill(false);
			const go = () => {
				if (cur.length === m) {
					out.push(cur.join(" "));
					return;
				}
				for (let v = 1; v <= n; v++) {
					if (used[v]) continue;
					used[v] = true;
					cur.push(v);
					go();
					cur.pop();
					used[v] = false;
				}
			};
			go();
			return out.join("\n");
		},
	},
	{
		slug: "s-subset-sum-count",
		title: "합이 되는 부분집합",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 합이 되는 부분집합\n\n첫 줄에 수의 개수 `n` (1 이상 18 이하) 과 목표 합 `s` (-1000000 이상 1000000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 정수가 주어집니다. 각 수는 -100000 이상 100000 이하입니다.\n\n주어진 수들 중 **크기가 1 이상인 부분집합** 가운데 합이 `s` 가 되는 것이\n몇 개인지 출력하세요.\n\n**아무것도 고르지 않은 경우는 세지 않습니다.**",
		// 7장의 이진 문자열 재귀가 그대로 쓰이는 자리 — 각 수마다 고르거나 안 고르거나.
		// 3번 케이스가 공집합을 세는 풀이를 잡는다 (정답 15, 공집합을 세면 16).
		inputs: [
			"5 0\n-7 -3 -2 5 8",
			"3 6\n1 2 3",
			"4 0\n0 0 0 0",
			"1 5\n5",
			// 목표를 0 으로 둔 건 우연이 아니다 — 공집합도 합이 0 이라, 이 케이스는
			// 크기와 공집합 처리를 동시에 잡는다 (정답 919, 공집합을 세면 920).
			`18 0\n${randomInts(18, -100, 100, 20260802)}`,
		],
		solve: (s) => {
			const { a: n, b: target, nums } = parsePairAndList(s);
			let count = 0;
			const go = (i, sum, picked) => {
				if (i === n) {
					if (picked > 0 && sum === target) count++;
					return;
				}
				go(i + 1, sum, picked);
				go(i + 1, sum + nums[i], picked + 1);
			};
			go(0, 0, 0);
			return String(count);
		},
	},
	{
		slug: "s-nqueens",
		title: "퀸을 놓는 방법",
		shape: "oneInt",
		visible: 2,
		description:
			"# 퀸을 놓는 방법\n\n첫 줄에 정수 `n` (1 이상 11 이하) 이 주어집니다.\n\n`n × n` 체스판에 퀸 `n`개를 서로 공격할 수 없게 놓는 방법의 수를 출력하세요.\n\n퀸은 **같은 행, 같은 열, 두 대각선**에 있는 다른 퀸을 공격합니다.\n한 방법도 없으면 `0` 을 출력합니다.",
		// 챕터의 마지막 교훈이 걸린 자리 — 상한이 11 인 건 측정해서 고른 값이다.
		// 파이썬 기준 n = 11 에서 순열을 전부 만들어 검사하면 46.97초, 놓다가 어긋나면
		// 되돌아오는 백트래킹은 0.42초다. 제한 5초가 둘을 확실히 갈라놓는다.
		// n = 10 은 안 된다 — 순열 풀이가 4.02초로 아슬아슬하게 통과해버린다.
		// n = 12 도 안 된다 — 백트래킹 정답마저 3.41초라 여유가 없다.
		inputs: ["4", "1", "2", "8", "11"],
		solve: (s) => {
			const n = Number(s.trim());
			const col = new Array(n).fill(0);
			let count = 0;
			const go = (r) => {
				if (r === n) {
					count++;
					return;
				}
				for (let c = 0; c < n; c++) {
					let ok = true;
					for (let i = 0; i < r; i++) {
						if (col[i] === c || Math.abs(col[i] - c) === r - i) {
							ok = false;
							break;
						}
					}
					if (!ok) continue;
					col[r] = c;
					go(r + 1);
				}
			};
			go(0);
			return String(count);
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

// Full cases as JSON, for checking reference solutions against every case.
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
			const out =
				tc.expectedOutput.length > 50
					? tc.expectedOutput.slice(0, 30).replace(/\n/g, "\\n") + `... (${tc.expectedOutput.length}자)`
					: tc.expectedOutput;
			console.log(`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(inn)} -> ${JSON.stringify(out)}`);
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
	console.log(`Seeded ${P.length} bruteforce problems.`);
} finally {
	await client.close();
}
