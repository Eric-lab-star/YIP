import Link from "next/link";

//TODO: UPdate StudentInfo -> populate classDay
export default function Page() {
	return <div className="flex flex-col">
		<Link href={"/students"} > students </Link>
		<Link href={"/students/create"} > create </Link>
		page
	</div>
}

