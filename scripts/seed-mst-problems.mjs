// Seed the 최소 신장 트리 problems used by the Algorithm course's 17th chapter.
// Expected outputs come from the reference `solve`. Upserts by slug; safe to re-run.
//
//   node scripts/seed-mst-problems.mjs [--print|--json]
//
// Kruskal on top of chapter 16's union-find: sort edges by weight, add the ones
// that do not close a cycle. Five problems — MST weight, connectivity (-1 when
// the graph cannot be spanned), the largest edge in the MST, splitting into two
// groups by dropping that largest edge, and an MST with some edges pre-built.

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 n m, 이어서 m개의 가중치 간선 "u v w" — 1,2,3,4번이 쓴다.
	weightedEdges: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\nedges = [tuple(map(int, input().split())) for _ in range(m)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst edges = [];\nfor (let i = 1; i <= m; i++) edges.push(data[i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint parent[200001];\nint find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    cin >> n >> m;\n    vector<array<long long,3>> edges(m); // w, u, v 로 담으면 정렬이 쉽다냥\n    for (int i = 0; i < m; i++) { long long u,v,w; cin>>u>>v>>w; edges[i]={w,u,v}; }\n    for (int i = 0; i <= n; i++) parent[i] = i;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] parent;\n    static int find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n        long[][] edges = new long[m][3]; // w, u, v\n        for (int i = 0; i < m; i++) {\n            st = new StringTokenizer(br.readLine());\n            long u = Long.parseLong(st.nextToken());\n            long v = Long.parseLong(st.nextToken());\n            long w = Long.parseLong(st.nextToken());\n            edges[i][0] = w; edges[i][1] = u; edges[i][2] = v;\n        }\n        parent = new int[n + 1];\n        for (int i = 0; i <= n; i++) parent[i] = i;\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n\t"sort"\n)\n\nvar parent []int\n\nfunc find(x int) int {\n\tfor parent[x] != x {\n\t\tparent[x] = parent[parent[x]]\n\t\tx = parent[x]\n\t}\n\treturn x\n}\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\ttype E struct{ u, v, w int }\n\tedges := make([]E, m)\n\tfor i := range edges {\n\t\tfmt.Fscan(reader, &edges[i].u, &edges[i].v, &edges[i].w)\n\t}\n\tsort.Slice(edges, func(i, j int) bool { return edges[i].w < edges[j].w })\n\tparent = make([]int, n+1)\n\tfor i := range parent {\n\t\tparent[i] = i\n\t}\n\n\t// 여기에 코드를 작성하세요\n\t_ = m\n}\n',
	},
	// 첫 줄 n k m, k개의 이미 연결된 쌍, 이어서 m개의 가중치 간선 — 5번이 쓴다.
	prebuilt: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, k, m = map(int, input().split())\nbuilt = [tuple(map(int, input().split())) for _ in range(k)]\nedges = [tuple(map(int, input().split())) for _ in range(m)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, k, m] = data[0].trim().split(/\\s+/).map(Number);\nconst built = [];\nfor (let i = 1; i <= k; i++) built.push(data[i].trim().split(/\\s+/).map(Number));\nconst edges = [];\nfor (let i = 1; i <= m; i++) edges.push(data[k + i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint parent[200001];\nint find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, k, m;\n    cin >> n >> k >> m;\n    for (int i = 0; i <= n; i++) parent[i] = i;\n    for (int i = 0; i < k; i++) { int a,b; cin>>a>>b; parent[find(a)]=find(b); }\n    vector<array<long long,3>> edges(m);\n    for (int i = 0; i < m; i++) { long long u,v,w; cin>>u>>v>>w; edges[i]={w,u,v}; }\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] parent;\n    static int find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int k = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n        parent = new int[n + 1];\n        for (int i = 0; i <= n; i++) parent[i] = i;\n        for (int i = 0; i < k; i++) {\n            st = new StringTokenizer(br.readLine());\n            int a = Integer.parseInt(st.nextToken()), b = Integer.parseInt(st.nextToken());\n            parent[find(a)] = find(b);\n        }\n        long[][] edges = new long[m][3];\n        for (int i = 0; i < m; i++) {\n            st = new StringTokenizer(br.readLine());\n            long u = Long.parseLong(st.nextToken()), v = Long.parseLong(st.nextToken()), w = Long.parseLong(st.nextToken());\n            edges[i][0] = w; edges[i][1] = u; edges[i][2] = v;\n        }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n\t"sort"\n)\n\nvar parent []int\n\nfunc find(x int) int {\n\tfor parent[x] != x {\n\t\tparent[x] = parent[parent[x]]\n\t\tx = parent[x]\n\t}\n\treturn x\n}\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, k, m int\n\tfmt.Fscan(reader, &n, &k, &m)\n\tparent = make([]int, n+1)\n\tfor i := range parent {\n\t\tparent[i] = i\n\t}\n\tfor i := 0; i < k; i++ {\n\t\tvar a, b int\n\t\tfmt.Fscan(reader, &a, &b)\n\t\tparent[find(a)] = find(b)\n\t}\n\ttype E struct{ u, v, w int }\n\tedges := make([]E, m)\n\tfor i := range edges {\n\t\tfmt.Fscan(reader, &edges[i].u, &edges[i].v, &edges[i].w)\n\t}\n\tsort.Slice(edges, func(i, j int) bool { return edges[i].w < edges[j].w })\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) { let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }

function makeDSU(n) {
	const parent = Array.from({ length: n + 1 }, (_, i) => i);
	const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
	const union = (a, b) => { const ra = find(a), rb = find(b); if (ra === rb) return false; parent[rb] = ra; return true; };
	return { parent, find, union };
}

/** Kruskal over already-parsed edges [u,v,w]; returns {weight, maxEdge, used}. */
function kruskal(n, edges, dsu) {
	const es = edges.slice().sort((a, b) => a[2] - b[2]);
	let weight = 0, maxEdge = 0, used = 0;
	for (const [u, v, w] of es) {
		if (dsu.union(u, v)) { weight += w; maxEdge = w; used++; }
	}
	return { weight, maxEdge, used };
}

/** A connected weighted graph: random spanning tree + extra random edges. */
function connectedGraph(n, extra, seed) {
	const rnd = lcg(seed);
	const rows = [];
	for (let i = 2; i <= n; i++) {
		const p = 1 + Math.floor(rnd() * (i - 1));
		rows.push(`${p} ${i} ${1 + Math.floor(rnd() * 1000000)}`);
	}
	for (let i = 0; i < extra; i++) {
		const a = 1 + Math.floor(rnd() * n), b = 1 + Math.floor(rnd() * n);
		if (a !== b) rows.push(`${a} ${b} ${1 + Math.floor(rnd() * 1000000)}`);
	}
	const m = rows.length;
	return `${n} ${m}\n${rows.join("\n")}`;
}

const P = [
	{
		slug: "s-mst-weight",
		title: "최소 신장 트리",
		shape: "weightedEdges",
		visible: 2,
		description:
			"# 최소 신장 트리\n\n첫 줄에 노드의 개수 `n` (1 이상 100000 이하) 과 간선의 개수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 간선 `u v w` 가 주어집니다. `w` 는 그 간선의 비용(1 이상 1000000 이하)입니다.\n\n모든 노드를 잇는 **최소 비용**을 출력하세요. 즉 최소 신장 트리의 간선 비용 합입니다.\n입력 그래프는 항상 연결되어 있습니다.",
		// 크루스칼: 간선을 비용 순으로 정렬하고, 사이클을 만들지 않는 것만 더한다.
		inputs: [
			"4 5\n1 2 1\n2 3 2\n1 3 3\n3 4 4\n2 4 5",
			"1 0",
			"5 6\n1 2 3\n1 3 5\n2 3 1\n2 4 6\n3 5 4\n4 5 2",
			connectedGraph(2000, 2000, 20261701),
			"2 1\n1 2 7",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const edges = [];
			for (let i = 1; i <= m; i++) edges.push(data[i].trim().split(/\s+/).map(Number));
			return String(kruskal(n, edges, makeDSU(n)).weight);
		},
	},
	{
		slug: "s-mst-connected",
		title: "연결이 될까",
		shape: "weightedEdges",
		visible: 2,
		description:
			"# 연결이 될까\n\n첫 줄에 노드의 개수 `n` (1 이상 100000 이하) 과 간선의 개수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 간선 `u v w` 가 주어집니다. `w` 는 그 간선의 비용(1 이상 1000000 이하)입니다.\n\n모든 노드를 잇는 최소 비용을 출력하세요. **모두 잇는 것이 불가능하면 `-1`** 을 출력합니다.",
		// 1번과 같은데, 그래프가 연결되지 않을 수 있다. MST 에 쓴 간선이 정확히
		// n-1 개가 아니면 하나로 못 잇는 것이다.
		inputs: [
			"4 5\n1 2 1\n2 3 2\n1 3 3\n3 4 4\n2 4 5",
			"4 2\n1 2 3\n3 4 5",
			"5 3\n1 2 1\n2 3 2\n4 5 3",
			connectedGraph(2000, 1500, 20261702),
			"3 1\n1 2 10",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const edges = [];
			for (let i = 1; i <= m; i++) edges.push(data[i].trim().split(/\s+/).map(Number));
			const { weight, used } = kruskal(n, edges, makeDSU(n));
			return String(used === n - 1 ? weight : -1);
		},
	},
	{
		slug: "s-mst-max-edge",
		title: "가장 비싼 다리",
		shape: "weightedEdges",
		visible: 2,
		description:
			"# 가장 비싼 다리\n\n첫 줄에 노드의 개수 `n` (2 이상 100000 이하) 과 간선의 개수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 간선 `u v w` 가 주어집니다. `w` 는 비용(1 이상 1000000 이하)입니다.\n\n최소 신장 트리를 만들 때 쓰는 간선 중 **가장 비싼 간선의 비용**을 출력하세요.\n입력 그래프는 항상 연결되어 있습니다.",
		// 크루스칼은 비용 오름차순으로 더하니, MST 에 실제로 쓴 마지막(가장 비싼)
		// 간선이 답이다.
		inputs: [
			"4 5\n1 2 1\n2 3 2\n1 3 3\n3 4 4\n2 4 5",
			"2 1\n1 2 7",
			"5 6\n1 2 3\n1 3 5\n2 3 1\n2 4 6\n3 5 4\n4 5 2",
			connectedGraph(2000, 2000, 20261703),
			"3 3\n1 2 5\n2 3 5\n1 3 5",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const edges = [];
			for (let i = 1; i <= m; i++) edges.push(data[i].trim().split(/\s+/).map(Number));
			return String(kruskal(n, edges, makeDSU(n)).maxEdge);
		},
	},
	{
		slug: "s-network-split",
		title: "두 그룹으로 나누기",
		shape: "weightedEdges",
		visible: 2,
		description:
			"# 두 그룹으로 나누기\n\n첫 줄에 노드의 개수 `n` (2 이상 100000 이하) 과 간선의 개수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 간선 `u v w` 가 주어집니다. `w` 는 유지 비용(1 이상 1000000 이하)입니다.\n\n모든 노드를 이은 뒤, 노드들을 **정확히 두 그룹**으로 나누려고 합니다.\n두 그룹 사이의 연결은 끊어도 됩니다. 이때 유지해야 하는 간선 비용의 **최솟값**을 출력하세요.\n입력 그래프는 항상 연결되어 있습니다.",
		// 최소 신장 트리를 만들고, 그중 가장 비싼 간선 하나를 끊으면 딱 두 그룹이
		// 된다. 답은 MST 비용 - MST 의 가장 비싼 간선.
		inputs: [
			"4 5\n1 2 1\n2 3 2\n1 3 3\n3 4 4\n2 4 5",
			"2 1\n1 2 7",
			"5 6\n1 2 3\n1 3 5\n2 3 1\n2 4 6\n3 5 4\n4 5 2",
			connectedGraph(2000, 2000, 20261704),
			"3 3\n1 2 5\n2 3 4\n1 3 6",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const edges = [];
			for (let i = 1; i <= m; i++) edges.push(data[i].trim().split(/\s+/).map(Number));
			const { weight, maxEdge } = kruskal(n, edges, makeDSU(n));
			return String(weight - maxEdge);
		},
	},
	{
		slug: "s-mst-prebuilt",
		title: "이미 놓인 다리",
		shape: "prebuilt",
		visible: 2,
		description:
			"# 이미 놓인 다리\n\n첫 줄에 노드의 개수 `n` (1 이상 100000 이하), 이미 연결된 쌍의 수 `k` (0 이상 4000 이하),\n후보 간선의 수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `k`개의 줄에 이미 연결된 두 노드 `a b` 가 주어집니다.\n그다음 `m`개의 줄에 후보 간선 `u v w` 가 주어집니다. `w` 는 비용(1 이상 1000000 이하)입니다.\n\n이미 놓인 연결은 공짜로 쓸 수 있습니다. 모든 노드를 잇는 데 **추가로 드는 최소 비용**을\n출력하세요. 이을 수 없으면 `-1` 을 출력합니다.",
		// 16장처럼 먼저 이미 연결된 쌍을 union 해두고, 그 위에서 크루스칼을 돌린다.
		inputs: [
			"4 1 4\n1 2\n1 2 5\n2 3 2\n3 4 3\n1 4 10",
			"4 0 2\n1 2 3\n3 4 5",
			"5 2 4\n1 2\n4 5\n2 3 4\n1 3 7\n3 4 2\n1 5 9",
			(() => {
				const rnd = lcg(20261705);
				const n = 2000, k = 500, m = 2500;
				const rows = [`${n} ${k} ${m}`];
				for (let i = 0; i < k; i++) rows.push(`${1 + Math.floor(rnd() * n)} ${1 + Math.floor(rnd() * n)}`);
				// 연결성 보장: 스패닝 트리 후보를 넣는다.
				const cand = [];
				for (let i = 2; i <= n; i++) cand.push(`${1 + Math.floor(rnd() * (i - 1))} ${i} ${1 + Math.floor(rnd() * 1000000)}`);
				for (let i = cand.length; i < m; i++) cand.push(`${1 + Math.floor(rnd() * n)} ${1 + Math.floor(rnd() * n)} ${1 + Math.floor(rnd() * 1000000)}`);
				return rows.concat(cand.slice(0, m)).join("\n");
			})(),
			"3 3 1\n1 2\n2 3\n1 3\n1 2 100",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, k, m] = data[0].trim().split(/\s+/).map(Number);
			const dsu = makeDSU(n);
			for (let i = 1; i <= k; i++) {
				const [a, b] = data[i].trim().split(/\s+/).map(Number);
				dsu.union(a, b);
			}
			const edges = [];
			for (let i = 1; i <= m; i++) edges.push(data[k + i].trim().split(/\s+/).map(Number));
			// 이미 union 으로 줄어든 컴포넌트 수를 센다.
			let comp = 0;
			for (let i = 1; i <= n; i++) if (dsu.find(i) === i) comp++;
			const { weight, used } = kruskal(n, edges, dsu);
			return String(used === comp - 1 ? weight : -1);
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
		console.log(`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(inn)} -> ${JSON.stringify(tc.expectedOutput)}`); } }
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
	console.log(`Seeded ${P.length} mst problems.`);
} finally { await client.close(); }
