import { imageMetadata } from "@/app/lib/r2/sharp/bluarData";
import { IMAGE_BASE_URL } from "@/app/lib/r2/utils";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Image from "next/image";

export default async function Page() {
	const svgMeta = await imageMetadata("rgb.svg")

	return (
		<div className="mb-50">
			<Title my="m" > and or not </Title>
			<Text> 이번에는 and와 or 에 대해서 배워봐요.and 와 or는 더 복잡한 조건을 만들때 사용할 수 있어요. 예를 들어서 빛의 3원색을 이용해서 색의 조합을 알려주는 프로그램을 작성할려면 어떻게 해야 할까요?</Text>
			<div className="w-full flex justify-center items-center">
				<Image placeholder="blur" width={svgMeta.width} blurDataURL={svgMeta.blurDataURL}  height={svgMeta.height} src={`${IMAGE_BASE_URL}/rgb.svg`} alt="rgb.svg" />
			</div>
			
			
		</div>
	)
}
