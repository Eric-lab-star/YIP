"use client";
import { getBookData } from "@/app/lib/fetcher/smartFactoryImage";
import Image from "next/image";
import { tinyUrl } from "../../utils";

export default function ImageClient(){
	const {data, error, isLoading} = getBookData("smartFactoryIntro/smartFactoryIntro_000.webp")
	if (error) {
		return <div>Something went Wrong</div>
	}

	if (isLoading) {
		return <Image src={tinyUrl} alt="loading" width={3000} height={1688} />
	} else {
		if (data) {
		return <div>
			<Image src={data.url} width={data.width} height={data.height} blurDataURL={data.blurDataURL} placeholder="blur" alt={data.key} /> 
		</div>
		} else {
			<div>data not ready </div>
		}
	}

}

