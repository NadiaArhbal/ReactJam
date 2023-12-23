import { useEffect, useState } from "react"
import reactLogo from "./assets/rune.svg"
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import viteLogo from "/vite.svg"
import { OrbitControls, useGLTF } from "@react-three/drei"
import "./App.css"


function Box(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  const [game, setGame] = useState()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  const {scene} = useGLTF("foretfinal.glb");

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://developers.rune.ai" target="_blank">
          <img src={reactLogo} className="logo rune" alt="Rune logo" />
        </a>
      </div>
      <h1>Vite + Rune</h1>
      <div className="card">
        <button onClick={() => Rune.actions.increment({ amount: 1 })}>
          count is {game.count}
        </button> */}
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <primitive object={scene} />
          <OrbitControls />
        </Canvas>,
      {/* </div>
      <p className="read-the-docs">
        Click on the Vite and Rune logos to learn more
      </p> */}
    </>
  )
}

export default App
