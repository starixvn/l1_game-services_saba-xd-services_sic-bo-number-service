import { EventConsumers } from "sc-number-game-base";
import { roundBetPercentage } from "../helpers";

export default class InGameConsumer extends EventConsumers.InGameConsumer {
    getOddsRange(margin?: Record<string, number>[]) {
        return this.gameData.gameConfigs?.odds;
    }

    getBetPercentage(playerBetCount: Record<string, string[]>) {
        const betPercentage = super.getBetPercentage(playerBetCount);

        roundBetPercentage(betPercentage);

        return betPercentage;
    }
}
