import { GameData } from "sc-number-game-base";
import RunningRoundInfoPublisher from "../../../src/event-publishers/running-round-info-publisher";
import { EventPublishers } from "sc-number-game-base";
import { stub } from "jest-auto-stub";

describe("running-round-info-publisher test", () => {
    let publisher: RunningRoundInfoPublisher;
    const gameData = stub<GameData>();

    beforeEach(() => {
        publisher = new RunningRoundInfoPublisher("NextBall1", gameData);
        jest.spyOn(EventPublishers.RunningRoundInfoPublisher.prototype, "getBetPercentageAndPlayerBetCount").mockReturnValue({
            betPercentage: { big: 66.6, small: 33.3 },
            playerBetCount: { big: 2, small: 1 },
        });
    });

    it("inherit RunningRoundInfoPublisher of sc-number-game-base", () => {
        expect(publisher instanceof EventPublishers.RunningRoundInfoPublisher);
    });

    describe("getBetPercentageAndPlayerBetCount", () => {
        it("should call super.getBetPercentageAndPlayerBetCount", () => {
            // act
            publisher.getBetPercentageAndPlayerBetCount();

            // assert
            expect(EventPublishers.RunningRoundInfoPublisher.prototype.getBetPercentageAndPlayerBetCount).toHaveBeenCalled();
        });

        it("should return correct", () => {
            // act
            const actual = publisher.getBetPercentageAndPlayerBetCount();

            // assert
            expect(actual).toStrictEqual({
                betPercentage: { big: 66, small: 34 },
                playerBetCount: { big: 2, small: 1 },
            });
        });
    });
});
