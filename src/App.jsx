import { useEffect, useState } from "react"
import React from 'react'
import "./App.css"
import Scene01 from "./player01/Scene01"
import Scene02 from "./player02/Scene02";
import { useGLTF, useProgress } from "@react-three/drei";

function App() {
    const [game, setGame] = useState()
    const [playerId, setPlayerId] = useState()
    let {progress} = useProgress();


    useEffect(() => {
        Rune.initClient({
            onChange: ({ game, yourPlayerId }) => {
                setPlayerId(yourPlayerId);
                setGame(game);
            },
        })
    }, [])
    if (!game) {
        return <div>Loading...</div>
    }
    if (game.officer === playerId) {
        return <Scene01 game={game}></Scene01>
    } else {
        return <Scene02 game={game}></Scene02>
    }
}

export default App

useGLTF.setDecoderPath("./draco/");
// useGLTF.preload("./blocks/Block01.glb");
// useGLTF.preload("./blocks/Block02.glb");
// useGLTF.preload("./blocks/Hole01.glb");
// useGLTF.preload("./blocks/Hole02.glb");
// useGLTF.preload("./blocks/Hole03.glb");
// useGLTF.preload("./blocks/Mark01.glb");
// useGLTF.preload("./blocks/Mark02.glb");
// useGLTF.preload("./blocks/Mark03.glb");
// useGLTF.preload("./blocks/Mark04.glb");
// useGLTF.preload("./coffees/Coffee01.glb");
// useGLTF.preload("./coffees/Coffee02.glb");
// useGLTF.preload("./compass/Compass01.glb");
// useGLTF.preload("./compass/Compass02.glb");
// useGLTF.preload("./gifts/Gift01.glb");
// useGLTF.preload("./gifts/Gift02.glb");
// useGLTF.preload("./guitars/Guitar01.glb");
// useGLTF.preload("./guitars/Guitar02.glb");
// useGLTF.preload("./imacs/iMac01.glb");
// useGLTF.preload("./imacs/iMac02.glb");
// useGLTF.preload("./laravels/Laravel01.glb");
// useGLTF.preload("./laravels/Laravel02.glb");
// useGLTF.preload("./pictos/Picto01.glb");
// useGLTF.preload("./pictos/Picto02.glb");
// useGLTF.preload("./pools/Pool01.glb");
// useGLTF.preload("./pools/Pool02.glb");
// useGLTF.preload("./puddings/Pudding01.glb");
// useGLTF.preload("./switchs/Switch01.glb");
// useGLTF.preload("./switchs/Switch01.glb");
// useGLTF.preload("./switchs/PadLeft01.glb");
// useGLTF.preload("./switchs/PadLeft02.glb");
// useGLTF.preload("./switchs/PadRight01.glb");
// useGLTF.preload("./switchs/PadRight02.glb");