import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import data from "../assets/objects.json"
import { useCallback, useRef } from 'react';


function Game({ game }){ 
	var model1 = [];
	let html;

	for(let i=0; i<data[game.item].parts.length; i++){
		const t = data[game.item].name + "/" + data[game.item].parts[i].name + "0" + game.model1[i] + ".glb";   
		model1.push(useGLTF(t));
	}

	html = model1.map((model, index) =>
		<primitive key={index} object={model.scene} position={[0, 0, 0]} />)
	
	const item  = useRef();
	return (
		<>
			<Stage environment={false} adjustCamera={false} shadows={false} preset="rembrandt" intensity={7}>
				<group position={[0, 0, 0]} ref={item}>{html}</group>
			</Stage>
			<OrbitControls enablePan={false} enableZoom={false}/>
		</>
	)
}

export default function Scene01({game}) {
	function onAccept(){
		if (game.end) return
		Rune.actions.accept();
		setTimeout(() => {
			Rune.actions.checkIfCorrect();
		}, 1000);
	}

	function onReject() {
		if (game.end) return
		Rune.actions.reject();
		setTimeout(() => {
			Rune.actions.checkIfCorrect();
		}, 1000);
	}
	let chrono = useRef();
	const tick = () => {
        const value = 120 - (Rune.gameTime()-game.roundStartAt) / 1000;
		if (chrono.current && game.start && !game.end)
			chrono.current.textContent = "0" + Math.floor(value / 60) + ":" + String(value % 60).padStart(2, '0');
        requestAnimationFrame(tick)
	}
	tick();
	const curtain = useCallback(node => {
		if (node !== null) {
			Rune.actions.openCurtain();
			setTimeout(() => {
				node.style.top = "-110%";
			}, 1000);
		}
	}, []);
	return (
		<>
			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}><Game game={game}>
				</Game>
				<color args={ [ '#faf7f0' ] } attach="background" />
			</Canvas>
			
			<div id="ui">
				<div id="curtain" ref={curtain}></div> {/*for the loading page */}
				<div>
					<button id="accept" onClick={onAccept}>OK</button>
					<button id="reject" onClick={onReject}>NOOK</button>
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