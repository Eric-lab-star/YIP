// Seed the 그리디 problems used by the Algorithm course's 12th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-greedy-problems.mjs            seed
//   node scripts/seed-greedy-problems.mjs --print    preview without the DB
//   node scripts/seed-greedy-problems.mjs --json     full cases, for checking solutions
//
// The five problems build one habit: decide what to sort by, then sweep once.
// Coins take the largest first, the ATM queue and the rope both sort a plain
// list, and the last two hand the same input to two different questions — how
// many meetings fit in one room, and how many rooms fit all the meetings — which
// need different sort keys and so cannot share a solution.

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

// See piston/docker-compose.yml (PISTON_OUTPUT_MAX_SIZE) — Piston kills rather
// than truncates a run that overruns its per-stream cap.
const STDOUT_CAP = 1_048_576;
// Piston mounts body_parser.json() with no limit, so Express's 100 KB default
// caps the whole request — and the submitted source shares that budget with
// stdin. Measured: 102,240 bytes of stdin passes, 102,241 is a 400.
// This is why the interval problems cap n at 5000 rather than the usual 100000.
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄에 정수 두 개, 둘째 줄에 n개의 수 — 1번이 쓴다.
	pairAndList: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, k = map(int, input().split())\ncoins = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, k] = lines[0].trim().split(/\\s+/).map(Number);\nconst coins = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    long long k;\n    cin >> n >> k;\n    vector<long long> coins(n);\n    for (int i = 0; i < n; i++) cin >> coins[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        long k = Long.parseLong(st.nextToken());\n        long[] coins = new long[n];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) coins[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tvar k int64\n\tfmt.Fscan(reader, &n, &k)\n\tcoins := make([]int64, n)\n\tfor i := range coins {\n\t\tfmt.Fscan(reader, &coins[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄에 n, 둘째 줄에 n개의 수 — 2, 3번이 쓴다.
	oneIntAndList: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\nnums = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0].trim());\nconst nums = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        long[] nums = new long[n];\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) nums[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\tnums := make([]int64, n)\n\tfor i := range nums {\n\t\tfmt.Fscan(reader, &nums[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄에 n, 이어서 n개의 줄에 두 정수 — 4, 5번이 쓴다. 두 문제가 입력을
	// 공유하는 게 요점이라 시작 코드도 같다.
	intervals: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\nmeetings = [tuple(map(int, input().split())) for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0].trim());\nconst meetings = [];\nfor (let i = 1; i <= n; i++) {\n  const [s, e] = lines[i].trim().split(/\\s+/).map(Number);\n  meetings.push([s, e]);\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    vector<pair<int, int>> meetings(n);\n    for (int i = 0; i < n; i++) cin >> meetings[i].first >> meetings[i].second;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        int[][] meetings = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            StringTokenizer st = new StringTokenizer(br.readLine());\n            meetings[i][0] = Integer.parseInt(st.nextToken());\n            meetings[i][1] = Integer.parseInt(st.nextToken());\n        }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\tmeetings := make([][2]int, n)\n\tfor i := 0; i < n; i++ {\n\t\tfmt.Fscan(reader, &meetings[i][0], &meetings[i][1])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
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

function randomInts(count, lo, hi, seed) {
	const rnd = lcg(seed);
	const out = [];
	for (let i = 0; i < count; i++) out.push(lo + Math.floor(rnd() * (hi - lo + 1)));
	return out.join(" ");
}

/** n meetings with 시작 < 끝, as the interval problems' stdin. */
function randomMeetings(n, maxT, seed) {
	const rnd = lcg(seed);
	const rows = [];
	for (let i = 0; i < n; i++) {
		const s = Math.floor(rnd() * maxT);
		const len = 1 + Math.floor(rnd() * 50);
		rows.push(`${s} ${Math.min(s + len, maxT)}`);
	}
	// 길이가 0 이 되어버린 줄은 고쳐서 시작 < 끝 을 지킨다.
	const fixed = rows.map((r) => {
		const [s, e] = r.split(" ").map(Number);
		return s < e ? r : `${s} ${s + 1}`;
	});
	return `${n}\n${fixed.join("\n")}`;
}

function parseOneIntAndList(s) {
	const lines = s.trim().split("\n");
	return { n: Number(lines[0].trim()), nums: lines[1].trim().split(/\s+/).map(Number) };
}

function parseMeetings(s) {
	const lines = s.trim().split("\n");
	const n = Number(lines[0].trim());
	const out = [];
	for (let i = 1; i <= n; i++) {
		const [a, b] = lines[i].trim().split(/\s+/).map(Number);
		out.push([a, b]);
	}
	return out;
}

const P = [
	{
		slug: "s-coin-greedy",
		title: "동전 거스름돈",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 동전 거스름돈\n\n첫 줄에 동전의 종류 `n` (1 이상 10 이하) 과 만들 금액 `k` (1 이상 100000000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 동전 금액이 주어집니다. 주어지는 순서는 정해져 있지 않습니다.\n\n동전을 몇 개든 쓸 수 있을 때, 합이 정확히 `k` 가 되게 하는 **가장 적은 동전 개수**를 출력하세요.\n\n동전 금액에는 항상 `1` 이 포함되고, **큰 동전은 그보다 작은 동전의 배수**입니다.\n그래서 항상 만들 수 있습니다.",
		// 배수 조건이 있어야 그리디가 맞다는 게 이 문제의 요점이라, 조건을 설명에
		// 그대로 적어두었다. 2번 케이스는 입력이 내림차순이 아니라서 정렬을 강제한다.
		inputs: [
			"10 4200\n1 5 10 50 100 500 1000 5000 10000 50000",
			"10 4790\n50000 10000 5000 1000 500 100 50 10 5 1",
			"1 1\n1",
			"4 63\n1 2 4 8",
			"10 100000000\n1 5 10 50 100 500 1000 5000 10000 50000",
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			let k = Number(lines[0].trim().split(/\s+/)[1]);
			const coins = lines[1].trim().split(/\s+/).map(Number).sort((a, b) => b - a);
			let cnt = 0;
			for (const c of coins) {
				if (c > k) continue;
				cnt += Math.floor(k / c);
				k %= c;
			}
			return String(cnt);
		},
	},
	{
		slug: "s-atm-queue",
		title: "ATM 줄 세우기",
		shape: "oneIntAndList",
		visible: 2,
		description:
			"# ATM 줄 세우기\n\n첫 줄에 사람 수 `n` (1 이상 1000 이하) 이 주어집니다.\n둘째 줄에 각 사람이 ATM 을 쓰는 데 걸리는 시간이 주어집니다. 시간은 1 이상 1000 이하입니다.\n\n한 번에 한 명만 쓸 수 있습니다. 줄 순서를 마음대로 정할 수 있을 때,\n**모든 사람이 기다린 시간의 합**을 가장 작게 만들면 얼마인지 출력하세요.\n\n각 사람이 기다린 시간은 **자기 차례가 끝날 때까지 걸린 시간**입니다.\n앞사람들이 쓴 시간에 자기가 쓴 시간을 더한 값입니다.",
		// 정렬 하나로 끝나는 가장 단순한 그리디. 앞사람의 시간이 뒤 전체에 더해지니
		// 짧은 사람이 앞이어야 한다.
		inputs: [
			"5\n3 1 4 3 2",
			"1\n100",
			"5\n5 4 3 2 1",
			"3\n1 1 1",
			`1000\n${randomInts(1000, 1, 1000, 20260901)}`,
		],
		solve: (s) => {
			const { nums } = parseOneIntAndList(s);
			const sorted = nums.slice().sort((a, b) => a - b);
			let run = 0;
			let total = 0;
			for (const t of sorted) {
				run += t;
				total += run;
			}
			return String(total);
		},
	},
	{
		slug: "s-rope-max",
		title: "로프로 들어올리기",
		shape: "oneIntAndList",
		visible: 2,
		description:
			"# 로프로 들어올리기\n\n첫 줄에 로프의 개수 `n` (1 이상 5000 이하) 이 주어집니다.\n둘째 줄에 각 로프가 버틸 수 있는 최대 중량이 주어집니다. 중량은 1 이상 10000 이하입니다.\n\n로프 `k`개를 병렬로 이어서 물건을 들면 **각 로프에 중량이 똑같이 나뉘어** 걸립니다.\n즉 `k`개로 무게 `w` 를 들면 로프 하나당 `w / k` 를 버텨야 합니다.\n\n로프를 마음대로 골라 쓸 수 있을 때 (안 쓰는 로프가 있어도 됩니다),\n들어올릴 수 있는 **최대 중량**을 출력하세요.",
		// 정렬한 뒤 '몇 개를 쓸지'를 전부 따져보는 유형. 가장 튼튼한 로프만 봐도,
		// 전부 다 써도 틀린다. 4번 케이스가 둘 다 잡는다.
		inputs: [
			"2\n10 15",
			"1\n5",
			"3\n1 1 1",
			"4\n10 20 30 40",
			`5000\n${randomInts(5000, 1, 10000, 20260902)}`,
		],
		solve: (s) => {
			const { nums } = parseOneIntAndList(s);
			const sorted = nums.slice().sort((a, b) => b - a);
			let best = 0;
			for (let i = 0; i < sorted.length; i++) best = Math.max(best, sorted[i] * (i + 1));
			return String(best);
		},
	},
	{
		slug: "s-meeting-count",
		title: "회의실 하나에 몇 개",
		shape: "intervals",
		visible: 2,
		description:
			"# 회의실 하나에 몇 개\n\n첫 줄에 회의의 개수 `n` (1 이상 5000 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각 회의의 시작 시각과 끝 시각이 주어집니다.\n시각은 0 이상 100000 이하이고, **시작 시각은 끝 시각보다 작습니다.**\n\n회의실이 **하나**뿐일 때 겹치지 않게 쓸 수 있는 회의의 **최대 개수**를 출력하세요.\n\n한 회의가 끝나는 시각에 다른 회의가 시작하는 것은 겹치는 것으로 보지 않습니다.",
		// 이 챕터의 핵심 함정. 시작이 빠른 순도, 짧은 순도 아니고 '끝이 빠른 순'이다.
		// 두 오답을 잡는 케이스가 서로 다르다는 걸 측정으로 확인했다.
		//   시작 시각 정렬 — 1, 3, 5번째 케이스에서 틀린다. 1번째에서 (1,4)를 먼저
		//     잡아 뒤의 둘을 다 막아 1개가 나온다 (정답 2개).
		//   짧은 회의 우선 — 4번째 케이스에서만 틀린다. (9,12)를 먼저 잡으면 양옆이
		//     모두 막혀 1개, 정답은 (1,10),(11,20) 으로 2개다.
		// 4번째 케이스는 시작 시각 정렬을 못 잡는다 — 거기서는 우연히 2개로 같다.
		// 그래서 두 케이스가 다 필요하다.
		inputs: [
			"3\n1 4\n2 3\n3 5",
			"1\n5 7",
			"11\n1 4\n3 5\n0 6\n5 7\n3 8\n5 9\n6 10\n8 11\n8 12\n2 13\n12 14",
			"3\n1 10\n9 12\n11 20",
			randomMeetings(5000, 100000, 20260903),
		],
		solve: (s) => {
			const ms = parseMeetings(s).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
			let end = -Infinity;
			let cnt = 0;
			for (const [a, b] of ms) {
				if (a < end) continue;
				cnt++;
				end = b;
			}
			return String(cnt);
		},
	},
	{
		slug: "s-meeting-rooms",
		title: "회의실이 몇 개 필요하냥",
		shape: "intervals",
		visible: 2,
		description:
			"# 회의실이 몇 개 필요하냥\n\n첫 줄에 회의의 개수 `n` (1 이상 5000 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각 회의의 시작 시각과 끝 시각이 주어집니다.\n시각은 0 이상 100000 이하이고, **시작 시각은 끝 시각보다 작습니다.**\n\n이번에는 **모든 회의를 전부** 열어야 합니다.\n그러려면 회의실이 **최소 몇 개** 필요한지 출력하세요.\n\n한 회의가 끝나는 시각에 다른 회의가 시작하는 것은 겹치는 것으로 보지 않습니다.",
		// 4번과 입력이 완전히 같은데 질문이 다르다. 정렬 기준도 답도 달라진다는 걸
		// 보여주려고 나란히 두었다. 4번 풀이를 그대로 내면 당연히 틀린다.
		inputs: [
			"3\n1 4\n2 3\n3 5",
			"1\n5 7",
			"11\n1 4\n3 5\n0 6\n5 7\n3 8\n5 9\n6 10\n8 11\n8 12\n2 13\n12 14",
			"3\n1 2\n1 2\n1 2",
			randomMeetings(5000, 100000, 20260903),
		],
		solve: (s) => {
			const ms = parseMeetings(s);
			const ev = [];
			// 같은 시각이면 끝을 먼저 처리한다 — 끝나는 시각과 시작 시각이 같으면
			// 겹치지 않기 때문이다. 시작 < 끝 이 보장되므로 음수로 내려가지 않는다.
			for (const [a, b] of ms) {
				ev.push([a, 1]);
				ev.push([b, 0]);
			}
			ev.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
			let cur = 0;
			let best = 0;
			for (const [, type] of ev) {
				cur += type === 1 ? 1 : -1;
				if (cur > best) best = cur;
			}
			return String(best);
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
	console.log(`Seeded ${P.length} greedy problems.`);
} finally {
	await client.close();
}
