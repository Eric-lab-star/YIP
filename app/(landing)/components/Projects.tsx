"use client";

import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import { Black_Han_Sans } from "next/font/google" 
import { useState } from "react"
import Image from "next/image"
const blackHanSans = Black_Han_Sans({weight: "400"})
const projectLists  = [
	{
		name:"Arduboy",
		bg: "#eb3a23",
		image: "arduino.jpeg",
		description: "this is arduboy project"
	},
	{
		name:"Layzer",
		bg: "#2398eb",
		image: "hammer.jpg",
		description: "this is Lazyer project"
	},

	{
		name:"Calculator",
		bg: "#7deb23",
		image: "humanbot.jpg",
		description: "this is Calculator project"
	},

	{
		name:"SmartFactory",
		bg: "#a823eb",
		image: "robot.jpg",
		description: "this is smartFactory project"
	},
]

export default function Projects() {
	const [selectedTab, setSelectedTab ] = useState(projectLists[0]);

	return(
		<div className="h-max rounded-md bg-amber-50 ">
			<nav>
				<ul className="flex">{projectLists.map(
					project => (
						<motion.li
						initial={false}
						key={project.name} className={
							`text-sm px-3 py-2 select-none ${blackHanSans.className} rounded-t-lg`
						}
						animate={{
							backgroundColor: project == selectedTab ? project.bg : "#eee0"
						}}
						onClick={() => {
							console.log(project)
							setSelectedTab(project)}}
						>{project.name}</motion.li>
					))}
				</ul>
			</nav>
			<main className={`p-3 grid grid-rows-7 gap-4 `}>
				<div className="relative self-center row-span-5 w-full h-80 ">
					<Image fill={true} className="rounded-md" alt="project Image" src={`/${selectedTab.image}`}/>
				</div>
				<div className={`row-span-2 ${selectedTab.bg}`}>{selectedTab.description}</div>
			</main>
		</div>
	)
}
