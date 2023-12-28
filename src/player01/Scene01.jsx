
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import { Block } from './objects/Block'

export default function Scene01() {
	return (
		<>
			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}>
				<Stage adjustCamera={false} shadows={false} preset="rembrandt" intensity={1}  environment="forest">
					<Block />
				</Stage>
				<OrbitControls enablePan={false} enableZoom={false}/>
			</Canvas>
		</>
	)
}