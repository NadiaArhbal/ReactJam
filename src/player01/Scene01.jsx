import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, Environment, Preload } from "@react-three/drei"
import data from "../assets/objects.json"
import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useState } from 'react';
import { Pudding } from '../objects/Pudding';

let wait = true;
let anim = 0;
//canva
function Game({game}){  //composant react en Majuscule
	
	var model1 = [];
	let html;
	// pudding !
	// if (game.item == 2) html = <Pudding></Pudding>
	// else {
		for(let i=0; i<data[game.item].parts.length; i++){
			const t = data[game.item].name + "/" + data[game.item].parts[i].name + "0" + game.model1[i] + ".glb";   
			model1.push(useGLTF(t));
		}
	
		html = model1.map((model, index) =>
			<primitive key={index} object={model.scene} position={[0, 0, 0]} />)
	// }
	

	const item  = useRef();
	useFrame((state) => {
	});
	return (
		<>
			<Stage environment={false} adjustCamera={false} shadows={false} preset="rembrandt" intensity={7}>
				<group ref={item}>{html}</group>
			</Stage>
			<OrbitControls enablePan={false} enableZoom={false}/>
		</>
	)
}

export default function Scene01({game}) {
	function onAccept(){
		if (game.global1 == 5) return
		Rune.actions.accept();
		Rune.actions.changeGlobal1(1);
		Rune.actions.changeGlobal2(1);
		setTimeout(() => {
			Rune.actions.checkIfCorrect();
		}, 1000);
		setTimeout(() => {
			Rune.actions.changeGlobal1(0)
			Rune.actions.changeGlobal2(0)
		}, 2000);
	}

	function onReject() {
		if (anim == 5) return
		Rune.actions.reject();
		Rune.actions.changeGlobal1(2);
		Rune.actions.changeGlobal2(2);
		setTimeout(() => {
			Rune.actions.checkIfCorrect();
		}, 1000);
		setTimeout(() => {
			Rune.actions.changeGlobal1(0)
			Rune.actions.changeGlobal2(0)
		}, 2000);
	}
	let chrono = useRef();
	const tick = () => {
        const value = 120 - (Rune.gameTime()-game.roundStartAt) / 1000;
		if (chrono.current && game.start)
			chrono.current.textContent = "0" + Math.floor(value / 60) + ":" + String(value % 60).padStart(2, '0');
        requestAnimationFrame(tick)
	}
	tick();
	const curtain = useCallback(node => {
		if (node !== null) {
			setTimeout(() => {
				node.style.top = "-110%";
			}, 5000);
		}
	  }, []);
	if (wait)
		setTimeout(() => {
			Rune.actions.startGame();
			Rune.actions.openCurtain();
		}, 5000);
		wait = false;
	return (
		<>
			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}><Game game={game}>
				{/* <color attach="background" args={["#ffd166"]} /> */}
				</Game>
				<color args={ [ '#faf7f0' ] } attach="background" />
			</Canvas>
			
			<div id="ui">
				<div id="curtain" ref={curtain}></div> {/*for the loading page */}
				<div>
					<button id="accept" onClick={onAccept}>Accept</button>
					<button id="reject" onClick={onReject}>Reject</button>
				</div>
				<div id="fail">
					{[...Array(game.fails)].map((x, i) =>
					<svg key={i} width="2em" height="2em" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
						<path fill="#ff5a79" d="M62 10.6L53.4 2L32 23.4L10.6 2L2 10.6L23.4 32L2 53.4l8.6 8.6L32 40.6L53.4 62l8.6-8.6L40.6 32z"></path>
					</svg>
  				)}
					
				</div>
				<div id="score">
					<span>{game.score}</span>
				</div>

				<div id="chrono">
					<span ref={chrono}></span>
				</div>
			</div>
		
		</>
	)
}