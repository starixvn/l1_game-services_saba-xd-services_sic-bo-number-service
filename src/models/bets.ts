import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },

    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },
    specific1: { type: Number, default: 0 },
    specific2: { type: Number, default: 0 },
    specific3: { type: Number, default: 0 },
    specific4: { type: Number, default: 0 },
    specific5: { type: Number, default: 0 },
    specific6: { type: Number, default: 0 },

    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },
    totalAmount: { type: Number, default: 0 },

    clientSeed: { type: String, default: "" },
    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    playerId: { type: String },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0, required: true },
    drawId: { type: Number, default: 0, required: true },
    paid: { type: Boolean, default: false },
};

const bets = mongoose.model(
    "sicball_bets",
    new mongoose.Schema({
        ...bet,
        currency: { type: String },
        rate: { type: Number, required: true },
    })
);

const tmpBets = mongoose.model("sicball_tmpbets", new mongoose.Schema(bet));

export { bets, tmpBets };
