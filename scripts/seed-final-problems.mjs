// Seed the 실전 종합 problems for the Algorithm course's 23rd (final) chapter.
// Expected outputs come from the reference `solve`. Upserts by slug; safe to re-run.
//
//   node scripts/seed-final-problems.mjs [--print|--json]
//
// The finale: five classics, each recognizable by which earlier tool it needs —
// LIS by binary search, cutting wood by binary-searching the answer, the maximum
// subarray by DP, a weighted grid by Dijkstra, and maximum interval overlap by
// a sorted sweep.

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	oneListN: {
		python: "import sys\ninput = sys.stdin.readline\n\nn = int(input())\na = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript: "const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(data[0].trim());\nconst a = data[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n; cin >> n;\n    vector<ll> a(n);\n    for (auto& x : a) cin >> x;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        long[] a = new long[n];\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) a[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\ta := make([]int64, n)\n\tfor i := range a {\n\t\tfmt.Fscan(reader, &a[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	pairAndList: {
		python: "import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\na = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript: "const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst a = data[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    ll m; cin >> n >> m;\n    vector<ll> a(n);\n    for (auto& x : a) cin >> x;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        long m = Long.parseLong(st.nextToken());\n        long[] a = new long[n];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) a[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tvar m int64\n\tfmt.Fscan(reader, &n, &m)\n\ta := make([]int64, n)\n\tfor i := range a {\n\t\tfmt.Fscan(reader, &a[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	grid: {
		python: "import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\ngrid = [list(map(int, input().split())) for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript: "const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst grid = [];\nfor (let i = 1; i <= n; i++) grid.push(data[i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m; cin >> n >> m;\n    vector<vector<int>> grid(n, vector<int>(m));\n    for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) cin >> grid[i][j];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken()), m = Integer.parseInt(st.nextToken());\n        int[][] grid = new int[n][m];\n        for (int i = 0; i < n; i++) { st = new StringTokenizer(br.readLine()); for (int j = 0; j < m; j++) grid[i][j] = Integer.parseInt(st.nextToken()); }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"container/heap"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tgrid := make([][]int, n)\n\tfor i := range grid {\n\t\tgrid[i] = make([]int, m)\n\t\tfor j := range grid[i] {\n\t\t\tfmt.Fscan(reader, &grid[i][j])\n\t\t}\n\t}\n\t_ = heap.Interface(nil)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	intervals: {
		python: "import sys\ninput = sys.stdin.readline\n\nn = int(input())\nsegs = [tuple(map(int, input().split())) for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript: "const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(data[0].trim());\nconst segs = [];\nfor (let i = 1; i <= n; i++) segs.push(data[i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n; cin >> n;\n    vector<pair<int,int>> segs(n);\n    for (auto& s : segs) cin >> s.first >> s.second;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        int[][] segs = new int[n][2];\n        for (int i = 0; i < n; i++) { StringTokenizer st = new StringTokenizer(br.readLine()); segs[i][0] = Integer.parseInt(st.nextToken()); segs[i][1] = Integer.parseInt(st.nextToken()); }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n\t"sort"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\tsegs := make([][2]int, n)\n\tfor i := 0; i < n; i++ {\n\t\tfmt.Fscan(reader, &segs[i][0], &segs[i][1])\n\t}\n\t_ = sort.Ints\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) { let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }
function lowerBound(arr, x) { let lo = 0, hi = arr.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (arr[mid] < x) lo = mid + 1; else hi = mid; } return lo; }

const P = [
	{
		slug: "s-final-lis",
		title: "가장 긴 증가 부분 수열",
		shape: "oneListN",
		visible: 2,
		description:
			"# 가장 긴 증가 부분 수열\n\n첫 줄에 수열의 길이 `n` (1 이상 8000 이하) 이 주어집니다.\n둘째 줄에 `n`개의 정수가 주어집니다 (1 이상 1000000000 이하).\n\n**엄격히 증가하는 부분 수열**(원소를 골라 순서를 유지한 것) 중 가장 긴 것의 **길이**를 출력하세요.\n예를 들어 `10 20 10 30 20 50` 에서 `10 20 30 50` 이 길이 4로 가장 깁니다.",
		// 6장의 이분 탐색을 쓴다. tails[k] 에 '길이 k+1 짜리 증가 수열의 마지막
		// 값 최소' 를 유지하며, 각 원소가 들어갈 자리를 이분 탐색으로 찾는다.
		inputs: [
			"6\n10 20 10 30 20 50",
			"1\n7",
			"5\n5 4 3 2 1",
			(() => { const rnd = lcg(20262301); const n = 8000; const a = Array.from({ length: n }, () => 1 + Math.floor(rnd() * 1000000000)); return `${n}\n${a.join(" ")}`; })(),
			"4\n1 1 1 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const a = data[1].trim().split(/\s+/).map(Number);
			const tails = [];
			for (const x of a) {
				const pos = lowerBound(tails, x);
				if (pos === tails.length) tails.push(x); else tails[pos] = x;
			}
			return String(tails.length);
		},
	},
	{
		slug: "s-final-wood",
		title: "나무 자르기",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 나무 자르기\n\n첫 줄에 나무의 수 `n` (1 이상 8000 이하) 과 필요한 나무 길이 `m` (1 이상 2000000000000 이하) 이 주어집니다.\n둘째 줄에 각 나무의 높이가 주어집니다 (1 이상 1000000000 이하).\n\n절단기의 높이 `H` 를 정하면, 각 나무에서 `H` 위로 튀어나온 부분을 가져갑니다.\n(높이 `h` 인 나무에서 `max(0, h - H)` 만큼.) 가져간 나무의 합이 `m` 이상이 되게 하는\n**절단기 높이 `H` 의 최댓값**을 출력하세요.",
		// 6장에서 배운 '답 자체를 이분 탐색' 이다. H 를 이분 탐색하고, 그 H 로
		// 얻는 나무 양을 O(n) 에 확인한다. H 가 클수록 얻는 양이 줄어드는 단조성.
		inputs: [
			"4 7\n20 15 10 17",
			"5 20\n4 42 40 26 46",
			"1 5\n10",
			(() => { const rnd = lcg(20262302); const n = 8000; const a = Array.from({ length: n }, () => 1 + Math.floor(rnd() * 1000000000)); const total = a.reduce((s, x) => s + x, 0); const m = Math.floor(total / 3); return `${n} ${m}\n${a.join(" ")}`; })(),
			"3 6\n5 5 5",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const m = Number(data[0].trim().split(/\s+/)[1]);
			const a = data[1].trim().split(/\s+/).map(Number);
			const collected = (H) => { let sum = 0; for (const h of a) if (h > H) sum += h - H; return sum; };
			let lo = 0, hi = Math.max(...a), ans = 0;
			while (lo <= hi) {
				const mid = Math.floor((lo + hi) / 2);
				if (collected(mid) >= m) { ans = mid; lo = mid + 1; } else hi = mid - 1;
			}
			return String(ans);
		},
	},
	{
		slug: "s-final-kadane",
		title: "최대 연속 부분합",
		shape: "oneListN",
		visible: 2,
		description:
			"# 최대 연속 부분합\n\n첫 줄에 수열의 길이 `n` (1 이상 12000 이하) 이 주어집니다.\n둘째 줄에 `n`개의 정수가 주어집니다 (-10000 이상 10000 이하, **음수 가능**).\n\n**연속한** 부분 배열 중 합이 가장 큰 것의 합을 출력하세요. 부분 배열은 **비어 있을 수 없습니다.**\n예를 들어 `-2 1 -3 4 -1 2 1 -5 4` 에서 `4 -1 2 1` 의 합 6 이 최대입니다.",
		// 13장 DP. cur = max(현재값, cur+현재값) 로 '여기서 끝나는 최대합' 을
		// 이어가고, 그 최댓값이 답이다. 전부 음수여도 하나는 골라야 한다.
		inputs: [
			"9\n-2 1 -3 4 -1 2 1 -5 4",
			"1\n-5",
			"3\n-1 -2 -3",
			(() => { const rnd = lcg(20262303); const n = 12000; const a = Array.from({ length: n }, () => Math.floor(rnd() * 20001) - 10000); return `${n}\n${a.join(" ")}`; })(),
			"5\n10 -1 -1 -1 10",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const a = data[1].trim().split(/\s+/).map(Number);
			let cur = a[0], best = a[0];
			for (let i = 1; i < a.length; i++) { cur = Math.max(a[i], cur + a[i]); best = Math.max(best, cur); }
			return String(best);
		},
	},
	{
		slug: "s-final-grid-cost",
		title: "가중치 격자 최단 비용",
		shape: "grid",
		visible: 2,
		description:
			"# 가중치 격자 최단 비용\n\n첫 줄에 격자의 크기 `n`, `m` (1 이상 130 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 수가 주어집니다. 각 칸을 **밟는 비용**(1 이상 1000 이하)입니다.\n\n왼쪽 위 `(0,0)` 에서 오른쪽 아래 `(n-1,m-1)` 까지 **상하좌우로** 이동할 때,\n지나는 모든 칸(시작과 끝 포함)의 비용 합을 **최소**로 하면 얼마인지 출력하세요.",
		// 10장의 격자 + 18장의 다익스트라. 칸마다 밟는 비용이 다르니 BFS 가
		// 아니라 다익스트라다. 시작 칸의 비용도 포함한다.
		inputs: [
			"2 2\n1 3\n1 5",
			"1 1\n7",
			"3 3\n1 2 3\n4 5 6\n7 8 9",
			(() => { const rnd = lcg(20262304); const n = 130, m = 130; const rows = []; for (let i = 0; i < n; i++) rows.push(Array.from({ length: m }, () => 1 + Math.floor(rnd() * 1000)).join(" ")); return `${n} ${m}\n${rows.join("\n")}`; })(),
			"2 3\n1 1 1\n9 9 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const g = [];
			for (let i = 1; i <= n; i++) g.push(data[i].trim().split(/\s+/).map(Number));
			const INF = Infinity;
			const dist = Array.from({ length: n }, () => new Array(m).fill(INF));
			dist[0][0] = g[0][0];
			// binary heap of [d, r, c]
			const heap = [[g[0][0], 0, 0]];
			const push = (it) => { heap.push(it); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break;[heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
			const pop = () => { const top = heap[0]; const last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { let l = 2 * i + 1, r = 2 * i + 2, sm = i; if (l < heap.length && heap[l][0] < heap[sm][0]) sm = l; if (r < heap.length && heap[r][0] < heap[sm][0]) sm = r; if (sm === i) break;[heap[sm], heap[i]] = [heap[i], heap[sm]]; i = sm; } } return top; };
			const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
			while (heap.length) {
				const [d, r, c] = pop();
				if (d > dist[r][c]) continue;
				for (const [dr, dc] of DIRS) {
					const nr = r + dr, nc = c + dc;
					if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
					const nd = d + g[nr][nc];
					if (nd < dist[nr][nc]) { dist[nr][nc] = nd; push([nd, nr, nc]); }
				}
			}
			return String(dist[n - 1][m - 1]);
		},
	},
	{
		slug: "s-final-overlap",
		title: "가장 많이 겹치는 순간",
		shape: "intervals",
		visible: 2,
		description:
			"# 가장 많이 겹치는 순간\n\n첫 줄에 구간의 수 `n` (1 이상 4000 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각 구간의 시작과 끝 `s e` 가 주어집니다 (0 이상 1000000000 이하, `s ≤ e`).\n각 구간은 시작과 끝을 **포함**합니다.\n\n어느 한 점에서 **동시에 겹치는 구간의 최대 개수**를 출력하세요.",
		// 12장의 회의실 계열 + 정렬 스위핑. 시작에서 +1, 끝+1 에서 -1 인 사건을
		// 정렬해 훑으며 최댓값을 찾는다. 끝점을 포함하려고 끝+1 을 쓴다.
		inputs: [
			"3\n1 5\n2 6\n4 8",
			"1\n0 0",
			"3\n1 2\n3 4\n5 6",
			(() => { const rnd = lcg(20262305); const n = 4000; const rows = []; for (let i = 0; i < n; i++) { const st = Math.floor(rnd() * 1000000000); const len = Math.floor(rnd() * 1000000); rows.push(`${st} ${st + len}`); } return `${n}\n${rows.join("\n")}`; })(),
			"4\n1 10\n1 10\n1 10\n1 10",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const n = Number(data[0]);
			const events = [];
			for (let i = 1; i <= n; i++) {
				const [a, b] = data[i].trim().split(/\s+/).map(Number);
				events.push([a, 1]);
				events.push([b + 1, -1]);
			}
			events.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
			let cur = 0, best = 0;
			for (const [, delta] of events) { cur += delta; if (cur > best) best = cur; }
			return String(best);
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
	console.log(`Seeded ${P.length} final problems.`);
} finally { await client.close(); }
