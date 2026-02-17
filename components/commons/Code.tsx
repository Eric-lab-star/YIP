


import { Google_Sans_Code } from "next/font/google";

const googleCode300 =  Google_Sans_Code({weight: "300"})

export default function Code({children}: {children: React.ReactNode}) {
		return <span className={`px-1 py-[1px] rounded-xs text-rose-400 bg-zinc-300 ${googleCode300.className } text-sm`}>{children}</span>
}
