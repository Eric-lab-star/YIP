// Seed the binary-search problems used by the Algorithm course's 이분 탐색
// chapter. Expected outputs come from the reference `solve`, so test cases are
// correct by construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-binsearch-problems.mjs            seed
//   node scripts/seed-binsearch-problems.mjs --print    preview without the DB

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

const STARTERS = {
	nTargetSorted: {
		python: "n, target = map(int, input().split())\narr = list(map(int, input().split()))\n\n# arr 은 이미 오름차순으로 정렬되어 있습니다\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, target] = lines[0].trim().split(/\\s+/).map(Number);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n, target;\n    cin >> n >> target;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, target int\n\tfmt.Scan(&n, &target)\n\tarr := make([]int, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	nRangeSorted: {
		python: "n, a, b = map(int, input().split())\narr = list(map(int, input().split()))\n\n# arr 은 이미 오름차순으로 정렬되어 있습니다\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, a, b] = lines[0].trim().split(/\\s+/).map(Number);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n, a, b;\n    cin >> n >> a >> b;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, a, b int\n\tfmt.Scan(&n, &a, &b)\n\tarr := make([]int, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	singleInt: {
		python: "n = int(input())\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const n = Number(require('fs').readFileSync(0, 'utf8').trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextLong();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n int64\n\tfmt.Scan(&n)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	nkArray: {
		python: "n, k = map(int, input().split())\narr = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, k] = lines[0].trim().split(/\\s+/).map(Number);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n, k;\n    cin >> n >> k;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] arr = new long[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, k int\n\tfmt.Scan(&n, &k)\n\tarr := make([]int64, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

const nums = (line) => line.trim().split(/\s+/).map(Number);
const lowerBound = (arr, x) => {
	let lo = 0,
		hi = arr.length;
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		if (arr[mid] < x) lo = mid + 1;
		else hi = mid;
	}
	return lo;
};
const upperBound = (arr, x) => {
	let lo = 0,
		hi = arr.length;
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		if (arr[mid] <= x) lo = mid + 1;
		else hi = mid;
	}
	return lo;
};

const P = [
	{
		slug: "s-binary-search",
		title: "정렬된 배열에서 찾기",
		shape: "nTargetSorted",
		visible: 2,
		description:
			"# 정렬된 배열에서 찾기\n\n첫 줄에 개수 `n`과 찾을 값 `target` 이 주어지고,\n둘째 줄에 **오름차순으로 정렬된** `n`개의 정수가 주어집니다.\n\n`target` 이 배열 안에 있으면 `YES`, 없으면 `NO` 를 출력하세요.\n\n`n` 이 매우 클 수 있으니 처음부터 훑지 말고 **이분 탐색**으로 찾아보세요.",
		// "5 10" 은 target 이 최댓값보다 큰 경우다. 이 케이스가 없으면 lower bound
		// 결과를 범위 검사 없이 arr[i] 로 바로 읽는 흔한 실수가 걸러지지 않는다.
		inputs: [
			"5 4\n1 3 4 7 9",
			"5 5\n1 3 4 7 9",
			"1 1\n1",
			"6 9\n1 2 3 4 5 9",
			"6 0\n1 2 3 4 5 9",
			"5 10\n1 3 4 7 9",
		],
		solve: (s) => {
			const [, target] = nums(s.split("\n")[0]);
			const arr = nums(s.split("\n")[1]);
			const i = lowerBound(arr, target);
			return i < arr.length && arr[i] === target ? "YES" : "NO";
		},
	},
	{
		slug: "s-lower-bound",
		title: "target 이상인 첫 위치",
		shape: "nTargetSorted",
		visible: 2,
		description:
			"# target 이상인 첫 위치\n\n첫 줄에 개수 `n`과 기준값 `target` 이 주어지고,\n둘째 줄에 **오름차순으로 정렬된** `n`개의 정수가 주어집니다.\n\n`target` **이상**인 값이 처음 나오는 위치를 출력하세요. 위치는 `0`부터 셉니다.\n\n그런 값이 하나도 없으면 `n` 을 출력합니다.",
		inputs: [
			"5 4\n1 3 4 7 9",
			"5 5\n1 3 4 7 9",
			"5 10\n1 3 4 7 9",
			"5 0\n1 3 4 7 9",
			"6 3\n1 3 3 3 7 9",
		],
		solve: (s) => {
			const [, target] = nums(s.split("\n")[0]);
			return String(lowerBound(nums(s.split("\n")[1]), target));
		},
	},
	{
		slug: "s-count-in-range",
		title: "범위 안의 개수",
		shape: "nRangeSorted",
		visible: 2,
		description:
			"# 범위 안의 개수\n\n첫 줄에 개수 `n`과 두 정수 `a`, `b` 가 주어지고,\n둘째 줄에 **오름차순으로 정렬된** `n`개의 정수가 주어집니다.\n\n`a` 이상 `b` 이하인 값이 **몇 개**인지 출력하세요.",
		inputs: [
			"7 3 7\n1 3 3 5 7 7 9",
			"7 10 20\n1 3 3 5 7 7 9",
			"5 1 9\n1 3 4 7 9",
			"6 4 4\n1 3 3 3 7 9",
			"6 3 3\n1 3 3 3 7 9",
		],
		solve: (s) => {
			const [, a, b] = nums(s.split("\n")[0]);
			const arr = nums(s.split("\n")[1]);
			return String(upperBound(arr, b) - lowerBound(arr, a));
		},
	},
	{
		slug: "s-sqrt-floor",
		title: "정수 제곱근",
		shape: "singleInt",
		visible: 2,
		description:
			"# 정수 제곱근\n\n0 이상 10^12 이하의 정수 `n` 이 주어집니다.\n\n제곱해서 `n` 을 넘지 않는 **가장 큰 정수**를 출력하세요.\n즉 `k * k <= n` 을 만족하는 가장 큰 `k` 입니다.\n\n`n` 이 매우 클 수 있습니다. 1부터 하나씩 올려보지 말고 **답을 이분 탐색**해보세요.",
		inputs: ["16", "17", "0", "1", "999999999999"],
		solve: (s) => {
			const n = BigInt(s.trim());
			let lo = 0n,
				hi = 1000000n + 1n;
			while (lo < hi) {
				const mid = (lo + hi + 1n) / 2n;
				if (mid * mid <= n) lo = mid;
				else hi = mid - 1n;
			}
			return lo.toString();
		},
	},
	{
		slug: "s-cable-cut",
		title: "랜선 자르기",
		shape: "nkArray",
		visible: 2,
		description:
			"# 랜선 자르기\n\n첫 줄에 가지고 있는 랜선의 개수 `n` 과 만들어야 하는 개수 `k` 가 주어지고,\n둘째 줄에 `n`개 랜선의 길이가 주어집니다.\n\n랜선을 잘라 **길이가 모두 같은 랜선 `k`개 이상**을 만들려고 합니다.\n만들 수 있는 랜선 한 개의 **최대 길이**를 출력하세요. 길이는 정수입니다.\n\n잘라서 남는 부분은 버립니다. 만들 수 없으면 `0` 을 출력합니다.",
		// "3 2 / 10 10 10" 이 핵심이다. 답인 길이 10 에서는 3개가 나오므로,
		// 개수를 "정확히 k개"로 판정하는 풀이는 답을 못 찾고 0 을 낸다.
		inputs: [
			"4 11\n802 743 457 539",
			"3 3\n10 10 10",
			"2 5\n1 1",
			"1 1\n7",
			"3 7\n8 4 2",
			"3 2\n10 10 10",
		],
		solve: (s) => {
			const [, k] = nums(s.split("\n")[0]);
			const arr = nums(s.split("\n")[1]);
			let lo = 0,
				hi = Math.max(...arr);
			while (lo < hi) {
				const mid = Math.floor((lo + hi + 1) / 2);
				const made = arr.reduce((acc, L) => acc + Math.floor(L / mid), 0);
				if (made >= k) lo = mid;
				else hi = mid - 1;
			}
			return String(lo);
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
	console.log(`Seeded ${P.length} binary-search problems.`);
} finally {
	await client.close();
}
