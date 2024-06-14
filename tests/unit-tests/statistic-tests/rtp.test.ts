import { GameData, GameDefinition } from "sc-number-game-base";
import { RoundResultConsumer } from "../../../src/event-consumers";
import { stub } from "jest-auto-stub";
import { RoundResultPublisher } from "sc-number-game-base/dist/event-publishers";
import { ProvablyFairConsumer } from "sc-number-game-base/dist/event-consumers";
import * as Helpers from "../../../src/helpers/result-helper";
import Chance from "chance";
import { SeedHelper } from "sc-game-base/src/core/helpers";
import gameSettings from "../../../src/game-settings";
import { DrawResult } from "../../../src/models/rounds";
import { GameConfigs } from "sc-game-base/src/core/game-data";
import { SettleGameRoundConsumer } from "../../../src/event-consumers";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";

const chance = new Chance();

function generateSeed(): string {
    return chance.ssn({ ssnFour: true });
}

describe("statistic test", () => {
    let consumer: RoundResultConsumer;
    const gameData = stub<GameData>();
    const definition = stub<GameDefinition>();
    const publisher = stub<RoundResultPublisher>();
    const provablyFairConsumer = stub<ProvablyFairConsumer>();
    const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();

    const settleConsumer = new SettleGameRoundConsumer({
        definition,
        gameData,
        roundResultPublisher: publisher,
        userBetResultPublisher: {} as any,
        endGame: null,
        roundsRepository: {} as any,
        betsRepository: null,
        tempBetsRepository: null,
        gameManagementApiClientFactory,
    });
    const numberOfTurnsToRun = 100_000;
    const BET_CHOICES = {
        big: 0,
        small: 0,
        specific1: 0,
        specific2: 0,
        specific3: 0,
        specific4: 0,
        specific5: 0,
        specific6: 0,
    } as any;

    const odds = {
        big: 1.96,
        small: 1.96,
        single: 2,
        double: 3.5,
        triple: 6,
    } as any;

    const randomModes = [1, 2, 3];

    beforeEach(() => {
        consumer = new RoundResultConsumer(gameData, definition, publisher, null, provablyFairConsumer);
        consumer.gameData.roundResult = [];
    });

    describe("rtp test", () => {
        randomModes.forEach((randomMode) => {
            it(`should generate rtp results statistically correct with mode ${randomMode}`, () => {
                gameData.gameConfigs = {
                    randomMode: randomMode,
                } as GameConfigs;

                const totalWin = { ...BET_CHOICES };
                const totalBet = { ...BET_CHOICES };
                const rtpPerChoice = { ...BET_CHOICES };

                for (let turn = 1; turn <= numberOfTurnsToRun; turn++) {
                    const numberOfClients = chance.integer({ min: 0, max: 20 });
                    let mergeClientSeed = "";
                    for (let i = 0; i < numberOfClients; i++) {
                        mergeClientSeed += generateSeed();
                    }
                    const serverSeed = consumer.generateServerSeed();
                    const mergeSeed = serverSeed + mergeClientSeed;
                    const finalHash = SeedHelper.getSHA512Hash(mergeSeed);
                    const result = Helpers.generateResult({ finalHash, serverSeed });
                    const settlementResult = Helpers.getSettlementResult(result as DrawResult) as any;
                    const betOdds = settleConsumer.calculateAndReturnOdds(settlementResult, result.balls, odds);
                    const betAmount = {} as any;

                    gameSettings.choices.forEach((choice) => {
                        betAmount[choice] = chance.integer({ min: 10, max: 1000 });
                    });

                    gameSettings.choices.forEach((choice) => {
                        if (settlementResult[choice]) {
                            totalWin[choice] += betAmount[choice] * betOdds[choice];
                        }

                        totalBet[choice] += betAmount[choice];
                    });
                }

                gameSettings.choices.forEach((choice) => {
                    rtpPerChoice[choice] = totalWin[choice] / totalBet[choice];
                });

                console.log(rtpPerChoice);
                expect(rtpPerChoice.big).toBeLessThanOrEqual(1);
                expect(rtpPerChoice.small).toBeLessThanOrEqual(1);
                expect(rtpPerChoice.specific1).toBeLessThanOrEqual(1);
                expect(rtpPerChoice.specific2).toBeLessThanOrEqual(1);
                expect(rtpPerChoice.specific3).toBeLessThanOrEqual(1);
                expect(rtpPerChoice.specific4).toBeLessThanOrEqual(1);
                expect(rtpPerChoice.specific5).toBeLessThanOrEqual(1);
                expect(rtpPerChoice.specific6).toBeLessThanOrEqual(1);
            });
        });
    });
});
