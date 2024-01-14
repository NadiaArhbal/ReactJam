import { useEffect, useState } from "react"
import React from 'react'
import Scene01 from "./player01/Scene01"
import Scene02 from "./player02/Scene02";
import { useGLTF } from "@react-three/drei";

function App() {
    const [game, setGame] = useState()
    const [playerId, setPlayerId] = useState()

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
    if (!game.start) 
        Rune.actions.startGame();
    if (game.officer === playerId) {
        return <Scene01 game={game}></Scene01>
    } else {
        return <Scene02 game={game}></Scene02>
    }
}

export default App

useGLTF.setDecoderPath("./draco/");
