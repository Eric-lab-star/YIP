import type * as Monaco from "monaco-editor";

// Lightweight, offline coding assistance for the judge languages that Monaco
// has no built-in language service for (Python, C/C++, Java, Go, Rust). We
// register a completion provider per language offering keywords + practical
// snippets — especially stdin-reading boilerplate that judge problems need.
// JS/TS are intentionally excluded: Monaco's built-in TS worker already gives
// full IntelliSense there.

interface Snippet {
	label: string;
	body: string;
	detail: string;
}

interface LangData {
	keywords: string[];
	snippets: Snippet[];
}

const DATA: Record<string, LangData> = {
	python: {
		keywords: [
			"def", "class", "return", "if", "elif", "else", "for", "while",
			"break", "continue", "import", "from", "as", "in", "not", "and",
			"or", "is", "lambda", "try", "except", "finally", "with", "yield",
			"global", "True", "False", "None", "print", "input", "range", "len",
			"int", "str", "float", "list", "dict", "set", "tuple", "map", "sorted",
			"enumerate", "zip", "sum", "min", "max", "abs",
		],
		snippets: [
			{ label: "main", detail: "main guard", body: 'if __name__ == "__main__":\n\t${0:pass}' },
			{ label: "readints", detail: "read ints from a line", body: "${1:a}, ${2:b} = map(int, input().split())" },
			{ label: "readint", detail: "read one int", body: "${1:n} = int(input())" },
			{ label: "readlist", detail: "read a list of ints", body: "${1:arr} = list(map(int, input().split()))" },
			{ label: "readline", detail: "read a line", body: "${1:s} = input()" },
			{ label: "forr", detail: "for i in range", body: "for ${1:i} in range(${2:n}):\n\t${0:pass}" },
			{ label: "def", detail: "function", body: "def ${1:name}(${2:args}):\n\t${0:pass}" },
			{ label: "while", detail: "while loop", body: "while ${1:cond}:\n\t${0:pass}" },
		],
	},
	cpp: {
		keywords: [
			"int", "long", "double", "float", "char", "bool", "void", "auto",
			"const", "static", "struct", "class", "public", "private", "return",
			"if", "else", "for", "while", "do", "break", "continue", "switch",
			"case", "default", "using", "namespace", "std", "true", "false",
			"nullptr", "sizeof", "new", "delete", "template", "typename",
			"vector", "string", "cin", "cout", "endl", "pair", "map", "set",
			"sort", "push_back",
		],
		snippets: [
			{
				label: "main",
				detail: "competitive template",
				body:
					"#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tios::sync_with_stdio(false);\n\tcin.tie(nullptr);\n\t${0}\n\treturn 0;\n}",
			},
			{ label: "forr", detail: "for loop", body: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\n\t${0}\n}" },
			{ label: "cin", detail: "read from stdin", body: "cin >> ${0};" },
			{ label: "cout", detail: "write to stdout", body: 'cout << ${1:x} << "\\n";' },
			{ label: "vec", detail: "vector", body: "vector<${1:int}> ${2:v}(${3:n});" },
		],
	},
	c: {
		keywords: [
			"int", "long", "double", "float", "char", "void", "const", "static",
			"struct", "return", "if", "else", "for", "while", "do", "break",
			"continue", "switch", "case", "default", "sizeof", "printf", "scanf",
			"malloc", "free", "NULL",
		],
		snippets: [
			{
				label: "main",
				detail: "main + stdio",
				body: "#include <stdio.h>\n\nint main() {\n\t${0}\n\treturn 0;\n}",
			},
			{ label: "forr", detail: "for loop", body: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\n\t${0}\n}" },
			{ label: "scan", detail: "scanf int", body: 'scanf("%d", &${1:x});' },
			{ label: "print", detail: "printf int", body: 'printf("%d\\n", ${1:x});' },
		],
	},
	java: {
		keywords: [
			"public", "private", "protected", "static", "final", "class",
			"interface", "extends", "implements", "void", "int", "long", "double",
			"boolean", "char", "String", "return", "if", "else", "for", "while",
			"do", "break", "continue", "switch", "case", "new", "this", "true",
			"false", "null", "import", "Scanner", "System",
		],
		snippets: [
			{
				label: "main",
				detail: "Main class + Scanner",
				body:
					"import java.util.*;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tScanner sc = new Scanner(System.in);\n\t\t${0}\n\t}\n}",
			},
			{ label: "forr", detail: "for loop", body: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\n\t${0}\n}" },
			{ label: "sout", detail: "print", body: "System.out.println(${0});" },
			{ label: "readint", detail: "read int", body: "int ${1:n} = sc.nextInt();" },
		],
	},
	go: {
		keywords: [
			"package", "import", "func", "var", "const", "type", "struct",
			"interface", "return", "if", "else", "for", "range", "switch", "case",
			"default", "break", "continue", "map", "make", "append", "len", "cap",
			"nil", "true", "false", "fmt", "bufio", "os",
		],
		snippets: [
			{
				label: "main",
				detail: "main + fast reader",
				body:
					'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\treader := bufio.NewReader(os.Stdin)\n\t${0}\n\t_ = reader\n}',
			},
			{ label: "forr", detail: "for loop", body: "for ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n\t${0}\n}" },
			{ label: "scan", detail: "scan values", body: "fmt.Scan(&${1:x})" },
			{ label: "print", detail: "println", body: "fmt.Println(${0})" },
		],
	},
	rust: {
		keywords: [
			"fn", "let", "mut", "const", "struct", "enum", "impl", "trait", "pub",
			"use", "mod", "return", "if", "else", "match", "for", "while", "loop",
			"in", "break", "continue", "true", "false", "Some", "None", "Ok",
			"Err", "Vec", "String", "println", "vec",
		],
		snippets: [
			{
				label: "main",
				detail: "main + stdin reader",
				body:
					'use std::io::{self, Read};\n\nfn main() {\n\tlet mut input = String::new();\n\tio::stdin().read_to_string(&mut input).unwrap();\n\tlet mut it = input.split_whitespace();\n\t${0}\n}',
			},
			{ label: "forr", detail: "for loop", body: "for ${1:i} in 0..${2:n} {\n\t${0}\n}" },
			{ label: "print", detail: "println", body: 'println!("{}", ${0});' },
			{ label: "next", detail: "parse next token", body: "let ${1:x}: ${2:i64} = it.next().unwrap().parse().unwrap();" },
		],
	},
};

let registered = false;

/** Register keyword + snippet completion providers for the judge languages. */
export function registerCompletions(monaco: typeof Monaco) {
	if (registered) return;
	registered = true;

	for (const [lang, data] of Object.entries(DATA)) {
		monaco.languages.registerCompletionItemProvider(lang, {
			provideCompletionItems(model, position) {
				const word = model.getWordUntilPosition(position);
				const range: Monaco.IRange = {
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber,
					startColumn: word.startColumn,
					endColumn: word.endColumn,
				};

				const suggestions: Monaco.languages.CompletionItem[] = [
					...data.keywords.map((k) => ({
						label: k,
						kind: monaco.languages.CompletionItemKind.Keyword,
						insertText: k,
						range,
					})),
					...data.snippets.map((s) => ({
						label: s.label,
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: s.body,
						insertTextRules:
							monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						detail: s.detail,
						documentation: s.body,
						range,
					})),
				];

				return { suggestions };
			},
		});
	}
}
