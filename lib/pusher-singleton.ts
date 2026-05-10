"use client";

import type PusherClient from "pusher-js";

// 모듈 스코프에 단 하나의 인스턴스 + 진행 중인 초기화 약속
let pusherInstance: PusherClient | null = null;
let initPromise: Promise<PusherClient> | null = null;

export async function getPusher(): Promise<PusherClient> {
  // 이미 만들어졌으면 재사용
  if (pusherInstance) return pusherInstance;

  // 초기화 중이면 그 약속을 반환 (동시 호출도 안전)
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const Pusher = (await import("pusher-js")).default;
    pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    return pusherInstance;
  })();

  return initPromise;
}
