// Seed the 2차원 리스트 problems used by the Algorithm course's 8th chapter.
// Expected outputs come from the reference `solve`, so test cases are correct by
// construction. Upserts by slug; safe to re-run.
//
//   node scripts/seed-grid-problems.mjs            seed
//   node scripts/seed-grid-problems.mjs --print    preview without the DB
//
// The five problems escalate along the chapter's steps: plain traversal, then
// building a new grid, then an index transform, then neighbour lookup with
// bounds checking (the groundwork for BFS), then a traversal whose order is the
// whole difficulty.

import { MongoClient } from "mongodb";
import { loadEnv, resolveMongoUri } from "./lib/mongoUri.mjs";

const LANGS = ["python", "javascript", "cpp", "java", "go"];

// Piston kills (does not truncate) a submission that overruns its per-stream
// stdio cap, and a correct solution dies just as hard as a wrong one, so any
// problem whose expected output crosses the cap is unsolvable. The cap is
// PISTON_OUTPUT_MAX_SIZE in piston/docker-compose.yml (1 MB); assert against it
// here so a case that crosses it fails at seed time.
const STDOUT_CAP = 1_048_576;

const STARTERS = {
	intGrid: {
		python:
			"n, m = map(int, input().split())\ngrid = [list(map(int, input().split())) for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = lines[0].trim().split(/\\s+/).map(Number);\nconst grid = [];\nfor (let i = 0; i < n; i++) grid.push(lines[i + 1].trim().split(/\\s+/).map(Number));\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<long long>> grid(n, vector<long long>(m));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) cin >> grid[i][j];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        long[][] grid = new long[n][m];\n        for (int i = 0; i < n; i++)\n            for (int j = 0; j < m; j++) grid[i][j] = sc.nextLong();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, m int\n\tfmt.Scan(&n, &m)\n\tgrid := make([][]int, n)\n\tfor i := range grid {\n\t\tgrid[i] = make([]int, m)\n\t\tfor j := range grid[i] {\n\t\t\tfmt.Scan(&grid[i][j])\n\t\t}\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
	charGrid: {
		python:
			"n, m = map(int, input().split())\ngrid = [input().strip() for _ in range(n)]\n\n# 여기에 코드를 작성하세요\n",
		javascript:
			"const lines = require('fs').readFileSync(0, 'utf8').split('\\n');\nconst [n, m] = lines[0].trim().split(/\\s+/).map(Number);\nconst grid = [];\nfor (let i = 0; i < n; i++) grid.push(lines[i + 1].trim());\n\n// 여기에 코드를 작성하세요\n",
		cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<string> grid(n);\n    for (int i = 0; i < n; i++) cin >> grid[i];\n\n    // 여기에 코드를 작성하세요\n    return 0;\n}\n",
		java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        String[] grid = new String[n];\n        for (int i = 0; i < n; i++) grid[i] = sc.next();\n\n        // 여기에 코드를 작성하세요\n    }\n}\n",
		go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tvar n, m int\n\tfmt.Scan(&n, &m)\n\tgrid := make([]string, n)\n\tfor i := range grid {\n\t\tfmt.Scan(&grid[i])\n\t}\n\n\t// 여기에 코드를 작성하세요\n}\n',
	},
};

/** `n m` on the first line, then n rows of m integers. */
function parseInts(stdin) {
	const lines = stdin.trim().split("\n");
	const [n, m] = lines[0].trim().split(/\s+/).map(Number);
	const g = [];
	for (let i = 0; i < n; i++) g.push(lines[i + 1].trim().split(/\s+/).map(Number));
	return { n, m, g };
}

/** `n m` on the first line, then n rows of m characters. */
function parseChars(stdin) {
	const lines = stdin.trim().split("\n");
	const [n, m] = lines[0].trim().split(/\s+/).map(Number);
	const g = [];
	for (let i = 0; i < n; i++) g.push(lines[i + 1].trim());
	return { n, m, g };
}

const rows = (g) => g.map((r) => r.join(" ")).join("\n");

const P = [
	{
		slug: "s-grid-row-col-sum",
		title: "행과 열의 합",
		shape: "intGrid",
		visible: 2,
		description:
			"# 행과 열의 합\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 정수가 주어집니다.\n\n첫 줄에 **각 행의 합**을 `n`개, 공백으로 구분해 출력하세요.\n둘째 줄에 **각 열의 합**을 `m`개, 공백으로 구분해 출력하세요.",
		// 행 합은 안쪽 리스트 하나만 보면 되지만, 열 합은 모든 행을 가로질러야 한다.
		// 이 비대칭이 grid[r][c] 의 두 인덱스가 각각 무엇인지 확인시켜 준다.
		inputs: [
			"2 3\n1 2 3\n4 5 6",
			"1 1\n7",
			"3 2\n1 -2\n-3 4\n5 -6",
			"3 3\n1 1 1\n1 1 1\n1 1 1",
			"4 5\n1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20",
		],
		solve: (s) => {
			const { n, m, g } = parseInts(s);
			const rowSums = g.map((r) => r.reduce((a, b) => a + b, 0));
			const colSums = [];
			for (let c = 0; c < m; c++) {
				let t = 0;
				for (let r = 0; r < n; r++) t += g[r][c];
				colSums.push(t);
			}
			return rowSums.join(" ") + "\n" + colSums.join(" ");
		},
	},
	{
		slug: "s-grid-transpose",
		title: "전치 행렬",
		shape: "intGrid",
		visible: 2,
		description:
			"# 전치 행렬\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 정수가 주어집니다.\n\n행과 열을 뒤바꾼 **전치 행렬**을 출력하세요.\n결과는 `m`개의 줄이 되고, 각 줄에는 `n`개의 정수가 공백으로 구분되어 놓입니다.",
		// 결과의 크기가 m × n 으로 뒤바뀐다는 점이 핵심이다. 새 격자를 만들 때
		// 바깥 반복이 m 번이라는 걸 놓치면 IndexError 가 난다.
		inputs: [
			"2 3\n1 2 3\n4 5 6",
			"1 4\n1 2 3 4",
			"3 1\n5\n6\n7",
			"3 3\n1 2 3\n4 5 6\n7 8 9",
			"2 5\n-1 -2 -3 -4 -5\n10 20 30 40 50",
		],
		solve: (s) => {
			const { n, m, g } = parseInts(s);
			const out = [];
			for (let c = 0; c < m; c++) {
				const row = [];
				for (let r = 0; r < n; r++) row.push(g[r][c]);
				out.push(row);
			}
			return rows(out);
		},
	},
	{
		slug: "s-grid-rotate",
		title: "격자 90도 회전",
		shape: "intGrid",
		visible: 2,
		description:
			"# 격자 90도 회전\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 정수가 주어집니다.\n\n격자를 **시계 방향으로 90도 회전**시켜 출력하세요.\n결과는 `m`개의 줄이 되고, 각 줄에는 `n`개의 정수가 공백으로 구분되어 놓입니다.",
		// 전치와 크기는 같지만 인덱스 식이 다르다. 결과의 (c, n-1-r) 자리에
		// 원본 (r, c) 가 간다 — 전치한 뒤 각 행을 뒤집는 것과 같다.
		inputs: [
			"2 3\n1 2 3\n4 5 6",
			"1 1\n9",
			"3 1\n1\n2\n3",
			"3 3\n1 2 3\n4 5 6\n7 8 9",
			"2 4\n1 2 3 4\n5 6 7 8",
		],
		solve: (s) => {
			const { n, m, g } = parseInts(s);
			const out = [];
			for (let c = 0; c < m; c++) {
				const row = [];
				for (let r = n - 1; r >= 0; r--) row.push(g[r][c]);
				out.push(row);
			}
			return rows(out);
		},
	},
	{
		slug: "s-minesweeper",
		title: "지뢰찾기 숫자 채우기",
		shape: "charGrid",
		visible: 2,
		description:
			"# 지뢰찾기 숫자 채우기\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 문자가 주어집니다.\n`*` 는 지뢰, `.` 는 빈 칸입니다.\n\n지뢰가 아닌 칸은 **자기 주변 여덟 칸에 있는 지뢰의 개수**로 바꾸고,\n지뢰인 칸은 `*` 그대로 두어 `n`개의 줄로 출력하세요.\n\n주변 여덟 칸이란 위, 아래, 왼쪽, 오른쪽과 대각선 네 방향을 말합니다.\n격자 밖은 세지 않습니다.",
		// 이 챕터의 핵심 문제. 여덟 방향을 dr/dc 로 돌면서 매번 범위를 검사해야
		// 하고, 파이썬의 음수 인덱스는 에러 없이 반대쪽을 읽어버리기 때문에
		// 범위 검사를 빼먹으면 틀린 답이 조용히 나온다.
		inputs: [
			"3 3\n*..\n...\n..*",
			"1 1\n.",
			"1 5\n*...*",
			"3 4\n****\n****\n****",
			"4 5\n*....\n..*..\n.....\n...*.",
		],
		solve: (s) => {
			const { n, m, g } = parseChars(s);
			const out = [];
			for (let r = 0; r < n; r++) {
				let line = "";
				for (let c = 0; c < m; c++) {
					if (g[r][c] === "*") {
						line += "*";
						continue;
					}
					let cnt = 0;
					for (let dr = -1; dr <= 1; dr++) {
						for (let dc = -1; dc <= 1; dc++) {
							if (dr === 0 && dc === 0) continue;
							const nr = r + dr;
							const nc = c + dc;
							if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
							if (g[nr][nc] === "*") cnt++;
						}
					}
					line += String(cnt);
				}
				out.push(line);
			}
			return out.join("\n");
		},
	},
	{
		slug: "s-grid-spiral",
		title: "나선형 순회",
		shape: "intGrid",
		visible: 2,
		description:
			"# 나선형 순회\n\n첫 줄에 격자의 크기 `n` 과 `m` (1 이상 100 이하) 이 주어집니다.\n이어서 `n`개의 줄에 각각 `m`개의 정수가 주어집니다.\n\n왼쪽 위에서 시작해 **오른쪽 → 아래 → 왼쪽 → 위** 순서로 안쪽으로 말아 들어가며\n모든 칸을 한 번씩 방문한 순서대로, 한 줄에 공백으로 구분해 출력하세요.",
		// 방향 전환 자체보다 '이미 지난 칸을 다시 밟지 않기'가 어렵다. 위/아래
		// 경계를 좁혀가는 네 변수로 푸는 방법이 가장 실수가 적다.
		inputs: [
			"3 3\n1 2 3\n4 5 6\n7 8 9",
			"1 4\n1 2 3 4",
			"4 1\n1\n2\n3\n4",
			"3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
			"4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
		],
		solve: (s) => {
			const { n, m, g } = parseInts(s);
			const out = [];
			let top = 0;
			let bottom = n - 1;
			let left = 0;
			let right = m - 1;
			while (top <= bottom && left <= right) {
				for (let c = left; c <= right; c++) out.push(g[top][c]);
				top++;
				for (let r = top; r <= bottom; r++) out.push(g[r][right]);
				right--;
				if (top <= bottom) {
					for (let c = right; c >= left; c--) out.push(g[bottom][c]);
					bottom--;
				}
				if (left <= right) {
					for (let r = bottom; r >= top; r--) out.push(g[r][left]);
					left++;
				}
			}
			return out.join(" ");
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
	console.log(`Seeded ${P.length} grid problems.`);
} finally {
	await client.close();
}
