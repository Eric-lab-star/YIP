"use client";

import { useState } from "react";
import {
  getAiUsersAction,
  setUserAiEnabledAction,
  resetUserAiUsageAction,
} from "@/app/actions/chatAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

type AiUser = {
  userId: string;
  name: string;
  role: string;
  used: number;
  enabled: boolean;
  unlimited: boolean;
};

export default function AiAdminDialog() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<AiUser[]>([]);
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await getAiUsersAction();
    setLoading(false);
    if (res.success) {
      setUsers(res.users);
      setLimit(res.limit);
    } else {
      toast.error("권한이 없습니다.");
    }
  };

  const toggle = async (user: AiUser) => {
    const next = !user.enabled;
    setPending(user.userId);
    const res = await setUserAiEnabledAction(user.userId, next);
    setPending(null);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === user.userId ? { ...u, enabled: next } : u
        )
      );
      toast.success(
        next ? "AI 채팅을 활성화했습니다." : "AI 채팅을 비활성화했습니다."
      );
    } else {
      toast.error(res.error ?? "변경에 실패했습니다.");
    }
  };

  const reset = async (user: AiUser) => {
    setPending(user.userId);
    const res = await resetUserAiUsageAction(user.userId);
    setPending(null);
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.userId === user.userId ? { ...u, used: 0 } : u))
      );
      toast.success("사용량을 초기화했습니다.");
    } else {
      toast.error(res.error ?? "초기화에 실패했습니다.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) load();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs" title="AI 채팅 관리">
          <ShieldCheck className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI 채팅 관리</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p className="text-sm text-muted-foreground py-4">불러오는 중...</p>
        ) : (
          <div className="max-h-96 overflow-y-auto divide-y">
            {users.map((u) => (
              <div
                key={u.userId}
                className="flex items-center justify-between gap-2 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {u.name}
                    {u.unlimited && (
                      <span className="ml-1 text-xs text-emerald-600">
                        (관리자)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {u.unlimited ? "무제한" : `오늘 ${u.used} / ${limit} 사용`}
                    {!u.enabled && " · 비활성화됨"}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!u.unlimited && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={pending === u.userId || u.used === 0}
                      onClick={() => reset(u)}
                    >
                      초기화
                    </Button>
                  )}
                  <Button
                    variant={u.enabled ? "outline" : "default"}
                    size="sm"
                    disabled={pending === u.userId}
                    onClick={() => toggle(u)}
                  >
                    {u.enabled ? "비활성화" : "활성화"}
                  </Button>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-sm text-muted-foreground py-4">
                사용자가 없습니다.
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
