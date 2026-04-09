import Link from "next/link"
import Text from "./Text"
import Title from "./Title"
import { Link2 } from "lucide-react"

export default function References({ moreLinks }: { moreLinks: { label: string, src: string }[] }) {


	return <>
		<Title my="l" size="h2">관련 자료</Title>
		{
			moreLinks.map(
				(v, i) => <Text key={i}>
					<Link target="_blank" href={v.src} className="w-fit flex flex-col hover:font-semibold hover:text-blue-900">
						<div className="">{i + 1}. {v.label} : </div>
						<div className="ml-10"><Link2 size="19" className="inline-block mr-2" /> {v.src}</div>
					</Link>
				</Text>)
		}
	</>

}



