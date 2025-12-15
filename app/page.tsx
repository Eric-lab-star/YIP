import Link from "next/link";

export default function Page() {
	return <div className="flex flex-col">
		<Link href={"/students"} > students </Link>
	</div>
}

