
import Image from "next/image";
import Link from "next/link";

import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";

import { imageMetadata } from "@/app/lib/r2/sharp/bluarData";
import { IMAGE_BASE_URL, r2GetSignedURL } from "@/app/lib/r2/utils";

async function getImageMetas() {

	const promises = Array.from({length: 10}, (_, i) => imageMetadata(`sandbox_${i + 1}.png`))

	return Promise.all(promises)
}

async function getImage(){
	const images = Array.from(
		{length: 10},
		(_, i) =>`${IMAGE_BASE_URL}/sandbox_${i + 1}.png`)
	return images
}

export default async function Howto(){
	const metas = await getImageMetas()
	const images = await getImage()

	return(
		<>
			<Title my="m" weight="semi" size="h2">제출 방법</Title>
			<Link target="_blank" href={"https://codesandbox.io/"}>
				<Text>1. 여기를 클릭해서 코드샌드박스로 이동! https://codesandbox.io </Text>
			</Link>
			<Text my="m" >2. 우측 상단에 signin 버튼 클릭!</Text>

			<Image 
				className="w-150 mx-auto"
				src={images[0]}
				placeholder="blur"
				blurDataURL={metas[0].blurDataURL}
				width={metas[0].width}
				height={metas[0].height}
				alt="sandbox"
			/>


			<Text my="m">3. 구글, 깃허브, 애플 계정으로 로그인.</Text>

			<Image 
				className="w-150 mx-auto"
				src={images[1]}
				placeholder="blur"
				blurDataURL={metas[1].blurDataURL}
				width={metas[1].width}
				height={metas[1].height}
				alt="sandbox"
			/>

			<Text my="m">4. 우측 상단에 create 버튼 클릭!</Text>

			<Image 
				className="w-150 mx-auto"
				src={images[2]}
				placeholder="blur"
				blurDataURL={metas[2].blurDataURL}
				width={metas[2].width}
				height={metas[2].height}
				alt="sandbox"
			/>
			<Text my="m">5. python 검색! </Text>


			<Image 
				className="w-150 mx-auto"
				src={images[3]}
				placeholder="blur"
				blurDataURL={metas[3].blurDataURL}
				width={metas[3].width}
				height={metas[3].height}
				alt="sandbox"
			/>

			<Text my="m">6. 가장 왼쪽에 있는 python 클릭 </Text>

			<Image 
				className="w-150 mx-auto"
				src={images[4]}
				placeholder="blur"
				blurDataURL={metas[4].blurDataURL}
				width={metas[4].width}
				height={metas[4].height}
				alt="sandbox"
			/>

			<Text my="m">7. create Devbox 클릭 </Text>


			<Image 
				className="w-150 mx-auto"
				src={images[5]}
				placeholder="blur"
				blurDataURL={metas[5].blurDataURL}
				width={metas[5].width}
				height={metas[5].height}
				alt="sandbox"
			/>

			<Text my="m">8. 왼쪽에서 main.py 클릭 </Text>


			<Image 
				className="w-150 mx-auto"
				src={images[6]}
				placeholder="blur"
				blurDataURL={metas[6].blurDataURL}
				width={metas[6].width}
				height={metas[6].height}
				alt="sandbox"
			/>
			<Text my="m">9. 중앙에 있는 시작버튼 누르면 코드가 실행됩니다. </Text>

			<Image 

				className="w-150 mx-auto"
				src={images[7]}
				placeholder="blur"
				blurDataURL={metas[7].blurDataURL}
				width={metas[7].width}
				height={metas[7].height}
				alt="sandbox"
			/>
			<Text my="m">10. 코드를 작성후 share 버튼을 클릭! </Text>

			<Image 

				className="w-150 mx-auto"
				src={images[8]}
				placeholder="blur"
				blurDataURL={metas[8].blurDataURL}
				width={metas[8].width}
				height={metas[8].height}
				alt="sandbox"
			/>


			<Text my="m">11. copy 버튼을 눌러서 링크 복사하기</Text>

			<Image 

				className="w-150 mx-auto"
				src={images[9]}
				placeholder="blur"
				blurDataURL={metas[9].blurDataURL}
				width={metas[9].width}
				height={metas[9].height}
				alt="sandbox"
			/>

			<Text my="m">12. 복사된 링크를 여기에 제출하기!</Text>
		</>

	)	
}
