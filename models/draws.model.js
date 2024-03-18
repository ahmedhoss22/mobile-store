const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drawsSchema = new Schema(
  {
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    source: { type: mongoose.Types.ObjectId, required: true, ref: "Equipment" },
    branch: { type: mongoose.Types.ObjectId, required: true, ref: "Branch" },
  },
  {
    timestamps: true,
  }
);

const Draws = mongoose.model("Draws", drawsSchema);
module.exports = Draws;
