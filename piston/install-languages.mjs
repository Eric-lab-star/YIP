// Install the language runtimes the judge uses into a running Piston instance.
// Piston ships with no languages; you install them once (they persist in the
// piston-packages volume).
//
//   node piston/install-languages.mjs
//
// Override the target with PISTON_URL (defaults to http://localhost:2000).

const PISTON = (process.env.PISTON_URL ?? "http://localhost:2000").replace(/\/$/, "");

// Piston package names (the "gcc" package provides the c and c++ runtimes).
const WANTED = ["python", "node", "typescript", "gcc", "java", "go", "rust"];

function cmpVersionDesc(a, b) {
	const pa = a.split(".").map(Number);
	const pb = b.split(".").map(Number);
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
		const d = (pb[i] ?? 0) - (pa[i] ?? 0);
		if (d !== 0) return d;
	}
	return 0;
}

async function main() {
	const res = await fetch(`${PISTON}/api/v2/packages`);
	if (!res.ok) {
		console.error(`Failed to list packages: ${res.status}. Is Piston running at ${PISTON}?`);
		process.exit(1);
	}
	const packages = await res.json(); // [{ language, version, installed }]

	for (const lang of WANTED) {
		const versions = packages
			.filter((p) => p.language === lang)
			.map((p) => p.version)
			.sort(cmpVersionDesc);

		if (versions.length === 0) {
			console.log(`- ${lang}: no package available, skipping`);
			continue;
		}
		const version = versions[0];
		process.stdout.write(`- ${lang} ${version}: installing... `);
		const r = await fetch(`${PISTON}/api/v2/packages`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ language: lang, version }),
		});
		console.log(r.ok ? "ok" : `failed (${r.status})`);
	}

	console.log("\nDone. Installed runtimes:");
	const rt = await fetch(`${PISTON}/api/v2/runtimes`).then((r) => r.json());
	for (const r of rt) console.log(`  ${r.language} ${r.version}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
