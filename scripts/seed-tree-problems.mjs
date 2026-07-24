// Seed the 트리 기초 problems used by the Algorithm course's 15th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-tree-problems.mjs            seed
//   node scripts/seed-tree-problems.mjs --print    preview without the DB
//   node scripts/seed-tree-problems.mjs --json     full cases, for checking solutions
//
// Five problems on the same rooted-tree idea: find each node's parent (BFS),
// each node's depth (BFS, same input as parent — different question), each
// node's subtree size (post-order DFS, where a path-shaped tree forces
// setrecursionlimit), a binary-tree traversal (pre/in/post order), and the tree
// diameter by the two-BFS trick.

const LANGS = ["python", "javascript", "cpp", "java", "go"];

const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 n, 이어서 n-1 개의 간선 — 1,2,3,5번이 쓴다.
	treeEdges: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\nadj = [[] for _ in range(n + 1)]\nfor _ in range(n - 1):\n    u, v = map(int, input().split())\n    adj[u].append(v)\n    adj[v].append(u)\n\n# 재귀로 풀 거면 아래 한 줄이 필요할 수 있다냥\n# sys.setrecursionlimit(10 ** 6)\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(data[0].trim());\nconst adj = Array.from({ length: n + 1 }, () => []);\nfor (let i = 1; i <= n - 1; i++) {\n  const [u, v] = data[i].trim().split(/\\s+/).map(Number);\n  adj[u].push(v);\n  adj[v].push(u);\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    vector<vector<int>> adj(n + 1);\n    for (int i = 0; i < n - 1; i++) {\n        int u, v;\n        cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < n - 1; i++) {\n            StringTokenizer st = new StringTokenizer(br.readLine());\n            int u = Integer.parseInt(st.nextToken());\n            int v = Integer.parseInt(st.nextToken());\n            adj.get(u).add(v);\n            adj.get(v).add(u);\n        }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\tadj := make([][]int, n+1)\n\tfor i := 0; i < n-1; i++ {\n\t\tvar u, v int\n\t\tfmt.Fscan(reader, &u, &v)\n\t\tadj[u] = append(adj[u], v)\n\t\tadj[v] = append(adj[v], u)\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄 n, 이어서 n개의 줄에 노드 i 의 왼쪽·오른쪽 자식 — 4번이 쓴다.
	binaryTree: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\nleft = [0] * (n + 1)\nright = [0] * (n + 1)\nfor i in range(1, n + 1):\n    l, r = map(int, input().split())\n    left[i] = l\n    right[i] = r\n\n# 재귀로 풀 거면 아래 한 줄이 필요할 수 있다냥\n# sys.setrecursionlimit(10 ** 6)\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(data[0].trim());\nconst left = new Array(n + 1).fill(0);\nconst right = new Array(n + 1).fill(0);\nfor (let i = 1; i <= n; i++) {\n  const [l, r] = data[i].trim().split(/\\s+/).map(Number);\n  left[i] = l;\n  right[i] = r;\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    vector<int> left(n + 1), right(n + 1);\n    for (int i = 1; i <= n; i++) cin >> left[i] >> right[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        int[] left = new int[n + 1], right = new int[n + 1];\n        for (int i = 1; i <= n; i++) {\n            StringTokenizer st = new StringTokenizer(br.readLine());\n            left[i] = Integer.parseInt(st.nextToken());\n            right[i] = Integer.parseInt(st.nextToken());\n        }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\tleft := make([]int, n+1)\n\tright := make([]int, n+1)\n\tfor i := 1; i <= n; i++ {\n\t\tfmt.Fscan(reader, &left[i], &right[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) {
	let x = seed >>> 0;
	return () => {
		x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
		return x / 4294967296;
	};
}

/** A random tree on nodes 1..n: node i (>=2) attaches to a random earlier node. */
function randomTree(n, seed) {
	const rnd = lcg(seed);
	const edges = [];
	for (let i = 2; i <= n; i++) {
		const p = 1 + Math.floor(rnd() * (i - 1));
		edges.push(`${p} ${i}`);
	}
	return `${n}\n${edges.join("\n")}`;
}

/** A path 1-2-3-...-n (depth n), which trips recursive DFS without a raised limit. */
function pathTree(n) {
	const edges = [];
	for (let i = 2; i <= n; i++) edges.push(`${i - 1} ${i}`);
	return `${n}\n${edges.join("\n")}`;
}

function parseTree(s) {
	const data = s.trim().split("\n");
	const n = Number(data[0]);
	const adj = Array.from({ length: n + 1 }, () => []);
	for (let i = 1; i <= n - 1; i++) {
		const [u, v] = data[i].trim().split(/\s+/).map(Number);
		adj[u].push(v);
		adj[v].push(u);
	}
	return { n, adj };
}

/** BFS from root=1, returns parent[] and depth[]. Iterative, no recursion. */
function rootTree(n, adj) {
	const parent = new Array(n + 1).fill(0);
	const depth = new Array(n + 1).fill(-1);
	const order = [];
	depth[1] = 0;
	const q = [1];
	let head = 0;
	while (head < q.length) {
		const u = q[head++];
		order.push(u);
		for (const v of adj[u]) {
			if (depth[v] === -1) {
				depth[v] = depth[u] + 1;
				parent[v] = u;
				q.push(v);
			}
		}
	}
	return { parent, depth, order };
}

const P = [
	{
		slug: "s-tree-parent",
		title: "트리의 부모 찾기",
		shape: "treeEdges",
		visible: 2,
		description:
			"# 트리의 부모 찾기\n\n첫 줄에 노드의 개수 `n` (2 이상 5000 이하) 이 주어집니다.\n이어서 `n-1`개의 줄에 트리의 간선 `u v` 가 주어집니다. 노드 번호는 1번부터 `n`번까지입니다.\n\n트리의 **루트를 1번 노드**로 할 때, `2`번부터 `n`번까지 각 노드의 **부모 노드 번호**를\n한 줄에 하나씩 순서대로 출력하세요.",
		// 간선만 주어진 트리를 1번에서 BFS 로 훑으며 부모를 정한다. 방향이 없는
		// 간선이라 양쪽에 다 넣고, 아직 안 간 쪽이 자식이다.
		inputs: [
			"7\n1 6\n6 3\n3 5\n4 1\n2 4\n4 7",
			"2\n2 1",
			"5\n1 2\n1 3\n2 4\n2 5",
			randomTree(5000, 20261201),
			pathTree(5000),
		],
		solve: (s) => {
			const { n, adj } = parseTree(s);
			const { parent } = rootTree(n, adj);
			const out = [];
			for (let i = 2; i <= n; i++) out.push(parent[i]);
			return out.join("\n");
		},
	},
	{
		slug: "s-tree-depth",
		title: "트리의 깊이",
		shape: "treeEdges",
		visible: 2,
		description:
			"# 트리의 깊이\n\n첫 줄에 노드의 개수 `n` (2 이상 5000 이하) 이 주어집니다.\n이어서 `n-1`개의 줄에 트리의 간선 `u v` 가 주어집니다. 노드 번호는 1번부터 `n`번까지입니다.\n\n트리의 **루트를 1번 노드**로 할 때, `1`번부터 `n`번까지 각 노드의 **깊이**를\n한 줄에 하나씩 순서대로 출력하세요. 루트의 깊이는 `0` 입니다.",
		// 1번 문제와 입력이 똑같은데 묻는 게 다르다. 부모 대신 깊이를 적으며 BFS.
		inputs: [
			"7\n1 6\n6 3\n3 5\n4 1\n2 4\n4 7",
			"2\n2 1",
			"5\n1 2\n1 3\n2 4\n2 5",
			randomTree(5000, 20261201),
			pathTree(5000),
		],
		solve: (s) => {
			const { n, adj } = parseTree(s);
			const { depth } = rootTree(n, adj);
			const out = [];
			for (let i = 1; i <= n; i++) out.push(depth[i]);
			return out.join("\n");
		},
	},
	{
		slug: "s-subtree-size",
		title: "서브트리의 크기",
		shape: "treeEdges",
		visible: 2,
		description:
			"# 서브트리의 크기\n\n첫 줄에 노드의 개수 `n` (2 이상 5000 이하) 이 주어집니다.\n이어서 `n-1`개의 줄에 트리의 간선 `u v` 가 주어집니다. 노드 번호는 1번부터 `n`번까지입니다.\n\n트리의 **루트를 1번 노드**로 할 때, `1`번부터 `n`번까지 각 노드를 뿌리로 하는\n**서브트리의 크기**(자기 자신을 포함)를 한 줄에 하나씩 순서대로 출력하세요.",
		// 후위 순회(자식부터 세고 나를 더한다). 재귀로 짜면 한 줄로 깔끔하지만,
		// 일자로 뻗은 트리(5000 깊이)에서 재귀 한도를 넘긴다. setrecursionlimit
		// 이나 반복문 후위 순회가 필요하다.
		inputs: [
			"7\n1 6\n6 3\n3 5\n4 1\n2 4\n4 7",
			"2\n2 1",
			"5\n1 2\n1 3\n2 4\n2 5",
			randomTree(5000, 20261203),
			pathTree(5000),
		],
		solve: (s) => {
			const { n, adj } = parseTree(s);
			const { parent, order } = rootTree(n, adj);
			const size = new Array(n + 1).fill(1);
			// 역 BFS 순서(리프에 가까운 것부터)로 부모에 더한다 — 반복문 후위 순회.
			for (let i = order.length - 1; i >= 1; i--) {
				const u = order[i];
				size[parent[u]] += size[u];
			}
			const out = [];
			for (let i = 1; i <= n; i++) out.push(size[i]);
			return out.join("\n");
		},
	},
	{
		slug: "s-binary-traversal",
		title: "이진 트리 순회",
		shape: "binaryTree",
		visible: 2,
		description:
			"# 이진 트리 순회\n\n첫 줄에 노드의 개수 `n` (1 이상 5000 이하) 이 주어집니다.\n이어서 `n`개의 줄에 `i`번째 줄에 노드 `i` 의 **왼쪽 자식**과 **오른쪽 자식** 번호가 주어집니다.\n자식이 없으면 `0` 입니다. **루트는 1번 노드**입니다.\n\n이 트리의 **전위 순회**, **중위 순회**, **후위 순회** 결과를 각각 한 줄에\n공백으로 구분해 출력하세요. (세 줄)",
		// 전위(뿌리-왼-오), 중위(왼-뿌리-오), 후위(왼-오-뿌리). 한쪽으로만 뻗은
		// 트리는 재귀 깊이가 n 이라 여기서도 setrecursionlimit 이 필요하다.
		inputs: [
			"5\n2 3\n4 5\n0 0\n0 0\n0 0",
			"1\n0 0",
			"3\n2 0\n3 0\n0 0",
			(() => {
				// 무작위 모양의 이진 트리 (자식을 뒤쪽 번호로만 연결해 사이클 방지).
				const rnd = lcg(20261204);
				const n = 5000;
				const left = new Array(n + 1).fill(0);
				const right = new Array(n + 1).fill(0);
				let nextFree = 2;
				const slots = [1]; // 자식을 받을 수 있는 노드들
				while (nextFree <= n && slots.length) {
					const idx = Math.floor(rnd() * slots.length);
					const node = slots[idx];
					if (left[node] === 0 && (right[node] !== 0 || rnd() < 0.5)) {
						left[node] = nextFree;
					} else if (right[node] === 0) {
						right[node] = nextFree;
					} else { slots.splice(idx, 1); continue; }
					slots.push(nextFree);
					nextFree++;
				}
				const rows = [];
				for (let i = 1; i <= n; i++) rows.push(`${left[i]} ${right[i]}`);
				return `${n}\n${rows.join("\n")}`;
			})(),
			(() => {
				// 왼쪽으로만 뻗은 이진 트리 (연결 리스트 모양). 재귀 깊이 5000.
				const n = 5000;
				const rows = [];
				for (let i = 1; i <= n; i++) rows.push(i < n ? `${i + 1} 0` : "0 0");
				return `${n}\n${rows.join("\n")}`;
			})(),
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const n = Number(data[0]);
			const left = new Array(n + 1).fill(0);
			const right = new Array(n + 1).fill(0);
			for (let i = 1; i <= n; i++) {
				const [l, r] = data[i].trim().split(/\s+/).map(Number);
				left[i] = l; right[i] = r;
			}
			const pre = [], ino = [], post = [];
			// 반복 순회 (재귀 깊이 회피): 명시적 스택.
			// 전위
			let st = [1];
			while (st.length) {
				const u = st.pop();
				if (!u) continue;
				pre.push(u);
				st.push(right[u]);
				st.push(left[u]);
			}
			// 중위
			st = [];
			let cur = 1;
			while (cur || st.length) {
				while (cur) { st.push(cur); cur = left[cur]; }
				cur = st.pop();
				ino.push(cur);
				cur = right[cur];
			}
			// 후위 (전위의 뿌리-오-왼을 뒤집으면 왼-오-뿌리)
			st = [1];
			const rev = [];
			while (st.length) {
				const u = st.pop();
				if (!u) continue;
				rev.push(u);
				st.push(left[u]);
				st.push(right[u]);
			}
			while (rev.length) post.push(rev.pop());
			return [pre.join(" "), ino.join(" "), post.join(" ")].join("\n");
		},
	},
	{
		slug: "s-tree-diameter",
		title: "트리의 지름",
		shape: "treeEdges",
		visible: 2,
		description:
			"# 트리의 지름\n\n첫 줄에 노드의 개수 `n` (2 이상 5000 이하) 이 주어집니다.\n이어서 `n-1`개의 줄에 트리의 간선 `u v` 가 주어집니다. 노드 번호는 1번부터 `n`번까지입니다.\n\n트리에서 **가장 먼 두 노드 사이의 거리**(지나는 간선의 수)를 출력하세요.\n이 값을 트리의 지름이라고 합니다.",
		// 두 번의 BFS. 아무 데서나 BFS 로 가장 먼 점을 찾고, 그 점에서 다시 BFS
		// 하면 가장 먼 거리가 지름이다. 재귀가 아니라 깊이 걱정이 없다.
		inputs: [
			"5\n1 2\n2 3\n2 4\n4 5",
			"2\n1 2",
			"6\n1 2\n1 3\n3 4\n3 5\n5 6",
			randomTree(5000, 20261205),
			pathTree(5000),
		],
		solve: (s) => {
			const { n, adj } = parseTree(s);
			const bfs = (start) => {
				const dist = new Array(n + 1).fill(-1);
				dist[start] = 0;
				const q = [start];
				let head = 0, far = start;
				while (head < q.length) {
					const u = q[head++];
					if (dist[u] > dist[far]) far = u;
					for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
				}
				return { far, dist };
			};
			const a = bfs(1).far;
			const { far: b, dist } = bfs(a);
			return String(dist[b]);
		},
	},
];

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
		if (tc.expectedOutput.length > STDOUT_CAP) throw new Error(`${p.slug} case ${i}: 출력 ${tc.expectedOutput.length} > ${STDOUT_CAP}`);
		if (tc.stdin.length > STDIN_CAP) throw new Error(`${p.slug} case ${i}: 입력 ${tc.stdin.length} > ${STDIN_CAP}`);
	}
	return {
		slug: p.slug, title: p.title, description: p.description + exampleSection(p),
		difficulty: "medium", languages: LANGS, starterCode: STARTERS[p.shape],
		testcases, timeLimit: 5, memoryLimit: 256000, createdBy: "seed", updatedAt: now,
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
			const inn = tc.stdin.length > 45 ? tc.stdin.slice(0, 28).replace(/\n/g, "\\n") + `... (${tc.stdin.length}자)` : tc.stdin;
			const o = tc.expectedOutput.length > 45 ? tc.expectedOutput.slice(0, 28).replace(/\n/g, "\\n") + `... (${tc.expectedOutput.length}자)` : tc.expectedOutput;
			console.log(`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(inn)} -> ${JSON.stringify(o)}`);
		}
	}
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
	for (const def of P) {
		const doc = toProblem(def, now);
		await col.updateOne({ slug: doc.slug }, { $set: doc, $setOnInsert: { createdAt: now } }, { upsert: true });
	}
	console.log(`Seeded ${P.length} tree problems.`);
} finally {
	await client.close();
}
