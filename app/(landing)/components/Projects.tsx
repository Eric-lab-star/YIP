"use client";

import * as motion from "motion/react-client"
import { Black_Han_Sans, Sunflower } from "next/font/google" 
import { useState } from "react"
import Image from "next/image"
const blackHanSans = Black_Han_Sans({weight: "400"})
const sunflower  = Sunflower({weight: "300"})
const projectLists  = [
	{
		name:"Arduboy",
		bg: "#eb3a23",
		image: "arduboy.jpg",
		description: {
			difficulty: 3,
			explanation: `
			아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다. 이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로 만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를 소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
			goals: ["아두이노", "회로", "텍트 스위치"],
		
		}
	},
	{
		name:"Layzer",
		bg: "#2398eb",
		image: "layzer.jpeg",
		description: {
			difficulty: 2,
			explanation: `
			아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다. 이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로 만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를 소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
			goals: ["아두이노", "회로", "텍트 스위치"],
		
		}
	},

	{
		name:"Calculator",
		bg: "#5ea501",
		image: "humanbot.jpg",
		description: {
			difficulty: 4,
			explanation: `
			아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다. 이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로 만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를 소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
			goals: ["아두이노", "회로", "텍트 스위치"],
		
		}
	},

	{
		name:"SmartFactory",
		bg: "#a823eb",
		image: "robot.jpg",
		description: {
			difficulty: 5,
			explanation: `
			아두보이는 프로젝트는 기초 과정을 배운 뒤에 가장 처음으로 만들게 되는 프로젝트 입니다. 이 프로젝트를 수행하는 학생들은 게임기의 회로 연결과 코드 업로드까지 모든 직접 손으로 만들면서 우리 주위의 전자기기의 동작 방식을 이해하게 됩니다. 이러한 이해는 게임 기계를 소비자의 관점이 아닌 개발자의 관점에서 볼 수 있도록 전환시켜 줍니다.`,
			goals: ["아두이노", "회로", "텍트 스위치"],
		
		}
	},
]

export default function Projects() {
	const [selectedTab, setSelectedTab ] = useState(projectLists[0]);

	return(
		<div className="h-max rounded-md">
			<nav>
				<ul className="flex space-x-1">{projectLists.map(
					project => (
						<motion.li
						initial={{
							backgroundColor: project == selectedTab ? project.bg : "#fefbeb"
						}}
						key={project.name} className={
							`text-sm px-3 py-1 select-none ${blackHanSans.className} rounded-t-md`
						}
						animate={{
							backgroundColor: project == selectedTab ? project.bg : "#fefbeb"
						}}
						onClick={() => {
							console.log(project)
							setSelectedTab(project)}}
						>{project.name}</motion.li>
					))}
				</ul>
			</nav>
			<main 
			style={{backgroundColor: `${selectedTab.bg}`}} 
			className={`rounded-b-md rounded-tr-md p-3 space-y-1`}>
				<div className="relative self-center row-span-5 w-full h-80 ">
					<Image fill={true} className="rounded-md" alt="project Image" src={`/${selectedTab.image}`}/>
				</div>
				<div className={`row-span-2 space-y-1 ${selectedTab.bg}`}>
					<div>{level(selectedTab.description.difficulty)}</div>
					<div className={`${sunflower.className} text-lg text-zinc-100 `}> {selectedTab.description.explanation} </div>
					<ul className="flex space-x-2">{selectedTab.description.goals.map(goal => <li className="rounded-md text-sm bg-amber-50 py-1 px-2" key={goal}>{goal}</li>)}</ul>
				</div>
			</main>
		</div>
	)
}

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


