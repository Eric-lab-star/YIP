"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function Page() {
	const [blur, setBlur] = useState("");
	useEffect(()=> {
		const fetcher = async() => {
			const res = await fetch("/api/r2blur/smartFactoryIntro/smartFactoryIntro_000.webp" );
			const json  = await res.json();
			setBlur(json.blurDataURL)
		}
		fetcher()
	},[])

	return (
		<div className="">
			<button>open image</button>
			<div className="bg-[url(/api/r2/smartFactoryIntro/smartFactoryIntro_000.webp)] w-20 h-20 bg-no-repeat"></div>

			<div className="w-300 h-100">
				<Image blurDataURL="data:image/webp;base64,UklGRowAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSBQAAAABD9D/iAiQCVhs9M/skyGi/7lyAFZQOCBSAAAA0AEAnQEqCgAGAAFAJiWwAnQBDwxiagAA/v5FD+bff4ijtDyIlH0n2FV8KG74/hkn13bNdE91NLbzbe5+K8+Yarj++nloP2AcqDZX/sE8CwAAAA==" placeholder="blur" src="/api/r2/smartFactoryIntro/smartFactoryIntro_000.webp" width={200} height={100} alt="image" className="h-auto w-full" priority />
			</div>
			
			
		</div>
	)
}
