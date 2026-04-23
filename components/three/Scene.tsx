// components/three/Scene.tsx
'use client'
import { useScroll, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Exhibit from './Exhibit'

const EXHIBITS = [
	{ position: [-3, 0, 0], label: 'ROBOT', color: '#ff6b6b', shape: 'box' },
	{ position: [3, 0, -8], label: 'ARCADE', color: '#4ecdc4', shape: 'box' },
	{ position: [-3, 0, -16], label: 'FIGHTER', color: '#ffe66d', shape: 'cone' },
	{ position: [3, 0, -24], label: 'MECH', color: '#a78bfa', shape: 'box' },
] as const

export default function Scene() {
	const scroll = useScroll()

	useFrame((state) => {
		const offset = scroll.offset // 0 ~ 1
		const camera = state.camera

		// z축을 따라 전시장 안쪽으로 진입
		camera.position.z = THREE.MathUtils.lerp(10, -30, offset)

		// 살짝 좌우/위아래 흔들림 → 자연스러운 워킹감
		camera.position.x = Math.sin(offset * Math.PI * 3) * 0.5
		camera.position.y = 2 + Math.sin(offset * Math.PI * 2) * 0.2

		// 진행 방향 바라보기
		camera.lookAt(0, 1, camera.position.z - 5)
	})

	return (
		<>
			<ambientLight intensity={0.15} />

			{/* 각 전시품 위에 스포트라이트 (미술관 핀조명 느낌) */}
			{EXHIBITS.map((ex, i) => (
				<spotLight
					key={i}
					position={[ex.position[0], 8, ex.position[2]]}
					angle={0.4}
					penumbra={0.8}
					intensity={3}
					color={ex.color}
					castShadow
					target-position={ex.position}
				/>
			))}

			{/* 바닥 */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -15]} receiveShadow>
				<planeGeometry args={[40, 80]} />
				<meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
			</mesh>

			{EXHIBITS.map((ex, i) => (
				<Exhibit key={i} {...ex} />
			))}

			<Environment preset="warehouse" />
			{/* 안개로 멀리 있는 작품이 어둠 속에서 서서히 등장하게 */}
			<fog attach="fog" args={['#000000', 10, 50]} />
		</>
	)
}
