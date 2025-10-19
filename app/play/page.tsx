"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { getBlurData } from "../lib/fetcher/blur";

export default function Page() {
	const {blurURL, error, isLoading} = getBlurData("smartFactoryIntro/smartFactoryIntro_000.webp")

	return (
		<div className="">
			<button>open image</button>
			<div className="w-300 h-100">
				<Image blurDataURL={blurURL} placeholder={isLoading ? "empty" : "blur"} 
				src="/api/r2/smartFactoryIntro/smartFactoryIntro_000.webp" 
				width={200} height={100} alt="image" className="h-auto w-full" priority />
			</div>
		</div>
	)
}


