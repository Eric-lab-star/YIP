import basic from "../../../public/arduino.webp";
import intermediate from "../../../public/arduboy.jpg";
import advanced from "../../../public/humanbot.jpg";
import { StaticImageData } from "next/image";
interface Isteps {
	step: string;
	description: string;
}

export interface curriculumDB {
	name: string;
	image: StaticImageData;
	steps: Isteps[]
}

export const curriculumDB: curriculumDB[] = [
	{
		name: "성장 프로세스 ",
		image: basic,
		steps: [
			{
				step: "FUN 단계 ",
				description: "완벽한 기초 다지리를 위한 단계",
			},
			{
				step: "성장 1 단계 ",
				description: "문제해결 과정을 익히는 기초 단계",
			},
			{
				step: "성장 2 단계 ",
				description: "문제해결 프로젝트 심화 교육 및 과학 레포트 작성 ",
			},
		],
	},
	{
		name: "도약 브릿지",
		image: intermediate,
		steps: [
			{
				step: "Bridge",
				description: "성장 단계에서 도약 단계로 이어주는 추가 프로젝트.",
			},
		],
	},
	{
		name: "도약 프로세스",
		image: advanced,
		steps: [
			{
				step: "도약",
				description: ""
			}
		],
	}
]
