import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import { Block } from './objects/Block'

export default function Scene01({game}) {

	function onAccept(){
		Rune.actions.accept();
		Rune.actions.checkIfCorrect();
	}

	function onReject(){
		Rune.actions.reject();
		Rune.actions.checkIfCorrect();
	}

	return (
		<>

			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}>
				<color attach="background" args={["#FAD983"]} />
				<Stage adjustCamera={false} shadows={false} preset="rembrandt" intensity={1}  environment="forest">
					<Block />
				</Stage>
				<OrbitControls enablePan={false} enableZoom={false}/>
			</Canvas>

			<div id="ui">
				<div>
					<div id="fail">
						<span>Fails : {game.fails}</span>
					</div>
					<button id="accept" onClick={onAccept}>Accept</button>
					<button id="reject" onClick={onReject}>Reject</button>
				</div>
				
			</div>
		
		
		</>
	)
}