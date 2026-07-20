// Seed the recursion problems used by the Algorithm course's 재귀 chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-recursion-problems.mjs            seed
//   node scripts/seed-recursion-problems.mjs --print    preview without the DB
//
// Deliberately avoids factorial, gcd and small-n Fibonacci — those already exist
// as easy problems in earlier chapters.

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

// Piston kills (does not truncate) a submission that overruns its per-stream
// stdio cap, and a correct solution dies just as hard as a wrong one, so any
// problem whose expected output crosses the cap is unsolvable. The cap is
// PISTON_OUTPUT_MAX_SIZE in piston/docker-compose.yml, raised from Piston's
// 1024-byte default to 1 MB; assert against it here so a case that crosses it
// fails at seed time instead of silently shipping an unsolvable problem.
const STDOUT_CAP = 1_048_576;

const STARTERS = {
	singleInt: {
		python: "n = int(input())\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const n = Number(require('fs').readFileSync(0, 'utf8').trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n int\n\tfmt.Scan(&n)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	threeInts: {
		python: "a, b, m = map(int, input().split())\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const [a, b, m] = require('fs').readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\n\n// b 가 매우 클 수 있어 BigInt 로 받습니다\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long a, b, m;\n    cin >> a >> b >> m;\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        long m = sc.nextLong();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar a, b, m int64\n\tfmt.Scan(&a, &b, &m)\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	nTargetArray: {
		python: "n, target = map(int, input().split())\narr = list(map(int, input().split()))\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, target] = lines[0].trim().split(/\\s+/).map(Number);\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    long long n, target;\n    cin >> n >> target;\n    vector<long long> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] arr = new long[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n int\n\tvar target int64\n\tfmt.Scan(&n, &target)\n\tarr := make([]int64, n)\n\tfor i := range arr {\n\t\tfmt.Scan(&arr[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

const P = [
	{
		slug: "s-binary-strings",
		title: "이진 문자열 만들기",
		shape: "singleInt",
		visible: 2,
		description:
			"# 이진 문자열 만들기\n\n정수 `n` (1 이상 10 이하) 이 주어집니다.\n\n`0` 과 `1` 로만 이루어진 **길이 `n` 인 문자열을 전부**, 사전순으로 한 줄에 하나씩 출력하세요.",
		// n=10 의 출력은 1024줄 × 11바이트 = 약 11KB. 1 MB 상한 안에 넉넉히 든다.
		inputs: ["2", "1", "3", "4", "10"],
		solve: (s) => {
			const n = Number(s.trim());
			const out = [];
			const go = (cur) => {
				if (cur.length === n) {
					out.push(cur);
					return;
				}
				go(cur + "0");
				go(cur + "1");
			};
			go("");
			return out.join("\n");
		},
	},
	{
		slug: "s-hanoi",
		title: "하노이 탑",
		shape: "singleInt",
		visible: 2,
		description:
			"# 하노이 탑\n\n원판이 `n`개 (1 이상 10 이하) 쌓인 1번 기둥에서 3번 기둥으로 원판을 모두 옮기려 합니다.\n한 번에 한 개씩만 옮길 수 있고, 큰 원판을 작은 원판 위에 올릴 수 없습니다.\n\n첫 줄에 **옮기는 횟수**를 출력하고,\n이어서 각 줄에 **어느 기둥에서 어느 기둥으로** 옮기는지 공백으로 구분해 출력하세요.\n\n옮기는 순서는 원판을 가장 적게 움직이는 방법이어야 합니다.",
		// n=10 의 출력은 1023줄 × 4바이트 + 개수 줄 = 약 4KB. 상한보다는 재귀 호출
		// 수가 지수로 늘어난다는 점이 먼저 체감되도록 고른 값이다.
		inputs: ["2", "1", "3", "4", "10"],
		solve: (s) => {
			const n = Number(s.trim());
			const moves = [];
			const go = (k, from, to, via) => {
				if (k === 0) return;
				go(k - 1, from, via, to);
				moves.push(`${from} ${to}`);
				go(k - 1, via, to, from);
			};
			go(n, 1, 3, 2);
			return [String(moves.length), ...moves].join("\n");
		},
	},
	{
		slug: "s-fib-large",
		title: "큰 피보나치 수",
		shape: "singleInt",
		visible: 2,
		description:
			"# 큰 피보나치 수\n\n정수 `n` (0 이상 90 이하) 이 주어집니다.\n\n`n`번째 피보나치 수를 출력하세요.\n`F(0) = 0`, `F(1) = 1`, `F(n) = F(n-1) + F(n-2)` 입니다.\n\n`n` 이 클 때 **같은 값을 몇 번이고 다시 계산하지 않도록** 주의하세요.\n그냥 재귀로만 짜면 시간 안에 끝나지 않습니다.",
		inputs: ["10", "0", "1", "50", "90"],
		solve: (s) => {
			const n = Number(s.trim());
			let a = 0n,
				b = 1n;
			for (let i = 0; i < n; i++) [a, b] = [b, a + b];
			return a.toString();
		},
	},
	{
		slug: "s-power-mod",
		title: "빠른 거듭제곱",
		shape: "threeInts",
		visible: 2,
		description:
			"# 빠른 거듭제곱\n\n세 정수 `a`, `b`, `m` 이 공백으로 구분되어 주어집니다.\n(`1 <= a <= 10^9`, `0 <= b <= 10^18`, `1 <= m <= 10^9`)\n\n`a` 를 `b`번 곱한 값을 `m` 으로 나눈 나머지를 출력하세요.\n\n`b` 가 매우 크므로 `b`번 반복하면 시간 안에 끝나지 않습니다.\n**지수를 절반으로 나누는** 방법을 생각해보세요.",
		inputs: ["2 10 1000", "3 0 7", "2 1000000000000000000 1000000007", "10 5 1"],
		solve: (s) => {
			const [a, b, m] = s.trim().split(/\s+/).map(BigInt);
			let base = a % m,
				e = b,
				r = 1n % m;
			while (e > 0n) {
				if (e & 1n) r = (r * base) % m;
				base = (base * base) % m;
				e >>= 1n;
			}
			return r.toString();
		},
	},
	{
		slug: "s-subset-sum",
		title: "부분집합의 합",
		shape: "nTargetArray",
		visible: 2,
		description:
			"# 부분집합의 합\n\n첫 줄에 개수 `n` (1 이상 20 이하) 과 목표값 `target` 이 주어지고,\n둘째 줄에 `n`개의 정수가 주어집니다.\n\n주어진 수 중에서 **하나 이상**을 골라 더했을 때 `target` 을 만들 수 있으면 `YES`,\n없으면 `NO` 를 출력하세요.\n\n같은 수를 두 번 고를 수는 없지만, 같은 값이 두 자리에 있으면 각각 고를 수 있습니다.",
		inputs: [
			"5 9\n3 1 4 1 5",
			"3 100\n1 2 3",
			"1 5\n5",
			"4 0\n1 2 3 4",
			"6 12\n2 2 2 2 2 2",
		],
		solve: (s) => {
			const [, target] = s.split("\n")[0].trim().split(/\s+/).map(Number);
			const arr = s.split("\n")[1].trim().split(/\s+/).map(Number);
			let found = false;
			const go = (i, sum, picked) => {
				if (found) return;
				if (i === arr.length) {
					if (picked > 0 && sum === target) found = true;
					return;
				}
				go(i + 1, sum + arr[i], picked + 1);
				go(i + 1, sum, picked);
			};
			go(0, 0, 0);
			return found ? "YES" : "NO";
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

	// Enforced rather than just documented: a case over the cap produces a
	// problem no correct solution can pass, and the failure looks like a
	// timeout, which sends you looking in the wrong place.
	for (const [i, tc] of testcases.entries()) {
		if (tc.expectedOutput.length > STDOUT_CAP) {
			throw new Error(
				`${p.slug} case ${i}: 기대 출력 ${tc.expectedOutput.length}바이트 > 샌드박스 상한 ${STDOUT_CAP}바이트`
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
			const out = tc.expectedOutput;
			const shown = out.length > 90 ? out.slice(0, 60) + `... (${out.length}자)` : out;
			console.log(
				`${tc.hidden ? "hidden " : "sample "}${JSON.stringify(tc.stdin)} -> ${JSON.stringify(shown)}`
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
	console.log(`Seeded ${P.length} recursion problems.`);
} finally {
	await client.close();
}
