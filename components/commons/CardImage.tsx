
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
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
		<Card className="overflow-clip w-8/12 sm:w-auto sm:max-w-2xs pt-0">
			<Image
				src={`${process.env.R2_CUSTOM}/${imagekey}`}
				alt="brand logo"
				className="aspect-video w-full p-5"
				width={200}
				height={200}
				loading="eager"
			/>
			<CardHeader>
				<CardAction>
					<Badge className="bg-amber-300 ">{state}</Badge>
				</CardAction>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Link href={link} className="w-full">
					<Button className="bg-zinc-800 w-full">이동하기</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
