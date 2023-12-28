Rune.initLogic({
    minPlayers: 2,
    maxPlayers: 2,
    setup: (allPlayersIds) => {
        return {
            officer: allPlayersIds[0],
            choice: null,
            solution: Math.floor(Math.random() * 2),
            success: null,
            fails: 0,
            players: allPlayersIds
        }
    },
    actions: {
        accept: (object, { game }) => {
            game.choice = 1
        },
        reject: (object, { game }) => {
            game.choice = 0
        },
        checkIfCorrect: (object, { game }) => {
            game.success = (game.solution == game.choice);
            if (game.success == 0) game.fails++;
            if (game.fails == 3) {
                Rune.gameOver({
                    players: {
                        [game.players[0]]: "LOST",
                        [game.players[1]]: "LOST",
                    },
                })
            }
            game.solution = Math.floor(Math.random() * 2);
        },
    },
})