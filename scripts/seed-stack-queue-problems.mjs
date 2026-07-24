// Seed the 스택과 큐 problems used by the Algorithm course's 9th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-stack-queue-problems.mjs            seed
//   node scripts/seed-stack-queue-problems.mjs --print    preview without the DB
//
// The five problems go: stack as a matcher (one bracket kind, then three), stack
// as a calculator, queue as a rotation, and finally the monotonic stack — whose
// large hidden case is what forces the O(n) solution rather than the obvious
// O(n^2) scan.

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

// Piston kills (does not truncate) a submission that overruns its per-stream
// stdio cap — see piston/docker-compose.yml (PISTON_OUTPUT_MAX_SIZE, 1 MB).
const STDOUT_CAP = 1_048_576;

// Piston's API mounts body_parser.json() with no limit, so Express's 100 KB
// default applies to the whole request — and the submitted source code shares
// that budget with the test case's stdin. Measured: 102,240 bytes of stdin is
// the last that succeeds, 102,241 returns 400 PayloadTooLargeError. It is not
// configurable, so cap stdin well below it to leave room for a long solution.
// Exceeding it makes the problem unsolvable for everyone, exactly like the
// output cap does.
const STDIN_CAP = 90_000;

const STARTERS = {
	line: {
		python: "s = input().strip()\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const s = require('fs').readFileSync(0, 'utf8').split('\\n')[0].trim();\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar s string\n\tfmt.Scan(&s)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	tokens: {
		python: "tokens = input().split()\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const tokens = require('fs').readFileSync(0, 'utf8').split('\\n')[0].trim().split(/\\s+/);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    vector<string> tokens;\n    string t;\n    while (cin >> t) tokens.push_back(t);\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<String> tokens = new ArrayList<>();\n        while (sc.hasNext()) tokens.add(sc.next());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar tokens []string\n\tvar t string\n\tfor {\n\t\tif _, err := fmt.Scan(&t); err != nil {\n\t\t\tbreak\n\t\t}\n\t\ttokens = append(tokens, t)\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	twoInts: {
		python: "n, k = map(int, input().split())\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const [n, k] = require('fs').readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, k int\n\tfmt.Scan(&n, &k)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	intArray: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\narr = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0]);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\tarr := make([]int, n)\n\tfor i := range arr {\n\t\tfmt.Fscan(reader, &arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

/**
 * Deterministic pseudo-random sequence (LCG) so the large case is reproducible
 * and reviewable — no Math.random in seeded data.
 */
function lcg(seed) {
	let s = seed >>> 0;
	return () => {
		s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
		return s;
	};
}

/**
 * A mostly-decreasing sequence: the worst case for the naive 오큰수 scan, since
 * almost every element has to look all the way to the end before giving up.
 */
function decreasingCase(n, seed) {
	const rnd = lcg(seed);
	const a = [];
	for (let i = 0; i < n; i++) a.push(n - i + (rnd() % 5));
	return `${n}\n${a.join(" ")}`;
}

const P = [
	{
		slug: "s-bracket-match",
		title: "괄호 검사",
		shape: "line",
		visible: 2,
		description:
			"# 괄호 검사\n\n`(` 와 `)` 로만 이루어진 문자열이 한 줄로 주어집니다. 길이는 1 이상 100000 이하입니다.\n\n올바른 괄호 문자열이면 `YES`, 아니면 `NO` 를 출력하세요.\n\n올바른 괄호 문자열이란 모든 여는 괄호가 자기 짝인 닫는 괄호와 하나씩 짝지어지고,\n짝이 서로 엇갈리지 않는 것을 말합니다.",
		// ')(' 가 핵심 반례다. 개수만 세면 통과해버리므로 여는 괄호가 남았는지와
		// 닫을 게 없는데 닫았는지를 둘 다 봐야 한다.
		inputs: ["(())", ")(", "()()", "(()", "((()))()"],
		solve: (s) => {
			const str = s.trim();
			let depth = 0;
			for (const ch of str) {
				if (ch === "(") depth++;
				else {
					depth--;
					if (depth < 0) return "NO";
				}
			}
			return depth === 0 ? "YES" : "NO";
		},
	},
	{
		slug: "s-bracket-multi",
		title: "여러 종류의 괄호 검사",
		shape: "line",
		visible: 2,
		description:
			"# 여러 종류의 괄호 검사\n\n`(`, `)`, `[`, `]`, `{`, `}` 로 이루어진 문자열이 한 줄로 주어집니다.\n길이는 1 이상 100000 이하입니다.\n\n올바른 괄호 문자열이면 `YES`, 아니면 `NO` 를 출력하세요.\n\n여는 괄호는 **같은 종류의** 닫는 괄호와 짝지어져야 하고, 서로 엇갈리면 안 됩니다.\n예를 들어 `([)]` 는 엇갈렸으므로 올바르지 않습니다.",
		// 개수만 세는 풀이는 여기서 완전히 무너진다. 스택 맨 위와 종류를 대조해야만
		// '([)]' 를 걸러낼 수 있다.
		inputs: ["([]{})", "([)]", "{[()]}", "(]", "{{[[(())]]}}"],
		solve: (s) => {
			const str = s.trim();
			const pair = { ")": "(", "]": "[", "}": "{" };
			const st = [];
			for (const ch of str) {
				if (ch === "(" || ch === "[" || ch === "{") st.push(ch);
				else {
					if (st.length === 0 || st[st.length - 1] !== pair[ch]) return "NO";
					st.pop();
				}
			}
			return st.length === 0 ? "YES" : "NO";
		},
	},
	{
		slug: "s-postfix-eval",
		title: "후위 표기식 계산",
		shape: "tokens",
		visible: 2,
		description:
			"# 후위 표기식 계산\n\n후위 표기식이 공백으로 구분되어 한 줄로 주어집니다.\n토큰은 정수이거나 연산자 `+`, `-`, `*` 중 하나입니다.\n\n식의 값을 출력하세요.\n\n후위 표기식은 연산자가 피연산자 **뒤**에 오는 표기법입니다.\n예를 들어 `3 4 +` 는 `3 + 4` 를 뜻하고, `3 4 + 2 *` 는 `(3 + 4) * 2` 를 뜻합니다.\n\n중간 계산 결과와 최종 결과는 `-10^18` 이상 `10^18` 이하입니다.",
		// 빼기에서 순서가 뒤집히는 게 이 문제의 함정이다. 나중에 꺼낸 값이
		// 왼쪽 피연산자라서 b - a 가 아니라 a - b 여야 한다.
		inputs: [
			"3 4 +",
			"3 4 + 2 *",
			"5 1 2 + 4 * + 3 -",
			"10 3 -",
			"2 3 4 * + 5 6 + * 7 -",
		],
		solve: (s) => {
			const st = [];
			for (const t of s.trim().split(/\s+/)) {
				if (t === "+" || t === "-" || t === "*") {
					const b = st.pop();
					const a = st.pop();
					st.push(t === "+" ? a + b : t === "-" ? a - b : a * b);
				} else {
					st.push(BigInt(t));
				}
			}
			return String(st[st.length - 1]);
		},
	},
	{
		slug: "s-josephus",
		title: "요세푸스 순열",
		shape: "twoInts",
		visible: 2,
		description:
			"# 요세푸스 순열\n\n`1`번부터 `n`번까지의 사람이 원을 이루어 앉아 있습니다.\n첫 줄에 `n` 과 `k` (1 이상 5000 이하) 가 주어집니다.\n\n1번부터 시작해 `k`번째 사람을 차례로 제거합니다.\n제거된 사람은 원에서 빠지고, 그다음 사람부터 다시 세기 시작합니다.\n\n제거되는 순서대로 번호를 한 줄에 공백으로 구분해 출력하세요.",
		// 큐를 k-1 번 회전시킨 뒤 하나 꺼내는 것으로 풀리는 게 요령이다.
		// 마지막 케이스가 자료구조 선택을 강제한다 — 측정값(판정기 실측):
		// deque.popleft/append 1601ms, deque.rotate 27ms, list.pop(0) 시간 초과.
		// 4000 으로 잡은 건 5000 이면 정답 풀이도 2.5초라 여유가 없기 때문이다.
		inputs: ["7 3", "1 1", "5 2", "6 1", "10 4", "4000 4000"],
		solve: (s) => {
			const [n, k] = s.trim().split(/\s+/).map(Number);
			const q = [];
			for (let i = 1; i <= n; i++) q.push(i);
			const out = [];
			let idx = 0;
			while (q.length) {
				idx = (idx + k - 1) % q.length;
				out.push(q[idx]);
				q.splice(idx, 1);
			}
			return out.join(" ");
		},
	},
	{
		slug: "s-next-greater",
		title: "오큰수",
		shape: "intArray",
		visible: 2,
		description:
			"# 오큰수\n\n첫 줄에 수열의 길이 `n` (1 이상 100000 이하) 이 주어집니다.\n둘째 줄에 수열의 원소 `n`개가 공백으로 구분되어 주어집니다. 각 원소는 1 이상 1000000 이하입니다.\n\n각 원소에 대해 **오른쪽에 있으면서 자기보다 큰 수 중 가장 왼쪽에 있는 수**를 출력하세요.\n그런 수가 없으면 `-1` 을 출력합니다.\n\n답 `n`개를 한 줄에 공백으로 구분해 출력하세요.",
		// 오른쪽으로 하나씩 훑는 풀이는 O(n^2) 이라 큰 입력에서 시간 초과가 난다.
		// 아직 답을 못 찾은 인덱스를 스택에 쌓아두면 한 번의 순회로 끝난다.
		inputs: [
			"4\n3 5 2 7",
			"4\n9 5 4 8",
			"1\n1",
			"8\n1 2 3 4 5 6 7 8",
			// n 은 요청 본문 상한(STDIN_CAP)에 맞춰 정했다. 이 크기에서도 오른쪽으로
			// 하나씩 훑는 O(n^2) 풀이는 시간 초과가 나고 스택 풀이는 여유롭게 통과한다.
			decreasingCase(12000, 20260721),
		],
		solve: (s) => {
			const lines = s.trim().split("\n");
			const n = Number(lines[0].trim());
			const arr = lines[1].trim().split(/\s+/).map(Number);
			const ans = new Array(n).fill(-1);
			const st = [];
			for (let i = 0; i < n; i++) {
				while (st.length && arr[st[st.length - 1]] < arr[i]) {
					ans[st.pop()] = arr[i];
				}
				st.push(i);
			}
			return ans.join(" ");
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
				`${p.slug} case ${i}: 기대 출력 ${tc.expectedOutput.length}바이트 > 샌드박스 출력 상한 ${STDOUT_CAP}바이트`
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
			const inn = tc.stdin.length > 60 ? tc.stdin.slice(0, 40) + `... (${tc.stdin.length}자)` : tc.stdin;
			const out = tc.expectedOutput;
			const shown = out.length > 90 ? out.slice(0, 60) + `... (${out.length}자)` : out;
			console.log(
				`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(inn)} -> ${JSON.stringify(shown)}`
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
	console.log(`Seeded ${P.length} stack/queue problems.`);
} finally {
	await client.close();
}
