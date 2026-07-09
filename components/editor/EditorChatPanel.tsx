"use client";

// 에디터 왼쪽에 세로로 길게 붙는 AI 글쓰기 도우미 패널.
// 현재 작성 중인 글 내용을 문맥으로 함께 보내 대화하며, AI의 답변을
// 버튼 한 번으로 본문에 삽입할 수 있다.
import { Editor } from "@tiptap/core";
import { CornerDownLeft, Loader2, Plus, Send, Sparkles, X } from "lucide-react";
import MarkdownIt from "markdown-it";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

// AI 답변은 마크다운으로 오므로, 삽입 시 HTML로 변환해 TipTap이
// 제목/굵게/코드블록/목록 등 서식을 실제로 렌더링하도록 한다.
const md = new MarkdownIt({ breaks: true, linkify: true });

interface Msg {
	role: "user" | "assistant";
	content: string;
}

const SUGGESTIONS = [
	"이 주제로 글의 개요를 잡아줘",
	"방금 쓴 문단을 더 자연스럽게 다듬어줘",
	"이 코드가 왜 안 되는지 설명해줘",
	"이 개념을 쉽게 설명해줘",
];

export default function EditorChatPanel({
	editor,
	onClose,
	className,
}: {
	editor: Editor;
	onClose?: () => void;
	className?: string;
}) {
	const [messages, setMessages] = useState<Msg[]>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const listRef = useRef<HTMLDivElement>(null);

	// 메시지가 추가되면 목록 컨테이너 안에서만 맨 아래로 스크롤한다.
	// (scrollIntoView는 window까지 스크롤시켜 전체 화면이 밀리는 문제가 있었다.)
	useEffect(() => {
		const el = listRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [messages]);

	const send = async (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || loading) return;
		setInput("");
		const next: Msg[] = [...messages, { role: "user", content: trimmed }];
		// 사용자 메시지 + 스트리밍을 채울 빈 AI 메시지를 함께 추가한다.
		setMessages([...next, { role: "assistant", content: "" }]);
		setLoading(true);

		try {
			const res = await fetch("/api/editor/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: next,
					document: editor.getText().slice(0, 6000),
				}),
			});
			if (!res.ok || !res.body) throw new Error("request failed");

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let acc = "";
			for (;;) {
				const { value, done } = await reader.read();
				if (done) break;
				acc += decoder.decode(value, { stream: true });
				setMessages((m) => {
					const copy = [...m];
					copy[copy.length - 1] = { role: "assistant", content: acc };
					return copy;
				});
			}
		} catch {
			setMessages((m) => {
				const copy = [...m];
				copy[copy.length - 1] = {
					role: "assistant",
					content: "AI 응답을 가져오지 못했습니다. 다시 시도해주세요.",
				};
				return copy;
			});
		} finally {
			setLoading(false);
		}
	};

	// AI 답변(마크다운)을 HTML로 변환해 커서 위치에 서식 그대로 삽입한다.
	// TipTap이 HTML을 에디터 스키마(제목·굵게·코드블록·목록 등)로 파싱한다.
	const insertToEditor = (text: string) => {
		const html = md.render(text);
		editor.chain().focus().insertContent(html).run();
	};

	return (
		<aside
			className={cn(
				"flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm",
				className,
			)}
		>
			{/* 헤더 */}
			<div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
				<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
					<Sparkles size={16} />
				</span>
				<p className="flex-1 text-sm font-semibold text-zinc-800">
					AI 글쓰기 도우미
				</p>
				{messages.length > 0 && (
					<button
						type="button"
						onClick={() => setMessages([])}
						className="rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
					>
						새 대화
					</button>
				)}
				{onClose && (
					<button
						type="button"
						onClick={onClose}
						aria-label="AI 도우미 닫기"
						className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
					>
						<X size={16} />
					</button>
				)}
			</div>

			{/* 메시지 목록 */}
			<div
				ref={listRef}
				className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4"
			>
				{messages.length === 0 ? (
					<div className="flex h-full flex-col items-center justify-center px-4 text-center">
						<span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-500">
							<Sparkles size={22} />
						</span>
						<p className="text-sm font-medium text-zinc-700">
							무엇이든 물어보세요
						</p>
						<p className="mt-1 text-xs text-zinc-400">
							글쓰기부터 프로그래밍·학술 질문까지 도와드려요.
						</p>
						<div className="mt-4 w-full space-y-1.5">
							{SUGGESTIONS.map((s) => (
								<button
									key={s}
									type="button"
									onClick={() => send(s)}
									className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-left text-xs text-zinc-600 transition-colors hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
								>
									{s}
								</button>
							))}
						</div>
					</div>
				) : (
					messages.map((m, i) => (
						<MessageBubble
							key={i}
							msg={m}
							streaming={loading && i === messages.length - 1}
							onInsert={insertToEditor}
						/>
					))
				)}
			</div>

			{/* 입력 */}
			<div className="border-t border-zinc-100 p-3">
				<div className="flex items-end gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2 transition-colors focus-within:border-purple-300 focus-within:bg-white">
					<textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								send(input);
							}
						}}
						rows={1}
						placeholder="AI에게 물어보거나 글쓰기를 요청하세요…"
						className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
					/>
					<button
						type="button"
						onClick={() => send(input)}
						disabled={loading || !input.trim()}
						aria-label="보내기"
						className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
					>
						{loading ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							<Send size={16} />
						)}
					</button>
				</div>
				<p className="mt-1.5 flex items-center gap-1 px-1 text-[11px] text-zinc-400">
					<CornerDownLeft size={11} /> 전송 · Shift+Enter 줄바꿈
				</p>
			</div>
		</aside>
	);
}

function MessageBubble({
	msg,
	streaming,
	onInsert,
}: {
	msg: Msg;
	streaming: boolean;
	onInsert: (text: string) => void;
}) {
	if (msg.role === "user") {
		return (
			<div className="flex justify-end">
				<div className="max-w-[85%] rounded-2xl rounded-br-sm bg-purple-600 px-3 py-2 text-sm whitespace-pre-wrap text-white">
					{msg.content}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-start gap-1">
			<div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-zinc-100 px-3 py-2 text-sm text-zinc-800">
				{msg.content ? (
					<Markdown content={msg.content} />
				) : streaming ? (
					<span className="inline-flex items-center gap-1 text-zinc-400">
						<Loader2 size={13} className="animate-spin" /> 생각 중…
					</span>
				) : null}
			</div>
			{!streaming && msg.content && (
				<button
					type="button"
					onClick={() => onInsert(msg.content)}
					className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-purple-600 transition-colors hover:bg-purple-50"
				>
					<Plus size={13} /> 본문에 삽입
				</button>
			)}
		</div>
	);
}

// 말풍선 안에서 마크다운을 렌더링한다. 좁은 폭에 맞춘 컴팩트한 서식이며,
// 타이포그래피 플러그인 없이 자식 선택자로 스타일을 자체 정의한다.
function Markdown({ content }: { content: string }) {
	return (
		<div
			className={cn(
				"space-y-2 text-sm leading-relaxed break-words",
				"[&_p]:m-0",
				"[&_a]:font-medium [&_a]:text-purple-600 [&_a]:underline",
				"[&_strong]:font-semibold",
				"[&_h1]:mt-1 [&_h1]:text-base [&_h1]:font-bold [&_h2]:mt-1 [&_h2]:text-sm [&_h2]:font-bold [&_h3]:mt-1 [&_h3]:font-semibold",
				"[&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5",
				"[&_code]:rounded [&_code]:bg-zinc-200/80 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[12px]",
				"[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-zinc-900 [&_pre]:p-3",
				"[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[12px] [&_pre_code]:text-zinc-100",
				"[&_blockquote]:border-l-2 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-3 [&_blockquote]:text-zinc-500",
				"[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_th]:border [&_th]:border-zinc-300 [&_th]:px-2 [&_th]:py-1 [&_td]:border [&_td]:border-zinc-200 [&_td]:px-2 [&_td]:py-1",
			)}
		>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	);
}
