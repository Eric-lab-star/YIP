
"use client";

import { createContext, useContext, useMemo, useState } from "react";
import Header from "./Header";
import AppSideBar from "./AppSideBar";

export interface layoutCtx {
	isSideBarOpen: boolean
	setIsSideBarOpen: (isOpen: boolean) => void;
}

const LayoutContext = createContext<layoutCtx | null>(null);

export function useLayoutCtx() {
	const ctx = useContext(LayoutContext);
	if (!ctx) throw new Error("LayoutContext Wrapper isn't found")
	return ctx;
}

export default function LayoutContextWrapper({ children }: { children: React.ReactNode }) {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const value = useMemo(() => ({
		isSideBarOpen,
		setIsSideBarOpen
	}), [isSideBarOpen, setIsSideBarOpen])

	return (
		<LayoutContext value={value}>
			<div className="xl:w-7xl lg:w-5xl md:w-3xl sm:w-160  w-full h-dvh flex flex-col">
				<Header />
				<div className="overflow-y-auto flex flex-1 min-h-0 bg-zinc-100">
					<AppSideBar />
					<div className="flex-1 overflow-y-auto">
						{children}
					</div>
				</div>
			</div>
		</LayoutContext>
	)
}

