
import { googleCode300 } from "@/app/stores/font";

export default function Code({children}: {children: React.ReactNode}) {
		return <span className={`px-1 py-[1px] rounded-xs text-rose-400 bg-zinc-300 ${googleCode300.className } text-sm`}>{children}</span>
}
