// Seed the counting/hashing problems used by the Algorithm course's
// "딕셔너리로 세기" chapter. Expected outputs come from the reference `solve`,
// so test cases are correct by construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-counting-problems.mjs            seed
//   node scripts/seed-counting-problems.mjs --print    preview without touching the DB

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

const STARTERS = {
	line: {
		python: "s = input().strip()\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const s = require('fs').readFileSync(0, 'utf8').split('\\n')[0].trim();\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar s string\n\tfmt.Scan(&s)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	twoLines: {
		python: "a = input().strip()\nb = input().strip()\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst a = lines[0].trim();\nconst b = lines[1].trim();\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.nextLine().trim();\n        String b = sc.nextLine().trim();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar a, b string\n\tfmt.Scan(&a)\n\tfmt.Scan(&b)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	intArray: {
		python: "n = int(input())\narr = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0]);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n int\n\tfmt.Scan(&n)\n\tarr := make([]int, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	ntArray: {
		python: "n, target = map(int, input().split())\narr = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, target] = lines[0].trim().split(/\\s+/).map(Number);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n, target;\n    cin >> n >> target;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, target int\n\tfmt.Scan(&n, &target)\n\tarr := make([]int, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

const counter = (items) => {
	const m = new Map();
	for (const it of items) m.set(it, (m.get(it) ?? 0) + 1);
	return m;
};
const nums = (line) => line.trim().split(/\s+/).map(Number);

const P = [
	{
		slug: "s-char-count",
		title: "글자 세기",
		shape: "line",
		visible: 2,
		description:
			"# 글자 세기\n\n영어 소문자로 이루어진 문자열이 한 줄 주어집니다.\n\n각 글자가 몇 번 나왔는지 **사전순으로** 한 줄에 하나씩 출력하세요.\n글자와 횟수는 공백 하나로 구분합니다.\n\n한 번도 나오지 않은 글자는 출력하지 않습니다.",
		inputs: ["banana", "aab", "z", "mississippi"],
		solve: (s) =>
			[...counter(s.trim().split(""))]
				.sort((a, b) => (a[0] < b[0] ? -1 : 1))
				.map(([c, n]) => `${c} ${n}`)
				.join("\n"),
	},
	{
		slug: "s-most-frequent",
		title: "가장 많이 나온 글자",
		shape: "line",
		visible: 2,
		description:
			"# 가장 많이 나온 글자\n\n영어 소문자로 이루어진 문자열이 한 줄 주어집니다.\n\n**가장 많이 나온 글자**를 출력하세요.\n가장 많이 나온 글자가 여러 개라면 그중 **사전순으로 앞선 글자**를 출력합니다.",
		// "bbaa" 는 동점 처리를 실제로 가르는 케이스다. 다른 입력들은 사전순으로
		// 앞선 글자가 마침 먼저 등장해서, 등장 순서를 따르는 풀이도 우연히 맞는다.
		inputs: ["banana", "abab", "z", "mississippi", "bbaa"],
		solve: (s) => {
			const m = counter(s.trim().split(""));
			let best = null;
			for (const [c, n] of m) {
				if (best === null || n > best[1] || (n === best[1] && c < best[0])) best = [c, n];
			}
			return best[0];
		},
	},
	{
		slug: "s-first-duplicate",
		title: "처음 중복되는 수",
		shape: "intArray",
		visible: 2,
		// 주어지는 수를 1 이상으로 못박아 둔다. 음수를 허용하면 답이 -1 인 경우와
		// "중복 없음"을 뜻하는 -1 이 구분되지 않아 문제가 성립하지 않는다.
		description:
			"# 처음 중복되는 수\n\n첫 줄에 개수 `n`, 둘째 줄에 `n`개의 정수가 주어집니다.\n주어지는 수는 모두 **1 이상**입니다.\n\n앞에서부터 읽어나갈 때 **이미 나온 적 있는 수가 처음으로 다시 나오는 순간**,\n그 수를 출력하세요.\n\n중복이 하나도 없으면 `-1` 을 출력합니다.",
		inputs: ["5\n3 1 4 1 5", "4\n1 2 3 4", "6\n7 7 2 2 9 9", "5\n2 9 4 9 2"],
		solve: (s) => {
			const seen = new Set();
			for (const x of nums(s.split("\n")[1])) {
				if (seen.has(x)) return String(x);
				seen.add(x);
			}
			return "-1";
		},
	},
	{
		slug: "s-anagram",
		title: "애너그램 판별",
		shape: "twoLines",
		visible: 2,
		description:
			"# 애너그램 판별\n\n영어 소문자로 이루어진 문자열이 두 줄에 걸쳐 주어집니다.\n\n두 문자열이 **글자를 재배열해서 서로 만들 수 있는 관계**라면 `YES`,\n아니면 `NO` 를 출력하세요.\n\n예를 들어 `listen` 과 `silent` 는 같은 글자를 같은 개수만큼 쓰므로 `YES` 입니다.",
		inputs: ["listen\nsilent", "hello\nworld", "aab\naba", "abc\nabcc"],
		solve: (s) => {
			const [a, b] = s.split("\n").map((x) => x.trim());
			const norm = (x) => x.split("").sort().join("");
			return norm(a) === norm(b) ? "YES" : "NO";
		},
	},
	{
		slug: "s-pair-sum",
		title: "합이 목표값인 두 수",
		shape: "ntArray",
		visible: 2,
		description:
			"# 합이 목표값인 두 수\n\n첫 줄에 개수 `n`과 목표값 `target` 이 공백으로 구분되어 주어지고,\n둘째 줄에 `n`개의 정수가 주어집니다.\n\n**서로 다른 두 자리**의 수를 골라 더했을 때 `target` 이 되는 경우가 있으면 `YES`,\n없으면 `NO` 를 출력하세요.\n\n같은 값이 두 번 나온다면 서로 다른 자리이므로 둘을 골라 더할 수 있습니다.",
		// "3 8 / 4 1 2" 가 핵심 케이스다. 4 는 한 번만 나오므로 4+4 는 만들 수 없어
		// 답은 NO 인데, 같은 자리를 두 번 세는 풀이는 YES 라고 답한다.
		inputs: [
			"5 9\n3 1 4 1 5",
			"4 100\n1 2 3 4",
			"2 6\n3 3",
			"3 0\n-5 5 1",
			"3 8\n4 1 2",
		],
		solve: (s) => {
			const [, target] = nums(s.split("\n")[0]);
			const seen = new Set();
			for (const x of nums(s.split("\n")[1])) {
				if (seen.has(target - x)) return "YES";
				seen.add(x);
			}
			return "NO";
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
			console.log(
				`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(tc.stdin)} -> ${JSON.stringify(tc.expectedOutput)}`
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
	console.log(`Seeded ${P.length} counting problems.`);
} finally {
	await client.close();
}
