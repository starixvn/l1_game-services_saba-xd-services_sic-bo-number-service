import { GameData, GameDefinition } from "sc-number-game-base";
import { stub } from "jest-auto-stub";
import { InGameConsumer } from "../../../src/event-consumers";
import { Core } from "sc-game-base";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { EventConsumers } from "sc-number-game-base";

describe("InGameConsumer test", () => {
    let consumer: InGameConsumer;
    const definition = stub<GameDefinition>();
    const gameData = stub<GameData>();
    const roundQuery = stub<Core.QueryApis.RoundQuery>();
    const publisher = stub<Core.BaseEventPublishers.BaseEventPublisher>();
    const getBalance = jest.fn();
    const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();

    beforeEach(() => {
        consumer = new InGameConsumer(definition, gameData, roundQuery, publisher, getBalance, gameManagementApiClientFactory);
    });

    it("inherit InGameConsumer of sc-number-game-base", () => {
        expect(consumer instanceof EventConsumers.InGameConsumer);
    });

    describe("getOddsRange", () => {
        it("should return correct", () => {
            // Arrange
            gameData.gameConfigs.odds = { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 };

            const expectedOddsRange = { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 };
            // Act
            const actual = consumer.getOddsRange();

            // Assert
            expect(actual).toEqual(expectedOddsRange);
        });
    });

    describe("getBetPercentage", () => {
        jest.spyOn(EventConsumers.InGameConsumer.prototype, "getBetPercentage").mockReturnValue({
            big: 50.6,
            small: 49.4,
        });

        it("should call super.getBetPercentage", () => {
            // act
            consumer.getBetPercentage({});

            // assert
            expect(EventConsumers.InGameConsumer.prototype.getBetPercentage).toHaveBeenCalled();
        });

        it("should return correct", () => {
            // act
            const actual = consumer.getBetPercentage({});

            // assert
            expect(actual).toStrictEqual({ big: 50, small: 50 });
        });
    });
});
