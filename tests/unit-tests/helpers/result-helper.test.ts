import * as resultHelper from "../../../src/helpers/result-helper";

jest.mock("sc-game-base/src/core/helpers", () => ({
    ServerSeedHelper: { generateServerSeed: jest.fn().mockReturnValue("123asd") },
}));

describe("result helper tests", () => {
    describe("finalHashToNumbers", () => {
        it("should return expected", () => {
            // arrange
            const finalHash = "123b5c4f";

            // act
            const actual = resultHelper.finalHashToNumbers(finalHash);

            // assert
            expect(actual).toEqual([18, 59, 92]);
        });
    });

    describe("generateResult", () => {
        it("should return expected", () => {
            // arrange
            const serverSeed = '{"random":"1;2;3","secret":"123asd"}';

            const finalSeeds = {
                serverSeed: serverSeed,
                finalHash: "123b5c4f",
            };

            // act
            const actual = resultHelper.generateResult(finalSeeds);

            // assert
            expect(actual).toEqual({ balls: [2, 2, 6] });
        });
    });

    describe("getSettlementResult", () => {
        const testCases = [
            {
                result: {
                    balls: [4, 5, 2],
                },
                expected: {
                    big: true,
                    small: false,
                    specific1: false,
                    specific2: true,
                    specific3: false,
                    specific4: true,
                    specific5: true,
                    specific6: false,
                },
            },
            {
                result: {
                    balls: [2, 3, 5],
                },
                expected: {
                    big: false,
                    small: true,
                    specific1: false,
                    specific2: true,
                    specific3: true,
                    specific4: false,
                    specific5: true,
                    specific6: false,
                },
            },
        ];
        it.each(testCases)("should return expected", ({ result, expected }) => {
            // act
            const actual = resultHelper.getSettlementResult(result as any);

            // assert
            expect(actual).toEqual(expected);
        });
    });
});
