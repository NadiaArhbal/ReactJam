import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"

export default function Scene01({game}) {
    const model = useGLTF("/blocks/Mark01.glb");

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
			<div>
				<span>{game.success ? "Succès :) " : "Erreur :( "}</span>
				<span>{}</span>
			</div>

			<div>
				<span>{game.solution ? "ACCEPT" : "REJECT"}</span>
			</div>

			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}>
				<Stage adjustCamera={false} shadows={false} preset="rembrandt" intensity={1}  environment="forest">
					<primitive object={model.scene} position={[0,0,0]}></primitive>
				</Stage>
				<OrbitControls enablePan={false} enableZoom={false}/>
			</Canvas>

			<div id="ui">
				<div>
					<button id="accept" onClick={onAccept}>Accept</button>
					<button id="reject" onClick={onReject}>Reject</button>
				</div>
				
			</div>
		
		
		</>
	)
}