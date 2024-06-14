import { SettleGameRoundConsumer } from "../../../src/event-consumers";
import { GameData, GameDefinition, EventConsumers } from "sc-number-game-base";
import { stub } from "jest-auto-stub";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { Core } from "sc-game-base";
import Chance from "chance";
import { FinishDraw } from "sc-number-game-base/dist/event-consumers/settle-game-round-consumer";

const definition = stub<GameDefinition>();
const gameData = stub<GameData>();
const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();
const roundResultPublisher = stub<Core.BaseEventPublishers.RoundResultPublisher>();
const userBetResultPublisher = stub<Core.BaseEventPublishers.UserBetResultPublisher>();
const roundsRepository = { find: (): any => {}, create: (): any => {}, findOneAndUpdate: (): any => {} };

const consumer = new SettleGameRoundConsumer({
    definition,
    gameData,
    roundResultPublisher,
    userBetResultPublisher,
    endGame: null,
    roundsRepository,
    betsRepository: null,
    tempBetsRepository: null,
    gameManagementApiClientFactory,
});
describe("SettleGameRoundConsumer test", () => {
    const chance = new Chance();
    it("Inherit Table.EventConsumers.TableSettleGameRoundConsumer", () => {
        expect(consumer instanceof EventConsumers.SettleGameRoundConsumer).toBeTruthy();
    });

    describe("settleRound", () => {
        const drawResult = { balls: [1, 2, 3] };
        const drawSettlementResult = {
            big: false,
            small: true,
            specific1: true,
            specific2: true,
            specific3: true,
            specific4: false,
            specific5: false,
            specific6: false,
        };
        const mockDate = new Date();
        const roundId = chance.natural();
        const drawId = chance.natural();
        const createResult = {
            id: roundId,
            drawId: drawId,
            result: [drawResult],
            settlementResult: [drawSettlementResult],
            time: mockDate,
            exchangeRateId: 1,
            ended: true,
        };
        const winningPlayers = { user: "player1" };

        beforeEach(() => {
            gameData.roundId = roundId;
            gameData.drawId = drawId;
            gameData.result = drawResult;
            gameData.exchangeRates = { exId: 1 };
            definition.settle.mockReturnValue(drawSettlementResult);
            consumer.settleBets = jest.fn();
            jest.spyOn(global, "Date").mockImplementation(() => mockDate);
            roundsRepository.create = jest.fn().mockReturnValue(createResult);
            roundsRepository.findOneAndUpdate = jest.fn().mockReturnValue(createResult);
            roundResultPublisher.publishRoundResult = jest.fn();
            consumer.updateRoundData = jest.fn();
            consumer.settleBets = jest.fn();
            roundResultPublisher.publishWinners = jest.fn();
            gameData.winningPlayers = winningPlayers;
        });

        it("should call settle with drawResult", async () => {
            // Act
            await consumer.settleRound();

            // Assert
            expect(definition.settle).toHaveBeenCalledWith(drawResult);
        });

        it("should call roundsRepository.create", async () => {
            // Arrange
            consumer.isFirstDrawOfRound = jest.fn(() => true);

            // Act
            await consumer.settleRound();

            // Assert
            expect(roundsRepository.create).toHaveBeenCalledWith(createResult);
        });

        it("should call roundResultPublisher.publishRoundResult", async () => {
            //Arrange
            const finishDraw: FinishDraw = {
                result: drawResult,
                settlementResult: drawSettlementResult,
                roundId: roundId,
                drawId: drawId,
                time: mockDate,
                isLastDraw: true,
            };

            // Act
            await consumer.settleRound();

            // Assert
            expect(roundResultPublisher.publishRoundResult).toHaveBeenCalledWith(finishDraw);
        });

        it("should call updateRoundData", async () => {
            //Arrange
            const finishDraw: FinishDraw = {
                result: drawResult,
                settlementResult: drawSettlementResult,
                roundId: roundId,
                drawId: drawId,
                time: mockDate,
                isLastDraw: true,
            };

            // Act
            await consumer.settleRound();

            // Assert
            expect(consumer.updateRoundData).toHaveBeenCalledWith(finishDraw);
        });

        it("should call settleBets", async () => {
            //Arrange
            const finishDraw: FinishDraw = {
                result: drawResult,
                settlementResult: drawSettlementResult,
                roundId: roundId,
                drawId: drawId,
                time: mockDate,
                isLastDraw: true,
            };

            // Act
            await consumer.settleRound();

            // Assert
            expect(consumer.settleBets).toHaveBeenCalledWith(finishDraw);
        });

        it("should call roundResultPublisher.publishWinners", async () => {
            // Act
            await consumer.settleRound();

            // Assert
            expect(roundResultPublisher.publishWinners).toHaveBeenCalledWith(roundId, winningPlayers, drawId);
        });
    });
});
