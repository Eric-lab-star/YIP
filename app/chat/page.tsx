"use client";

import { useState, useEffect, useRef } from "react";
import type PusherClient from "pusher-js";
import { getPusher } from "@/lib/pusher-singleton";
import useUser from "@/components/SWR/auth/user";
import { useChatStore } from "@/app/lib/store/chatStore";
import { RoomIcon } from "@/components/commons/ChatRoomList";
import ChatMarkdown from "@/components/commons/ChatMarkdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  clearRoomMessagesAction,
  clearMyRoomMessagesAction,
  deleteMessageAction,
} from "@/app/actions/chatAction";
import { Copy, Send, Trash2 } from "lucide-react";
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
  // Right-click delete menu for the user's own messages.
  const [ctxMenu, setCtxMenu] = useState<{
    x: number;
    y: number;
    id: string;
  } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Long-press timer for opening the delete menu on touch devices, which have
  // no right-click. Cleared if the finger moves or lifts before the threshold.
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Set when the menu is opened by long-press, so the trailing synthetic click
  // is ignored by the dismiss handler.
  const skipNextClick = useRef(false);

  // Open the delete menu, clamping the position so it never overflows the
  // viewport edges (the menu is anchored bottom-right via translate).
  const openCtxMenu = (x: number, y: number, id: string) => {
    const clampedX = Math.min(x, window.innerWidth - 8);
    const clampedY = Math.min(y, window.innerHeight - 60);
    setCtxMenu({ x: clampedX, y: clampedY, id });
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const startLongPress = (x: number, y: number, id: string) => {
    cancelLongPress();
    longPressTimer.current = setTimeout(() => {
      skipNextClick.current = true;
      openCtxMenu(x, y, id);
    }, 500);
  };

  // Dismiss the context menu on any outside click or Escape. A long-press on
  // touch fires a synthetic click on release; skip that one so the menu we
  // just opened isn't closed immediately (desktop right-click closes normally).
  useEffect(() => {
    if (!ctxMenu) return;
    const close = () => {
      if (skipNextClick.current) {
        skipNextClick.current = false;
        return;
      }
      setCtxMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCtxMenu(null);
    window.addEventListener("click", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [ctxMenu]);

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
      channel.bind(
        "messages-cleared",
        (data: { scope: "all" | "user"; userId?: string }) => {
          setMessages((prev) =>
            data.scope === "all"
              ? []
              : prev.filter((m) => m.userId !== data.userId),
          );
        },
      );
      channel.bind("message-deleted", (data: { id: string }) => {
        setMessages((prev) => prev.filter((m) => m.id !== data.id));
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
        // "exact" / "semantic" = served from cache (no model call), "miss" = live model.
        const cacheSource = res.headers.get("X-AI-Cache");
        console.log(`[AI cache] ${cacheSource ?? "unknown"}`);
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

  // Who may wipe the whole room: an admin in a public room, or the owner of an
  // AI room. Private rooms only ever allow clearing your own messages.
  const canClearAll =
    !!selectedRoom &&
    ((selectedRoom.type === "public" && user.role === "admin") ||
      (selectedRoom.type === "ai" && selectedRoom.createdBy === currentUserId));

  const handleClearAll = async () => {
    if (!selectedRoom) return;
    if (!window.confirm("이 채팅방의 모든 메시지를 삭제할까요?")) return;
    const res = await clearRoomMessagesAction(selectedRoom._id);
    if (res.success) {
      setMessages([]);
      toast.success("채팅 기록을 초기화했습니다.");
    } else {
      toast.error(res.error ?? "초기화에 실패했습니다.");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    setCtxMenu(null);
    const res = await deleteMessageAction(id);
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      toast.error(res.error ?? "삭제에 실패했습니다.");
    }
  };

  const handleClearMine = async () => {
    if (!selectedRoom) return;
    if (!window.confirm("내가 보낸 메시지를 모두 삭제할까요?")) return;
    const res = await clearMyRoomMessagesAction(selectedRoom._id);
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m.userId !== currentUserId));
      toast.success("내 메시지를 삭제했습니다.");
    } else {
      toast.error(res.error ?? "삭제에 실패했습니다.");
    }
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] max-w-6xl mx-auto">
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RoomIcon type={selectedRoom.type} />
                <h2 className="font-semibold">{selectedRoom.name}</h2>
              </div>
              <div className="flex items-center gap-2">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      title="채팅 기록 관리"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {canClearAll && (
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={handleClearAll}
                      >
                        전체 기록 초기화
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleClearMine}>
                      내 메시지 삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
                      onContextMenu={
                        isMe
                          ? (e) => {
                              e.preventDefault();
                              openCtxMenu(e.clientX, e.clientY, msg.id);
                            }
                          : undefined
                      }
                      onTouchStart={
                        isMe
                          ? (e) => {
                              const t = e.touches[0];
                              startLongPress(t.clientX, t.clientY, msg.id);
                            }
                          : undefined
                      }
                      onTouchMove={isMe ? cancelLongPress : undefined}
                      onTouchEnd={isMe ? cancelLongPress : undefined}
                      onTouchCancel={isMe ? cancelLongPress : undefined}
                      className={`max-w-md px-4 py-2 rounded-2xl select-none ${
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
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(msg.message);
                          toast.success("복사되었습니다.");
                        }}
                        className="mt-1.5 flex items-center gap-1 text-xs opacity-60 hover:opacity-100"
                        title="복사"
                      >
                        <Copy className="size-3.5" />
                        복사
                      </button>
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

            <div className="p-4 border-t flex flex-col gap-2">
              {input.trim() && (
                <div className="max-h-40 overflow-y-auto rounded-md border bg-muted/40 px-3 py-2">
                  <div className="text-xs opacity-70 mb-1 font-medium">
                    미리보기
                  </div>
                  <ChatMarkdown content={input} />
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing) return;
                    // Enter 는 줄바꿈, Cmd/Ctrl+Enter 로 전송
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                  placeholder="메시지를 입력하세요... (Cmd/Ctrl+Enter 로 전송)"
                  disabled={sending}
                  className="max-h-40 min-h-10 resize-none"
                />
                <Button
                  onClick={sendMessage}
                  disabled={sending || !input.trim()}
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>

            {ctxMenu && (
              <div
                className="fixed z-50 min-w-32 -translate-x-full rounded-md border bg-popover p-1 shadow-md"
                style={{ top: ctxMenu.y, left: ctxMenu.x }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteMessage(ctxMenu.id)}
                >
                  <Trash2 className="size-4" />
                  메시지 삭제
                </button>
              </div>
            )}
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
