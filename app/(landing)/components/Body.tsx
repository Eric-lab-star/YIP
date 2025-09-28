			{/* <Login /> */}
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
export default function Body( ) {
	return(
		<div 
		className="min-h-screen h-max bg-amber-50 lg:grid lg:grid-cols-6 lg:gap-4 md:flex md:flex-col">
			<GeneralContents/>
			<AccountInfo/>
		</div>
	)
}

function GeneralContents() {
	return(
		<div className="lg:col-span-4 border-2">
			left
		</div>
	)
}


function AccountInfo() {
	return(
		<div className="lg:col-span-2 lg:order-last md:order-first border-2 mb-3">
			Student Info
		</div>
	)
}
