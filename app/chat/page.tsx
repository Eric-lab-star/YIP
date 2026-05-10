"use client";

import { useState, useEffect, useRef } from "react";
import PusherClient from "pusher-js";
import { getPusher } from "@/lib/pusher-singleton";
type Message = {
  id: string;
  message: string;
  user: number;
  timestamp: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    let cancelled = false;
    let channel: ReturnType<PusherClient["subscribe"]> | null = null;

    const handler = (data: Message) => {
      setMessages((prev) => {
        if (prev.some((msg) => msg.id === data.id)) return prev;
        return [...prev, data];
      });
    };

    (async () => {
      const pusher = await getPusher();
      if (cancelled) return;

      channel = pusher.subscribe("chat-room");
      channel.bind("new-message", handler);
    })();

    return () => {
      cancelled = true;
      channel?.unbind("new-message", handler);
      channel?.unsubscribe();
    };
  }, []);
  // 2. 새 메시지 오면 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. 메시지 전송
  const sendMessage = async () => {
    if (!input.trim()) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, user }),
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="mb-2 text-sm text-gray-500">
        사용자 번호 <span className="font-bold">{user}</span>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.user === user ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.user === user ? "bg-blue-500 text-white" : "bg-white border"
              }`}
            >
              <div className="text-xs opacity-70 mb-1">{msg.user}</div>
              <div>{msg.message}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            e.key === "Enter" && sendMessage();
          }}
          placeholder="메시지를 입력하세요..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </div>
  );
}
