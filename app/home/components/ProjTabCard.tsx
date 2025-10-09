"use client";
/** Component Location
	* GeneralContents
	* 	-> Projects
	*/
import * as motion from "motion/react-client"
import { useState } from "react"
import Image, { StaticImageData } from "next/image"

// static images
import layzerImage from "../../../public/layzer.jpeg";
import arduboyImage from "../../../public/arduino.webp";
import calculatorImage from "../../../public/humanbot.jpg";
import smartFactoryImage from "../../../public/robot.jpg";
import { IProjects} from "@/app/lib/projects";
import { blackHanSans, sunflower } from "@/app/stores/font";


export default function ProjTabCard({projectLists}: {projectLists: IProjects[]}) {
	const [selectedTab, setSelectedTab ] = useState(projectLists[0]);

	return(
		<div className="h-max ounded-md select-none">
			{/* project tab */}
			<nav> 
				<ul className="flex space-x-1">{projectLists.map(
					project => (
						<motion.li
						initial={{
							backgroundColor: project == selectedTab ? project.color : "#fefbeb"
						}}
						key={project.name} className={
							`text-sm px-3 py-1 ${blackHanSans.className} rounded-t-md`
						}
						animate={{
							backgroundColor: project == selectedTab ? project.color : "#fefbeb"
						}}
						onClick={() => {
							setSelectedTab(project)}}
						>{project.name}</motion.li>
					))}
				</ul>
			</nav>
			{/* project cards */}
			<main  
			style={{backgroundColor: `${selectedTab.color}`}} 
			className={`rounded-b-md rounded-tr-md p-3 space-y-1`}>
				<div className="relative self-center row-span-5 w-full h-154 ">
					<ProjImage name={selectedTab.name }/>
				</div>
				<div className={`row-span-2 space-y-1 ${selectedTab.color} `}>
					<div>{level(selectedTab.levels)}</div>
					<div className={`${sunflower.className} select-none text-lg text-zinc-100 `}> {selectedTab.description} </div>
					<ul className="flex space-x-2">{selectedTab.goals.map(goal => <li className="rounded-md text-sm bg-amber-50 py-1 px-2" key={goal}>{goal}</li>)}</ul>
				</div>
			</main>
		</div>
	)
}


// Select static Image for the proj
function ProjImage({name}: {name: string}) {
	let src: StaticImageData;
	switch (name) {
		case "스마트 팩토리": {
			src =  smartFactoryImage;
			break;
		}
		case "레이저 터렛": {
			src = layzerImage;
			break;
		}
		case "계산기": {
			src = calculatorImage;
			break;
		}
		case "아두보이": {
			src = arduboyImage;
			break;
		}
		default: {
			src = arduboyImage;
		}
	}

	return <Image fill={true} className="rounded-md" alt="project Image" src={src}/>
}


// level component to convert number to number of stars
function level( difficulty: number ) {
	const stars = [];
	for (let i = 0; i < difficulty; i++) {
		stars[i] = <div key={i}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="#f7f12f" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
			</svg>
		</div>
	}
	return <div className="flex ">{stars}</div>
}


