import { validateToken } from "@/app/lib/auth/login";
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
	const user = await validateToken()

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

	return (
		<div className="p-5">
			<Title size="h1" my="m"> {student.name}의 학습정보 </Title>
			<Title my="m" size="h2"> 학습진도 </Title>
			<Title size="h2" my="m"> 교재  </Title>
			<div className="space-y-10 flex flex-col items-center sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5">
				{
					student.books.map((v, i) =>
						<CardImage key={v.title} link={v.link} imagekey={v.imagekey} title={v.title} state={v.state} description={v.description} />
					)

				}
			</div>

			<div className="mt-7">
				<Title my="m" size="h2"> TIL - 기억보다 기록 </Title>
				<Text my="m">
					내가 배운 내용을 글로 정리하는 것은 내가 무엇을 알고 무엇을 모르는지 객관적으로 바라볼 수 있게 해줍니다. 또한, 시간이 지나서 다시 봤을 때 그때의 나의 생각과 배움을 떠올릴 수 있는 좋은 방법입니다.
				</Text>
				{user?.success && user.id === id && <Button variant={"outline"} >
					<Link href={"/editor"} className="flex gap-2 justify-center items-center">
						<div className="">기록하기</div>
						<FilePlusIcon />
					</Link>
				</Button>
				}
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
