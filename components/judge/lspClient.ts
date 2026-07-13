import type * as Monaco from "monaco-editor";

// A minimal LSP-over-WebSocket client used to bring type-aware completions
// (e.g. a `list` variable suggesting `append`) into Monaco, without pulling in
// the heavy monaco-languageclient stack. It talks JSON-RPC to the LSP bridge
// (lsp/server.mjs), which pipes to a real language server (pyright for Python).

const DOC_URI = "file:///main.py";

interface Pending {
	resolve: (v: unknown) => void;
	reject: (e: unknown) => void;
}

export class LspSession {
	private ws: WebSocket | null = null;
	private nextId = 1;
	private version = 1;
	private pending = new Map<number, Pending>();
	ready = false;

	constructor(
		private url: string,
		private lang: string
	) {}

	/** Connect, run the LSP handshake, and open the document. Resolves when ready. */
	start(text: string): Promise<void> {
		return new Promise((resolve, reject) => {
			let ws: WebSocket;
			try {
				ws = new WebSocket(`${this.url.replace(/\/$/, "")}/?lang=${this.lang}`);
			} catch (e) {
				reject(e);
				return;
			}
			this.ws = ws;

			ws.onmessage = (ev) => this.onMessage(ev);
			ws.onerror = () => reject(new Error("lsp websocket error"));
			ws.onclose = () => {
				this.ready = false;
			};
			ws.onopen = async () => {
				try {
					await this.rpc("initialize", {
						processId: null,
						rootUri: null,
						workspaceFolders: null,
						capabilities: {
							textDocument: {
								completion: {
									completionItem: { snippetSupport: true },
								},
							},
						},
					});
					this.notify("initialized", {});
					this.notify("textDocument/didOpen", {
						textDocument: {
							uri: DOC_URI,
							languageId: this.lang,
							version: this.version,
							text,
						},
					});
					this.ready = true;
					resolve();
				} catch (e) {
					reject(e);
				}
			};
		});
	}

	private onMessage(ev: MessageEvent) {
		let msg: { id?: number; result?: unknown; error?: unknown };
		try {
			msg = JSON.parse(ev.data as string);
		} catch {
			return;
		}
		if (typeof msg.id === "number" && this.pending.has(msg.id)) {
			const p = this.pending.get(msg.id)!;
			this.pending.delete(msg.id);
			if (msg.error) p.reject(msg.error);
			else p.resolve(msg.result);
		}
	}

	private rpc(method: string, params: unknown): Promise<unknown> {
		if (!this.ws) return Promise.reject(new Error("not connected"));
		const id = this.nextId++;
		const payload = { jsonrpc: "2.0", id, method, params };
		return new Promise((resolve, reject) => {
			this.pending.set(id, { resolve, reject });
			this.ws!.send(JSON.stringify(payload));
			setTimeout(() => {
				if (this.pending.has(id)) {
					this.pending.delete(id);
					reject(new Error("lsp request timeout"));
				}
			}, 5000);
		});
	}

	private notify(method: string, params: unknown) {
		this.ws?.send(JSON.stringify({ jsonrpc: "2.0", method, params }));
	}

	/** Sync the latest document text then request completion at (0-based) line/char. */
	async complete(
		text: string,
		line: number,
		character: number
	): Promise<unknown> {
		this.version += 1;
		this.notify("textDocument/didChange", {
			textDocument: { uri: DOC_URI, version: this.version },
			contentChanges: [{ text }],
		});
		return this.rpc("textDocument/completion", {
			textDocument: { uri: DOC_URI },
			position: { line, character },
		});
	}

	dispose() {
		this.ready = false;
		this.pending.clear();
		try {
			this.ws?.close();
		} catch {}
		this.ws = null;
	}
}

// The session for the currently-active LSP editor (one editor at a time).
let activeSession: LspSession | null = null;
export function setActiveSession(s: LspSession | null) {
	activeSession = s;
}

interface LspCompletionItem {
	label: string | { label: string };
	kind?: number;
	detail?: string;
	insertText?: string;
	insertTextFormat?: number; // 2 = snippet
	sortText?: string;
	filterText?: string;
}

// LSP CompletionItemKind (1..25) -> Monaco CompletionItemKind. Same concepts,
// different numeric values, so map by name.
const LSP_KIND_NAMES = [
	"Text", "Method", "Function", "Constructor", "Field", "Variable", "Class",
	"Interface", "Module", "Property", "Unit", "Value", "Enum", "Keyword",
	"Snippet", "Color", "File", "Reference", "Folder", "EnumMember", "Constant",
	"Struct", "Event", "Operator", "TypeParameter",
] as const;

function mapKind(monaco: typeof Monaco, lspKind?: number) {
	const name = lspKind ? LSP_KIND_NAMES[lspKind - 1] : "Text";
	const K = monaco.languages.CompletionItemKind;
	return (K as unknown as Record<string, number>)[name] ?? K.Text;
}

let registered = false;

/**
 * Register a Monaco completion provider that pulls type-aware suggestions from
 * the active LSP session. Coexists with the static keyword/snippet provider —
 * Monaco merges results from both.
 */
export function registerLspCompletions(monaco: typeof Monaco, lang: string) {
	if (registered) return;
	registered = true;

	monaco.languages.registerCompletionItemProvider(lang, {
		triggerCharacters: [".", "(", "[", ",", " ", "="],
		async provideCompletionItems(model, position, _context, token) {
			const session = activeSession;
			if (!session || !session.ready) return { suggestions: [] };

			let result: unknown;
			try {
				result = await session.complete(
					model.getValue(),
					position.lineNumber - 1,
					position.column - 1
				);
			} catch {
				return { suggestions: [] };
			}
			if (token.isCancellationRequested) return { suggestions: [] };

			const items: LspCompletionItem[] = Array.isArray(result)
				? (result as LspCompletionItem[])
				: ((result as { items?: LspCompletionItem[] })?.items ?? []);

			const word = model.getWordUntilPosition(position);
			const range: Monaco.IRange = {
				startLineNumber: position.lineNumber,
				endLineNumber: position.lineNumber,
				startColumn: word.startColumn,
				endColumn: word.endColumn,
			};

			const suggestions: Monaco.languages.CompletionItem[] = items.map((it) => {
				const label = typeof it.label === "string" ? it.label : it.label.label;
				const isSnippet = it.insertTextFormat === 2;
				return {
					label,
					kind: mapKind(monaco, it.kind),
					insertText: it.insertText ?? label,
					insertTextRules: isSnippet
						? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						: undefined,
					detail: it.detail,
					sortText: it.sortText,
					filterText: it.filterText,
					range,
				};
			});

			return { suggestions };
		},
	});
}
