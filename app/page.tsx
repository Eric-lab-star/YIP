import Link from "next/link";

//TODO: Update StudentInfo -> populate classDay
// FIX: classDay state type should be more precise
// FIX: classDay structure 
export default function Page() {
	return <div className="flex flex-col">
		<Link href={"/students"} > students </Link>
		<Link href={"/students/create"} > create </Link>
	</div>
}

