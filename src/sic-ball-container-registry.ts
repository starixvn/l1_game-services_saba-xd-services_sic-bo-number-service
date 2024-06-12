import { asClass, asValue } from "awilix";
import { bets, rounds, tmpBets, betLogs, results } from "./models/index";
import { ContainerRegistry } from "sc-number-game-base";
import { InGameConsumer, RoundResultConsumer, SettleGameRoundConsumer } from "./event-consumers";
import RunningRoundInfoPublisher from "./event-publishers/running-round-info-publisher";
import { GameStatusPublisher } from "./event-publishers";
import { Bot, GameCron, ProcessBetQueue } from "./crons";

export default class SicBallContainerRegistry extends ContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(rounds),
            betsRepository: asValue(bets),
            tempBetsRepository: asValue(tmpBets),
            betLogsRepository: asValue(betLogs),
            resultsRepository: asValue(results),
        });
    }

    registerCrons() {
        super.registerCrons();
        this.container.register({
            bot: asClass(Bot).singleton(),
            gameCron: asClass(GameCron).singleton().proxy(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
        });
    }

    registerConsumers(): void {
        super.registerConsumers();
        this.container.register({
            inGameConsumer: asClass(InGameConsumer).singleton(),
            roundResultConsumer: asClass(RoundResultConsumer).singleton(),
            settleGameRoundConsumer: asClass(SettleGameRoundConsumer).singleton().proxy(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            runningRoundInfoPublisher: asClass(RunningRoundInfoPublisher).singleton(),
            gameStatusPublisher: asClass(GameStatusPublisher).singleton(),
        });
    }
}
