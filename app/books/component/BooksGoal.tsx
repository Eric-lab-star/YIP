import { notosansKorean_500 } from "@/app/stores/font";

export default function Goal() {
	return (
		<div>
		  <div className={`${notosansKorean_500.className}`}> 교육 목표 </div>
			<div>{Description} </div>
		</div>
	)
}

const Description =`
우리 학원은 학생들이 아두이노를 통해 창의적인 아이디어를 실제로 구현할 수 있는 능력을 기르는 것을
목표로 합니다. 센서와 코딩을 활용한 다양한 프로젝트를 통해 논리적 사고력과 문제 해결 능력을 키우며,
스스로 설계하고 완성하는 과정에서 공학적 사고와 성취감을 경험하도록 돕습니다.
`
