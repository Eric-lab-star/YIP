// Tiny HTTP formatter service. POST /format with {language, code} runs the
// matching formatter (code piped via stdin) and returns {formatted}. Each
// formatter reads stdin and writes the formatted source to stdout.
import http from "node:http";
import { spawn } from "node:child_process";

const PORT = 2100;
const MAX_CODE = 256 * 1024;
const RUN_TIMEOUT_MS = 15_000;

// JVM flags google-java-format needs on JDK 16+.
const JAVA_EXPORTS = [
	"jdk.compiler/com.sun.tools.javac.api",
	"jdk.compiler/com.sun.tools.javac.file",
	"jdk.compiler/com.sun.tools.javac.parser",
	"jdk.compiler/com.sun.tools.javac.tree",
	"jdk.compiler/com.sun.tools.javac.util",
].flatMap((e) => ["--add-exports", `${e}=ALL-UNNAMED`]);

// language slug -> [command, ...args]. All read stdin, write stdout.
const FORMATTERS = {
	python: ["black", "-q", "-"],
	javascript: ["prettier", "--stdin-filepath", "main.js"],
	typescript: ["prettier", "--stdin-filepath", "main.ts"],
	go: ["gofmt"],
	rust: ["rustfmt", "--edition", "2021", "--emit", "stdout", "--quiet"],
	c: ["clang-format", "--assume-filename=main.c"],
	cpp: ["clang-format", "--assume-filename=main.cpp"],
	java: ["java", ...JAVA_EXPORTS, "-jar", "/opt/google-java-format.jar", "-"],
};

function runFormatter(cmd, args, code) {
	return new Promise((resolve) => {
		const child = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });
		let out = "";
		let err = "";
		const timer = setTimeout(() => child.kill("SIGKILL"), RUN_TIMEOUT_MS);

		child.stdout.on("data", (d) => (out += d));
		child.stderr.on("data", (d) => (err += d));
		child.on("error", (e) => {
			clearTimeout(timer);
			resolve({ ok: false, error: e.message });
		});
		child.on("close", (codeExit) => {
			clearTimeout(timer);
			if (codeExit === 0) resolve({ ok: true, formatted: out });
			else resolve({ ok: false, error: err || `exit ${codeExit}` });
		});

		child.stdin.on("error", () => {});
		child.stdin.write(code);
		child.stdin.end();
	});
}

const server = http.createServer((req, res) => {
	const json = (status, body) => {
		res.writeHead(status, { "Content-Type": "application/json" });
		res.end(JSON.stringify(body));
	};

	if (req.method === "GET" && req.url === "/health") {
		return json(200, { ok: true, languages: Object.keys(FORMATTERS) });
	}
	if (req.method !== "POST" || req.url !== "/format") {
		return json(404, { error: "not found" });
	}

	let raw = "";
	let tooBig = false;
	req.on("data", (c) => {
		raw += c;
		if (raw.length > MAX_CODE * 2) {
			tooBig = true;
			req.destroy();
		}
	});
	req.on("end", async () => {
		if (tooBig) return json(413, { error: "too large" });
		let body;
		try {
			body = JSON.parse(raw);
		} catch {
			return json(400, { error: "invalid json" });
		}
		const { language, code } = body ?? {};
		if (typeof language !== "string" || typeof code !== "string") {
			return json(400, { error: "language and code required" });
		}
		if (code.length > MAX_CODE) return json(413, { error: "too large" });
		const spec = FORMATTERS[language];
		if (!spec) return json(400, { error: `unsupported language: ${language}` });

		const result = await runFormatter(spec[0], spec.slice(1), code);
		if (result.ok) return json(200, { formatted: result.formatted });
		return json(422, { error: result.error });
	});
});

server.listen(PORT, () => {
	console.log(`formatter listening on :${PORT}`);
});
