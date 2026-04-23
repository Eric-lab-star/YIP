'use client'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Scene from '@/components/three/Scene'

export default function Home() {
	return (
		<main className="w-full h-auto top-14 left-0 overflow-clip absolute bg-black">
			<Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
				<ScrollControls pages={4} damping={0.25}>
					<Scene />
				</ScrollControls>
			</Canvas>
		</main>
	)
}

