import Link from "next/link";
import { notosansKorean_500, orbit } from "../stores/font";
import { books } from "./utils";

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
		<div  className="w-full grid grid-cols-4 gap-3">
		{
			books.map((book) => {
				return (
				<Link key={book.label} href={book.path} className="h-20" >
					<div className="h-full w-full rounded-md bg-zinc-50 flex justify-center items-center">
						<div className={`${orbit.className} text-2xl`}>{book.label}</div>
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
				우리 학원은 학생들이 아두이노를 통해 창의적인 아이디어를 실제로 구현할 수 있는 능력을 기르는 것을 목표로 합니다. 센서와 코딩을 활용한 다양한 프로젝트를 통해 논리적 사고력과 문제 해결 능력을 키우며, 스스로 설계하고 완성하는 과정에서 공학적 사고와 성취감을 경험하도록 돕습니다.
				</div>
		</div>
	)
}

function Goal() {
	return (
		<div>
		  <div className={`${notosansKorean_500.className}`}> 교육 목표 </div>
			<div>
				우리 학원은 학생들이 아두이노를 통해 창의적인 아이디어를 실제로 구현할 수 있는 능력을 기르는 것을 목표로 합니다. 센서와 코딩을 활용한 다양한 프로젝트를 통해 논리적 사고력과 문제 해결 능력을 키우며, 스스로 설계하고 완성하는 과정에서 공학적 사고와 성취감을 경험하도록 돕습니다.
				
			</div>
		</div>
	)
}
