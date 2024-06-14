import gameSetting from "./game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: {
        big: 3000,
        small: 3000,
        specific1: 3000,
        specific2: 3000,
        specific3: 3000,
        specific4: 3000,
        specific5: 3000,
        specific6: 3000,
    },
    odds: { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 },
    margin: [],
    botenabled: false,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
    choices_maxbet: {
        big: 3000,
        small: 3000,
        specific1: 3000,
        specific2: 3000,
        specific3: 3000,
        specific4: 3000,
        specific5: 3000,
        specific6: 3000,
    },
};

const pfResults = [
    {
        clientSeeds: [],
        roundId: 2,
        drawId: 2,
        serverSeedHash: "583da9eb8f2d90246e4665e755fcd1f4a6c82d519ec6b3d95317e2ab76b2d8f0",
        encryptedServerSeed: {
            iv: "1e0dce148eedef6cbb89b9675dea0021",
            content:
                "83fb43b6522d58ce3600f9f58cdff8da61cfe91e904d79c265bbd8fef756063760473f5ce93cd9ce688f71b0edbbcebdd5cb649ae4ae64e39effd121ff1b",
        },
        finalHash:
            "8dbacd680a97e6a4b7737c374ad29870aded28f79bccaeb70d062c1df0933cb61dd3b36e24f9e827a1af8e02b56873ead9fcd4046b995ae658be347a08fbc7ec",
        mergeClientSeed: "",
        mergeSeed: '{"random":"5;3;6","secret":"OEr2wr2uHlcJRIWWxR3jsQWrO.~Ofhs4"}',
    },
];

const roundsData = [
    {
        ended: true,
        id: 1,
        drawId: 1,
        result: [
            {
                balls: [3, 6, 4],
                drawId: 6,
            },
        ],
        settlementResult: [
            {
                big: true,
                small: false,
                specific1: false,
                specific2: false,
                specific3: true,
                specific4: true,
                specific5: false,
                specific6: true,
                drawId: 6,
            },
        ],
        exchangeRateId: 1,
    },
];

const userBetData = (uid) => {
    return [
        {
            uid: uid,
            drawId: 2,
            freeBet: false,
            roundId: 2,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: gameConfig.odds,
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: false,
            big: 100,
            totalAmount: 100,
        },
    ];
};

const userBetLogData = (uid) => {
    return [
        {
            amount: 20,
            rebet: false,
            roundId: 1,
            drawId: 1,
            uid: uid,
            name: "Bird4252",
            time: "2024-03-06T02:10:48.915Z",
            choice: "big",
            siteId: "4100300",
            currency: "INH",
            rate: 1000,
            operatorId: "ONEworksVGCash",
            playerId: 2609,
        },
    ];
};

const promotions = [
    {
        gameId: gameSetting.id,
        startDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15)),
        endDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15 + 6)),
        isDaily: false,
        odds: gameConfig.odds,
        status: "enabled",
    },
];

export { game, currencyData, socketOptionsFunc, gameConfig, roundsData, userBetData, promotions, userBetLogData, pfResults };
