import Link from "next/link";
import { notosansKorean_500 } from "../stores/font";
import { books } from "./utils";
import Image from "next/image";


export default async function Page() {
	return (
		<div className={`space-y-3 text-lg `}>
			<Intoduction />
			<Goal />
			<Books />
		</div>
	)

}

function Books() {

	return (
		<div  className="w-full min-h-100 max-h-max grid grid-cols-4 gap-3">
		{
			books.map((book) => {
				return (
				<Link key={book.label} href={book.path} >
					<div  className="rounded-md bg-zinc-50">
						<Image src={"/arduboy.jpg"} width={100} height={100} alt="image" />
					</div>
				</ Link>)
			})
		}
		</div>
	)
}


function Intoduction (){
	return (
			<div>
				<div className={`${notosansKorean_500.className}`}> 학원 교제방 소개 </div>
				<div>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan pulvinar elit, vitae semper sapien sodales sed. Maecenas gravida cursus tellus quis elementum. Proin sed enim eu nisi tempor sodales vitae quis elit. Cras mattis gravida felis. Maecenas auctor velit quam, at finibus ante rutrum vitae. Pellentesque lobortis justo ante. Curabitur at ultricies nisi, sit amet scelerisque nisi. Vivamus id sem lectus. Cras consequat ante at lacus accumsan placerat. Aenean aliquet, quam quis blandit mattis, metus nunc fermentum urna, ac sodales urna tellus eu turpis. Etiam id vestibulum nunc, non ullamcorper sapien. Vestibulum ante odio, eleifend a interdum egestas, consectetur non libero. Maecenas et fermentum massa, et convallis risus. Sed dignissim ligula id dui ultrices dapibus.
				</div>
		</div>
	)
}

function Goal() {
	return (
		<div>
		  <div className={`${notosansKorean_500.className}`}> 교육 목표 </div>
			<div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan pulvinar elit, vitae semper sapien sodales sed. Maecenas gravida cursus tellus quis elementum. Proin sed enim eu nisi tempor sodales vitae quis elit. Cras mattis gravida felis. Maecenas auctor velit quam, at finibus ante rutrum vitae. Pellentesque lobortis justo ante. Curabitur at ultricies nisi, sit amet scelerisque nisi. Vivamus id sem lectus. Cras consequat ante at lacus accumsan placerat. Aenean aliquet, quam quis blandit mattis, metus nunc fermentum urna, ac sodales urna tellus eu turpis. Etiam id vestibulum nunc, non ullamcorper sapien. Vestibulum ante odio, eleifend a interdum egestas, consectetur non libero. Maecenas et fermentum massa, et convallis risus. Sed dignissim ligula id dui ultrices dapibus.
			</div>
		</div>
	)
}
