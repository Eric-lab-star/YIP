import Image from "next/image";
import ImageClient from "./components/ImageClient";

export default async function Page( ) {


	return (
		<div className="relative">
			<div className="relative w-full h-150 rounded-md">
				<ImageClient />
			</div>
		</div>
	)
}
