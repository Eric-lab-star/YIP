"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function SlideShow({children}: {
	children: React.ReactNode
}) {
			return(
				<div className="relative">
					<div className="w-full h-150 bg-blue-400">{children}</div>
				<div className="z-10 absolute top-65 left-0"><ArrowBigLeft className="w-15 h-15 fill-black stroke-1"/></div>
				<div className="z-10 absolute top-65 right-0"><ArrowBigRight className="w-15 h-15 fill-black stroke-1"/></div>
			</div>
			)
}
