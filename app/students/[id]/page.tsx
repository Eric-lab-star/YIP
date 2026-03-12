import { failPost, readPosts, successPost } from "@/app/lib/mongo/posts";
import { readStudent } from "@/app/lib/mongo/students";
import { CardImage } from "@/components/commons/CardImage";
import TILTable from "@/components/commons/table/TILTable";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import { FilePlusIcon } from "lucide-react";
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

			<div className="">
				<Title my="m" size="h2"> TIL - 기억보다 기록 </Title>
				<Text my="m">
					내가 배운 내용을 글로 정리하는 것은 내가 무엇을 알고 무엇을 모르는지 객관적으로 바라볼 수 있게 해줍니다. 또한, 시간이 지나서 다시 봤을 때 그때의 나의 생각과 배움을 떠올릴 수 있는 좋은 방법입니다.
				</Text>
				<Button variant={"outline"} >
					<Link href={"/editor"} className="flex gap-2 justify-center items-center">
						<div className="">기록하기</div>
						<FilePlusIcon />
					</Link>
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
