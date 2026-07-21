// Seed the 비트마스킹 problems for the Algorithm course's 20th chapter.
// Expected outputs come from the reference `solve`. Upserts by slug; safe to re-run.
//
//   node scripts/seed-bitmask-problems.mjs [--print|--json]
//
// Bits as sets. Five problems: set operations on a bitmask (universe 1..20),
// counting subsets by XOR and by OR (chapter 11's 2^n enumeration done with a
// mask), then two bit-DP problems — minimum sets to cover a universe, and the
// assignment problem — where the mask is a DP state.

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 q, 이어서 q개의 연산 "code x" — 1번.
	setOps: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nq = int(input())\nmask = 0\nout = []\nfor _ in range(q):\n    code, x = map(int, input().split())\n    # code 1:추가 2:삭제 3:확인 4:토글 5:전체 6:비움\n    # 여기에 코드를 작성하세요\nsys.stdout.write(\"\\n\".join(out) + \"\\n\")\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst q = Number(data[0].trim());\nlet mask = 0;\nconst out = [];\nfor (let i = 1; i <= q; i++) {\n  const [code, x] = data[i].trim().split(/\\s+/).map(Number);\n  // 여기에 코드를 작성하세요\n}\nprocess.stdout.write(out.join('\\n') + '\\n');\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int q; cin >> q;\n    int mask = 0;\n    while (q--) { int code, x; cin >> code >> x;\n        // 여기에 코드를 작성하세요\n    }\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int q = Integer.parseInt(br.readLine().trim());\n        int mask = 0;\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < q; i++) {\n            StringTokenizer st = new StringTokenizer(br.readLine());\n            int code = Integer.parseInt(st.nextToken()), x = Integer.parseInt(st.nextToken());\n            // 여기에 코드를 작성하세요\n        }\n        System.out.print(sb);\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\twriter := bufio.NewWriter(os.Stdout)\n\tdefer writer.Flush()\n\tvar q int\n\tfmt.Fscan(reader, &q)\n\tmask := 0\n\tfor ; q > 0; q-- {\n\t\tvar code, x int\n\t\tfmt.Fscan(reader, &code, &x)\n\t\t_ = mask\n\t\t// 여기에 코드를 작성하세요\n\t}\n}\n',
	},
	// 첫 줄 n [target], 둘째 줄 n개의 수 — 2,3번.
	numbers: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nfirst = list(map(int, input().split()))\nn = first[0]\nnums = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst first = data[0].trim().split(/\\s+/).map(Number);\nconst n = first[0];\nconst nums = data[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    // 첫 줄을 통째로 읽어 n 과 (있으면) target 을 파싱하세요\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        // 필요하면 target 도 읽으세요\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\t// 첫 줄에서 n 과 (있으면) target 을 읽으세요\n\t// 여기에 코드를 작성하세요\n\t_ = reader\n}\n',
	},
	// 집합 커버: 첫 줄 n m, 이어서 n개의 집합 — 4번.
	setCover: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\nsets = []\nfor _ in range(n):\n    parts = list(map(int, input().split()))\n    mask = 0\n    for f in parts[1:]:\n        mask |= 1 << (f - 1)\n    sets.append(mask)\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst sets = [];\nfor (let i = 1; i <= n; i++) {\n  const parts = data[i].trim().split(/\\s+/).map(Number);\n  let mask = 0;\n  for (let j = 1; j < parts.length; j++) mask |= 1 << (parts[j] - 1);\n  sets.push(mask);\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m; cin >> n >> m;\n    vector<int> sets(n, 0);\n    for (int i = 0; i < n; i++) { int c; cin >> c; while (c--) { int f; cin >> f; sets[i] |= 1 << (f - 1); } }\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken()), m = Integer.parseInt(st.nextToken());\n        int[] sets = new int[n];\n        for (int i = 0; i < n; i++) { st = new StringTokenizer(br.readLine()); int c = Integer.parseInt(st.nextToken()); while (c-- > 0) { int f = Integer.parseInt(st.nextToken()); sets[i] |= 1 << (f - 1); } }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tsets := make([]int, n)\n\tfor i := 0; i < n; i++ {\n\t\tvar c int\n\t\tfmt.Fscan(reader, &c)\n\t\tfor ; c > 0; c-- {\n\t\t\tvar f int\n\t\t\tfmt.Fscan(reader, &f)\n\t\t\tsets[i] |= 1 << uint(f-1)\n\t\t}\n\t}\n\t_ = m\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 배정: 첫 줄 n, 이어서 n x n 비용 행렬 — 5번.
	assignment: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\ncost = [list(map(int, input().split())) for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(data[0].trim());\nconst cost = [];\nfor (let i = 1; i <= n; i++) cost.push(data[i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n; cin >> n;\n    vector<vector<int>> cost(n, vector<int>(n));\n    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) cin >> cost[i][j];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        int[][] cost = new int[n][n];\n        for (int i = 0; i < n; i++) { StringTokenizer st = new StringTokenizer(br.readLine()); for (int j = 0; j < n; j++) cost[i][j] = Integer.parseInt(st.nextToken()); }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\tcost := make([][]int, n)\n\tfor i := range cost {\n\t\tcost[i] = make([]int, n)\n\t\tfor j := range cost[i] {\n\t\t\tfmt.Fscan(reader, &cost[i][j])\n\t\t}\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) { let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }

const P = [
	{
		slug: "s-bit-set-ops",
		title: "비트로 만든 집합",
		shape: "setOps",
		visible: 2,
		description:
			"# 비트로 만든 집합\n\n1번부터 20번까지의 원소를 담는 집합이 있습니다. 처음에는 비어 있습니다.\n\n첫 줄에 연산의 수 `q` (1 이상 15000 이하) 가 주어집니다.\n이어서 `q`개의 줄에 `code x` 가 주어집니다.\n\n- `1 x` : `x` 를 넣는다 (이미 있으면 그대로)\n- `2 x` : `x` 를 뺀다 (없으면 그대로)\n- `3 x` : `x` 가 있으면 `1`, 없으면 `0` 을 출력한다\n- `4 x` : `x` 가 있으면 빼고, 없으면 넣는다 (토글)\n- `5 x` : 1~20 을 모두 넣는다 (`x` 는 무시)\n- `6 x` : 집합을 비운다 (`x` 는 무시)\n\n`3` 연산마다 한 줄에 하나씩 결과를 출력하세요.",
		// 집합을 정수 하나(비트마스크)로 표현한다. 넣기 |=, 빼기 &= ~, 확인 &,
		// 토글 ^=, 전체는 (1<<20)-1, 비움은 0.
		inputs: [
			"7\n1 3\n3 3\n3 5\n4 5\n3 5\n2 3\n3 3",
			"4\n5 0\n3 20\n6 0\n3 20",
			"6\n1 1\n1 20\n3 1\n3 20\n3 10\n4 1",
			(() => {
				const rnd = lcg(20262001); const q = 15000; const rows = [];
				for (let i = 0; i < q; i++) { const c = 1 + Math.floor(rnd() * 6); const x = 1 + Math.floor(rnd() * 20); rows.push(`${c} ${x}`); }
				return `${q}\n${rows.join("\n")}`;
			})(),
			"3\n3 7\n1 7\n3 7",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const q = Number(data[0]);
			let mask = 0;
			const out = [];
			const FULL = (1 << 20) - 1;
			for (let i = 1; i <= q; i++) {
				const [code, x] = data[i].trim().split(/\s+/).map(Number);
				const bit = 1 << (x - 1);
				if (code === 1) mask |= bit;
				else if (code === 2) mask &= ~bit;
				else if (code === 3) out.push((mask & bit) ? 1 : 0);
				else if (code === 4) mask ^= bit;
				else if (code === 5) mask = FULL;
				else if (code === 6) mask = 0;
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-subset-xor",
		title: "XOR이 목표가 되는 부분집합",
		shape: "numbers",
		visible: 2,
		description:
			"# XOR이 목표가 되는 부분집합\n\n첫 줄에 수의 개수 `n` (1 이상 16 이하) 과 목표 값 `k` (0 이상 1000000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 정수가 주어집니다. 각 수는 0 이상 1000000 이하입니다.\n\n**크기가 1 이상인 부분집합** 중, 원소들을 모두 XOR 한 값이 정확히 `k` 가 되는 것이\n몇 개인지 출력하세요.",
		// 11장의 부분집합 완전탐색을 비트마스크로. 0..2^n-1 의 각 mask 가 하나의
		// 부분집합이고, 켜진 비트가 고른 원소다.
		inputs: [
			"3 1\n1 2 3",
			"4 0\n5 5 3 3",
			"1 7\n7",
			"16 0\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
			"2 6\n6 6",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, k] = data[0].trim().split(/\s+/).map(Number);
			const nums = data[1].trim().split(/\s+/).map(Number);
			let cnt = 0;
			for (let mask = 1; mask < (1 << n); mask++) {
				let x = 0;
				for (let i = 0; i < n; i++) if (mask & (1 << i)) x ^= nums[i];
				if (x === k) cnt++;
			}
			return String(cnt);
		},
	},
	{
		slug: "s-subset-or-full",
		title: "전부 켜는 부분집합",
		shape: "numbers",
		visible: 2,
		description:
			"# 전부 켜는 부분집합\n\n첫 줄에 수의 개수 `n` (1 이상 16 이하) 이 주어집니다.\n둘째 줄에 `n`개의 정수가 주어집니다. 각 수는 1 이상 1000000 이하입니다.\n\n**크기가 1 이상인 부분집합** 중, 원소들을 모두 OR 한 값이\n**전체 `n`개를 모두 OR 한 값과 같아지는** 것이 몇 개인지 출력하세요.",
		// 2번과 같은 2^n 순회인데 연산이 XOR 대신 OR 이고, 목표가 '전체 OR' 이다.
		inputs: [
			"3\n1 2 3",
			"2\n4 4",
			"1\n9",
			"16\n1 2 4 8 16 32 64 128 256 512 1024 2048 4096 8192 16384 32768",
			"3\n7 1 2",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const n = Number(data[0].trim().split(/\s+/)[0]);
			const nums = data[1].trim().split(/\s+/).map(Number);
			let full = 0;
			for (const v of nums) full |= v;
			let cnt = 0;
			for (let mask = 1; mask < (1 << n); mask++) {
				let x = 0;
				for (let i = 0; i < n; i++) if (mask & (1 << i)) x |= nums[i];
				if (x === full) cnt++;
			}
			return String(cnt);
		},
	},
	{
		slug: "s-min-cover",
		title: "최소 개수로 전부 덮기",
		shape: "setCover",
		visible: 2,
		description:
			"# 최소 개수로 전부 덮기\n\n첫 줄에 집합의 수 `n` (1 이상 100 이하) 과 원소의 수 `m` (1 이상 15 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각 집합이 주어집니다. 줄의 첫 수는 그 집합의 크기이고, 그다음이 원소들 (1 이상 `m` 이하) 입니다.\n\n`1`번부터 `m`번 원소를 **모두 덮으려면** 집합을 **최소 몇 개** 골라야 하는지 출력하세요.\n어떻게 골라도 다 덮을 수 없으면 `-1` 을 출력합니다.",
		// 각 집합을 비트마스크로 만들고, dp[덮은 원소 마스크] = 최소 집합 수 로 DP.
		// 상태가 2^m 개라 m 이 작아야 한다.
		inputs: [
			"3 4\n2 1 2\n2 2 3\n2 3 4",
			"2 3\n1 1\n1 2",
			// 그리디 함정: {1,2,3}과 {4,5,6} 두 개면 되는데, 그리디는 더 큰
			// {1,2,4,5} 를 먼저 집어서 남은 3,6 을 각각 따로 덮느라 3개가 된다.
			"3 6\n3 1 2 3\n3 4 5 6\n4 1 2 4 5",
			(() => {
				const rnd = lcg(20262004); const n = 100, m = 15; const rows = [`${n} ${m}`];
				for (let i = 0; i < n; i++) {
					const feats = [];
					for (let f = 1; f <= m; f++) if (rnd() < 0.3) feats.push(f);
					if (feats.length === 0) feats.push(1 + Math.floor(rnd() * m));
					rows.push(`${feats.length} ${feats.join(" ")}`);
				}
				return rows.join("\n");
			})(),
			"1 2\n1 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const sets = [];
			for (let i = 1; i <= n; i++) {
				const parts = data[i].trim().split(/\s+/).map(Number);
				let mask = 0;
				for (let j = 1; j < parts.length; j++) mask |= 1 << (parts[j] - 1);
				sets.push(mask);
			}
			const FULL = (1 << m) - 1;
			const INF = Infinity;
			const dp = new Array(1 << m).fill(INF);
			dp[0] = 0;
			for (let state = 0; state <= FULL; state++) {
				if (dp[state] === INF) continue;
				for (const sm of sets) {
					const ns = state | sm;
					if (dp[state] + 1 < dp[ns]) dp[ns] = dp[state] + 1;
				}
			}
			return String(dp[FULL] === INF ? -1 : dp[FULL]);
		},
	},
	{
		slug: "s-assignment",
		title: "일 나눠주기",
		shape: "assignment",
		visible: 2,
		description:
			"# 일 나눠주기\n\n첫 줄에 사람(=일)의 수 `n` (1 이상 15 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `n`개의 수가 주어집니다. `i`번째 줄 `j`번째 수는\n`i`번 사람이 `j`번 일을 할 때 드는 비용입니다 (0 이상 1000 이하).\n\n각 사람에게 **서로 다른 일 하나씩**을 빠짐없이 맡길 때, **비용 합의 최솟값**을 출력하세요.",
		// 비트 DP. dp[맡긴 일 집합] = 최소 비용. 사람 번호 = 이미 맡긴 일의 수
		// (popcount). 상태가 2^n 개다.
		inputs: [
			"2\n1 2\n3 4",
			"1\n5",
			"3\n9 2 7\n6 4 3\n5 8 1",
			(() => {
				const rnd = lcg(20262005); const n = 15; const rows = [`${n}`];
				for (let i = 0; i < n; i++) { const r = []; for (let j = 0; j < n; j++) r.push(Math.floor(rnd() * 1001)); rows.push(r.join(" ")); }
				return rows.join("\n");
			})(),
			"3\n1 1 1\n1 1 1\n1 1 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const n = Number(data[0].trim());
			const cost = [];
			for (let i = 1; i <= n; i++) cost.push(data[i].trim().split(/\s+/).map(Number));
			const INF = Infinity;
			const dp = new Array(1 << n).fill(INF);
			dp[0] = 0;
			const popcount = (x) => { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
			for (let mask = 0; mask < (1 << n); mask++) {
				if (dp[mask] === INF) continue;
				const worker = popcount(mask);
				if (worker >= n) continue;
				for (let job = 0; job < n; job++) {
					if (mask & (1 << job)) continue;
					const ns = mask | (1 << job);
					const cand = dp[mask] + cost[worker][job];
					if (cand < dp[ns]) dp[ns] = cand;
				}
			}
			return String(dp[(1 << n) - 1]);
		},
	},
];

function exampleSection(p) { const stdin = p.inputs[0]; return `\n\n## 예시\n\n**입력**\n\`\`\`\n${stdin}\n\`\`\`\n\n**출력**\n\`\`\`\n${p.solve(stdin)}\n\`\`\``; }
function toProblem(p, now) {
	const testcases = p.inputs.map((stdin, i) => ({ stdin: stdin + "\n", expectedOutput: p.solve(stdin) + "\n", hidden: i >= p.visible }));
	for (const [i, tc] of testcases.entries()) {
		if (tc.expectedOutput.length > STDOUT_CAP) throw new Error(`${p.slug} case ${i}: 출력 ${tc.expectedOutput.length}`);
		if (tc.stdin.length > STDIN_CAP) throw new Error(`${p.slug} case ${i}: 입력 ${tc.stdin.length}`);
	}
	return { slug: p.slug, title: p.title, description: p.description + exampleSection(p), difficulty: "medium", languages: LANGS, starterCode: STARTERS[p.shape], testcases, timeLimit: 5, memoryLimit: 256000, createdBy: "seed", updatedAt: now };
}

if (process.argv.includes("--json")) { const out = {}; for (const p of P) out[p.slug] = toProblem(p, new Date()).testcases; console.log(JSON.stringify(out)); process.exit(0); }
if (process.argv.includes("--print")) {
	for (const p of P) { console.log(`\n===== ${p.slug} =====`); for (const tc of toProblem(p, new Date()).testcases) {
		const inn = tc.stdin.length > 45 ? tc.stdin.slice(0, 28).replace(/\n/g, "\\n") + `... (${tc.stdin.length}자)` : tc.stdin;
		const o = tc.expectedOutput.length > 45 ? tc.expectedOutput.slice(0, 28).replace(/\n/g, "\\n") + `... (${tc.expectedOutput.length}자)` : tc.expectedOutput;
		console.log(`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(inn)} -> ${JSON.stringify(o)}`); } }
	process.exit(0);
}

const { MongoClient } = await import("mongodb");
const { loadEnv, resolveMongoUri } = await import("./lib/mongoUri.mjs");
loadEnv();
const uri = process.env.YIPDB_MONGODB_URI;
if (!uri) { console.error("YIPDB_MONGODB_URI is not set"); process.exit(1); }
const client = new MongoClient(await resolveMongoUri(uri));
try {
	await client.connect();
	const col = client.db("yipDB").collection("problems");
	await col.createIndex({ slug: 1 }, { unique: true });
	const now = new Date();
	for (const def of P) { const doc = toProblem(def, now); await col.updateOne({ slug: doc.slug }, { $set: doc, $setOnInsert: { createdAt: now } }, { upsert: true }); }
	console.log(`Seeded ${P.length} bitmask problems.`);
} finally { await client.close(); }
