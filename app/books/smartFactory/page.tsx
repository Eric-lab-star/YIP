import Image from "next/image";

export default async function Page( ) {
	return (
		<div className="relative">
			<div className="relative w-full h-150 rounded-md">
				<Image fill={true} src={"/smartFactoryIntro/smartFactoryIntro_000.webp"} alt={"smart factory book title image"} className="rounded-md" />
			</div>
		</div>
	)
}
