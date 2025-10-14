export default function SmartFactoryIntro001Youtube(
	{
		className
	}:{
		className?:string
	}) {
	return  <iframe className={`${className} w-full h-130`}
	src="https://www.youtube.com/embed/NTISLTWGOZw?si=ejyx_rWOdYqVCY2n" 
		title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
	referrerPolicy="strict-origin-when-cross-origin" allowFullScreen> </iframe>
}
