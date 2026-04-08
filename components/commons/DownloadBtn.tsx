"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";


interface IDownloadBtn {
	fileKey: string;
	label?: string;
}

export default function DownloadBtn({
fileKey,
label="다운로드"
}:IDownloadBtn ) {

	const handleDownload = async () => {
		try {
			const res = await fetch(`/api/r2/download/${fileKey}`)

			if (!res.ok) {
				const errorData = await res.json()
				throw new Error(errorData.error ?? `HTTP ${res.status}`)
			}

			const {url}= await res.json()

			const a = document.createElement("a");
			a.href = url;
			a.download = fileKey
			document.body.appendChild(a);
			a.click();
			a.remove()
		} catch(error) {
			console.error(error)
			alert("다운로드중 에러 발생")
		}
	}


	return  <>
		<Card className="w-fit" onClick={handleDownload}>
			{label}
			<Image 
			src={`https://r2.kimkyungsub.com/${fileKey}`} 
			alt="player image" 
			width={48} height={48} 
			className=""/>
		</Card>
	</>
}
