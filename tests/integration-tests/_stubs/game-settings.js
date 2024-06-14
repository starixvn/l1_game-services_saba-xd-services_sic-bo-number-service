import gameSettings from "../../../build/game-settings";

export default Object.assign(gameSettings, {
    durations: {
        wholeRound: 8,
        placingBets: 4,
        lockingBet: 1,
        showingResult: 1,
        wholeTurn: 6,
        startingRound: 2,
    },
    numberOfTurnsPerRound: 1,
});
