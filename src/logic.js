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

    // pudding !
    // if (game.item == 2) game.solution = 1;

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
            curtain: 0,
            global1: 0,
            global2: 0,
            ready1: 0,
            ready2: 0
        }
    },
    actions: {
        onReady:(object, {game}) => {
            if (object == 1)
                game.ready1 += 1;
            else
                game.ready2 += 1;
        },
        accept: (object, { game }) => {
            game.choice = 1
        },
        changeGlobal1: (value, { game }) => {
            game.global1 = value
        },
        changeGlobal2: (value, { game }) => {
            game.global2 = value
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
            // game.roundStartAt = Rune.gameTime();
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
        if (Rune.gameTime() - game.roundStartAt >= 120 * 1000) {
            // game.roundStartAt = Rune.gameTime();
            Rune.gameOver({
                players: {
                    [game.players[0]]: game.score,
                    [game.players[1]]: game.score,
                },
            })
            factory(game);
        }
    }
})