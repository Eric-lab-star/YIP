
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";

interface CardImageProps { link: string; imagekey: string, title: string, description: string, state: string }
export function CardImage({
	imagekey,
	title,
	description,
	state,
	link,
}: CardImageProps) {
	return (
		<Card className="relative h-100  w-8/12 sm:w-auto sm:max-w-2xs pt-0">
			<Link href={link}>
				<Image
					src={`${process.env.R2_CUSTOM}/${imagekey}`}
					alt="book image"
					className="mx-auto w-6/12 p-5"
					width={50}
					height={50}
					loading="eager"
				/>
			</Link>

			<CardHeader className="h-15  ">
				<CardAction>
					<Badge className="bg-amber-300 ">{state}</Badge>
				</CardAction>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="h-30 ">
				<CardDescription className=" break-all">{description}</CardDescription>
			</CardContent>
			<CardFooter>
				<Link href={link} className="w-full">
					<Button className="bg-zinc-800 w-full">이동하기</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
