Rune.initLogic({
    minPlayers: 2,
    maxPlayers: 2,
    setup: (allPlayersIds) => {
        return { 
            officer: allPlayersIds[0]
        }
    },
    actions: {
        // increment: ({ amount }, { game }) => {
        //     game.count += amount
        // },
    },
})
