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

// Abuse limits: every connection spawns a language-server process, so cap how
// many can run at once — globally and per client IP — and reap idle ones.
// Override via env if needed.
const MAX_TOTAL = Number(process.env.LSP_MAX_TOTAL ?? 60);
const MAX_PER_IP = Number(process.env.LSP_MAX_PER_IP ?? 4);
const IDLE_TIMEOUT_MS = Number(process.env.LSP_IDLE_TIMEOUT_MS ?? 5 * 60_000);

let total = 0;
const perIp = new Map(); // ip -> active connection count

// Real client IP: behind cloudflared+Caddy the socket peer is the proxy, so
// trust Cloudflare's Cf-Connecting-Ip (falling back to XFF, then the socket).
function clientIp(req) {
	return (
		req.headers["cf-connecting-ip"] ||
		(req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
		req.socket.remoteAddress ||
		"unknown"
	);
}

const wss = new WebSocketServer({ port: PORT });
console.log(`lsp bridge listening on :${PORT} (max ${MAX_TOTAL} total, ${MAX_PER_IP}/ip)`);

wss.on("connection", (ws, req) => {
	const lang = new URL(req.url, "http://x").searchParams.get("lang") ?? "python";
	const spec = SERVERS[lang];
	if (!spec) {
		ws.close(1008, `unsupported lang: ${lang}`);
		return;
	}

	// Enforce connection caps (1013 = "try again later").
	const ip = clientIp(req);
	if (total >= MAX_TOTAL) {
		ws.close(1013, "server busy");
		return;
	}
	const ipCount = perIp.get(ip) ?? 0;
	if (ipCount >= MAX_PER_IP) {
		ws.close(1013, "too many connections");
		return;
	}
	total += 1;
	perIp.set(ip, ipCount + 1);

	let released = false;
	const release = () => {
		if (released) return;
		released = true;
		total -= 1;
		const n = (perIp.get(ip) ?? 1) - 1;
		if (n <= 0) perIp.delete(ip);
		else perIp.set(ip, n);
	};

	const server = spawn(spec[0], spec.slice(1), { stdio: ["pipe", "pipe", "pipe"] });

	// Reap connections that go idle (no client messages) to reclaim the process.
	let idleTimer;
	const resetIdle = () => {
		clearTimeout(idleTimer);
		idleTimer = setTimeout(() => {
			try {
				ws.close(1000, "idle timeout");
			} catch {}
		}, IDLE_TIMEOUT_MS);
	};
	resetIdle();

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
		resetIdle();
		const payload = Buffer.from(data.toString(), "utf8");
		server.stdin.write(`Content-Length: ${payload.length}\r\n\r\n`);
		server.stdin.write(payload);
	});

	const cleanup = () => {
		clearTimeout(idleTimer);
		release();
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
