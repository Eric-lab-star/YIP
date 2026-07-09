// Copy the Monaco editor runtime (min/vs) into public/ so the editor is served
// from our own origin instead of a CDN. Runs on `postinstall` and `prebuild`,
// so both `npm run dev` and production builds have the assets. The copied
// public/monaco/ directory is gitignored (regenerated from node_modules).

import { cp, mkdir, rm, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "monaco-editor", "min", "vs");
const dest = join(root, "public", "monaco", "vs");

try {
	await access(src);
} catch {
	// monaco-editor not installed yet (e.g. install ordering) — skip quietly.
	console.log("copy-monaco: monaco-editor not found, skipping");
	process.exit(0);
}

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });
console.log(`copy-monaco: copied Monaco assets → public/monaco/vs`);
