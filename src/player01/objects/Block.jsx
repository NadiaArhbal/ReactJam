// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";

// export function Block(props) {
//   const { nodes, materials } = useGLTF("/block01.glb");
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         geometry={nodes.SMO_MysteryBlock_geo_SMO_MysteryBlock_SHD_0.geometry}
//         material={materials.SMO_MysteryBlock_SHD}
//         scale={0.01}
//       />
//     </group>
//   );
// }

// useGLTF.preload("/block01.glb");


import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Block(props) {
  const { nodes, materials } = useGLTF("/blocks/block01.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Block01.geometry}
        material={materials.Yellow}
      />
      <mesh
        geometry={nodes.Mark01.geometry}
        material={materials.White}
      />
      <mesh
        geometry={nodes.Hole03.geometry}
        material={materials.Hole}
        rotation={[0, 0, -Math.PI / 2]}
      />
    </group>
  );
}

useGLTF.preload("/Block.glb");