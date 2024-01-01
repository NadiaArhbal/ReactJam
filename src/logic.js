import data from "./assets/objects.json";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
            players: allPlayersIds,
            model1: [
                1, 1, 1
            ],
            model2: [
                1, 1, 1
            ]
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

            let random = getRandomInt(10);
            if (random > 8)
                game.solution = 1;
            else
                game.solution = 0;

            game.model1 = [];
            game.model2 = [];

            for (let i = 0; i < data.parts.length; i++) {
                let random = getRandomInt(data.parts[i].occurences) + 1;
                game.model1.push(random);
                game.model2.push(random);
            }
            if (game.solution == 0) {
                let changeOneElement = getRandomInt(data.parts.length);

                let possibilities = [];
                for (let i = 0; i < data.parts[changeOneElement].occurences; i++) {
                    if (game.model1[changeOneElement] != i + 1) {
                        possibilities.push(i + 1);
                    }
                }

                let random = possibilities[getRandomInt(data.parts[changeOneElement].occurences - 1)]; //-1 car on a enlever un elem dans les possibilities
                game.model2[changeOneElement] = random;
            }

        },
    },
})