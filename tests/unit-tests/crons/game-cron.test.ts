import { stub } from "jest-auto-stub";
import { Core, Table } from "sc-game-base";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import GameCron from "../../../src/crons/game-cron";
import { ProvablyFairConsumer, UnsettledRoundConsumer } from "sc-game-base/src/core/event-consumers";
import { GameData, GameDefinition } from "sc-number-game-base";

describe("GameCron tests", () => {
    const definition = stub<GameDefinition>();
    const gameData = stub<GameData>();
    const bot = stub<Table.Crons.TableGameBot>();
    const settleConsumer = stub<Table.EventConsumers.TableSettleGameRoundConsumer>();
    const gameStatusPublisher = stub<Core.BaseEventPublishers.GameStatusPublisher>();
    const runningRoundPublisher = stub<Core.BaseEventPublishers.RunningRoundInfoPublisher>();
    const roundResultConsumer = stub<Core.BaseEventConsumers.RoundResultConsumer>();
    const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();
    const roundIdConsumer = stub<Core.BaseEventConsumers.RoundIdConsumer>();
    const provablyFairConsumer = stub<ProvablyFairConsumer>();
    const unsettledRoundConsumer = stub<UnsettledRoundConsumer>();

    let consumer: GameCron;
    beforeEach(() => {
        consumer = new GameCron({
            definition,
            gameData,
            bot,
            settleGameRoundConsumer: settleConsumer,
            gameStatusPublisher,
            runningRoundInfoPublisher: runningRoundPublisher,
            logService: null as any,
            roundResultConsumer,
            resultsRepository: {} as any,
            appConfigs: {} as any,
            gameManagementApiClientFactory,
            roundIdConsumer,
            roundsRepository: { findOne: jest.fn() } as any,
            provablyFairConsumer,
            unsettledRoundConsumer,
        });
        consumer.startCron = jest.fn();
        roundIdConsumer.initRoundId = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("initLastRound", () => {
        it("should set odds from gameConfigs", async () => {
            // Arrange
            gameData.gameConfigs = {
                odds: { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 },
            } as any;

            // Act
            await consumer.initLastRound();

            // Assert
            expect(gameData.odds).toEqual({ big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 });
        });
    });

    describe("startTurn", () => {
        beforeEach(() => {
            consumer.resetForNewTurn = jest.fn();
            consumer.publishNewTurnData = jest.fn();
            consumer.updatePromotionOddsAndNotify = jest.fn();
        });
        it("should call resetForNewTurn", async () => {
            // Act
            await consumer.startTurn(gameData.remainingTime);

            // Assert
            expect(consumer.resetForNewTurn).toHaveBeenCalled();
        });

        it("should call bot.reset", async () => {
            // Act
            await consumer.startTurn(gameData.remainingTime);

            // Assert
            expect(consumer.bot.reset).toHaveBeenCalled();
        });

        it("should call publishNewTurnData", async () => {
            // Act
            await consumer.startTurn(gameData.remainingTime);

            // Assert
            expect(consumer.publishNewTurnData).toHaveBeenCalled();
        });

        describe("when enabledBoostedOdds = true", () => {
            beforeEach(() => {
                consumer.appConfigs.enabledBoostedOdds = true;
            });
            it("should call updatePromotionOddsAndNotify", async () => {
                // Act
                await consumer.startTurn(gameData.remainingTime);

                // Assert
                expect(consumer.updatePromotionOddsAndNotify).toHaveBeenCalled();
            });
        });

        describe("when enabledBoostedOdds = false", () => {
            beforeEach(() => {
                consumer.appConfigs.enabledBoostedOdds = false;
            });
            it("should NOT call updatePromotionOddsAndNotify", async () => {
                // Act
                await consumer.startTurn(gameData.remainingTime);

                // Assert
                expect(consumer.updatePromotionOddsAndNotify).not.toHaveBeenCalled();
            });
        });
    });

    describe("resetForNewTurn", () => {
        it("should set data as expected", () => {
            // Arrange
            gameData.gameConfigs = {
                odds: { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 },
            } as any;

            // Act
            consumer.resetForNewTurn();

            // Assert
            expect(gameData.chips).toEqual({});
            expect(gameData.winningPlayers).toEqual({});
            expect(gameData.ingame).toEqual({});
            expect(gameData.totalBets).toEqual({});
            expect(gameData.playerBetCount).toEqual({});
            expect(gameData.odds).toEqual({ big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 });
        });

        it("should call provablyFairConsumer.reset", () => {
            // Arrange
            gameData.gameConfigs = {
                odds: { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 },
            } as any;

            // Act
            consumer.resetForNewTurn();

            // Assert
            expect(provablyFairConsumer.reset).toHaveBeenCalled();
        });
    });

    describe("formatNewTurnData", () => {
        it("should return expected", () => {
            // arrange
            const odds = { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 };
            gameData.gameConfigs = { odds } as any;
            gameData.roundId = 10;
            gameData.drawId = 10;

            // act
            const actual = consumer.formatNewTurnData();

            // assert
            expect(actual).toEqual({
                odds,
                drawId: 10,
                roundId: 10,
            });
        });
    });
});
