// Seed the 유니온 파인드 problems used by the Algorithm course's 16th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-unionfind-problems.mjs            seed
//   node scripts/seed-unionfind-problems.mjs --print    preview without the DB
//   node scripts/seed-unionfind-problems.mjs --json     full cases
//
// Five problems on disjoint sets: same-set queries, counting groups, the
// largest group's size, the merged size after each union, and the first edge
// that closes a cycle. The reference uses path compression + union by size; the
// classic wrong answer is comparing parent[] instead of find().

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 n m, 이어서 m개의 연산 "op a b" — 1번이 쓴다.
	operations: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\nparent = list(range(n + 1))\n\n# 여기에 find, union 을 만들고 연산을 처리하세요\nfor _ in range(m):\n    op, a, b = map(int, input().split())\n    # op 0: 합치기, op 1: 같은 집합이냥?\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst parent = Array.from({ length: n + 1 }, (_, i) => i);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint parent[1000001];\nint find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    cin >> n >> m;\n    for (int i = 0; i <= n; i++) parent[i] = i;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] parent;\n    static int find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n        parent = new int[n + 1];\n        for (int i = 0; i <= n; i++) parent[i] = i;\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nvar parent []int\n\nfunc find(x int) int {\n\tfor parent[x] != x {\n\t\tparent[x] = parent[parent[x]]\n\t\tx = parent[x]\n\t}\n\treturn x\n}\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tparent = make([]int, n+1)\n\tfor i := range parent {\n\t\tparent[i] = i\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄 n m, 이어서 m개의 간선 "a b" — 2,3,4,5번이 쓴다.
	edges: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\nparent = list(range(n + 1))\nedges = [tuple(map(int, input().split())) for _ in range(m)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = data[0].trim().split(/\\s+/).map(Number);\nconst parent = Array.from({ length: n + 1 }, (_, i) => i);\nconst edges = [];\nfor (let i = 1; i <= m; i++) edges.push(data[i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint parent[1000001];\nint find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    cin >> n >> m;\n    for (int i = 0; i <= n; i++) parent[i] = i;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] parent;\n    static int find(int x){ while(parent[x]!=x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n        parent = new int[n + 1];\n        for (int i = 0; i <= n; i++) parent[i] = i;\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nvar parent []int\n\nfunc find(x int) int {\n\tfor parent[x] != x {\n\t\tparent[x] = parent[parent[x]]\n\t\tx = parent[x]\n\t}\n\treturn x\n}\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tparent = make([]int, n+1)\n\tfor i := range parent {\n\t\tparent[i] = i\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) {
	let x = seed >>> 0;
	return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; };
}

/** Disjoint set with path compression + union by size (the reference). */
function makeDSU(n) {
	const parent = Array.from({ length: n + 1 }, (_, i) => i);
	const size = new Array(n + 1).fill(1);
	const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
	const union = (a, b) => {
		let ra = find(a), rb = find(b);
		if (ra === rb) return false;
		if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
		parent[rb] = ra; size[ra] += size[rb];
		return true;
	};
	return { find, union, size };
}

/** m random union edges over nodes 1..n. */
function randomEdges(n, m, seed, withOp) {
	const rnd = lcg(seed);
	const rows = [];
	for (let i = 0; i < m; i++) {
		const a = 1 + Math.floor(rnd() * n);
		const b = 1 + Math.floor(rnd() * n);
		rows.push(withOp ? `${rnd() < 0.5 ? 0 : 1} ${a} ${b}` : `${a} ${b}`);
	}
	return `${n} ${m}\n${rows.join("\n")}`;
}

const P = [
	{
		slug: "s-disjoint-set",
		title: "집합 표현",
		shape: "operations",
		visible: 2,
		description:
			"# 집합 표현\n\n첫 줄에 원소의 개수 `n` (1 이상 100000 이하) 과 연산의 개수 `m` (1 이상 4000 이하) 이 주어집니다.\n처음에 각 원소는 자기 자신만 있는 집합입니다. 원소는 1번부터 `n`번까지입니다.\n\n이어서 `m`개의 줄에 연산 `op a b` 가 주어집니다.\n\n- `op` 가 `0` 이면 `a` 가 든 집합과 `b` 가 든 집합을 **합칩니다.**\n- `op` 가 `1` 이면 `a` 와 `b` 가 **같은 집합에 있는지** 묻습니다. 같으면 `YES`, 아니면 `NO` 를 출력합니다.\n\n`1` 연산마다 한 줄씩 답을 출력하세요.",
		// 유니온 파인드의 기본. 같은 집합인지는 두 원소의 '대표(루트)'가 같은지로
		// 판단한다. parent[a] == parent[b] 로 비교하면 틀린다 — 대표는 find 로.
		inputs: [
			"5 6\n0 1 2\n1 1 2\n1 1 3\n0 3 2\n1 1 3\n1 4 5",
			"3 3\n1 1 2\n0 1 2\n1 1 2",
			"7 8\n0 1 2\n0 3 4\n0 2 4\n1 1 3\n1 1 5\n0 5 6\n0 6 7\n1 5 7",
			randomEdges(100000, 4000, 20261601, true),
			"2 3\n0 1 1\n1 1 1\n1 1 2",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { find, union } = makeDSU(n);
			const out = [];
			for (let i = 1; i <= m; i++) {
				const [op, a, b] = data[i].trim().split(/\s+/).map(Number);
				if (op === 0) union(a, b);
				else out.push(find(a) === find(b) ? "YES" : "NO");
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-count-groups",
		title: "그룹의 개수",
		shape: "edges",
		visible: 2,
		description:
			"# 그룹의 개수\n\n첫 줄에 원소의 개수 `n` (1 이상 100000 이하) 과 간선의 개수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 두 원소 `a b` 가 주어지며, 이 둘은 같은 그룹으로 묶입니다.\n\n모든 간선을 처리한 뒤 **서로 다른 그룹이 몇 개**인지 출력하세요.",
		// 대표가 자기 자신인 원소의 수 = 그룹 수. 또는 union 이 실제로 합친 횟수를
		// n 에서 빼도 된다.
		inputs: [
			"5 3\n1 2\n2 3\n4 5",
			"4 0",
			"6 4\n1 2\n3 4\n5 6\n1 3",
			randomEdges(100000, 4000, 20261602, false),
			"1 0",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { find, union } = makeDSU(n);
			for (let i = 1; i <= m; i++) {
				const [a, b] = data[i].trim().split(/\s+/).map(Number);
				union(a, b);
			}
			let groups = 0;
			for (let i = 1; i <= n; i++) if (find(i) === i) groups++;
			return String(groups);
		},
	},
	{
		slug: "s-largest-group",
		title: "가장 큰 그룹",
		shape: "edges",
		visible: 2,
		description:
			"# 가장 큰 그룹\n\n첫 줄에 원소의 개수 `n` (1 이상 100000 이하) 과 간선의 개수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 두 원소 `a b` 가 주어지며, 이 둘은 같은 그룹으로 묶입니다.\n\n모든 간선을 처리한 뒤 **가장 큰 그룹에 속한 원소의 수**를 출력하세요.",
		// union by size 로 각 대표의 크기를 관리하면 바로 최댓값을 구할 수 있다.
		inputs: [
			"5 3\n1 2\n2 3\n4 5",
			"4 0",
			"6 4\n1 2\n3 4\n5 6\n1 3",
			randomEdges(100000, 4000, 20261603, false),
			"1 0",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { find, union, size } = makeDSU(n);
			for (let i = 1; i <= m; i++) {
				const [a, b] = data[i].trim().split(/\s+/).map(Number);
				union(a, b);
			}
			let best = 0;
			for (let i = 1; i <= n; i++) if (find(i) === i) best = Math.max(best, size[i]);
			return String(best);
		},
	},
	{
		slug: "s-friend-chain",
		title: "친구 네트워크",
		shape: "edges",
		visible: 2,
		description:
			"# 친구 네트워크\n\n첫 줄에 사람의 수 `n` (2 이상 100000 이하) 과 친구 관계의 수 `m` (1 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 두 사람 `a b` 가 친구가 됩니다.\n\n친구 관계가 하나 생길 때마다, 그때 **두 사람이 속한 친구 그룹의 크기**(합쳐진 크기)를\n한 줄에 하나씩 출력하세요. 이미 같은 그룹이면 그 그룹의 크기를 그대로 출력합니다.",
		// 각 union 직후 그 그룹의 크기를 출력. 스트리밍으로 답이 나온다.
		inputs: [
			"5 4\n1 2\n2 3\n4 5\n1 5",
			"2 1\n1 2",
			"6 5\n1 2\n3 4\n1 3\n5 6\n2 5",
			randomEdges(100000, 4000, 20261604, false),
			"3 3\n1 2\n1 2\n2 3",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { find, union, size } = makeDSU(n);
			const out = [];
			for (let i = 1; i <= m; i++) {
				const [a, b] = data[i].trim().split(/\s+/).map(Number);
				union(a, b);
				out.push(size[find(a)]);
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-cycle-edge",
		title: "사이클을 만드는 간선",
		shape: "edges",
		visible: 2,
		description:
			"# 사이클을 만드는 간선\n\n첫 줄에 노드의 개수 `n` (1 이상 100000 이하) 과 간선의 개수 `m` (0 이상 4000 이하) 이 주어집니다.\n이어서 `m`개의 줄에 간선 `a b` 가 **주어진 순서대로** 그래프에 추가됩니다.\n\n간선을 하나씩 추가하다가 **처음으로 사이클이 생기는 간선의 번호**(1번부터)를 출력하세요.\n끝까지 사이클이 생기지 않으면 `0` 을 출력합니다.",
		// 두 끝이 이미 같은 집합이면 그 간선이 사이클을 만든다. 유니온 파인드의
		// 대표 활용. union 이 false 를 반환하는 첫 간선이 답이다.
		inputs: [
			"3 3\n1 2\n2 3\n1 3",
			"4 2\n1 2\n3 4",
			"5 5\n1 2\n2 3\n3 4\n4 5\n2 4",
			randomEdges(100000, 4000, 20261605, false),
			"6 6\n1 2\n3 4\n5 6\n1 3\n5 1\n2 6",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m] = data[0].trim().split(/\s+/).map(Number);
			const { union } = makeDSU(n);
			for (let i = 1; i <= m; i++) {
				const [a, b] = data[i].trim().split(/\s+/).map(Number);
				if (!union(a, b)) return String(i);
			}
			return "0";
		},
	},
];

function exampleSection(p) {
	const stdin = p.inputs[0];
	return `\n\n## 예시\n\n**입력**\n\`\`\`\n${stdin}\n\`\`\`\n\n**출력**\n\`\`\`\n${p.solve(stdin)}\n\`\`\``;
}
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
	console.log(`Seeded ${P.length} union-find problems.`);
} finally { await client.close(); }
