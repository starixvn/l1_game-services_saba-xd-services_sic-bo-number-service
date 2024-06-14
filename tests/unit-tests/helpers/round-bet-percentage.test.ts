import { roundBetPercentage } from "../../../src/helpers/round-bet-percentage";

describe("round bet percentage tests", () => {
    const testCases = [
        {
            betPercentage: {
                big: 24.5,
                small: 75.5,
            },

            expected: {
                big: 24,
                small: 76,
            },
        },
        {
            betPercentage: {
                big: 24.9,
                small: 75.1,
            },

            expected: {
                big: 24,
                small: 76,
            },
        },
    ];
    it.each(testCases)("should return expected", ({ betPercentage, expected }) => {
        // act
        const actual = roundBetPercentage(betPercentage);

        // assert
        expect(actual).toEqual(expected);
    });
});
