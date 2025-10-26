"use client";
import { getBookData } from "@/app/lib/fetcher/smartFactoryImage";
import Image from "next/image";

export default function ImageClient(){
	const {data, error, isLoading} = getBookData("smartFactoryIntro/smartFactoryIntro_000.webp")
	if (error || !data) {
		return <div>Something went Wrong</div>
	}

	return <div>
	{isLoading ? <div>Loading</div> : <Image src={data.url} width={data.width} height={data.height} blurDataURL={data.blurDataURL} placeholder="blur" alt={data.key} /> }
	</div>
	
}
