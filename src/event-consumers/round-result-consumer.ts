import { EventConsumers } from "sc-number-game-base";
import { ServerSeedHelper } from "sc-game-base/src/core/helpers";
import { BALLS_EACH_ROUND, SERVER_SEED_SECRET_LENGTH, TOTAL_BALLS } from "../constants";
import { getRandomIndex } from "sc-number-game-base/dist/helpers";

export default class RoundResultConsumer extends EventConsumers.RoundResultConsumer {
    generateServerSeed() {
        const { randomMode } = this.gameData.gameConfigs;

        const randomBalls = [];
        for (let i = 0; i < BALLS_EACH_ROUND; i++) {
            randomBalls.push(getRandomIndex(randomMode, TOTAL_BALLS));
        }

        const serverSeedSecret = ServerSeedHelper.generateServerSeed(randomMode, SERVER_SEED_SECRET_LENGTH);

        return `{"random":"${randomBalls.join(";")}","secret":"${serverSeedSecret}"}`;
    }
}
