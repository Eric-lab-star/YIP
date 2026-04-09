import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export default function TwoColumnDes({ title, des }: { title?: React.ReactNode; des: React.ReactNode }) {
	return (
		<div className="p-3">
			{title && <DesHead title={title} />}
			<DesBody des={des} />
		</div>
	)
}



const descriptionTitle = tv({
	base: "font-bold border-b border-black py-2",
})

function DesHead({ title }: { title: ReactNode }) {
	return (
		<div className={descriptionTitle()}>{title} </div>
	)
}

function DesBody({ des }: { des: React.ReactNode }) {
	return (
		<div className="pt-3">
			{des}
		</div>
	)
}
