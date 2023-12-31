import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import data from "../assets/objects.json"

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

export default function Scene01({game}) {

	var model = [];

	for(let i=0; i<data.parts.length; i++){
		let random = getRandomInt(data.parts[i].occurences)+1;   //4 3 2 mark hole block
		const t = "blocks/" + data.parts[i].name + "0" + random + ".glb";
		model.push(useGLTF(t));
	}

	function onAccept(){
		Rune.actions.accept();
		Rune.actions.checkIfCorrect();
	}

	function onReject(){
		Rune.actions.reject();
		Rune.actions.checkIfCorrect();
	}
	
	let html = model.map((model, index) =>
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
				<div>
					<button id="accept" onClick={onAccept}>Accept</button>
					<button id="reject" onClick={onReject}>Reject</button>
				</div>
				
			</div>
		
		
		</>
	)
}