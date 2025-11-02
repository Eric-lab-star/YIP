
/*
	* Body function 
	*
	*
*/

import AccountInfo from "./AccountInfo";
import GeneralContents from "./GeneralContents";

export default function Body( ) {
	return(
		<div 
		className="min-h-screen h-max  lg:grid lg:grid-cols-6 lg:gap-4 md:flex md:flex-col">
			<GeneralContents/>
			<AccountInfo/>
		</div>
	)
}




