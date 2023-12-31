import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Block(props) {
    const { nodes, materials } = useGLTF("/blocks/Block01.glb");
    return (
        <></>
    );
}

useGLTF.preload("/blocks/Block01.glb");
