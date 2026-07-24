// Seed the 위상 정렬 problems for the Algorithm course's 19th chapter.
// Expected outputs come from the reference `solve`. Upserts by slug; safe to re-run.
//
//   node scripts/seed-toposort-problems.mjs [--print|--json]
//
// Kahn's algorithm (indegree queue) on a DAG. Five problems: any valid order,
// the lexicographically smallest order (a heap instead of a queue, same input),
// cycle detection (can everything be ordered?), critical-path time with task
// durations, and the minimum number of parallel rounds (the longest chain).

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 n m, 이어서 m개의 선후 관계 "a b" (a 가 b 보다 먼저) — 1,2,3,5번.
	dag: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\nadj = [[] for _ in range(n + 1)]\nindeg = [0] * (n + 1)\nfor _ in range(m):\n    a, b = map(int, input().split())\n    adj[a].append(b)\n    indeg[b] += 1\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst adj = Array.from({ length: n + 1 }, () => []);\nconst indeg = new Array(n + 1).fill(0);\nfor (let i = 1; i <= m; i++) {\n  const [a, b] = data[i].trim().split(/\\s+/).map(Number);\n  adj[a].push(b);\n  indeg[b]++;\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> adj(n + 1);\n    vector<int> indeg(n + 1, 0);\n    for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; adj[a].push_back(b); indeg[b]++; }\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken()), m = Integer.parseInt(st.nextToken());\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());\n        int[] indeg = new int[n + 1];\n        for (int i = 0; i < m; i++) { st = new StringTokenizer(br.readLine()); int a = Integer.parseInt(st.nextToken()), b = Integer.parseInt(st.nextToken()); adj.get(a).add(b); indeg[b]++; }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tadj := make([][]int, n+1)\n\tindeg := make([]int, n+1)\n\tfor i := 0; i < m; i++ {\n\t\tvar a, b int\n\t\tfmt.Fscan(reader, &a, &b)\n\t\tadj[a] = append(adj[a], b)\n\t\tindeg[b]++\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄 n m, 둘째 줄 n개의 소요 시간, 이어서 m개의 선후 관계 — 4번.
	dagWeighted: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\ntime = [0] + list(map(int, input().split()))\nadj = [[] for _ in range(n + 1)]\nindeg = [0] * (n + 1)\nfor _ in range(m):\n    a, b = map(int, input().split())\n    adj[a].append(b)\n    indeg[b] += 1\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst time = [0, ...data[1].trim().split(/\\s+/).map(Number)];\nconst adj = Array.from({ length: n + 1 }, () => []);\nconst indeg = new Array(n + 1).fill(0);\nfor (let i = 1; i <= m; i++) {\n  const [a, b] = data[1 + i].trim().split(/\\s+/).map(Number);\n  adj[a].push(b);\n  indeg[b]++;\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    cin >> n >> m;\n    vector<long long> t(n + 1);\n    for (int i = 1; i <= n; i++) cin >> t[i];\n    vector<vector<int>> adj(n + 1);\n    vector<int> indeg(n + 1, 0);\n    for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; adj[a].push_back(b); indeg[b]++; }\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken()), m = Integer.parseInt(st.nextToken());\n        long[] t = new long[n + 1];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 1; i <= n; i++) t[i] = Long.parseLong(st.nextToken());\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());\n        int[] indeg = new int[n + 1];\n        for (int i = 0; i < m; i++) { st = new StringTokenizer(br.readLine()); int a = Integer.parseInt(st.nextToken()), b = Integer.parseInt(st.nextToken()); adj.get(a).add(b); indeg[b]++; }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tt := make([]int64, n+1)\n\tfor i := 1; i <= n; i++ {\n\t\tfmt.Fscan(reader, &t[i])\n\t}\n\tadj := make([][]int, n+1)\n\tindeg := make([]int, n+1)\n\tfor i := 0; i < m; i++ {\n\t\tvar a, b int\n\t\tfmt.Fscan(reader, &a, &b)\n\t\tadj[a] = append(adj[a], b)\n\t\tindeg[b]++\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) { let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }

/** A random DAG: edges only from lower to higher label, so acyclic. */
function randomDAG(n, m, seed) {
	const rnd = lcg(seed);
	const set = new Set();
	const rows = [];
	let tries = 0;
	while (rows.length < m && tries < m * 20) {
		tries++;
		let a = 1 + Math.floor(rnd() * n), b = 1 + Math.floor(rnd() * n);
		if (a === b) continue;
		if (a > b) [a, b] = [b, a];   // a < b 로 강제 → 사이클 없음
		const key = a * 200000 + b;
		if (set.has(key)) continue;
		set.add(key);
		rows.push(`${a} ${b}`);
	}
	return { m: rows.length, rows };
}

function parseDAG(data, hdr, m, n) {
	const adj = Array.from({ length: n + 1 }, () => []);
	const indeg = new Array(n + 1).fill(0);
	for (let i = 0; i < m; i++) {
		const [a, b] = data[hdr + i].trim().split(/\s+/).map(Number);
		adj[a].push(b);
		indeg[b]++;
	}
	return { adj, indeg };
}

/** Kahn with a plain queue; returns the produced order (may be < n if cyclic). */
function kahn(n, adj, indeg) {
	const ind = indeg.slice();
	const q = [];
	for (let i = 1; i <= n; i++) if (ind[i] === 0) q.push(i);
	const order = [];
	let head = 0;
	while (head < q.length) {
		const u = q[head++];
		order.push(u);
		for (const v of adj[u]) if (--ind[v] === 0) q.push(v);
	}
	return order;
}

/** Kahn with a min-heap → lexicographically smallest order. */
function kahnLex(n, adj, indeg) {
	const ind = indeg.slice();
	const heap = [];
	const push = (x) => { heap.push(x); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p] <= heap[i]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
	const pop = () => { const top = heap[0]; const last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i; if (l < heap.length && heap[l] < heap[s]) s = l; if (r < heap.length && heap[r] < heap[s]) s = r; if (s === i) break;[heap[s], heap[i]] = [heap[i], heap[s]]; i = s; } } return top; };
	for (let i = 1; i <= n; i++) if (ind[i] === 0) push(i);
	const order = [];
	while (heap.length) {
		const u = pop();
		order.push(u);
		for (const v of adj[u]) if (--ind[v] === 0) push(v);
	}
	return order;
}

/** Is the topological order unique? True iff never >1 node is ready at once. */
function uniqueTopo(n, adj, indeg) {
	const ind = indeg.slice();
	let ready = [];
	for (let i = 1; i <= n; i++) if (ind[i] === 0) ready.push(i);
	let count = 0;
	let unique = true;
	while (ready.length) {
		if (ready.length > 1) unique = false;
		const u = ready.pop();
		count++;
		for (const v of adj[u]) if (--ind[v] === 0) ready.push(v);
	}
	return unique && count === n;
}

const P = [
	{
		slug: "s-topo-order",
		title: "사전순으로 가장 빠른 순서",
		shape: "dag",
		visible: 2,
		description:
			"# 사전순으로 가장 빠른 순서\n\n첫 줄에 일의 개수 `n` (1 이상 100000 이하) 과 선후 관계의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 `a b` 가 주어지며, 이는 **`a` 를 `b` 보다 먼저** 해야 한다는 뜻입니다.\n입력으로 주어지는 관계에는 모순(사이클)이 없습니다.\n\n모든 일을 선후 관계에 맞게 하되, 가능한 순서 중 **사전순으로 가장 앞서는 것**을\n한 줄에 공백으로 구분해 출력하세요. 즉 지금 할 수 있는 일이 여럿이면 **번호가 작은 것부터** 합니다.",
		// 칸 알고리즘 + 최소 힙. 진입 차수 0 인 것 중 가장 작은 번호부터 꺼내며,
		// 꺼낼 때 이웃의 진입 차수를 줄인다. 사전순 최소라 답이 하나로 정해진다.
		inputs: [
			"4 3\n1 2\n1 3\n3 4",
			"3 0",
			"5 4\n1 2\n2 3\n1 4\n4 5",
			(() => { const g = randomDAG(2000, 3000, 20261901); return `2000 ${g.m}\n${g.rows.join("\n")}`; })(),
			"3 1\n3 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { adj, indeg } = parseDAG(data, 1, m, n);
			return kahnLex(n, adj, indeg).join(" ");
		},
	},
	{
		slug: "s-topo-unique",
		title: "순서가 하나뿐일까",
		shape: "dag",
		visible: 2,
		description:
			"# 순서가 하나뿐일까\n\n첫 줄에 일의 개수 `n` (1 이상 100000 이하) 과 선후 관계의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 `a b` (a 를 b 보다 먼저) 가 주어집니다. 모순은 없습니다.\n\n모든 일을 하는 순서가 **딱 하나로 정해지면 `YES`**, 두 가지 이상 가능하면 `NO` 를 출력하세요.",
		// 1번과 입력이 같지만 묻는 게 다르다. 위상 정렬을 진행하는 동안, '지금 할
		// 수 있는 일'이 한 번이라도 둘 이상이면 순서가 여러 가지라 NO 다.
		inputs: [
			"4 3\n1 2\n1 3\n3 4",
			"3 2\n1 2\n2 3",
			"5 4\n1 2\n2 3\n3 4\n4 5",
			(() => { const g = randomDAG(2000, 3000, 20261901); return `2000 ${g.m}\n${g.rows.join("\n")}`; })(),
			"3 1\n3 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { adj, indeg } = parseDAG(data, 1, m, n);
			return uniqueTopo(n, adj, indeg) ? "YES" : "NO";
		},
	},
	{
		slug: "s-topo-possible",
		title: "다 끝낼 수 있을까",
		shape: "dag",
		visible: 2,
		description:
			"# 다 끝낼 수 있을까\n\n첫 줄에 일의 개수 `n` (1 이상 100000 이하) 과 선후 관계의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 `a b` (a 를 b 보다 먼저) 가 주어집니다. **이번에는 모순이 있을 수 있습니다.**\n\n모든 일을 순서대로 끝낼 수 있으면 `YES`, **사이클이 있어 불가능하면 `NO`** 를 출력하세요.",
		// 위상 정렬로 나온 순서의 길이가 n 이면 다 끝낼 수 있다. n 보다 적으면
		// 어딘가 사이클이 있어 진입 차수가 0 이 안 되는 일이 남은 것이다.
		inputs: [
			"3 3\n1 2\n2 3\n3 1",
			"3 2\n1 2\n2 3",
			"4 4\n1 2\n2 3\n3 4\n4 2",
			(() => { const g = randomDAG(2000, 3000, 20261903); return `2000 ${g.m}\n${g.rows.join("\n")}`; })(),
			"2 2\n1 2\n2 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { adj, indeg } = parseDAG(data, 1, m, n);
			return kahn(n, adj, indeg).length === n ? "YES" : "NO";
		},
	},
	{
		slug: "s-critical-time",
		title: "프로젝트 완료 시간",
		shape: "dagWeighted",
		visible: 2,
		description:
			"# 프로젝트 완료 시간\n\n첫 줄에 작업의 개수 `n` (1 이상 100000 이하) 과 선후 관계의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n둘째 줄에 각 작업의 소요 시간이 주어집니다 (1 이상 1000000 이하).\n이어서 `m`개의 줄에 `a b` 가 주어지며, **`a` 가 끝나야 `b` 를 시작**할 수 있습니다. 모순은 없습니다.\n\n선행 작업이 모두 끝나야 시작할 수 있고, 서로 독립인 작업은 **동시에** 진행할 수 있을 때,\n**모든 작업을 끝내는 데 걸리는 최소 시간**을 출력하세요.",
		// 위상 순서대로 훑으며 finish[v] = time[v] + max(finish[선행]). 답은
		// 모든 finish 의 최댓값 (임계 경로). 동시에 할 수 있으니 합이 아니라 최댓값.
		inputs: [
			"4 3\n3 2 5 1\n1 2\n1 3\n3 4",
			"1 0\n7",
			"5 5\n2 3 1 4 2\n1 2\n1 3\n2 4\n3 4\n4 5",
			(() => {
				const rnd = lcg(20261904);
				const n = 2000; const g = randomDAG(n, 3000, 20261914);
				const times = Array.from({ length: n }, () => 1 + Math.floor(rnd() * 1000000));
				return `${n} ${g.m}\n${times.join(" ")}\n${g.rows.join("\n")}`;
			})(),
			"3 2\n10 20 30\n1 2\n1 3",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const time = [0, ...data[1].trim().split(/\s+/).map(Number)];
			const { adj, indeg } = parseDAG(data, 2, m, n);
			const order = kahn(n, adj, indeg);
			const finish = new Array(n + 1).fill(0);
			for (const u of order) {
				finish[u] += time[u];                 // 선행들의 최대 끝시각 + 내 시간
				for (const v of adj[u]) finish[v] = Math.max(finish[v], finish[u]);
			}
			let best = 0;
			for (let i = 1; i <= n; i++) best = Math.max(best, finish[i]);
			return String(best);
		},
	},
	{
		slug: "s-min-rounds",
		title: "최소 몇 단계",
		shape: "dag",
		visible: 2,
		description:
			"# 최소 몇 단계\n\n첫 줄에 일의 개수 `n` (1 이상 100000 이하) 과 선후 관계의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 `a b` (a 를 b 보다 먼저) 가 주어집니다. 모순은 없습니다.\n\n한 단계에 **선행 조건이 모두 끝난 일들을 전부 동시에** 처리할 수 있습니다.\n모든 일을 끝내는 데 필요한 **최소 단계 수**를 출력하세요.",
		// 가장 긴 선후 사슬의 길이가 답이다. 위상 순서로 훑으며 level[v] =
		// max(level[선행]) + 1, 답은 최댓값. (동시에 하니 사슬 길이가 병목)
		inputs: [
			"4 3\n1 2\n1 3\n3 4",
			"3 0",
			"5 5\n1 2\n1 3\n2 4\n3 4\n4 5",
			(() => { const g = randomDAG(2000, 3000, 20261905); return `2000 ${g.m}\n${g.rows.join("\n")}`; })(),
			"3 2\n1 2\n1 3",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { adj, indeg } = parseDAG(data, 1, m, n);
			const order = kahn(n, adj, indeg);
			const level = new Array(n + 1).fill(1);
			for (const u of order) for (const v of adj[u]) level[v] = Math.max(level[v], level[u] + 1);
			let best = 0;
			for (let i = 1; i <= n; i++) best = Math.max(best, level[i]);
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
	console.log(`Seeded ${P.length} toposort problems.`);
} finally { await client.close(); }
