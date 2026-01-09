import Banner from "@/components/commons/Banner";

export default async function Layout({children}:{children: React.ReactNode}) {
	return (
		<div>
			<Banner id="pythonBannerBasic.png" />
			<div className="z-10 relative top-[-20]">
				{children}
			</div>
		</div>
	)
	
}


