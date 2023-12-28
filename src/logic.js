Rune.initLogic({
    minPlayers: 2,
    maxPlayers: 2,
    setup: (allPlayersIds) => {
        return {
            officer: allPlayersIds[0],
            choice: null,
            solution: Math.floor(Math.random() * 2),
            success: null
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
            game.solution = Math.floor(Math.random() * 2);
        },
    },
})