import { Crons } from "sc-number-game-base";

export default class GameCron extends Crons.GameCron {
    async initLastRound() {
        this.generateRoundData();
    }

    generateRoundData() {
        const { odds } = this.gameData.gameConfigs;
        this.gameData.odds = odds;
    }

    async startTurn(remainingTime: number) {
        this.resetForNewTurn();
        this.bot?.reset();
        this.appConfigs.enabledBoostedOdds && (await this.updatePromotionOddsAndNotify());
        this.publishNewTurnData();
    }

    async settleTurn() {
        if (this.gameData.result) {
            await this.settleGameRoundConsumer.settleRound();
        } else {
            this.logService.logError(`Cannot settle at round #${this.gameData.drawId}`);
        }
    }

    resetForNewTurn() {
        this.gameData.chips = {};
        this.gameData.winningPlayers = {};
        this.gameData.ingame = {};
        this.gameData.totalBets = {};
        this.provablyFairConsumer.reset();
        this.gameData.playerBetCount = {};
        this.generateRoundData();
    }

    formatNewTurnData() {
        return { ...super.formatNewTurnData(), roundId: this.gameData.roundId };
    }
}
