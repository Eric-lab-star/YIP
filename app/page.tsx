import Link from "next/link";

// FIX: classDay state type should be more precise
// FIX: Update page button 
export default function Page() {
	return <div className="flex flex-col">
		<Link href={"/students"} > students </Link>
		<Link href={"/students/create"} > create </Link>
	</div>
}

