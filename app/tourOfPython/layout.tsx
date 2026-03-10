import { Nanum_Gothic } from "next/font/google";

const nanumGothic = Nanum_Gothic({ weight: ["400", "700"], subsets: ["latin"] });

export default async function Layout({children}:{children: React.ReactNode}) {

	return (
		<div className={`${nanumGothic.className} p-5`}>
				<div>
					{children}
				</div>
		</div>
	)
}

