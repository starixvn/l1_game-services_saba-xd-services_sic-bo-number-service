import { EventPublishers } from "sc-number-game-base";

export default class GameStatusPublisher extends EventPublishers.GameStatusPublisher {
    getOddsRange(margin?: Record<string, number>[]): any {
        return this.gameData.gameConfigs?.odds;
    }
}
