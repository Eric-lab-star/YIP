// Seed the 그래프 탐색 problems used by the Algorithm course's 10th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-graph-problems.mjs            seed
//   node scripts/seed-graph-problems.mjs --print    preview without the DB
//
// The five problems go: count components, measure the largest, shortest path on
// a grid, the same search on an adjacency list (so the idea survives leaving the
// grid), and finally a BFS started from many sources at once.

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
	charGrid: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m = map(int, input().split())\ngrid = [input().strip() for _ in range(n)]\n\n# 재귀 DFS 로 풀 거면 아래 한 줄이 필요하다냥\n# sys.setrecursionlimit(10 ** 6)\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = lines[0].trim().split(/\\s+/).map(Number);\nconst grid = [];\nfor (let i = 0; i < n; i++) grid.push(lines[i + 1].trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    cin >> n >> m;\n    vector<string> grid(n);\n    for (int i = 0; i < n; i++) cin >> grid[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n        String[] grid = new String[n];\n        for (int i = 0; i < n; i++) grid[i] = br.readLine().trim();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m int\n\tfmt.Fscan(reader, &n, &m)\n\tgrid := make([]string, n)\n\tfor i := range grid {\n\t\tfmt.Fscan(reader, &grid[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	graph: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m, s = map(int, input().split())\nadj = [[] for _ in range(n + 1)]\nfor _ in range(m):\n    u, v = map(int, input().split())\n    adj[u].append(v)\n    adj[v].append(u)\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m, s] = lines[0].trim().split(/\\s+/).map(Number);\nconst adj = Array.from({ length: n + 1 }, () => []);\nfor (let i = 1; i <= m; i++) {\n  const [u, v] = lines[i].trim().split(/\\s+/).map(Number);\n  adj[u].push(v);\n  adj[v].push(u);\n}\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m, s;\n    cin >> n >> m >> s;\n    vector<vector<int>> adj(n + 1);\n    for (int i = 0; i < m; i++) {\n        int u, v;\n        cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n        int s = Integer.parseInt(st.nextToken());\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) {\n            st = new StringTokenizer(br.readLine());\n            int u = Integer.parseInt(st.nextToken());\n            int v = Integer.parseInt(st.nextToken());\n            adj.get(u).add(v);\n            adj.get(v).add(u);\n        }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m, s int\n\tfmt.Fscan(reader, &n, &m, &s)\n\tadj := make([][]int, n+1)\n\tfor i := 0; i < m; i++ {\n\t\tvar u, v int\n\t\tfmt.Fscan(reader, &u, &v)\n\t\tadj[u] = append(adj[u], v)\n\t\tadj[v] = append(adj[v], u)\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

const DIRS = [
	[-1, 0],
	[1, 0],
	[0, -1],
	[0, 1],
];

function parseGrid(s) {
	const lines = s.split("\n");
	const [n, m] = lines[0].trim().split(/\s+/).map(Number);
	const g = [];
	for (let i = 0; i < n; i++) g.push(lines[i + 1]);
	return { n, m, g };
}

/** Deterministic pseudo-random (LCG) so generated cases are reproducible. */
function lcg(seed) {
	let x = seed >>> 0;
	return () => {
		x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
		return x / 4294967296;
	};
}

/** A grid of `land`/`water` chars with the given land probability. */
function randomGrid(n, m, seed, landProb, landCh, waterCh) {
	const rnd = lcg(seed);
	const rows = [];
	for (let r = 0; r < n; r++) {
		let line = "";
		for (let c = 0; c < m; c++) line += rnd() < landProb ? landCh : waterCh;
		rows.push(line);
	}
	return `${n} ${m}\n${rows.join("\n")}`;
}

/** An open maze with a guaranteed path along the top row and right column. */
function mazeCase(n, m, seed) {
	const rnd = lcg(seed);
	const rows = [];
	for (let r = 0; r < n; r++) {
		let line = "";
		for (let c = 0; c < m; c++) line += rnd() < 0.3 ? "#" : ".";
		rows.push(line.split(""));
	}
	for (let c = 0; c < m; c++) rows[0][c] = ".";
	for (let r = 0; r < n; r++) rows[r][m - 1] = ".";
	return `${n} ${m}\n${rows.map((r) => r.join("")).join("\n")}`;
}

/** Connected-component walk shared by the two region problems. */
function componentSizes(n, m, g, isLand) {
	const seen = Array.from({ length: n }, () => new Array(m).fill(false));
	const sizes = [];
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < m; c++) {
			if (seen[r][c] || !isLand(g[r][c])) continue;
			let size = 0;
			const stack = [[r, c]];
			seen[r][c] = true;
			while (stack.length) {
				const [cr, cc] = stack.pop();
				size++;
				for (const [dr, dc] of DIRS) {
					const nr = cr + dr;
					const nc = cc + dc;
					if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
					if (seen[nr][nc] || !isLand(g[nr][nc])) continue;
					seen[nr][nc] = true;
					stack.push([nr, nc]);
				}
			}
			sizes.push(size);
		}
	}
	return sizes;
}

const P = [
	{
		slug: "s-island-count",
		title: "섬의 개수",
		shape: "charGrid",
		visible: 2,
		description:
			"# 섬의 개수\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 문자가 주어집니다.\n`#` 는 땅, `.` 는 물입니다.\n\n**상하좌우로 이어진 땅**은 하나의 섬입니다. 섬이 몇 개인지 출력하세요.\n대각선으로만 닿은 것은 이어진 것으로 보지 않습니다.",
		// 이 챕터의 출발점. 방문 표시를 안 하면 같은 칸을 무한히 오가고, 표시를
		// 큐에서 꺼낼 때 하면 같은 칸이 여러 번 들어간다.
		inputs: [
			"3 3\n#.#\n...\n#.#",
			"1 1\n.",
			"3 3\n###\n###\n###",
			"4 5\n#.#.#\n#.#.#\n#.#.#\n#...#",
			randomGrid(100, 100, 20260721, 0.45, "#", "."),
		],
		solve: (s) => {
			const { n, m, g } = parseGrid(s);
			return String(componentSizes(n, m, g, (ch) => ch === "#").length);
		},
	},
	{
		slug: "s-region-max",
		title: "가장 큰 영역",
		shape: "charGrid",
		visible: 2,
		description:
			"# 가장 큰 영역\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 문자가 주어집니다.\n`#` 는 땅, `.` 는 물입니다.\n\n**상하좌우로 이어진 땅** 중 가장 큰 덩어리가 몇 칸인지 출력하세요.\n땅이 하나도 없으면 `0` 을 출력합니다.",
		// 1번과 뼈대가 같고 '세면서 탐색하기'만 더해진다. 큰 케이스는 재귀 DFS 의
		// 깊이 한도를 넘기므로 setrecursionlimit 이나 BFS 가 필요하다.
		inputs: [
			"3 3\n##.\n#..\n..#",
			"1 1\n.",
			"2 4\n####\n####",
			"4 4\n#.#.\n.#.#\n#.#.\n.#.#",
			randomGrid(100, 100, 20260722, 0.6, "#", "."),
			// 전부 땅인 격자. 무작위 격자는 덩어리가 커도 재귀가 깊어지지 않지만
			// (깊이는 칸 수가 아니라 DFS 트리의 최장 경로다) 빈틈없이 꽉 찬 격자는
			// 뱀처럼 훑게 되어 깊이가 칸 수와 같아진다. 재귀 DFS 로 풀려면
			// setrecursionlimit 이 필요해지는 케이스라 일부러 넣었다.
			`100 100\n${Array.from({ length: 100 }, () => "#".repeat(100)).join("\n")}`,
		],
		solve: (s) => {
			const { n, m, g } = parseGrid(s);
			const sizes = componentSizes(n, m, g, (ch) => ch === "#");
			return String(sizes.length ? Math.max(...sizes) : 0);
		},
	},
	{
		slug: "s-maze-shortest",
		title: "미로 최단 거리",
		shape: "charGrid",
		visible: 2,
		description:
			"# 미로 최단 거리\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 문자가 주어집니다.\n`.` 는 지나갈 수 있는 칸, `#` 는 벽입니다.\n\n왼쪽 위 `(0, 0)` 에서 오른쪽 아래 `(n-1, m-1)` 까지 **상하좌우로만** 이동할 때,\n지나는 칸의 개수를 **시작과 도착을 모두 포함해서** 최소로 하면 몇 개인지 출력하세요.\n\n갈 수 없으면 `-1` 을 출력합니다. 시작이나 도착이 벽일 수도 있습니다.",
		// 여기서 BFS 와 DFS 가 갈린다. DFS 로 먼저 닿은 경로는 최단이 아니다.
		inputs: [
			"3 3\n...\n.#.\n...",
			"2 2\n.#\n#.",
			"1 1\n.",
			"4 4\n....\n###.\n....\n.###",
			mazeCase(100, 100, 20260723),
		],
		solve: (s) => {
			const { n, m, g } = parseGrid(s);
			if (g[0][0] === "#" || g[n - 1][m - 1] === "#") return "-1";
			const dist = Array.from({ length: n }, () => new Array(m).fill(-1));
			dist[0][0] = 1;
			let head = 0;
			const q = [[0, 0]];
			while (head < q.length) {
				const [r, c] = q[head++];
				for (const [dr, dc] of DIRS) {
					const nr = r + dr;
					const nc = c + dc;
					if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
					if (g[nr][nc] === "#" || dist[nr][nc] !== -1) continue;
					dist[nr][nc] = dist[r][c] + 1;
					q.push([nr, nc]);
				}
			}
			return String(dist[n - 1][m - 1]);
		},
	},
	{
		slug: "s-graph-bfs-order",
		title: "그래프 탐색 순서",
		shape: "graph",
		visible: 2,
		description:
			"# 그래프 탐색 순서\n\n첫 줄에 정점의 개수 `n`, 간선의 개수 `m`, 시작 정점 `s` 가 주어집니다.\n`n` 은 1 이상 1000 이하, `m` 은 0 이상 5000 이하이고, 정점 번호는 1번부터 `n`번까지입니다.\n이어서 `m`개의 줄에 간선의 양 끝 정점 `u` 와 `v` 가 주어집니다. 간선에 방향은 없습니다.\n\n`s` 에서 시작해 **너비 우선 탐색**으로 방문하는 순서를 한 줄에 공백으로 구분해 출력하세요.\n\n한 정점에서 여러 곳으로 갈 수 있다면 **번호가 작은 정점부터** 방문합니다.\n시작 정점에서 갈 수 없는 정점은 출력하지 않습니다.",
		// 격자를 벗어나도 같은 알고리즘이라는 걸 보여주는 문제. 인접 리스트를
		// 정렬하지 않으면 방문 순서가 입력 순서에 좌우돼 틀린다.
		inputs: [
			"5 4 1\n1 2\n1 3\n2 4\n3 5",
			"4 2 1\n3 4\n1 2",
			"1 0 1",
			"6 6 3\n3 1\n3 6\n1 2\n6 5\n2 4\n5 4",
			"7 5 4\n4 7\n4 2\n7 1\n2 6\n6 3",
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const [n, m, start] = lines[0].trim().split(/\s+/).map(Number);
			const adj = Array.from({ length: n + 1 }, () => []);
			for (let i = 1; i <= m; i++) {
				const [u, v] = lines[i].trim().split(/\s+/).map(Number);
				adj[u].push(v);
				adj[v].push(u);
			}
			for (const list of adj) list.sort((a, b) => a - b);
			const seen = new Array(n + 1).fill(false);
			const order = [];
			const q = [start];
			seen[start] = true;
			let head = 0;
			while (head < q.length) {
				const cur = q[head++];
				order.push(cur);
				for (const nxt of adj[cur]) {
					if (seen[nxt]) continue;
					seen[nxt] = true;
					q.push(nxt);
				}
			}
			return order.join(" ");
		},
	},
	{
		slug: "s-multi-bfs",
		title: "여러 곳에서 동시에 번지기",
		shape: "charGrid",
		visible: 2,
		description:
			"# 여러 곳에서 동시에 번지기\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 문자가 주어집니다.\n`*` 는 시작점, `.` 는 빈 칸, `#` 는 벽입니다.\n\n매 단계마다 `*` 는 **상하좌우로 인접한 빈 칸**으로 동시에 번집니다.\n벽으로는 번지지 않습니다.\n\n모든 빈 칸이 채워지는 데 걸리는 **최소 단계 수**를 출력하세요.\n처음부터 빈 칸이 없으면 `0`, 끝내 채울 수 없는 빈 칸이 있으면 `-1` 을 출력합니다.",
		// 시작점을 전부 큐에 넣고 시작한다는 것만 다르다. 하나씩 BFS 를 돌리면
		// 답이 틀리고 느리기도 하다.
		inputs: [
			"3 3\n*..\n...\n..*",
			"2 3\n*..\n..#",
			"1 1\n*",
			"3 3\n*.#\n.#.\n#..",
			// 시작점이 드문드문 흩어진 큰 격자. 시작점마다 따로 BFS 를 돌리는 풀이는
			// 여기서 느려지고, 한 번에 다 넣는 풀이는 한 번의 순회로 끝난다.
			randomGrid(100, 100, 20260724, 0.02, "*", "."),
		],
		solve: (s) => {
			const { n, m, g } = parseGrid(s);
			const dist = Array.from({ length: n }, () => new Array(m).fill(-1));
			const q = [];
			let empty = 0;
			for (let r = 0; r < n; r++) {
				for (let c = 0; c < m; c++) {
					if (g[r][c] === "*") {
						dist[r][c] = 0;
						q.push([r, c]);
					} else if (g[r][c] === ".") empty++;
				}
			}
			let head = 0;
			let best = 0;
			while (head < q.length) {
				const [r, c] = q[head++];
				for (const [dr, dc] of DIRS) {
					const nr = r + dr;
					const nc = c + dc;
					if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
					if (g[nr][nc] !== "." || dist[nr][nc] !== -1) continue;
					dist[nr][nc] = dist[r][c] + 1;
					best = Math.max(best, dist[nr][nc]);
					empty--;
					q.push([nr, nc]);
				}
			}
			return empty > 0 ? "-1" : String(best);
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
	console.log(`Seeded ${P.length} graph problems.`);
} finally {
	await client.close();
}
