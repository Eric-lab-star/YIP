import { joinProjToUser } from "@/app/lib/projToUser";
import { blackHanSans, notosansKorean, notosansKorean_500 } from "@/app/stores/font";

export default async function Page({ params }: {
	params: Promise<{userId: string}>
}) {
	try {
		const {userId} = await params;
		const user = await joinProjToUser(userId);
		if (!user ) {
			throw new Error("Could not find joined collection")
		}
		return (
			<div className={`${notosansKorean_500.className}  bg-amber-50 h-full  `}> 
				<div> {user.age} </div>
				<div> {user.projectDetails?.map((ps, i) => <div key={i}>{ps.name}<div> {ps.description}</div></div>)} </div>
			</div>
		)
	} catch (e) {
		console.log("Failed to get student/todo page")
		console.log(e);
		return <div>오늘의 과제를 불러오는데 실패했습니다. </div>
	}
}

function Header({name, className}:{name: string, className: string}){
	return 	<div className={className}>
		<span className="mr-2">{name}의 </span>
	  <span>Todo List </span>
	</div>
}
