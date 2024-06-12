import { BET_CHOICES } from "../constants";

export const roundBetPercentage = (betPercentage: Record<string, number>) => {
    betPercentage[BET_CHOICES.big] && (betPercentage[BET_CHOICES.big] = parseInt(betPercentage[BET_CHOICES.big].toString()));
    if (betPercentage[BET_CHOICES.small] > 0) {
        betPercentage[BET_CHOICES.small] = 100 - (betPercentage[BET_CHOICES.big] ?? 0);
    }

    return betPercentage;
};
