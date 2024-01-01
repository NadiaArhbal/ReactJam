import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import data from "../assets/objects.json"
import { useRef } from 'react';

//canva
function Game({game}){  //composant react en Majuscule
	
	var model1 = [];

	for(let i=0; i<data.parts.length; i++){
		const t = "blocks/" + data.parts[i].name + "0" + game.model1[i] + ".glb";   //le serveur qui génère le nb random 
		model1.push(useGLTF(t));
	}

	let html = model1.map((model, index) =>
	<primitive key={index} object={model.scene} position={[0, 0, 0]} />)

	const item  = useRef();
	useFrame((state) => item.current.position.x += 0.1);

	return (
		<>
		<Stage adjustCamera={false} shadows={false} preset="rembrandt" intensity={1}  environment="forest">
		<group ref={item}>{html}</group>
		</Stage>
		<OrbitControls enablePan={false} enableZoom={false}/>
		</>
	)
}

//ui ux
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
			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}><Game game={game}></Game></Canvas>

			<div id="ui">
				<div>
					<button id="accept" onClick={onAccept}>Accept</button>
					<button id="reject" onClick={onReject}>Reject</button>
				</div>
				<div id="fail">
     				<span>Fails : {game.fails}</span>
				</div>
				
			</div>
		
		
		</>
	)
}