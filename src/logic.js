Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: () => {
    return { count: 0 }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
  },
})
