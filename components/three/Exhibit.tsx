// components/three/Exhibit.tsx
'use client'
import { Float, Text } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
	position: readonly [number, number, number]
	color: string
	label: string
	shape: 'box' | 'cone' | 'sphere'
}

export default function Exhibit({ position, color, label, shape }: Props) {
	const meshRef = useRef<THREE.Mesh>(null)

	useFrame(() => {
		if (meshRef.current) meshRef.current.rotation.y += 0.005
	})

	return (
		<group position={position as unknown as THREE.Vector3Tuple}>
			{/* 받침대 */}
			<mesh position={[0, -0.5, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[1.2, 1.5, 0.3, 32]} />
				<meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
			</mesh>

			{/* 전시품 본체 (placeholder — 나중에 GLB로 교체) */}
			<Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
				<mesh ref={meshRef} position={[0, 1.2, 0]} castShadow>
					{shape === 'box' && <boxGeometry args={[1.2, 1.8, 1]} />}
					{shape === 'cone' && <coneGeometry args={[0.8, 2, 6]} />}
					{shape === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
					<meshStandardMaterial
						color={color}
						metalness={0.7}
						roughness={0.25}
						emissive={color}
						emissiveIntensity={0.2}
					/>
				</mesh>
			</Float>

			<Text position={[0, -1, 1.3]} fontSize={0.18} color="white" anchorX="center">
				{label}
			</Text>
		</group>
	)
}
