
"use client";

import { createContext, useContext, useMemo, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

interface layoutCtx{
	isSideBarOpen: boolean
	setIsSideBarOpen: (isOpen: boolean) => void;
}

const LayoutContext = createContext<layoutCtx | null>(null);

export function useLayoutCtx() {
	const ctx = useContext(LayoutContext);
	if (!ctx) throw new Error("LayoutContext Wrapper isn't found")
	return ctx;
}


export default function LayoutContextWrapper({children}: {children: React.ReactNode}) {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const value = useMemo(()=> ({
		isSideBarOpen,
		setIsSideBarOpen
	}),[isSideBarOpen, setIsSideBarOpen])

	return (
		<LayoutContext value={value}>
			<div className="lg:w-[1300px] md:w-[1000px] sm:w-[800px] w-full h-screen flex flex-col overflow-hidden">
				<Header />
				<div className="flex flex-1 min-h-0 bg-zinc-100">
					<SideBar />
					<div className="flex-1 overflow-y-scroll">
						{children}
					</div>
				</div>
			</div>
		</LayoutContext>
	)
}

