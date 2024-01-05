import data from "./assets/objects.json";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function factory(game) {
    let random = getRandomInt(2);
    game.solution = random;
    game.model1 = [];
    game.model2 = [];
    game.item = getRandomInt(data.length);
    let item = data[game.item]

    for (let i = 0; i < item.parts.length; i++) {
        let random = getRandomInt(item.parts[i].occurences) + 1;
        game.model1.push(random);
        game.model2.push(random);
    }
    if (game.solution == 0) {
        let changeOneElement = getRandomInt(item.parts.length);

        let possibilities = [];
        for (let i = 0; i < item.parts[changeOneElement].occurences; i++) {
            if (game.model1[changeOneElement] != i + 1) {
                possibilities.push(i + 1);
            }
        }
        let random = possibilities[getRandomInt(item.parts[changeOneElement].occurences - 1)];
        game.model2[changeOneElement] = random;
    }
}

Rune.initLogic({
    minPlayers: 2,
    maxPlayers: 2,
    setup: (allPlayersIds) => {
        return {
            officer: allPlayersIds[0],
            choice: null,
            solution: 1,
            success: null,
            fails: 0,
            score: 0,
            players: allPlayersIds,
            model1: [
                1, 1, 1
            ],
            model2: [
                1, 1, 1
            ],
            roundStartAt: 0,
            start: false,
            item: 0,
            curtain: 0
        }
    },
    actions: {
        accept: (object, { game }) => {
            game.choice = 1
        },
        startGame: (object, { game }) => {
            game.start = true
            game.roundStartAt = Rune.gameTime();
            factory(game);
        },
        reject: (object, { game }) => {
            game.choice = 0
        },
        checkIfCorrect: (object, { game }) => {
            game.roundStartAt = Rune.gameTime();
            game.success = (game.solution == game.choice);
            if (game.success == 0)
                game.fails++;
            if (game.fails == 3) {
                Rune.gameOver({
                    players: {
                        [game.players[0]]: game.score,
                        [game.players[1]]: game.score,
                    },
                })
            }

            if (game.success == 1) {
                game.score += 2;
            }
            factory(game);
        },
        openCurtain: (object, { game }) => {
            game.curtain = 1;
        }
    },
    update: ({ game }) => {
        if (!game.start) return;
        if (Rune.gameTime() - game.roundStartAt >= 20 * 1000) {
            game.roundStartAt = Rune.gameTime();
            game.fails++;
            if (game.fails == 3) {
                Rune.gameOver({
                    players: {
                        [game.players[0]]: "LOST",
                        [game.players[1]]: "LOST",
                    },
                })
            }
            factory(game);
        }
    }
})