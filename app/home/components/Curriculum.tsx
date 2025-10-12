"use client";

import Image from "next/image";
import { useState } from "react";

import { Black_Han_Sans, Sunflower } from "next/font/google" 
import RightArrow from "@/app/components/RightArrow";
import LeftArrow from "@/app/components/LeftArrow";
import { curriculumDB } from "@/app/lib/staticDB/curriculumDB";
const blackHanSans = Black_Han_Sans({weight: "400"})
const sunflower  = Sunflower({weight: "300"})

export default function Curriculum() {
	const db = curriculumDB
	const [selected, setSelected] = useState(0)
	
	const prevImage = () => {
		if (selected <= 0 ) {
			setSelected(db.length -1)
		} else {
			const prev = (selected - 1) % db.length;
			setSelected(prev)
		}
	}
	const nextImage = () => {
		const next = (selected + 1) % db.length;
		setSelected(next)
	}

	return(
		<div className=" relative">
			<button onClick={prevImage} className="absolute z-10 top-30 text-2xl left-0">
				<div className={`rounded-full
					bg-red-100 border-2 h-10 w-10 flex justify-center items-center`}>
					<LeftArrow />
				</div>
			</button>	
			<button onClick={nextImage} className="absolute z-10 top-30 right-0 text-2xl">
				<div className={`rounded-full
					bg-red-100 border-2 h-10 w-10 flex justify-center items-center`}>
					<RightArrow />
				</div>
			</button>	
			<div className=" rounded-lg bg-amber-50 h-96 p-3">
				<div key={db[selected].name} className="flex flex-col">
					<div className={`relative  
						w-full h-70 bg-red-100 rounded-md`}>
						<Image alt="Curriculums"
						className="rounded-md" src={db[selected].image} fill={true} />
					</div>
					<div className={`${sunflower.className} `}>
						<div className={`${blackHanSans.className} text-lg`}>
							{db[selected].name}
						</div>
						<div className={`text-sm`}>{db[selected].steps[0].step}</div>
						<div>{db[selected].steps[0].description}</div>
					</div>
				</div>
			</div>
		</div>
)
}


