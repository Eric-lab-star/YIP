import GeneralContents from "./GeneralContents"
import AccountInfo from "./AccountInfo"

export default function Body( ) {
	return(
		<div 
		className="min-h-screen h-max  lg:grid lg:grid-cols-6 lg:gap-4 md:flex md:flex-col">
			<GeneralContents/>
			<AccountInfo/>
		</div>
	)
}




