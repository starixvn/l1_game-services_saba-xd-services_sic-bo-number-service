import { BET_CHOICES } from "./constants";

export default {
    id: 1007,
    name: "SicBall",
    durations: {
        wholeRound: 25,
        placingBets: 15,
        lockingBet: 3,
        showingResult: 3,
        wholeTurn: 20,
        startingRound: 5,
    },
    choices: Object.values(BET_CHOICES),
    choicesMapper: { big: 1, small: 2, specific1: 3, specific2: 4, specific3: 5, specific4: 6, specific5: 7, specific6: 8 },
    hedgeBetGroups: [["big", "small"]],
    numberOfTurnsPerRound: 1,
    numberOfRoundHistory: 108,
    historyPageSize: 30,
    provablyFair: true,
    botSettings: {
        ratio: { bigSmallOptions: 70, rareOptions: 30 },
        bigSmallOptions: ["big", "small"],
        rareOptions: ["specific1", "specific2", "specific3", "specific4", "specific5", "specific6"],
    },
};
