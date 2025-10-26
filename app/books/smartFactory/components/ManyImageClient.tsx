"use client";

import { getManyBookData } from "@/app/lib/fetcher/smartFactoryImage";

export default function ManyImageClient(){
	const {data, error, isLoading} = getManyBookData(1, 10);
	if (error) {
		return <div>something went wrong</div>
	}

	if (isLoading) {
		return <div></div>
	} else {
		
	}
	return (
		<div>
		</div>
	)
}
