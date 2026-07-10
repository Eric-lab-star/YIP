// WebSocket <-> language-server bridge. Each WS connection spawns a language
// server (selected by the ?lang= query) and pipes LSP JSON-RPC both ways,
// translating between WebSocket text frames (one JSON message per frame) and
// the server's Content-Length-framed stdio.
import { WebSocketServer } from "ws";
import { spawn } from "node:child_process";

const PORT = 2200;

// lang -> [command, ...args]. Extend this to add more language servers.
const SERVERS = {
	python: ["pyright-langserver", "--stdio"],
};

const wss = new WebSocketServer({ port: PORT });
console.log(`lsp bridge listening on :${PORT}`);

wss.on("connection", (ws, req) => {
	const lang = new URL(req.url, "http://x").searchParams.get("lang") ?? "python";
	const spec = SERVERS[lang];
	if (!spec) {
		ws.close(1008, `unsupported lang: ${lang}`);
		return;
	}

	const server = spawn(spec[0], spec.slice(1), { stdio: ["pipe", "pipe", "pipe"] });

	// server stdout (Content-Length framed) -> WS (one JSON message per frame)
	let buffer = Buffer.alloc(0);
	server.stdout.on("data", (chunk) => {
		buffer = Buffer.concat([buffer, chunk]);
		for (;;) {
			const headerEnd = buffer.indexOf("\r\n\r\n");
			if (headerEnd === -1) break;
			const header = buffer.subarray(0, headerEnd).toString("ascii");
			const match = header.match(/Content-Length:\s*(\d+)/i);
			if (!match) {
				buffer = buffer.subarray(headerEnd + 4);
				continue;
			}
			const len = parseInt(match[1], 10);
			const start = headerEnd + 4;
			if (buffer.length < start + len) break;
			const body = buffer.subarray(start, start + len).toString("utf8");
			buffer = buffer.subarray(start + len);
			if (ws.readyState === ws.OPEN) ws.send(body);
		}
	});

	server.stderr.on("data", (d) => console.error(`[${lang}]`, d.toString()));

	// WS message (JSON) -> server stdin (Content-Length framed)
	ws.on("message", (data) => {
		const payload = Buffer.from(data.toString(), "utf8");
		server.stdin.write(`Content-Length: ${payload.length}\r\n\r\n`);
		server.stdin.write(payload);
	});

	const cleanup = () => {
		try {
			server.kill();
		} catch {}
	};
	ws.on("close", cleanup);
	ws.on("error", cleanup);
	server.on("exit", () => {
		if (ws.readyState === ws.OPEN) ws.close();
	});
});
