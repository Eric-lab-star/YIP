"use client";

import FaceSmile from "@/app/components/Face_smile";
import Image from "next/image";
import { useState } from "react";

/*
	* 1. 성장 프로세스 
* 		FUN 단계 
* 			완벽한 기초 다지기를 위한 단계
* 		성장 1 단계 
* 			문제해결 과정을 익히는 기초 단계 
* 		성장 2 단계 
* 			문제해결 프로젝트 심화 교육 밎 과학 레포트 작성 
*
	*  2. 도약 브릿지 
*  			성장 단계에서 도약 단계로 이어주는 추가 프로젝트 
*  			초고속 실력 향상, 다양한 프로젝트  
*  			학생부 세부 특기사항 기록 
*  			자율 수행 프로젝트, 블로그 
*  		3. 도약 프로세스 

*
	*
*/

const curriculumDB = [
	{
		name: "성장 프로세스 ",
		image: "arduino.webp",
		steps: [
			{
				step: "FUN 단계 ",
				description: "완벽한 기초 다지기를 위한 단계",
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
		image: "robot.jpg",
		steps: [
			{
				step: "Bridge",
				description: "성장 단계에서 도약 단계로 이어주는 추가 프로젝트.",
			},
		],
	},
	{
		name: "도약 프로세스",
		image: "layzer.jpeg",
		steps: [
			{
				step: "도약",
				description: ""
			}
		],
	}
]

export default function Curriculum() {
	const db = curriculumDB
	const [selected, setSelected] = useState(db[2])
	return(
		<div className=" relative">
			<button className="z-10 absolute top-30 text-2xl left-0">
				<div className="rounded-full bg-red-100 border-2 h-10 w-10 flex justify-center items-center">{`<`} </div>
			</button>	
			<button className="z-10 absolute top-30 right-0 text-2xl">
				<div className="rounded-full bg-red-100 border-2 h-10 w-10 flex justify-center items-center">{`>`} </div>
			</button>	
			<div className=" rounded-lg bg-amber-50 h-96 p-3">
				<div key={selected.name} className="flex flex-col">
					<div className=" relative w-full h-70 bg-red-100 rounded-md">
						<Image alt="" className="rounded-md"  fill={true} src={`/${selected.image}`}/>
					</div>
					<div className="">
						<div>{selected.name}</div>
						<div>{selected.steps[0].step}</div>
						<div>{selected.steps[0].description}</div>
					</div>
				</div>
			</div>
		</div>
)
}


