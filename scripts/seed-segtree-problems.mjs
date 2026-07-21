// Seed the 세그먼트 트리 problems for the Algorithm course's 22nd chapter.
// Expected outputs come from the reference `solve`. Upserts by slug; safe to re-run.
//
//   node scripts/seed-segtree-problems.mjs [--print|--json]
//
// Where chapter 14's prefix sum could not handle updates, a segment tree does
// range query + point update in O(log n). Five problems: range sum, range min,
// range max (same tree, the merge is all that changes), then a value-space tree
// for the k-th smallest and for counting values <= x.

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 n q, 둘째 줄 n개의 값, 이어서 q개의 연산 — 1,2,3번.
	arrayOps: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, q = map(int, input().split())\na = list(map(int, input().split()))\n\n# 세그먼트 트리를 만들고 연산을 처리하세요\nfor _ in range(q):\n    op, x, y = map(int, input().split())\n    # op 1: x번째 값을 y 로 바꾸기, op 2: x..y 구간 질의\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, q] = data[0].trim().split(/\\s+/).map(Number);\nconst a = data[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, q; cin >> n >> q;\n    vector<ll> a(n);\n    for (auto& x : a) cin >> x;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken()), q = Integer.parseInt(st.nextToken());\n        long[] a = new long[n];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) a[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, q int\n\tfmt.Fscan(reader, &n, &q)\n\ta := make([]int64, n)\n\tfor i := range a {\n\t\tfmt.Fscan(reader, &a[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄 q M, 이어서 q개의 연산 — 4,5번 (값 공간 트리).
	valueOps: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nq, M = map(int, input().split())\n\n# 값 1..M 에 대한 개수 세그먼트 트리를 만드세요\nfor _ in range(q):\n    op, x = map(int, input().split())\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [q, M] = data[0].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int q, M; cin >> q >> M;\n\n    // 값 1..M 에 대한 개수 세그먼트 트리를 만드세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int q = Integer.parseInt(st.nextToken()), M = Integer.parseInt(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar q, M int\n\tfmt.Fscan(reader, &q, &M)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) { let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }

/** Iterative segment tree with a merge function and identity. */
function segTree(a, merge, identity) {
	let size = 1;
	while (size < a.length) size *= 2;
	const tree = new Array(2 * size).fill(identity);
	for (let i = 0; i < a.length; i++) tree[size + i] = a[i];
	for (let i = size - 1; i >= 1; i--) tree[i] = merge(tree[2 * i], tree[2 * i + 1]);
	const update = (i, v) => {
		let p = size + i; tree[p] = v; p >>= 1;
		while (p >= 1) { tree[p] = merge(tree[2 * p], tree[2 * p + 1]); p >>= 1; }
	};
	const query = (l, r) => { // inclusive [l, r], 0-indexed
		let res = identity; l += size; r += size + 1;
		while (l < r) {
			if (l & 1) res = merge(res, tree[l++]);
			if (r & 1) res = merge(res, tree[--r]);
			l >>= 1; r >>= 1;
		}
		return res;
	};
	return { update, query };
}

function makeArrayOps(seed, merge, identity, n = 4000, q = 4000, valLo = 1, valHi = 1000000) {
	const rnd = lcg(seed);
	const a = Array.from({ length: n }, () => valLo + Math.floor(rnd() * (valHi - valLo + 1)));
	const st = segTree(a.slice(), merge, identity);
	const ops = [];
	const out = [];
	for (let i = 0; i < q; i++) {
		if (rnd() < 0.5) {
			const idx = 1 + Math.floor(rnd() * n);
			const v = valLo + Math.floor(rnd() * (valHi - valLo + 1));
			ops.push(`1 ${idx} ${v}`);
			st.update(idx - 1, v);
		} else {
			let l = 1 + Math.floor(rnd() * n), r = 1 + Math.floor(rnd() * n);
			if (l > r) [l, r] = [r, l];
			ops.push(`2 ${l} ${r}`);
			out.push(st.query(l - 1, r - 1));
		}
	}
	return { stdin: `${n} ${q}\n${a.join(" ")}\n${ops.join("\n")}`, out };
}

const SUM = (a, b) => a + b;
const MIN = (a, b) => Math.min(a, b);
const MAX = (a, b) => Math.max(a, b);

/** Solve an arrayOps input with the given merge/identity. */
function solveArrayOps(s, merge, identity) {
	const data = s.trim().split("\n");
	const [n, q] = data[0].trim().split(/\s+/).map(Number);
	const a = data[1].trim().split(/\s+/).map(Number);
	const st = segTree(a, merge, identity);
	const out = [];
	for (let i = 0; i < q; i++) {
		const [op, x, y] = data[2 + i].trim().split(/\s+/).map(Number);
		if (op === 1) st.update(x - 1, y);
		else out.push(st.query(x - 1, y - 1));
	}
	return out.join("\n");
}

const P = [
	{
		slug: "s-seg-sum",
		title: "바뀌는 구간 합",
		shape: "arrayOps",
		visible: 2,
		description:
			"# 바뀌는 구간 합\n\n첫 줄에 수의 개수 `n` 과 연산의 수 `q` (각각 1 이상 4000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 수가 주어집니다 (0 이상 1000000 이하).\n이어서 `q`개의 줄에 연산이 주어집니다.\n\n- `1 i v` : `i`번째 수를 `v` 로 **바꾼다**\n- `2 l r` : `l`번째부터 `r`번째까지의 **합**을 출력한다\n\n(모두 1번부터 셉니다.) `2` 연산마다 한 줄에 하나씩 답을 출력하세요.",
		// 14장 누적합은 값이 바뀌면 매번 다시 만들어야 했다. 세그먼트 트리는
		// 갱신과 구간 합을 둘 다 O(log n) 에 한다.
		inputs: [
			"5 5\n1 2 3 4 5\n2 1 5\n1 3 10\n2 1 5\n2 2 4\n1 1 100",
			"1 2\n7\n2 1 1\n1 1 3",
			"4 4\n10 20 30 40\n2 2 3\n1 2 5\n2 1 4\n2 4 4",
			makeArrayOps(20262201, SUM, 0).stdin,
			"2 2\n5 5\n2 1 2\n2 1 1",
		],
		solve: (s) => solveArrayOps(s, SUM, 0),
	},
	{
		slug: "s-seg-min",
		title: "바뀌는 구간 최솟값",
		shape: "arrayOps",
		visible: 2,
		description:
			"# 바뀌는 구간 최솟값\n\n첫 줄에 수의 개수 `n` 과 연산의 수 `q` (각각 1 이상 4000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 수가 주어집니다 (0 이상 1000000 이하).\n이어서 `q`개의 줄에 연산이 주어집니다.\n\n- `1 i v` : `i`번째 수를 `v` 로 바꾼다\n- `2 l r` : `l`번째부터 `r`번째까지의 **최솟값**을 출력한다\n\n`2` 연산마다 한 줄에 하나씩 답을 출력하세요.",
		// 1번과 입력 형태가 같고 트리 구조도 같다. '합치는 방법'만 덧셈에서
		// min 으로 바뀐다. 항등원도 0 에서 무한대로 바뀐다.
		inputs: [
			"5 5\n5 2 8 1 9\n2 1 5\n1 4 100\n2 1 5\n2 1 3\n1 1 0",
			"1 2\n7\n2 1 1\n1 1 3",
			"4 4\n10 20 30 40\n2 2 3\n1 2 5\n2 1 4\n2 4 4",
			makeArrayOps(20262202, MIN, Infinity).stdin,
			"2 2\n5 5\n2 1 2\n2 1 1",
		],
		solve: (s) => solveArrayOps(s, MIN, Infinity),
	},
	{
		slug: "s-seg-max",
		title: "바뀌는 구간 최댓값",
		shape: "arrayOps",
		visible: 2,
		description:
			"# 바뀌는 구간 최댓값\n\n첫 줄에 수의 개수 `n` 과 연산의 수 `q` (각각 1 이상 4000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 수가 주어집니다 (0 이상 1000000 이하).\n이어서 `q`개의 줄에 연산이 주어집니다.\n\n- `1 i v` : `i`번째 수를 `v` 로 바꾼다\n- `2 l r` : `l`번째부터 `r`번째까지의 **최댓값**을 출력한다\n\n`2` 연산마다 한 줄에 하나씩 답을 출력하세요.",
		// 합치는 방법을 max 로, 항등원을 -무한대로 바꾸면 끝. 세 문제가 같은
		// 뼈대에서 merge 만 다르다는 걸 보여준다.
		inputs: [
			"5 5\n5 2 8 1 9\n2 1 5\n1 5 3\n2 1 5\n2 3 4\n1 1 100",
			"1 2\n7\n2 1 1\n1 1 3",
			"4 4\n10 20 30 40\n2 2 3\n1 2 5\n2 1 4\n2 4 4",
			makeArrayOps(20262203, MAX, -Infinity).stdin,
			"2 2\n5 5\n2 1 2\n2 1 1",
		],
		solve: (s) => solveArrayOps(s, MAX, -Infinity),
	},
	{
		slug: "s-seg-kth",
		title: "k번째 원소 꺼내기",
		shape: "valueOps",
		visible: 2,
		description:
			"# k번째 원소 꺼내기\n\n첫 줄에 연산의 수 `q` (1 이상 8000 이하) 와 값의 범위 `M` (1 이상 1000000 이하) 이 주어집니다.\n이어서 `q`개의 줄에 연산이 주어집니다.\n\n- `1 x` : 값이 `x` 인 원소를 하나 **넣는다** (1 이상 `M` 이하)\n- `2 k` : 현재 들어 있는 원소를 크기순으로 줄 세웠을 때 **`k`번째로 작은 값**을 출력하고, 그 원소를 **꺼낸다**\n\n`2` 연산마다 한 줄에 하나씩 답을 출력하세요. `2` 연산의 `k` 는 항상 유효합니다.",
		// 값 1..M 에 대한 '개수' 세그먼트 트리. k번째 찾기는 루트에서 내려가며
		// 왼쪽 개수와 k 를 비교하는 descent 로 O(log M) 이다.
		inputs: [
			"5 5\n1 3\n1 1\n1 5\n2 2\n2 1",
			"3 10\n1 7\n2 1\n1 4",
			"6 4\n1 2\n1 2\n1 4\n2 1\n2 2\n2 1",
			(() => {
				const rnd = lcg(20262204); const q = 8000, M = 1000000;
				const present = [];
				const ops = [];
				for (let i = 0; i < q; i++) {
					if (present.length === 0 || rnd() < 0.55) { const x = 1 + Math.floor(rnd() * M); ops.push(`1 ${x}`); present.push(x); }
					else { const k = 1 + Math.floor(rnd() * present.length); ops.push(`2 ${k}`); present.sort((p, r) => p - r); present.splice(k - 1, 1); }
				}
				return `${ops.length} ${M}\n${ops.join("\n")}`;
			})(),
			"2 3\n1 2\n2 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [q, M] = data[0].trim().split(/\s+/).map(Number);
			let size = 1; while (size < M + 1) size *= 2;
			const tree = new Int32Array(2 * size);
			const add = (x, d) => { let p = size + x; tree[p] += d; p >>= 1; while (p) { tree[p] = tree[2 * p] + tree[2 * p + 1]; p >>= 1; } };
			const kth = (k) => { let node = 1; while (node < size) { const left = tree[2 * node]; if (k <= left) node = 2 * node; else { k -= left; node = 2 * node + 1; } } return node - size; };
			const out = [];
			for (let i = 1; i <= q; i++) {
				const [op, x] = data[i].trim().split(/\s+/).map(Number);
				if (op === 1) add(x, 1);
				else { const v = kth(x); out.push(v); add(v, -1); }
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-seg-count-le",
		title: "x 이하가 몇 개",
		shape: "valueOps",
		visible: 2,
		description:
			"# x 이하가 몇 개\n\n첫 줄에 연산의 수 `q` (1 이상 8000 이하) 와 값의 범위 `M` (1 이상 1000000 이하) 이 주어집니다.\n이어서 `q`개의 줄에 연산이 주어집니다.\n\n- `1 x` : 값이 `x` 인 원소를 하나 넣는다 (1 이상 `M` 이하)\n- `2 x` : 현재 들어 있는 원소 중 **값이 `x` 이하인 것의 개수**를 출력한다\n\n`2` 연산마다 한 줄에 하나씩 답을 출력하세요.",
		// 4번과 같은 개수 트리인데, k번째 찾기(descent) 대신 구간 합 질의(1..x)를
		// 한다. 넣기만 하고 빼지는 않는다.
		inputs: [
			"5 5\n1 3\n1 1\n2 2\n1 5\n2 4",
			"3 10\n1 7\n2 10\n2 6",
			"4 4\n1 2\n1 4\n2 3\n2 4",
			(() => {
				const rnd = lcg(20262205); const q = 8000, M = 1000000;
				const ops = [];
				for (let i = 0; i < q; i++) { if (rnd() < 0.5) ops.push(`1 ${1 + Math.floor(rnd() * M)}`); else ops.push(`2 ${1 + Math.floor(rnd() * M)}`); }
				return `${q} ${M}\n${ops.join("\n")}`;
			})(),
			"2 3\n1 2\n2 1",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [q, M] = data[0].trim().split(/\s+/).map(Number);
			let size = 1; while (size < M + 1) size *= 2;
			const tree = new Int32Array(2 * size);
			const add = (x) => { let p = size + x; tree[p] += 1; p >>= 1; while (p) { tree[p] = tree[2 * p] + tree[2 * p + 1]; p >>= 1; } };
			const sumTo = (x) => { let res = 0, l = size + 1, r = size + x + 1; while (l < r) { if (l & 1) res += tree[l++]; if (r & 1) res += tree[--r]; l >>= 1; r >>= 1; } return res; };
			const out = [];
			for (let i = 1; i <= q; i++) {
				const [op, x] = data[i].trim().split(/\s+/).map(Number);
				if (op === 1) add(x);
				else out.push(sumTo(x));
			}
			return out.join("\n");
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
	console.log(`Seeded ${P.length} segment-tree problems.`);
} finally { await client.close(); }
