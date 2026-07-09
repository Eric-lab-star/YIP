import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardImageProps {
  link: string;
  imagekey: string;
  title: string;
  description: string;
  state: string;
}
export function CardImage({
  imagekey,
  title,
  description,
  state,
  link,
}: CardImageProps) {
  return (
    <Link href={link} className="group block">
      <Card className="relative h-full overflow-hidden pt-0 transition-transform duration-200 group-hover:-translate-y-1">
        {/* Hover overlay — "학습하기" call to action */}
        <div className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-white/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex flex-col items-center gap-1 text-foreground">
            <GraduationCap strokeWidth={2} size={30} className="text-primary" />
            <div className="text-xl font-bold">학습하기</div>
          </div>
        </div>

        <div className="relative h-40 w-full">
          <Image
            src={`${process.env.R2_CUSTOM}/${imagekey}`}
            alt="book image"
            fill
            className="object-contain p-5"
            aria-label="logo"
          />
        </div>

        <CardHeader>
          <CardAction>
            <Badge className="bg-amber-300 text-foreground">{state}</Badge>
          </CardAction>
          <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-4 break-words">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
