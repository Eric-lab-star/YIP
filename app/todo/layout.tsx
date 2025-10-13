import { notosansKorean } from "@/app/stores/font";
import React from "react"

export default function Layout({ children }: {
	children: React.ReactNode;
} ) {
	return (
		<div className={` h-screen my-0 ${notosansKorean.className}`}>
			{children}
		</div>
	)
}
