
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { GraduationCap} from "lucide-react";
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
		<Link href={link} className="w-fit">
			<Card className="relative h-100 overflow-clip  w-8/12 sm:w-auto sm:max-w-2xs pt-0">
				<div className="group absolute inset-0 flex justify-center items-center hover:bg-white/20 hover:backdrop-blur-xs w-full h-full z-30 cursor-pointer" >
					<div className="opacity-0 group-hover:opacity-100">
						<GraduationCap strokeWidth={2} size={30} color="purple" className="mx-auto"/>
						<div className="text-2xl font-bold">학습하기</div>
					</div>
				</div>
					<Image
						src={`${process.env.R2_CUSTOM}/${imagekey}`}
						alt="book image"
						className="mx-auto w-6/12 p-5"
						width={100}
						height={100}
						aria-label=""
					/>

				<CardHeader className="h-15  ">
					<CardAction>
						<Badge className="bg-amber-300 ">{state}</Badge>
					</CardAction>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent className="h-30 ">
					<CardDescription className=" break-all">{description}</CardDescription>
				</CardContent>
			</Card>
		</Link>
	)
}
