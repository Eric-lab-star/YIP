// Seed the 최단 경로(다익스트라) problems for the Algorithm course's 18th chapter.
// Expected outputs come from the reference `solve`. Upserts by slug; safe to re-run.
//
//   node scripts/seed-dijkstra-problems.mjs [--print|--json]
//
// Dijkstra with a priority queue on a directed weighted graph. Five problems:
// all-distances from source, a single s->t, a path forced through a waypoint,
// nearest of several sources (multi-source), and a directed round trip 1->n->1
// that needs Dijkstra on the graph and on its reverse.

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const HEADER = {
	// 가중치 있는 방향 그래프의 시작 코드. 문제마다 첫 줄만 조금 다르다.
	py: (first) =>
		`import sys\nimport heapq\ninput = sys.stdin.readline\n\n${first}\nadj = [[] for _ in range(n + 1)]\nfor _ in range(m):\n    u, v, w = map(int, input().split())\n    adj[u].append((v, w))\n\nINF = float("inf")\n\n# 여기에 다익스트라를 작성하세요\n`,
	js: (first) =>
		`const data = require('fs').readFileSync(0, 'utf8').split('\\n');\n${first}\nconst adj = Array.from({ length: n + 1 }, () => []);\nfor (let i = 0; i < m; i++) {\n  const [u, v, w] = data[HDR + i].trim().split(/\\s+/).map(Number);\n  adj[u].push([v, w]);\n}\n\n// 여기에 코드를 작성하세요\n`,
};

function starter(shape) {
	// shape: firstLinePy, firstLineVars, HDR(줄 오프셋)
	const cppHead = "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n";
	return {
		python: HEADER.py(shape.py),
		javascript: HEADER.js(shape.jsVars).replace(/HDR/g, String(shape.hdr)),
		cpp: cppHead + shape.cpp + "\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n" + shape.java + "\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"container/heap"\n\t"fmt"\n\t"os"\n)\n\n// 힌트: container/heap 로 우선순위 큐를 만든다냥\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n' + shape.go + "\n\t// 여기에 코드를 작성하세요\n\t_ = reader\n}\n",
	};
}

const SHAPES = {
	src: {
		py: "n, m = map(int, input().split())",
		jsVars: "const [n, m] = data[0].trim().split(/\\s+/).map(Number);",
		hdr: 1,
		cpp: "    int n, m; cin >> n >> m;\n    vector<vector<pair<int,int>>> adj(n + 1);\n    for (int i=0;i<m;i++){int u,v,w;cin>>u>>v>>w;adj[u].push_back({v,w});}",
		java: "        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken()), m = Integer.parseInt(st.nextToken());\n        List<int[]>[] adj = new List[n+1];\n        for(int i=0;i<=n;i++) adj[i]=new ArrayList<>();\n        for(int i=0;i<m;i++){st=new StringTokenizer(br.readLine());int u=Integer.parseInt(st.nextToken()),v=Integer.parseInt(st.nextToken()),w=Integer.parseInt(st.nextToken());adj[u].add(new int[]{v,w});}",
		go: "\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tadj := make([][][2]int, n+1)\n\tfor i := 0; i < m; i++ {\n\t\tvar u, v, w int\n\t\tfmt.Fscan(reader, &u, &v, &w)\n\t\tadj[u] = append(adj[u], [2]int{v, w})\n\t}",
	},
	st: {
		py: "n, m, s, t = map(int, input().split())",
		jsVars: "const [n, m, s, t] = data[0].trim().split(/\\s+/).map(Number);",
		hdr: 1,
		cpp: "    int n, m, s, t; cin >> n >> m >> s >> t;\n    vector<vector<pair<int,int>>> adj(n + 1);\n    for (int i=0;i<m;i++){int u,v,w;cin>>u>>v>>w;adj[u].push_back({v,w});}",
		java: "        StringTokenizer st0 = new StringTokenizer(br.readLine());\n        int n=Integer.parseInt(st0.nextToken()),m=Integer.parseInt(st0.nextToken()),s=Integer.parseInt(st0.nextToken()),t=Integer.parseInt(st0.nextToken());\n        List<int[]>[] adj = new List[n+1];\n        for(int i=0;i<=n;i++) adj[i]=new ArrayList<>();\n        for(int i=0;i<m;i++){StringTokenizer st=new StringTokenizer(br.readLine());int u=Integer.parseInt(st.nextToken()),v=Integer.parseInt(st.nextToken()),w=Integer.parseInt(st.nextToken());adj[u].add(new int[]{v,w});}",
		go: "\tvar n, m, s, t int\n\tfmt.Fscan(reader, &n, &m, &s, &t)\n\tadj := make([][][2]int, n+1)\n\tfor i := 0; i < m; i++ {\n\t\tvar u, v, w int\n\t\tfmt.Fscan(reader, &u, &v, &w)\n\t\tadj[u] = append(adj[u], [2]int{v, w})\n\t}",
	},
	via: {
		py: "n, m, mid = map(int, input().split())",
		jsVars: "const [n, m, mid] = data[0].trim().split(/\\s+/).map(Number);",
		hdr: 1,
		cpp: "    int n, m, mid; cin >> n >> m >> mid;\n    vector<vector<pair<int,int>>> adj(n + 1);\n    for (int i=0;i<m;i++){int u,v,w;cin>>u>>v>>w;adj[u].push_back({v,w});}",
		java: "        StringTokenizer st0 = new StringTokenizer(br.readLine());\n        int n=Integer.parseInt(st0.nextToken()),m=Integer.parseInt(st0.nextToken()),mid=Integer.parseInt(st0.nextToken());\n        List<int[]>[] adj = new List[n+1];\n        for(int i=0;i<=n;i++) adj[i]=new ArrayList<>();\n        for(int i=0;i<m;i++){StringTokenizer st=new StringTokenizer(br.readLine());int u=Integer.parseInt(st.nextToken()),v=Integer.parseInt(st.nextToken()),w=Integer.parseInt(st.nextToken());adj[u].add(new int[]{v,w});}",
		go: "\tvar n, m, mid int\n\tfmt.Fscan(reader, &n, &m, &mid)\n\tadj := make([][][2]int, n+1)\n\tfor i := 0; i < m; i++ {\n\t\tvar u, v, w int\n\t\tfmt.Fscan(reader, &u, &v, &w)\n\t\tadj[u] = append(adj[u], [2]int{v, w})\n\t}",
	},
};

function lcg(seed) { let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }

/** Min-heap Dijkstra over adjacency [v,w]; from any set of seeds (dist 0). */
function dijkstra(n, adj, seeds) {
	const INF = Infinity;
	const dist = new Array(n + 1).fill(INF);
	// binary heap of [d, node]
	const heap = [];
	const push = (d, u) => { heap.push([d, u]); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
	const pop = () => { const top = heap[0]; const last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i; if (l < heap.length && heap[l][0] < heap[s][0]) s = l; if (r < heap.length && heap[r][0] < heap[s][0]) s = r; if (s === i) break; [heap[s], heap[i]] = [heap[i], heap[s]]; i = s; } } return top; };
	for (const src of seeds) { if (dist[src] > 0) { dist[src] = 0; push(0, src); } }
	while (heap.length) {
		const [d, u] = pop();
		if (d > dist[u]) continue;
		for (const [v, w] of adj[u]) {
			if (d + w < dist[v]) { dist[v] = d + w; push(d + w, v); }
		}
	}
	return dist;
}

function parseGraph(data, hdr, m) {
	// returns adj built from data lines hdr .. hdr+m-1
	return (n) => {
		const adj = Array.from({ length: n + 1 }, () => []);
		for (let i = 0; i < m; i++) {
			const [u, v, w] = data[hdr + i].trim().split(/\s+/).map(Number);
			adj[u].push([v, w]);
		}
		return adj;
	};
}

/** Random directed weighted graph reachable from 1: chain 1->..->n plus extras. */
function directedGraph(n, extra, seed, firstExtra = "") {
	const rnd = lcg(seed);
	const rows = [];
	for (let i = 2; i <= n; i++) rows.push(`${1 + Math.floor(rnd() * (i - 1))} ${i} ${1 + Math.floor(rnd() * 1000000)}`);
	for (let i = 0; i < extra; i++) {
		const a = 1 + Math.floor(rnd() * n), b = 1 + Math.floor(rnd() * n);
		if (a !== b) rows.push(`${a} ${b} ${1 + Math.floor(rnd() * 1000000)}`);
	}
	return { m: rows.length, rows };
}

const P = [
	{
		slug: "s-shortest-all",
		title: "모든 곳까지 최단 거리",
		shape: SHAPES.src,
		visible: 2,
		description:
			"# 모든 곳까지 최단 거리\n\n첫 줄에 노드의 수 `n` (1 이상 100000 이하) 과 간선의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 방향 간선 `u v w` 가 주어집니다. `u` 에서 `v` 로 가는 비용이 `w` (1 이상 1000000 이하) 입니다.\n\n**1번 노드에서** 각 노드 `1..n` 까지의 최단 거리를 한 줄에 하나씩 출력하세요.\n갈 수 없는 노드는 `-1` 을 출력합니다. (1번 자신은 `0`)",
		build: (s) => { const data = s.trim().split("\n"); const [n, m] = data[0].trim().split(/\s+/).map(Number); return { n, adj: parseGraph(data, 1, m)(n) }; },
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const adj = parseGraph(data, 1, m)(n);
			const dist = dijkstra(n, adj, [1]);
			const out = [];
			for (let i = 1; i <= n; i++) out.push(dist[i] === Infinity ? -1 : dist[i]);
			return out.join("\n");
		},
		inputs: [
			"4 5\n1 2 1\n1 3 5\n2 3 2\n2 4 7\n3 4 1",
			"1 0",
			"3 1\n1 2 4",
			(() => { const g = directedGraph(2000, 2000, 20261801); return `2000 ${g.m}\n${g.rows.join("\n")}`; })(),
			"2 2\n1 2 3\n2 1 3",
		],
	},
	{
		slug: "s-shortest-st",
		title: "출발지에서 목적지까지",
		shape: SHAPES.st,
		visible: 2,
		description:
			"# 출발지에서 목적지까지\n\n첫 줄에 노드의 수 `n`, 간선의 수 `m` (0 이상 4000 이하), 출발 `s`, 도착 `t` 가 주어집니다. `n` 은 1 이상 100000 이하입니다.\n이어서 `m`개의 줄에 방향 간선 `u v w` 가 주어집니다. 비용 `w` 는 1 이상 1000000 이하입니다.\n\n`s` 에서 `t` 까지의 **최단 거리**를 출력하세요. 갈 수 없으면 `-1` 을 출력합니다.",
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m, src, t] = data[0].trim().split(/\s+/).map(Number);
			const adj = parseGraph(data, 1, m)(n);
			const dist = dijkstra(n, adj, [src]);
			return String(dist[t] === Infinity ? -1 : dist[t]);
		},
		inputs: [
			"4 5 1 4\n1 2 1\n1 3 5\n2 3 2\n2 4 7\n3 4 1",
			"3 1 1 3\n1 2 4",
			"5 6 2 5\n2 1 3\n1 3 2\n3 5 4\n2 4 8\n4 5 1\n5 3 2",
			(() => { const g = directedGraph(2000, 2000, 20261802); return `2000 ${g.m} 1 2000\n${g.rows.join("\n")}`; })(),
			"2 1 2 1\n1 2 5",
		],
	},
	{
		slug: "s-shortest-via",
		title: "꼭 들러야 하는 곳",
		shape: SHAPES.via,
		visible: 2,
		description:
			"# 꼭 들러야 하는 곳\n\n첫 줄에 노드의 수 `n`, 간선의 수 `m` (0 이상 4000 이하), 반드시 들러야 하는 노드 `v` 가 주어집니다. `n` 은 2 이상 100000 이하입니다.\n이어서 `m`개의 줄에 방향 간선 `u v w` 가 주어집니다. `u` 에서 `v` 로 가는 비용이 `w` (1 이상 1000000 이하) 입니다.\n\n**1번에서 출발해 반드시 `v` 를 거쳐 `n`번**에 도착하는 최단 거리를 출력하세요.\n그렇게 갈 수 없으면 `-1` 을 출력합니다.",
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m, mid] = data[0].trim().split(/\s+/).map(Number);
			const adj = parseGraph(data, 1, m)(n);
			const d1 = dijkstra(n, adj, [1]);
			const dv = dijkstra(n, adj, [mid]);
			const a = d1[mid], b = dv[n];
			return String(a === Infinity || b === Infinity ? -1 : a + b);
		},
		inputs: [
			"4 5 3\n1 2 1\n1 3 5\n2 3 2\n2 4 7\n3 4 1",
			"3 2 2\n1 2 4\n2 3 5",
			"4 3 3\n1 2 1\n2 4 1\n1 3 10",
			(() => { const g = directedGraph(2000, 2000, 20261803); return `2000 ${g.m} 1000\n${g.rows.join("\n")}`; })(),
			"2 1 2\n1 2 5",
		],
	},
	{
		slug: "s-multi-source-dist",
		title: "가장 가까운 대피소",
		shape: SHAPES.src,
		visible: 2,
		description:
			"# 가장 가까운 대피소\n\n첫 줄에 노드의 수 `n` (1 이상 100000 이하), 간선의 수 `m` (0 이상 4000 이하), 대피소의 수 `k` 가 주어집니다.\n둘째 줄에 `k`개의 대피소 노드 번호가 주어집니다.\n이어서 `m`개의 줄에 방향 간선 `u v w` 가 주어집니다. 비용 `w` 는 1 이상 1000000 이하입니다.\n\n각 노드 `1..n` 에서 **가장 가까운 대피소까지의 거리**를 한 줄에 하나씩 출력하세요.\n대피소 자신은 `0`, 어느 대피소에도 못 가면 `-1` 입니다.",
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m, k] = data[0].trim().split(/\s+/).map(Number);
			const seeds = data[1].trim().split(/\s+/).map(Number);
			const adj = parseGraph(data, 2, m)(n);
			const dist = dijkstra(n, adj, seeds);
			const out = [];
			for (let i = 1; i <= n; i++) out.push(dist[i] === Infinity ? -1 : dist[i]);
			return out.join("\n");
		},
		inputs: [
			"5 5 2\n1 5\n1 2 2\n2 3 2\n5 4 1\n4 3 1\n5 3 10",
			"3 0 1\n2",
			"4 3 2\n1 4\n1 2 3\n4 3 2\n2 3 5",
			(() => { const g = directedGraph(2000, 2000, 20261804); return `2000 ${g.m} 3\n1 1000 2000\n${g.rows.join("\n")}`; })(),
			"2 1 1\n1\n1 2 7",
		],
	},
	{
		slug: "s-round-trip",
		title: "왕복 최단 거리",
		shape: SHAPES.src,
		visible: 2,
		description:
			"# 왕복 최단 거리\n\n첫 줄에 노드의 수 `n` (2 이상 100000 이하) 과 간선의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 **방향** 간선 `u v w` 가 주어집니다. 비용 `w` 는 1 이상 1000000 이하입니다.\n\n`1`번에서 `n`번까지 갔다가 **다시 `1`번으로 돌아오는** 최단 거리를 출력하세요.\n방향 간선이라 가는 길과 오는 길이 다를 수 있습니다. 왕복이 불가능하면 `-1` 을 출력합니다.",
		// 가는 길은 그래프에서 1→n 다익스트라, 오는 길은 '역방향 그래프'에서 1→n
		// 다익스트라(원래 그래프의 n→1 과 같다).
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const adj = Array.from({ length: n + 1 }, () => []);
			const radj = Array.from({ length: n + 1 }, () => []);
			for (let i = 0; i < m; i++) {
				const [u, v, w] = data[1 + i].trim().split(/\s+/).map(Number);
				adj[u].push([v, w]);
				radj[v].push([u, w]);
			}
			const go = dijkstra(n, adj, [1])[n];
			const back = dijkstra(n, radj, [1])[n];
			return String(go === Infinity || back === Infinity ? -1 : go + back);
		},
		inputs: [
			"4 6\n1 2 1\n2 4 2\n4 3 1\n3 1 2\n1 4 10\n4 1 10",
			"2 2\n1 2 3\n2 1 4",
			"3 2\n1 2 1\n2 3 1",
			(() => { const g = directedGraph(2000, 3000, 20261805); return `2000 ${g.m}\n${g.rows.join("\n")}`; })(),
			"2 1\n1 2 5",
		],
	},
];

function exampleSection(p) { const stdin = p.inputs[0]; return `\n\n## 예시\n\n**입력**\n\`\`\`\n${stdin}\n\`\`\`\n\n**출력**\n\`\`\`\n${p.solve(stdin)}\n\`\`\``; }
function toProblem(p, now) {
	const testcases = p.inputs.map((stdin, i) => ({ stdin: stdin + "\n", expectedOutput: p.solve(stdin) + "\n", hidden: i >= p.visible }));
	for (const [i, tc] of testcases.entries()) {
		if (tc.expectedOutput.length > STDOUT_CAP) throw new Error(`${p.slug} case ${i}: 출력 ${tc.expectedOutput.length}`);
		if (tc.stdin.length > STDIN_CAP) throw new Error(`${p.slug} case ${i}: 입력 ${tc.stdin.length}`);
	}
	return { slug: p.slug, title: p.title, description: p.description + exampleSection(p), difficulty: "medium", languages: LANGS, starterCode: starter(p.shape), testcases, timeLimit: 5, memoryLimit: 256000, createdBy: "seed", updatedAt: now };
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
	console.log(`Seeded ${P.length} dijkstra problems.`);
} finally { await client.close(); }
