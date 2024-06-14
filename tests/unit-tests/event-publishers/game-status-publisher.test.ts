import { GameData } from "sc-number-game-base";
import { GameStatusPublisher } from "../../../src/event-publishers";
import { stub } from "jest-auto-stub";

describe("running-round-info-publisher test", () => {
    let publisher: GameStatusPublisher;
    const gameData = stub<GameData>();

    beforeEach(() => {
        publisher = new GameStatusPublisher("NextBall1", gameData);
    });

    describe("getOddsRange", () => {
        it("should return correct", () => {
            // Arrange
            gameData.gameConfigs.odds = { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 };

            const expectedOddsRange = { big: 1.96, small: 1.96, single: 2, double: 3.5, triple: 6 };

            // act
            const actual = publisher.getOddsRange();

            // assert
            expect(actual).toStrictEqual(expectedOddsRange);
        });
    });
});
