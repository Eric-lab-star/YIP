
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
import Projects from "./Projects.tsx"
export default function GeneralContents() {
	return(
		<div className="lg:col-span-4  flex flex-col gap-3">
			<Projects/>
			<Curriculum />
			<Champions />
		</div>
	)
}




function Curriculum() {
	return(
		<div className="border-2 bg-amber-50 h-96 ">
			Curriculum
		</div>
	)
}

function  Champions() {
	return(
		<div className="border-2 bg-amber-50 h-96 ">
			Champions
		</div>
	)
}

