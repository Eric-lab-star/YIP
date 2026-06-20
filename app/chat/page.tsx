"use client";

import { useState, useEffect, useRef } from "react";
import type PusherClient from "pusher-js";
import { getPusher } from "@/lib/pusher-singleton";
import useUser from "@/components/SWR/auth/user";
import { useChatStore } from "@/app/lib/store/chatStore";
import { RoomIcon } from "@/components/commons/ChatRoomList";
import ChatMarkdown from "@/components/commons/ChatMarkdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Send } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
};

export default function ChatPage() {
  const { user, isLoading: authLoading } = useUser();
  const { selectedRoom } = useChatStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [aiStreaming, setAiStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedRoom) return;

    let cancelled = false;
    let channel: ReturnType<PusherClient["subscribe"]> | null = null;

    (async () => {
      const res = await fetch(`/api/messages?roomId=${selectedRoom._id}`);
      if (!cancelled) {
        const data: Message[] = await res.json();
        setMessages(data);
      }

      const pusher = await getPusher();
      if (cancelled) return;

      channel = pusher.subscribe(`chat-${selectedRoom._id}`);
      channel.bind("new-message", (msg: Message) => {
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      });
    })();

    return () => {
      cancelled = true;
      channel?.unbind_all();
      channel?.unsubscribe();
      setMessages([]);
    };
  }, [selectedRoom]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  const sendMessage = async () => {
    if (!input.trim() || !selectedRoom || sending) return;
    setSending(true);
    const text = input;
    setInput("");

    try {
      if (selectedRoom.type === "ai") {
        setAiStreaming(true);
        setStreamingText("");
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, roomId: selectedRoom._id }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          toast.error(err?.error ?? "AI 응답을 가져오지 못했습니다.");
          setInput(text);
          setAiStreaming(false);
          setStreamingText("");
          return;
        }
        if (res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulated += decoder.decode(value, { stream: true });
            setStreamingText(accumulated);
          }
        }
        setAiStreaming(false);
        setStreamingText("");
      } else {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, roomId: selectedRoom._id }),
        });
      }
    } finally {
      setSending(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        로딩 중...
      </div>
    );
  }

  if (!user?.success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">
          채팅을 사용하려면 로그인이 필요합니다.
        </p>
      </div>
    );
  }

  const currentUserId = user.id;

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-6xl mx-auto">
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RoomIcon type={selectedRoom.type} />
                <h2 className="font-semibold">{selectedRoom.name}</h2>
              </div>
              {selectedRoom.type === "private" && selectedRoom.inviteCode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedRoom.inviteCode);
                    toast.success("초대 코드가 복사되었습니다.");
                  }}
                >
                  <Copy className="size-3.5" />
                  초대 코드
                </Button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isMe = msg.userId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        msg.userId === "ai"
                          ? "bg-emerald-50 border border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800"
                          : isMe
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                      }`}
                    >
                      <div className="text-xs opacity-70 mb-1 font-medium">
                        {msg.userName}
                      </div>
                      <ChatMarkdown content={msg.message} />
                    </div>
                  </div>
                );
              })}
              {aiStreaming && streamingText && (
                <div className="flex justify-start">
                  <div className="max-w-md px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800">
                    <div className="text-xs opacity-70 mb-1 font-medium">
                      AI 도우미
                    </div>
                    <ChatMarkdown content={streamingText} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="메시지를 입력하세요..."
                disabled={sending}
              />
              <Button onClick={sendMessage} disabled={sending || !input.trim()}>
                <Send className="size-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            사이드 바에서 채팅방을 선택하세요.
          </div>
        )}
      </div>
    </div>
  );
}
