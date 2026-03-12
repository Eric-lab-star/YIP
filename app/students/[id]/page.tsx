import { failPost, readPosts, successPost } from "@/app/lib/mongo/posts";
import { readStudent } from "@/app/lib/mongo/students";
import { CardImage } from "@/components/commons/CardImage";
import TILTable from "@/components/commons/table/TILTable";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	if (!ObjectId.isValid(id)) {
		return notFound()
	}

	// param  검증
	const student = await readStudent(new ObjectId(id))
	if (!student) {
		return notFound()
	}

	const posts = await readPosts({ userId: student._id.toString() })
	const serial = getSerialized(posts)
	const list = Array(1).fill(0)

	return (
		<div className="p-5">
			<Title size="h2" my="m"> 교재  </Title>
			<div className="space-y-10 flex   flex-col items-center sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5">
				{
					list.map((_, i) =>
						<CardImage key={i} link="/tourOfPython" imagekey="python-logo-only.png" title="Tour of Python" state="기초" description="기본적인 파이썬 문법을 둘러보면서 파이썬 코드를 이해할 수 있는 수준으로 성장하는 것을 목표로 합니다." />
					)

				}
			</div>

			<Title my="m" size="h2"> 나의 공간 </Title>

			<div className="space-x-2 flex  items-center">
				<Title my="m" size="h2"> TIL - 기억보다 기록 </Title>
				<Button size={"sm"}>
					<Link href={"/editor"}> 글쓰기 </Link>
				</Button>
			</div>
			{
				serial && <TILTable posts={serial} />
			}
		</div>
	)
}



function getSerialized(posts: successPost | failPost) {
	if (!posts.ok) return null;
	const result = posts.db.map((p) => ({ id: p._id.toString(), title: p.title, createdAt: p.createdAt, }))
	return result
}
