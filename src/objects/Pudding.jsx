import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'



export function Pudding(props) {
    const { nodes, materials } = useGLTF("/puddings/Pudding01.glb");
  
    const config = {
        meshPhysicalMaterial: false,
        transmissionSampler: true,
        backside: false,
        samples: 8,
        resolution: 256,
        transmission: 1,
        roughness: 0.5,
        thickness: 3.5,
        ior: 1.5,
        chromaticAberration: 0.06,
        anisotropy: 0.1,
        distortion: 0.0,
        distortionScale: 0.3,
        temporalDistortion: 0.5,
        clearcoat: 1,
        attenuationDistance: 0.5,
        attenuationColor: '#ffffff',
        color: '#3743aa',
        bg: '#839681'
    }
  
    return (
      <group {...props} scale={0.65} dispose={null} position-y={-0.6}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials["Material.001"]}
          position={[0, 1.017, 0]}
          scale={[1, 1.538, 1]}
        >
          {config.meshPhysicalMaterial ? <meshPhysicalMaterial {...config} /> : <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NurbsPath.geometry}
          material={materials["Material.002"]}
          position={[0.088, 2.109, -0.123]}
          rotation={[-0.135, -0.005, 0.029]}
          scale={1.017}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={nodes.Circle.material}
          position={[0, -0.382, 0]}
          scale={3.437}
        />
      </group>
    );
}
