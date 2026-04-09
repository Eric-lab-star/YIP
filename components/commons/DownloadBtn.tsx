"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardHeader as CardFooter } from "../ui/card";
import { useState } from "react";
import { DownloadCloud } from "lucide-react";


interface IDownloadBtn {
	fileKey: string;
	label?: string;
	eager?: boolean;
}

export default function DownloadBtn({
	fileKey,
	label = "다운로드",
	eager = false
}: IDownloadBtn) {
	const [loading, setLoding] = useState(false)

	const handleDownload = async () => {
		if (loading) return;
		console.log("downloading...")
		try {
			setLoding(true)
			const res = await fetch(`/api/r2/download/${fileKey}`)

			if (!res.ok) {
				const errorData = await res.json()
				throw new Error(errorData.error ?? `HTTP ${res.status}`)
			}

			const { url } = await res.json()

			const a = document.createElement("a");
			a.href = url;
			a.download = fileKey
			document.body.appendChild(a);
			a.click();
			a.remove()
			setLoding(false)
		} catch (error) {
			console.error(error)
			alert("다운로드중 에러 발생")
		}
	}


	return <>
		<Card className="w-50 relative pt-0 overflow-clip" onClick={handleDownload}>
			<div className="group absolute  flex justify-center items-center inset-0 hover:bg-gray hover:backdrop-blur-xs w-full h-full z-30 cursor-pointer">
				<div className="opacity-0 group-hover:opacity-100">
					<DownloadCloud className="mx-auto" color="#1f7adb" size={40}/>
					<div className="text-2xl font-bold">다운로드 받기</div>
				</div>
			</div >

			<Image
				src={`https://r2.kimkyungsub.com/${fileKey}`}
				alt="player image"
				width={48} height={48}
				className="w-50 h-40 object-contain p-2  relative top-0 z-20"
				loading={eager ? "eager" : "lazy"}
				/>
				
			<CardFooter className="relative bottom-0">
				<Button className="w-full">{label}</Button>
			</CardFooter>
		</Card>
	</>
}
