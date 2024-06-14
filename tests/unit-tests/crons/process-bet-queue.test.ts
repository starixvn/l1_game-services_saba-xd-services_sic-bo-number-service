import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { ProcessBetQueue } from "../../../src/crons";
import { stub } from "jest-auto-stub";

describe(ProcessBetQueue.name, () => {
    describe("adjustPlayerBetCount", () => {
        const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();
        const player = { UID: "123" };
        const subBetChoices = { specific1: 10, specific2: 10, specific3: 10 };
        it("should calculate playerBetCount correctly when bet include big", () => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const processBetQueue = new ProcessBetQueue({ gameData, gameManagementApiClientFactory });
            const bet = { betChoices: { ...subBetChoices, big: 10 } };

            // act
            processBetQueue.adjustPlayerBetCount(player, bet as any);

            // assert
            expect(gameData.playerBetCount).toEqual({ big: ["123"] });
        });

        it("should calculate playerBetCount correctly when bet include small", () => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const processBetQueue = new ProcessBetQueue({ gameData, gameManagementApiClientFactory });
            const bet = { betChoices: { ...subBetChoices, small: 10 } };

            // act
            processBetQueue.adjustPlayerBetCount(player, bet as any);

            // assert
            console.log(gameData.playerBetCount);
            expect(gameData.playerBetCount).toEqual({ small: ["123"] });
        });

        it("should NOT calculate playerBetCount when bet not include either small or big", () => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const processBetQueue = new ProcessBetQueue({ gameData, gameManagementApiClientFactory });
            const bet = { betChoices: { ...subBetChoices } };

            // act
            processBetQueue.adjustPlayerBetCount(player, bet as any);

            // assert
            expect(gameData.playerBetCount).toEqual({});
        });
    });
});
