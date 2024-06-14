import { GameData, GameDefinition } from "sc-number-game-base";
import { Core } from "sc-game-base";
import { initAPIStub, stubUserService, subGameManagementService } from "sc-game-service-integration-utils";
import SicBallContainerRegistry from "../../../build/sic-ball-container-registry";

import gameSettings from "../_stubs/game-settings";
import { resultHelper } from "../../../build/helpers";
import appConfigs from "../../../build/app-configs.IGT";

export const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    const definition = new GameDefinition(
        gameSettings,
        resultHelper.generateResult,
        resultHelper.getSettlementResult,
        resultHelper.generateRawResultForHash,
        resultHelper.getProbabilities
    );
    const gameData = new GameData(gameSettings.durations.wholeRound);
    stubUserService(appConfigs);
    subGameManagementService(appConfigs, definition);
    const container = new SicBallContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(gameSettings.name, appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
