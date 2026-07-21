// Seed the 트라이 problems for the Algorithm course's 21st chapter.
// Expected outputs come from the reference `solve`. Upserts by slug; safe to re-run.
//
//   node scripts/seed-trie-problems.mjs [--print|--json]
//
// A trie is a tree of characters with shared prefixes. Five problems: count
// words with a given prefix, exact-word membership (same trie, the end marker is
// what differs), whether any word is a prefix of another (phone list), the
// number of distinct prefixes (trie node count), and the longest dictionary word
// that is a prefix of a query.

const LANGS = ["python", "javascript", "cpp", "java", "go"];
const STDOUT_CAP = 1_048_576;
const STDIN_CAP = 90_000;

const STARTERS = {
	// 첫 줄 n q, n개의 단어, 이어서 q개의 질의 — 1,2,5번.
	dictQueries: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn, q = map(int, input().split())\nwords = [input().strip() for _ in range(n)]\nqueries = [input().strip() for _ in range(q)]\n\n# 트라이는 중첩 딕셔너리로 만들면 편하다냥\nroot = {}\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, q] = data[0].trim().split(/\\s+/).map(Number);\nconst words = [];\nfor (let i = 1; i <= n; i++) words.push(data[i].trim());\nconst queries = [];\nfor (let i = 1; i <= q; i++) queries.push(data[n + i].trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, q; cin >> n >> q;\n    vector<string> words(n);\n    for (auto& w : words) cin >> w;\n    vector<string> queries(q);\n    for (auto& s : queries) cin >> s;\n\n    // map<char,int> 배열이나 unordered_map 으로 트라이를 만드세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        int n = Integer.parseInt(st.nextToken()), q = Integer.parseInt(st.nextToken());\n        String[] words = new String[n];\n        for (int i = 0; i < n; i++) words[i] = br.readLine().trim();\n        String[] queries = new String[q];\n        for (int i = 0; i < q; i++) queries[i] = br.readLine().trim();\n\n        // HashMap 으로 트라이를 만드세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n, q int\n\tfmt.Fscan(reader, &n, &q)\n\twords := make([]string, n)\n\tfor i := range words {\n\t\tfmt.Fscan(reader, &words[i])\n\t}\n\tqueries := make([]string, q)\n\tfor i := range queries {\n\t\tfmt.Fscan(reader, &queries[i])\n\t}\n\n\t// map 으로 트라이를 만드세요\n\t_ = queries\n}\n',
	},
	// 첫 줄 n, 이어서 n개의 단어 — 3,4번.
	words: {
		python:
			"import sys\ninput = sys.stdin.readline\n\nn = int(input())\nwords = [input().strip() for _ in range(n)]\n\nroot = {}\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const data = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(data[0].trim());\nconst words = [];\nfor (let i = 1; i <= n; i++) words.push(data[i].trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n; cin >> n;\n    vector<string> words(n);\n    for (auto& w : words) cin >> w;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        String[] words = new String[n];\n        for (int i = 0; i < n; i++) words[i] = br.readLine().trim();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReaderSize(os.Stdin, 1<<20)\n\tvar n int\n\tfmt.Fscan(reader, &n)\n\twords := make([]string, n)\n\tfor i := range words {\n\t\tfmt.Fscan(reader, &words[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

function lcg(seed) { let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }

const END = "$";

/** Insert word into a nested-object trie; each node counts words passing through. */
function insert(root, w, countKey) {
	let node = root;
	for (const ch of w) {
		if (!node[ch]) node[ch] = {};
		node = node[ch];
		if (countKey) node[countKey] = (node[countKey] || 0) + 1;
	}
	node[END] = true;
}

/** Random lowercase words. */
function randomWords(n, maxLen, seed) {
	const rnd = lcg(seed);
	const abc = "abcde"; // 작은 알파벳으로 접두사 공유가 잦게
	const out = [];
	for (let i = 0; i < n; i++) {
		const len = 1 + Math.floor(rnd() * maxLen);
		let w = "";
		for (let j = 0; j < len; j++) w += abc[Math.floor(rnd() * abc.length)];
		out.push(w);
	}
	return out;
}

const P = [
	{
		slug: "s-trie-count-prefix",
		title: "이 접두사로 시작하는 단어",
		shape: "dictQueries",
		visible: 2,
		description:
			"# 이 접두사로 시작하는 단어\n\n첫 줄에 단어의 수 `n` 과 질의의 수 `q` (각각 1 이상 20000 이하) 가 주어집니다.\n이어서 `n`개의 줄에 사전에 넣을 단어가, 그다음 `q`개의 줄에 접두사 질의가 주어집니다.\n모든 문자열은 알파벳 소문자이고 길이는 1 이상 20 이하입니다. 같은 단어가 여러 번 들어올 수 있습니다.\n\n각 질의마다 그 **접두사로 시작하는 단어가 사전에 몇 개**인지 한 줄에 하나씩 출력하세요.",
		// 트라이의 각 노드에 '이 노드를 지나간 단어 수' 를 세어두면, 접두사
		// 질의는 그 접두사 끝 노드의 카운트를 읽는 것뿐이다.
		inputs: [
			"4 3\napple\napp\napricot\nbanana\napp\napp\nban",
			"1 1\nhi\nhello",
			"5 4\ncat\ncar\ncard\ndog\ndot\ncar\nca\nc\nd",
			(() => {
				const words = randomWords(5000, 10, 20262101);
				const rnd = lcg(20262111);
				const qs = [];
				for (let i = 0; i < 5000; i++) { const len = 1 + Math.floor(rnd() * 4); let w = ""; const abc = "abcde"; for (let j = 0; j < len; j++) w += abc[Math.floor(rnd() * 5)]; qs.push(w); }
				return `5000 5000\n${words.join("\n")}\n${qs.join("\n")}`;
			})(),
			"2 2\nab\nab\nab\na",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, q] = data[0].trim().split(/\s+/).map(Number);
			const root = {};
			for (let i = 1; i <= n; i++) insert(root, data[i].trim(), "#");
			const out = [];
			for (let i = 1; i <= q; i++) {
				const pre = data[n + i].trim();
				let node = root, ok = true;
				for (const ch of pre) { if (!node[ch]) { ok = false; break; } node = node[ch]; }
				out.push(ok ? (node["#"] || 0) : 0);
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-trie-word-exists",
		title: "이 단어가 사전에 있나",
		shape: "dictQueries",
		visible: 2,
		description:
			"# 이 단어가 사전에 있나\n\n첫 줄에 단어의 수 `n` 과 질의의 수 `q` (각각 1 이상 20000 이하) 가 주어집니다.\n이어서 `n`개의 줄에 사전 단어가, 그다음 `q`개의 줄에 질의 단어가 주어집니다.\n모든 문자열은 알파벳 소문자이고 길이는 1 이상 20 이하입니다.\n\n각 질의 단어가 사전에 **정확히 그 단어로** 있으면 `1`, 없으면 `0` 을 한 줄에 하나씩 출력하세요.\n(접두사로만 존재하는 것은 없는 것으로 봅니다.)",
		// 1번과 같은 트라이인데, 접두사가 아니라 '끝 표시'가 있어야 존재로 친다.
		// 끝 표시를 확인하지 않으면 접두사를 단어로 착각한다.
		inputs: [
			"4 4\napple\napp\napricot\nbanana\napp\napple\nappl\nbanana",
			"1 2\nhi\nhi\nhello",
			"3 3\ncat\ncar\ncard\ncar\nca\ncard",
			(() => {
				const words = randomWords(5000, 10, 20262102);
				const rnd = lcg(20262112);
				const qs = [];
				for (let i = 0; i < 5000; i++) { if (rnd() < 0.5 && words.length) { qs.push(words[Math.floor(rnd() * words.length)]); } else { const len = 1 + Math.floor(rnd() * 8); let w = ""; const abc = "abcde"; for (let j = 0; j < len; j++) w += abc[Math.floor(rnd() * 5)]; qs.push(w); } }
				return `5000 5000\n${words.join("\n")}\n${qs.join("\n")}`;
			})(),
			"2 2\nab\nabc\nab\na",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, q] = data[0].trim().split(/\s+/).map(Number);
			const root = {};
			for (let i = 1; i <= n; i++) insert(root, data[i].trim());
			const out = [];
			for (let i = 1; i <= q; i++) {
				const w = data[n + i].trim();
				let node = root, ok = true;
				for (const ch of w) { if (!node[ch]) { ok = false; break; } node = node[ch]; }
				out.push(ok && node[END] ? 1 : 0);
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-phone-list",
		title: "전화번호 목록",
		shape: "words",
		visible: 2,
		description:
			"# 전화번호 목록\n\n첫 줄에 전화번호의 수 `n` (1 이상 10000 이하) 이 주어집니다.\n이어서 `n`개의 줄에 전화번호가 주어집니다. 각 번호는 숫자로 이루어지고 길이는 1 이상 10 이하이며, 서로 다릅니다.\n\n어떤 번호가 **다른 번호의 접두사**가 되면 이 목록은 일관성이 없습니다.\n예를 들어 `911` 과 `9112` 가 함께 있으면 911 로 걸다가 9112 로 연결될 수 없습니다.\n\n목록이 일관성이 있으면 `YES`, 없으면 `NO` 를 출력하세요.",
		// 트라이에 넣으면서, 넣는 도중 이미 끝난 단어를 지나치거나(짧은 게 접두사)
		// 다 넣은 노드에 이미 자식이 있으면(내가 접두사) 일관성이 없다.
		inputs: [
			"3\n911\n97625999\n91125426",
			"5\n113\n12340\n123440\n12345\n98346",
			"2\n12\n123",
			(() => {
				const rnd = lcg(20262103);
				const seen = new Set();
				const words = [];
				while (words.length < 8000) { const len = 3 + Math.floor(rnd() * 8); let w = ""; for (let j = 0; j < len; j++) w += String(Math.floor(rnd() * 10)); if (!seen.has(w)) { seen.add(w); words.push(w); } }
				return `${words.length}\n${words.join("\n")}`;
			})(),
			"3\n1\n2\n3",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const n = Number(data[0]);
			const root = {};
			let consistent = true;
			for (let i = 1; i <= n; i++) {
				const w = data[i].trim();
				let node = root, conflict = false;
				for (const ch of w) {
					if (node[END]) conflict = true;        // 더 짧은 번호가 접두사
					if (!node[ch]) node[ch] = {};
					node = node[ch];
				}
				if (Object.keys(node).length > 0) conflict = true;  // 내가 접두사
				node[END] = true;
				if (conflict) consistent = false;
			}
			return consistent ? "YES" : "NO";
		},
	},
	{
		slug: "s-count-prefixes",
		title: "서로 다른 접두사의 수",
		shape: "words",
		visible: 2,
		description:
			"# 서로 다른 접두사의 수\n\n첫 줄에 단어의 수 `n` (1 이상 20000 이하) 이 주어집니다.\n이어서 `n`개의 줄에 단어가 주어집니다. 알파벳 소문자, 길이 1 이상 20 이하입니다. 같은 단어가 여러 번 들어올 수 있습니다.\n\n모든 단어의 **비어 있지 않은 접두사**를 모았을 때, **서로 다른 접두사가 몇 개**인지 출력하세요.\n예를 들어 단어가 `ab`, `abc` 면 접두사는 `a`, `ab`, `abc` 로 3개입니다.",
		// 서로 다른 접두사의 수 = 트라이의 노드 수(루트 제외). 새 노드를 만들 때마다
		// 세면 된다.
		inputs: [
			"2\nab\nabc",
			"1\nhello",
			"3\ncat\ncar\ndog",
			(() => { const words = randomWords(10000, 8, 20262104); return `${words.length}\n${words.join("\n")}`; })(),
			"3\na\na\na",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const n = Number(data[0]);
			const root = {};
			let nodes = 0;
			for (let i = 1; i <= n; i++) {
				let node = root;
				for (const ch of data[i].trim()) {
					if (!node[ch]) { node[ch] = {}; nodes++; }
					node = node[ch];
				}
			}
			return String(nodes);
		},
	},
	{
		slug: "s-longest-match",
		title: "가장 긴 사전 접두사",
		shape: "dictQueries",
		visible: 2,
		description:
			"# 가장 긴 사전 접두사\n\n첫 줄에 사전 단어의 수 `n` 과 질의의 수 `q` (각각 1 이상 20000 이하) 가 주어집니다.\n이어서 `n`개의 줄에 사전 단어가, 그다음 `q`개의 줄에 질의 문자열이 주어집니다.\n모든 문자열은 알파벳 소문자, 길이 1 이상 20 이하입니다.\n\n각 질의마다, **사전 단어 중 그 질의의 접두사가 되는 것 중 가장 긴 것**의 길이를 출력하세요.\n(질의 자신과 완전히 같은 사전 단어도 접두사로 봅니다.) 그런 단어가 없으면 `0` 을 출력합니다.",
		// 질의 문자를 따라 트라이를 내려가며, 끝 표시가 있는 가장 깊은 지점의
		// 깊이가 답이다.
		inputs: [
			"3 3\ncat\ncar\nca\ncat\ncarpet\ncab",
			"1 1\nab\nabc",
			"4 3\na\nab\nabc\nabcd\nabcz\nx\nabcd",
			(() => {
				const words = randomWords(5000, 8, 20262105);
				const rnd = lcg(20262115);
				const qs = [];
				for (let i = 0; i < 5000; i++) { const len = 1 + Math.floor(rnd() * 12); let w = ""; const abc = "abcde"; for (let j = 0; j < len; j++) w += abc[Math.floor(rnd() * 5)]; qs.push(w); }
				return `5000 5000\n${words.join("\n")}\n${qs.join("\n")}`;
			})(),
			"2 1\nxyz\nqq\nxy",
		],
		solve: (s) => {
			const data = s.trim().split("\n");
			const [n, q] = data[0].trim().split(/\s+/).map(Number);
			const root = {};
			for (let i = 1; i <= n; i++) insert(root, data[i].trim());
			const out = [];
			for (let i = 1; i <= q; i++) {
				const w = data[n + i].trim();
				let node = root, depth = 0, best = 0;
				for (const ch of w) {
					if (!node[ch]) break;
					node = node[ch];
					depth++;
					if (node[END]) best = depth;
				}
				out.push(best);
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
	console.log(`Seeded ${P.length} trie problems.`);
} finally { await client.close(); }
