import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, Environment, Preload } from "@react-three/drei"
import data from "../assets/objects.json"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useState } from 'react';
import { Pudding } from '../objects/Pudding';


let global = 0;

//canva
function Game({game}){  //composant react en Majuscule
	
	var model1 = [];
	let html;
	// pudding !
	if (game.item == 2) html = <Pudding></Pudding>
	else {
		for(let i=0; i<data[game.item].parts.length; i++){
			const t = data[game.item].name + "/" + data[game.item].parts[i].name + "0" + game.model1[i] + ".glb";   
			model1.push(useGLTF(t));
		}
	
		html = model1.map((model, index) =>
			<primitive key={index} object={model.scene} position={[0, 0, 0]} />)
	}
	

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

			gsap.to(item.current.position, {
				duration:1,
				ease: "power4.out",
				x: 5.5,
				delay: 0.5
			});

			gsap.to(item.current.position, {
				duration:1,
				ease: "power1.out",
				y: -7,
				delay: 0.5
			});
			global = 4

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

			gsap.to(item.current.position, {
				duration:1,
				ease: "power4.out",
				x: -5.5,
				delay: 0.5
			});

			gsap.to(item.current.position, {
				duration:1,
				ease: "power1.out",
				y: -7,
				delay: 0.5
			});
			global = 4

		} else if (global == 0) {
			item.current.position.set(0, 0, 0)
		}
	});
	return (
		<>
		{/* <Environment files={window.hdr.src}/> */}
			<Stage adjustCamera={false} shadows={false} preset="rembrandt" intensity={1}>
				<group ref={item}>{html}</group>
			</Stage>
			<OrbitControls enablePan={false} enableZoom={false}/>
		</>
	)
}

export default function Scene01({game}) {
	function onAccept(){
		if (global != 0) return
		Rune.actions.accept();
		global = 1;
		setTimeout(() => {
			global=0;
			Rune.actions.checkIfCorrect();
		}, 1500);
	}

	function onReject() {
		if (global != 0) return
		Rune.actions.reject();
		global = 2;
		setTimeout(() => {
			global=0;
			Rune.actions.checkIfCorrect();
		}, 1500);
	}
	let chrono = useRef();
	const tick = () => {
        const value = 20 - (Rune.gameTime()-game.roundStartAt) / 1000
		if (chrono.current && game.start && global == 0)
			chrono.current.textContent = "00:" + String(value).padStart(2, '0');
        requestAnimationFrame(tick)
	}
	tick();
	let curtain = useRef();
	if (!game.start)
		setTimeout(() => {
			Rune.actions.startGame();
			Rune.actions.openCurtain();
			if(curtain.current)
				curtain.current.style.top = "-110%";
		}, 3000);
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