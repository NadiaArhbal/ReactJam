import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import data from "../assets/objects.json"
import { useRef } from 'react';

export default function Scene02({game}) {

	var model2 = [];

	for(let i=0; i<data[game.item].parts.length; i++){
		const t = data[game.item].name + "/" + data[game.item].parts[i].name + "0" + game.model2[i] + ".glb";   
		model2.push(useGLTF(t));
	}
	
	let html = model2.map((model, index) =>
	<primitive key={index} object={model.scene} position={[0, 0, 0]} />
	)

	let chrono = useRef();
	const tick = () => {
        const value = 20 - (Rune.gameTime()-game.roundStartAt) / 1000
		if (chrono.current && game.start)
			chrono.current.textContent = "00:" + String(value).padStart(2, '0');
        requestAnimationFrame(tick);
	}
	tick();

	return (
		<>
			<Canvas shadows camera={{ zoom: 0.15, fov: 20 }}>
				<Stage adjustCamera={false} shadows={false} preset="rembrandt" intensity={1}>
					<group>{html}</group>
				</Stage>
				<OrbitControls enablePan={false} enableZoom={false}/>
			</Canvas>

			<div id="ui">
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