import { GameData, GameDefinition } from "sc-number-game-base";
import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { resultHelper } from "./helpers";
import { Core } from "sc-game-base";
import SicBallContainerRegistry from "./sic-ball-container-registry";

const run = async () => {
    const definition = new GameDefinition(
        gameSettings,
        resultHelper.generateResult,
        resultHelper.getSettlementResult,
        resultHelper.generateRawResultForHash,
        resultHelper.getProbabilities
    );

    const gameData = new GameData(gameSettings.durations.wholeRound);

    const container = new SicBallContainerRegistry().register(appConfigs, definition, gameData);

    const app = new Core.BaseGameApp(gameSettings.name, appConfigs);

    await app.run();

    await app.startGame(container);
};

run();
