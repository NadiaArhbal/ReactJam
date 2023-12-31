import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import data from "../assets/objects.json"

export default function Scene02({game}) {

	var model2 = [];

	for(let i=0; i<data.parts.length; i++){
		const t = "blocks/" + data.parts[i].name + "0" + game.model2[i] + ".glb";   
		model2.push(useGLTF(t));
	}

	function onAccept(){
		Rune.actions.accept();
		Rune.actions.checkIfCorrect();
	}

	function onReject(){
		Rune.actions.reject();
		Rune.actions.checkIfCorrect();
	}
	
	let html = model2.map((model, index) =>
	<primitive key={index} object={model.scene} position={[0, 0, 0]} />
	)

	return (
		<>
			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}>
				<Stage adjustCamera={false} shadows={false} preset="rembrandt" intensity={1}  environment="forest">
				{html}
				</Stage>
				<OrbitControls enablePan={false} enableZoom={false}/>
			</Canvas>

			
			<div id="ui">
				<div id="fail">
     				<span>Fails : {game.fails}</span>
				</div>
				
			</div>
		
		
		</>
	)
}