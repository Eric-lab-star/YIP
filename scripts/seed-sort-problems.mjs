// Seed the sorting problems used by the Algorithm course's 정렬 chapter.
// Expected outputs come from the reference `solve` below, so the test cases are
// correct by construction. Upserts by slug, so it is safe to re-run.
//
//   node scripts/seed-sort-problems.mjs            seed
//   node scripts/seed-sort-problems.mjs --print    preview without touching the DB
//
// These are the first `medium` problems in the set; everything seeded before
// this is `easy`.

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

// Input shapes. Starter code only reads the input; the logic is the exercise.
const STARTERS = {
	intArray: {
		python: "n = int(input())\narr = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0]);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n int\n\tfmt.Scan(&n)\n\tarr := make([]int, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	nkArray: {
		python: "n, k = map(int, input().split())\narr = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, k] = lines[0].trim().split(/\\s+/).map(Number);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, k int\n\tfmt.Scan(&n, &k)\n\tarr := make([]int, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	strArray: {
		python: "n = int(input())\nwords = [input().strip() for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst n = Number(lines[0]);\nconst words = lines.slice(1, n + 1).map(s => s.trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> words(n);\n    for (int i = 0; i < n; i++) cin >> words[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine().trim());\n        String[] words = new String[n];\n        for (int i = 0; i < n; i++) words[i] = sc.nextLine().trim();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n int\n\tfmt.Scan(&n)\n\twords := make([]string, n)\n\tfor i := range words {\n\t\tfmt.Scan(&words[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

const nums = (line) => line.trim().split(/\s+/).map(Number);
const asc = (a, b) => a - b;

const P = [
	{
		slug: "s-sort-asc",
		title: "오름차순 정렬",
		shape: "intArray",
		visible: 2,
		description:
			"# 오름차순 정렬\n\n첫 줄에 개수 `n`, 둘째 줄에 `n`개의 정수가 주어집니다.\n정수들을 **작은 것부터 큰 순서로** 정렬해 한 줄에 공백으로 구분해 출력하세요.",
		inputs: ["5\n3 1 4 1 5", "3\n-2 7 0", "1\n42", "8\n9 8 7 6 5 4 3 2"],
		solve: (s) => nums(s.split("\n")[1]).sort(asc).join(" "),
	},
	{
		slug: "s-second-largest",
		title: "두 번째로 큰 수",
		shape: "intArray",
		visible: 2,
		description:
			"# 두 번째로 큰 수\n\n첫 줄에 개수 `n`, 둘째 줄에 `n`개의 정수가 주어집니다.\n**서로 다른 값 중에서 두 번째로 큰 값**을 출력하세요.\n\n같은 값이 여러 번 나와도 하나로 셉니다.\n예를 들어 `5 5 3` 에서 가장 큰 값은 5, 두 번째로 큰 값은 3입니다.\n\n서로 다른 값이 항상 2개 이상 주어집니다.",
		inputs: ["5\n3 1 4 1 5", "3\n5 5 3", "2\n-1 -9", "6\n7 7 7 2 9 9"],
		solve: (s) => {
			const uniq = [...new Set(nums(s.split("\n")[1]))].sort(asc);
			return String(uniq[uniq.length - 2]);
		},
	},
	{
		slug: "s-top-k",
		title: "상위 k개",
		shape: "nkArray",
		visible: 2,
		description:
			"# 상위 k개\n\n첫 줄에 개수 `n`과 `k`가 공백으로 구분되어 주어지고,\n둘째 줄에 `n`개의 정수가 주어집니다.\n\n**큰 값부터 순서대로 `k`개**를 한 줄에 공백으로 구분해 출력하세요.\n\n같은 값이 여러 번 나오면 나온 만큼 모두 셉니다.",
		inputs: ["5 3\n3 1 4 1 5", "4 2\n7 7 1 2", "3 3\n-5 0 5", "6 1\n2 8 8 1 9 3"],
		solve: (s) => {
			const [, k] = nums(s.split("\n")[0]);
			return nums(s.split("\n")[1])
				.sort((a, b) => b - a)
				.slice(0, k)
				.join(" ");
		},
	},
	{
		slug: "s-median",
		title: "중앙값",
		shape: "intArray",
		visible: 2,
		description:
			"# 중앙값\n\n첫 줄에 개수 `n`, 둘째 줄에 `n`개의 정수가 주어집니다.\n정렬했을 때 **정확히 가운데 오는 값**을 출력하세요.\n\n`n`은 항상 홀수입니다.",
		inputs: ["5\n3 1 4 1 5", "3\n10 -2 7", "1\n8", "7\n5 5 5 1 9 2 8"],
		solve: (s) => {
			const arr = nums(s.split("\n")[1]).sort(asc);
			return String(arr[Math.floor(arr.length / 2)]);
		},
	},
	{
		slug: "s-sort-by-length",
		title: "길이순 정렬",
		shape: "strArray",
		visible: 2,
		description:
			"# 길이순 정렬\n\n첫 줄에 개수 `n`, 이어서 `n`개의 줄에 걸쳐 단어가 하나씩 주어집니다.\n\n단어들을 **길이가 짧은 것부터** 정렬해 한 줄에 하나씩 출력하세요.\n길이가 같다면 **사전순(알파벳 순)** 으로 출력합니다.",
		inputs: [
			"4\nbanana\nkiwi\nfig\napple",
			"3\nbb\naa\ncc",
			"1\nsolo",
			"5\ndd\na\nccc\nbb\nab",
		],
		solve: (s) => {
			const lines = s.split("\n");
			const words = lines.slice(1, Number(lines[0]) + 1).map((w) => w.trim());
			words.sort((a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0));
			return words.join("\n");
		},
	},
];

/** Append the 예시 block, built from the first test case so they cannot drift. */
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
	console.log(`Seeded ${P.length} sorting problems.`);
} finally {
	await client.close();
}
