import Image from "next/image";
import { readSmartFactoryCollection } from "../lib/books/smartFactory"

export default async function Page() {
	const docs = await readSmartFactoryCollection();

	return (
		<div className="">
			<Image src={ docs[0].blurDataURL} width={docs[0].width} className="blur-lg" height={docs[0].height} alt="image" />
		</div>
	)
}


