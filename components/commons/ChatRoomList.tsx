"use client";

import { useState, useEffect, useRef } from "react";
import useUser from "@/components/SWR/auth/user";
import {
  createChatRoomAction,
  joinRoomByCodeAction,
  leaveRoomAction,
  deleteRoomAction,
} from "@/app/actions/chatAction";
import { useChatStore, type SerializedRoom } from "@/app/lib/store/chatStore";
import AiAdminDialog from "./AiAdminDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, LogIn, Copy, Bot, Globe, Lock, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ChatRoomList() {
  const { user } = useUser();
  const { rooms, selectedRoom, setSelectedRoom, loadRooms } = useChatStore();
  const currentUserId = user?.success ? user.id : null;

  useEffect(() => {
    if (user?.success) loadRooms();
  }, [user, loadRooms]);

  const handleRemoved = (roomId: string) => {
    if (selectedRoom?._id === roomId) setSelectedRoom(null);
    loadRooms();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">채팅방</h2>
        <div className="flex gap-1">
          {user?.success && user.role === "admin" && <AiAdminDialog />}
          <JoinRoomDialog onJoined={loadRooms} />
          <CreateRoomDialog onCreated={loadRooms} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <div
            key={room._id}
            className={`group w-full px-4 py-3 flex items-center gap-2 hover:bg-accent transition-colors ${
              selectedRoom?._id === room._id ? "bg-accent" : ""
            }`}
          >
            <button
              onClick={() => setSelectedRoom(room)}
              className="flex-1 min-w-0 text-left flex items-center gap-2"
            >
              <RoomIcon type={room.type} />
              <span className="truncate">{room.name}</span>
            </button>
            {room.type === "private" && (
              <RoomLeaveButton
                room={room}
                currentUserId={currentUserId}
                onRemoved={handleRemoved}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomLeaveButton({
  room,
  currentUserId,
  onRemoved,
}: {
  room: SerializedRoom;
  currentUserId: string | null;
  onRemoved: (roomId: string) => void;
}) {
  const [pending, setPending] = useState(false);
  const isOwner = currentUserId !== null && room.createdBy === currentUserId;

  const handle = async () => {
    if (pending) return;
    if (isOwner && !window.confirm("채팅방과 모든 메시지를 삭제할까요?")) return;
    setPending(true);
    const res = isOwner
      ? await deleteRoomAction(room._id)
      : await leaveRoomAction(room._id);
    setPending(false);
    if (res.success) {
      onRemoved(room._id);
      toast.success(isOwner ? "채팅방을 삭제했습니다." : "채팅방을 나갔습니다.");
    } else {
      toast.error(res.error ?? "처리에 실패했습니다.");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      disabled={pending}
      onClick={handle}
      title={isOwner ? "삭제" : "나가기"}
      className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 shrink-0"
    >
      {isOwner ? (
        <Trash2 className="size-4 text-destructive" />
      ) : (
        <LogOut className="size-4" />
      )}
    </Button>
  );
}

export function RoomIcon({ type }: { type: string }) {
  if (type === "ai") return <Bot className="size-4 text-emerald-500 shrink-0" />;
  if (type === "public")
    return <Globe className="size-4 text-blue-500 shrink-0" />;
  return <Lock className="size-4 text-amber-500 shrink-0" />;
}

function CreateRoomDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  // Synchronous lock: `loading` state updates too late to block a second
  // submit fired in the same tick (e.g. an IME-confirm Enter immediately
  // followed by a real Enter), which would create the room twice.
  const submitting = useRef(false);

  const handleCreate = async () => {
    if (!name.trim() || submitting.current) return;
    submitting.current = true;
    setLoading(true);
    try {
      const res = await createChatRoomAction(name.trim());
      if (res.success) {
        setInviteCode(res.inviteCode);
        onCreated();
        toast.success("채팅방이 생성되었습니다.");
      }
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setName("");
          setInviteCode("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <Plus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 채팅방 만들기</DialogTitle>
        </DialogHeader>
        {inviteCode ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              채팅방이 생성되었습니다. 아래 초대 코드를 공유하세요:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted px-3 py-2 rounded-md text-center font-mono">
                {inviteCode}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(inviteCode);
                  toast.success("복사되었습니다.");
                }}
              >
                <Copy className="size-3.5" />
              </Button>
            </div>
            <Button className="w-full" onClick={() => setOpen(false)}>
              확인
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="채팅방 이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key === "Enter") handleCreate();
              }}
            />
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={loading || !name.trim()}
            >
              만들기
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function JoinRoomDialog({ onJoined }: { onJoined: () => void }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);

  const handleJoin = async () => {
    if (!code.trim() || submitting.current) return;
    submitting.current = true;
    setLoading(true);
    try {
      const res = await joinRoomByCodeAction(code.trim());
      if (res.success) {
        onJoined();
        setOpen(false);
        setCode("");
        toast.success("채팅방에 참가했습니다.");
      } else {
        toast.error(res.error);
      }
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setCode("");
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <LogIn className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>초대 코드로 참가</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="초대 코드 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === "Enter") handleJoin();
            }}
          />
          <Button
            className="w-full"
            onClick={handleJoin}
            disabled={loading || !code.trim()}
          >
            참가하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
