import mongoose from "mongoose";
import { Models } from "sc-number-game-base/dist";

export default mongoose.model("sicball_results", Models.ResultSchema);
