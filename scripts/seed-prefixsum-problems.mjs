// Seed the 누적합·투 포인터 problems used by the Algorithm course's 14th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-prefixsum-problems.mjs            seed
//   node scripts/seed-prefixsum-problems.mjs --print    preview without the DB
//   node scripts/seed-prefixsum-problems.mjs --json     full cases, for checking solutions
//
// The five follow the chapter's five steps: 1D prefix sum (range queries), 2D
// prefix sum (rectangle queries), a sorted two-pointer (pair counting), a
// sliding window (shortest subarray with sum >= S), and finally a subarray-sum
// count that two-pointer cannot do because the values go negative — that one is
// prefix sum plus a hash map, and it is the chapter's "why the window breaks".

// mongodb / mongoUri are imported lazily inside the seed path so --print and
// --json work in a fresh worktree that has no node_modules yet.

const LANGS = ["python", "javascript", "cpp", "java", "go"];

// See piston/docker-compose.yml (PISTON_OUTPUT_MAX_SIZE) — Piston kills rather
// than truncates a run that overruns its per-stream cap.
const STDOUT_CAP = 1_048_576;
// Piston mounts body_parser.json() with no limit, so Express's 100 KB default
// caps the whole request — and the submitted source shares that budget with
// stdin. Measured: 102,240 bytes of stdin passes, 102,241 is a 400. Every case
// below stays well under this; the guard in toProblem enforces it.
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 n q, 둘째 줄 n개, 이어서 q개의 구간 질의 — 1번이 쓴다.
	rangeQueries: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, q = map(int, input().split())\nnums = list(map(int, input().split()))\nqueries = [tuple(map(int, input().split())) for _ in range(q)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, q] = data[0].trim().split(/\\s+/).map(Number);\nconst nums = data[1].trim().split(/\\s+/).map(Number);\nconst queries = [];\nfor (let i = 0; i < q; i++) queries.push(data[2 + i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, q;\n    cin >> n >> q;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int q = Integer.parseInt(st.nextToken());\n        long[] nums = new long[n];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) nums[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, q int\n\tfmt.Fscan(reader, &n, &q)\n\tnums := make([]int64, n)\n\tfor i := range nums {\n\t\tfmt.Fscan(reader, &nums[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄 n m q, n개의 행, 이어서 q개의 직사각형 질의 — 2번이 쓴다.
	gridQueries: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, m, q = map(int, input().split())\ngrid = [list(map(int, input().split())) for _ in range(n)]\nqueries = [tuple(map(int, input().split())) for _ in range(q)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m, q] = data[0].trim().split(/\\s+/).map(Number);\nconst grid = [];\nfor (let i = 0; i < n; i++) grid.push(data[1 + i].trim().split(/\\s+/).map(Number));\nconst queries = [];\nfor (let i = 0; i < q; i++) queries.push(data[1 + n + i].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m, q;\n    cin >> n >> m >> q;\n    vector<vector<long long>> grid(n, vector<long long>(m));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) cin >> grid[i][j];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        int m = Integer.parseInt(st.nextToken());\n        int q = Integer.parseInt(st.nextToken());\n        long[][] grid = new long[n][m];\n        for (int i = 0; i < n; i++) {\n            st = new StringTokenizer(br.readLine());\n            for (int j = 0; j < m; j++) grid[i][j] = Long.parseLong(st.nextToken());\n        }\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, m, q int\n\tfmt.Fscan(reader, &n, &m, &q)\n\tgrid := make([][]int64, n)\n\tfor i := range grid {\n\t\tgrid[i] = make([]int64, m)\n\t\tfor j := range grid[i] {\n\t\t\tfmt.Fscan(reader, &grid[i][j])\n\t\t}\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	// 첫 줄 두 정수, 둘째 줄 n개 — 3, 4, 5번이 공유한다.
	pairAndList: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, k = map(int, input().split())\nnums = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, k] = data[0].trim().split(/\\s+/).map(Number);\nconst nums = data[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    long long k;\n    cin >> n >> k;\n    vector<long long> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken());\n        long k = Long.parseLong(st.nextToken());\n        long[] nums = new long[n];\n        st = new StringTokenizer(br.readLine());\n        for (int i = 0; i < n; i++) nums[i] = Long.parseLong(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tvar k int64\n\tfmt.Fscan(reader, &n, &k)\n\tnums := make([]int64, n)\n\tfor i := range nums {\n\t\tfmt.Fscan(reader, &nums[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
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

const P = [
	{
		slug: "s-range-sum",
		title: "구간 합 구하기",
		shape: "rangeQueries",
		visible: 2,
		description:
			"# 구간 합 구하기\n\n첫 줄에 수의 개수 `n` (1 이상 100000 이하) 과 질의의 개수 `q` (1 이상 100000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 수가 주어집니다. 각 수는 1 이상 1000 이하입니다.\n이어서 `q`개의 줄에 각각 두 정수 `l` 과 `r` (1 이상 `n` 이하, `l ≤ r`) 이 주어집니다.\n\n각 질의마다 `l`번째부터 `r`번째까지의 수의 합을 한 줄에 하나씩 출력하세요. (1번부터 셉니다.)",
		// 챕터의 출발점. 질의마다 매번 더하면 O(nq) 로 느리다. 누적합을 한 번
		// 만들어두면 질의마다 뺄셈 한 번이라 O(n+q) 다.
		inputs: [
			"5 3\n1 2 3 4 5\n1 3\n2 4\n1 5",
			"1 2\n7\n1 1\n1 1",
			"6 4\n10 20 30 40 50 60\n2 5\n1 1\n6 6\n3 4",
			(() => {
				const rnd = lcg(20261101);
				const n = 2000, q = 5000;
				const nums = Array.from({ length: n }, () => 1 + Math.floor(rnd() * 1000));
				const qs = [];
				for (let i = 0; i < q; i++) {
					let l = 1 + Math.floor(rnd() * n), r = 1 + Math.floor(rnd() * n);
					if (l > r) [l, r] = [r, l];
					qs.push(`${l} ${r}`);
				}
				return `${n} ${q}\n${nums.join(" ")}\n${qs.join("\n")}`;
			})(),
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, q] = data[0].trim().split(/\s+/).map(Number);
			const nums = data[1].trim().split(/\s+/).map(Number);
			const pre = new Array(n + 1).fill(0);
			for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
			const out = [];
			for (let i = 0; i < q; i++) {
				const [l, r] = data[2 + i].trim().split(/\s+/).map(Number);
				out.push(pre[r] - pre[l - 1]);
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-grid-sum",
		title: "2차원 구간 합",
		shape: "gridQueries",
		visible: 2,
		description:
			"# 2차원 구간 합\n\n첫 줄에 격자의 크기 `n`, `m` (1 이상 100 이하) 과 질의의 개수 `q` (1 이상 3000 이하) 가 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 수가 주어집니다. 각 수는 1 이상 1000 이하입니다.\n그다음 `q`개의 줄에 각각 네 정수 `r1 c1 r2 c2` 가 주어집니다. (1번부터 세며 `r1 ≤ r2`, `c1 ≤ c2`.)\n\n각 질의마다 `(r1, c1)` 부터 `(r2, c2)` 까지의 직사각형 안에 있는 수의 합을\n한 줄에 하나씩 출력하세요.",
		// 1번을 2차원으로 확장. 누적합 격자를 만들고 포함-배제로 직사각형 합을
		// O(1) 에 구한다. 부호를 헷갈리면 바로 틀린다.
		inputs: [
			"2 3 2\n1 2 3\n4 5 6\n1 1 2 3\n2 2 2 3",
			"1 1 1\n9\n1 1 1 1",
			"3 3 3\n1 2 3\n4 5 6\n7 8 9\n1 1 3 3\n2 2 3 3\n1 1 1 3",
			(() => {
				const rnd = lcg(20261102);
				const n = 100, m = 100, q = 1500;
				const rows = [];
				for (let r = 0; r < n; r++) rows.push(Array.from({ length: m }, () => 1 + Math.floor(rnd() * 1000)).join(" "));
				const qs = [];
				for (let i = 0; i < q; i++) {
					let r1 = 1 + Math.floor(rnd() * n), r2 = 1 + Math.floor(rnd() * n);
					let c1 = 1 + Math.floor(rnd() * m), c2 = 1 + Math.floor(rnd() * m);
					if (r1 > r2) [r1, r2] = [r2, r1];
					if (c1 > c2) [c1, c2] = [c2, c1];
					qs.push(`${r1} ${c1} ${r2} ${c2}`);
				}
				return `${n} ${m} ${q}\n${rows.join("\n")}\n${qs.join("\n")}`;
			})(),
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, m, q] = data[0].trim().split(/\s+/).map(Number);
			const pre = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
			for (let r = 1; r <= n; r++) {
				const row = data[r].trim().split(/\s+/).map(Number);
				for (let c = 1; c <= m; c++) {
					pre[r][c] = row[c - 1] + pre[r - 1][c] + pre[r][c - 1] - pre[r - 1][c - 1];
				}
			}
			const out = [];
			for (let i = 0; i < q; i++) {
				const [r1, c1, r2, c2] = data[1 + n + i].trim().split(/\s+/).map(Number);
				out.push(pre[r2][c2] - pre[r1 - 1][c2] - pre[r2][c1 - 1] + pre[r1 - 1][c1 - 1]);
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-two-sum-count",
		title: "두 수의 합",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 두 수의 합\n\n첫 줄에 수의 개수 `n` (2 이상 100000 이하) 과 목표 합 `k` (-2000000000 이상 2000000000 이하) 가 주어집니다.\n둘째 줄에 **서로 다른** `n`개의 정수가 주어집니다. 각 수는 -1000000000 이상 1000000000 이하입니다.\n\n두 수를 골라 합이 정확히 `k` 가 되는 **쌍의 개수**를 출력하세요.\n같은 수를 두 번 고를 수는 없고, 순서는 따지지 않습니다.",
		// 정렬 후 양쪽 끝에서 투 포인터. 값이 서로 달라서 중복 세기 걱정이 없다.
		// 이중 반복문 O(n^2) 은 큰 케이스에서 시간 초과다.
		inputs: [
			"5 7\n1 2 3 4 5",
			"4 100\n1 2 3 4",
			"6 0\n-3 -1 0 1 2 3",
			"2 5\n2 3",
			// stdin 상한 때문에 값 범위를 ±10^6 로 잡아 n=10000 을 넣는다. 그래도
			// 이중 반복문 O(n^2)=10^8 은 시간 초과라, 정렬 후 투 포인터가 필요하다.
			(() => {
				const rnd = lcg(20261103);
				const n = 10000;
				const seen = new Set();
				const nums = [];
				while (nums.length < n) {
					const v = Math.floor(rnd() * 2000001) - 1000000;
					if (!seen.has(v)) { seen.add(v); nums.push(v); }
				}
				return `${n} 500\n${nums.join(" ")}`;
			})(),
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const k = Number(lines[0].trim().split(/\s+/)[1]);
			const a = lines[1].trim().split(/\s+/).map(Number).sort((x, y) => x - y);
			let lo = 0, hi = a.length - 1, cnt = 0;
			while (lo < hi) {
				const sum = a[lo] + a[hi];
				if (sum === k) { cnt++; lo++; hi--; }
				else if (sum < k) lo++;
				else hi--;
			}
			return String(cnt);
		},
	},
	{
		slug: "s-window-min-len",
		title: "합이 S 이상인 최소 길이",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 합이 S 이상인 최소 길이\n\n첫 줄에 수의 개수 `n` (1 이상 100000 이하) 과 목표 `S` (1 이상 2000000000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 수가 주어집니다. 각 수는 1 이상 10000 이하인 **양수**입니다.\n\n연속한 부분 배열 중 합이 `S` 이상이 되는 것의 **가장 짧은 길이**를 출력하세요.\n그런 부분 배열이 없으면 `0` 을 출력합니다.",
		// 슬라이딩 윈도우. 오른쪽을 늘려 합을 채우고, S 이상이면 왼쪽을 줄이며
		// 길이를 갱신한다. 양수라서 창이 단조로워 이 방법이 성립한다.
		inputs: [
			"6 8\n2 3 1 2 4 3",
			"5 100\n1 2 3 4 5",
			"5 5\n5 1 1 1 1",
			"3 3\n1 1 1",
			// S 를 전체 합의 절반으로 잡아 최소 창이 길어지게 한다. 그래야 조기
			// 종료가 있는 이중 반복문도 O(n^2) 급이 되어 시간 초과가 난다. 창이
			// 짧으면 이중 반복문이 break 로 빠져나가 안 느리다.
			(() => {
				const rnd = lcg(20261104);
				const n = 12000;
				const nums = Array.from({ length: n }, () => 1 + Math.floor(rnd() * 10000));
				const S = Math.floor(nums.reduce((a, b) => a + b, 0) / 2);
				return `${n} ${S}\n${nums.join(" ")}`;
			})(),
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const S = Number(lines[0].trim().split(/\s+/)[1]);
			const a = lines[1].trim().split(/\s+/).map(Number);
			let lo = 0, sum = 0, best = Infinity;
			for (let hi = 0; hi < a.length; hi++) {
				sum += a[hi];
				while (sum >= S) {
					best = Math.min(best, hi - lo + 1);
					sum -= a[lo];
					lo++;
				}
			}
			return String(best === Infinity ? 0 : best);
		},
	},
	{
		slug: "s-subarray-sum-k",
		title: "합이 K인 부분 배열",
		shape: "pairAndList",
		visible: 2,
		description:
			"# 합이 K인 부분 배열\n\n첫 줄에 수의 개수 `n` (1 이상 100000 이하) 과 목표 합 `K` (-2000000000 이상 2000000000 이하) 가 주어집니다.\n둘째 줄에 `n`개의 정수가 주어집니다. 각 수는 -10000 이상 10000 이하이며 **음수일 수 있습니다.**\n\n연속한 부분 배열 중 합이 정확히 `K` 인 것의 **개수**를 출력하세요.",
		// 챕터의 마지막 교훈. 음수가 섞이면 창이 단조롭지 않아 투 포인터가 안 된다.
		// 누적합을 만들고, pre[j] - pre[i] = K 인 (i, j) 쌍을 딕셔너리로 센다.
		inputs: [
			"5 3\n1 2 1 3 -1",
			"4 0\n1 -1 1 -1",
			"3 5\n5 -5 5",
			"1 7\n7",
			(() => {
				const rnd = lcg(20261105);
				const n = 12000;
				const nums = Array.from({ length: n }, () => Math.floor(rnd() * 20001) - 10000);
				return `${n} 0\n${nums.join(" ")}`;
			})(),
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const K = Number(lines[0].trim().split(/\s+/)[1]);
			const a = lines[1].trim().split(/\s+/).map(Number);
			const seen = new Map();
			seen.set(0, 1);
			let pre = 0, cnt = 0;
			for (const v of a) {
				pre += v;
				cnt += seen.get(pre - K) || 0;
				seen.set(pre, (seen.get(pre) || 0) + 1);
			}
			return String(cnt);
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
			throw new Error(`${p.slug} case ${i}: 기대 출력 ${tc.expectedOutput.length}바이트 > 출력 상한 ${STDOUT_CAP}바이트`);
		}
		if (tc.stdin.length > STDIN_CAP) {
			throw new Error(`${p.slug} case ${i}: 입력 ${tc.stdin.length}바이트 > 요청 본문 상한 ${STDIN_CAP}바이트`);
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
			const inn = tc.stdin.length > 50 ? tc.stdin.slice(0, 30).replace(/\n/g, "\\n") + `... (${tc.stdin.length}자)` : tc.stdin;
			const out = tc.expectedOutput.length > 50 ? tc.expectedOutput.slice(0, 30).replace(/\n/g, "\\n") + `... (${tc.expectedOutput.length}자)` : tc.expectedOutput;
			console.log(`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(inn)} -> ${JSON.stringify(out)}`);
		}
	}
	process.exit(0);
}

const { MongoClient } = await import("mongodb");
const { loadEnv, resolveMongoUri } = await import("./lib/mongoUri.mjs");

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
		await col.updateOne({ slug: doc.slug }, { $set: doc, $setOnInsert: { createdAt: now } }, { upsert: true });
	}
	console.log(`Seeded ${P.length} prefix-sum problems.`);
} finally {
	await client.close();
}
