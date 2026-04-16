import TipTab from "@/components/editor/TipTab";

export default function Page() {
	return (
		<div className="sm:w-sm md:w-md lg:w-lg xl:w-xl  p-5">
			<TipTab editable={true} />
		</div>
	)
}
