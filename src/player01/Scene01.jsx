import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import data from "../assets/objects.json"
import { useRef } from 'react';
import gsap from 'gsap';

let global = 0;

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
	useFrame((state) => {
		if (global == 1){
			gsap.to(state.camera.position, {
				duration:0.5,
				ease: "power2.out",
				x: 0,
				y: 0,
				z: 5
			});
			gsap.to(state.camera.rotation, {
				duration:0.5,
				ease: "power2.out",
				x: 0,
				y: 0,
				z: 0,
			});
			setTimeout(() => {
				item.current.position.x += 0.2
			}, 500);

		}
		else if (global == 2){
			gsap.to(state.camera.position, {
				duration:0.5,
				ease: "power2.out",
				x: 0,
				y: 0,
				z: 5
			});
			gsap.to(state.camera.rotation, {
				duration:0.5,
				ease: "power2.out",
				x: 0,
				y: 0,
				z: 0,
			});
			setTimeout(() => {
				item.current.position.x -= 0.2
			}, 500);
		}else {
			item.current.position.x = 0
		}
	});
	


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
		global = 1;
		setTimeout(() => {
			global=0;
			Rune.actions.checkIfCorrect();
		}, 1000);
	}

	function onReject(){
		Rune.actions.reject();
		global = 2;
		setTimeout(() => {
			global=0;
			Rune.actions.checkIfCorrect();
		}, 1000);
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