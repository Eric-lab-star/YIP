export default async function Layout({children}:{children: React.ReactNode}) {

	return (
		<div className="p-5">
				<div>
					{children}
				</div>
		</div>
	)
}

