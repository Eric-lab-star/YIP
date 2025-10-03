import Curriculum from "./Curriculum"
import Projects from "./Projects"

			{/* <div> */}
			{/* 	<Projects> */}
			{/* 		<Arduboy /> */}
			{/* 		<Calculator /> */}
			{/* 		<Layzer /> */}
			{/* 		<SmartFactory /> */}
			{/* 		<GamePad /> */}
			{/* 		<Entry /> */}
			{/* 	</Projects> */}
			{/* 	<Class> */}
			{/* 		<Curriculum /> */}
			{/* 		<ClassAlbum /> */}
			{/* 	</Class> */}
			{/* 	<Champions /> */}
			{/* </div> */}

export default function GeneralContents() {
	return(
		<div className="lg:col-span-4  flex flex-col gap-3">
			<Projects/>
			<Curriculum />
			<Champions />
		</div>
	)
}






function  Champions() {
	return(
		<div className="p-3 rounded-md bg-amber-50 h-96 ">
			학생들 발표 영상/ 제작 | 수업 사진 
		</div>
	)
}

