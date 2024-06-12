import { Crons } from "sc-number-game-base";
import { BET_CHOICES } from "../constants";

export default class ProcessBetQueue extends Crons.ProcessBetQueue {
    adjustPlayerBetCount(
        player: any,
        bet: {
            amount: number;
            betChoices: Record<string, number>;
            drawId: number;
            clientSeed: string;
            freeBet?: boolean | undefined;
            mode?: string | undefined;
        }
    ): void {
        Object.keys(bet.betChoices).forEach((betChoice) => {
            if ([BET_CHOICES.big, BET_CHOICES.small].includes(betChoice)) {
                if (!this.gameData.playerBetCount[betChoice]) {
                    this.gameData.playerBetCount[betChoice] = [];
                }
                !this.gameData.playerBetCount[betChoice].includes(player.UID) && this.gameData.playerBetCount[betChoice].push(player.UID);
            }
        });
    }
}
