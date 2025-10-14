import { smartFactoryBook } from "../utils"
import Image from "next/image";

export default async function page({
	params
}: {
	params: Promise<{doc: string}>
}){
	const { doc } = await params
	let page:smartFactoryBook = {
		doc: "issue",
		title: "이슈 알아보기",
		images: [],
	};

	for (const book of smartFactoryBook) {
		if (doc == book.doc) {
			page = book
		}
	}
	return (
		<div>
			<Images images={page.images} />
		</div>
		
	)
}


function Images({images}: {images: smartFactoryBook["images"]}){
	return (
		<div className="space-y-3">
			{mapper(images)}
		</div>
	)
}



function mapper(images: smartFactoryBook["images"]) {
	return images.map((image) => {
		return (
			<div key={image.src} className="space-y-3">
				<div  className={`relative w-full h-150`}>
					<Image src={image.src} className="rounded-md" fill={true} alt={image.alt} />
				</div>
				<div>
					{image.video && <image.video className={"rounded-md w-full h-140"} />}
				</div>
			</div>
		)
	})

}
