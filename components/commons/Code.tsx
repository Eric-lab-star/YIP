import { d2coding } from "@/fonts/local";

export default function Code({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`px-1 py-[1px] rounded-xs text-rose-400 bg-zinc-300 ${d2coding.className} text-sm`}
    >
      {children}
    </span>
  );
}
