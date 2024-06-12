import { Utils } from "@rd/numbers-game-probabilities";
import { DrawResult } from "../models/rounds";
import { BALLS_EACH_ROUND, BIG_BEGIN, TOTAL_BALLS } from "../constants";

export type FinalSeeds = {
    serverSeed: string;
    finalHash: string;
};

export const generateResult = (finalSeeds: FinalSeeds) => {
    const serverSeed = JSON.parse(finalSeeds.serverSeed);

    const random = serverSeed.random.split(";").map((x: string) => +x) as number[];

    const increments = finalHashToNumbers(finalSeeds.finalHash);

    const balls = random.map((ball, index) => ((ball + increments[index]) % TOTAL_BALLS) + 1);

    return { balls };
};

export const finalHashToNumbers = (finalHash: string) => {
    const increments = [];
    for (let i = 0; i < BALLS_EACH_ROUND; i++) {
        const value = parseInt(finalHash.slice(i * 2, i * 2 + 2), 16);
        increments.push(value);
    }
    return increments;
};

export const getSettlementResult = (result: DrawResult) => {
    const sum = Utils.getSum(result.balls);
    const big = sum > BIG_BEGIN;

    return {
        big: big,
        small: !big,
        specific1: result.balls.includes(1),
        specific2: result.balls.includes(2),
        specific3: result.balls.includes(3),
        specific4: result.balls.includes(4),
        specific5: result.balls.includes(5),
        specific6: result.balls.includes(6),
    };
};

export const getProbabilities = (roundResult: DrawResult[]) => {};

export const generateRawResultForHash = () => {};
