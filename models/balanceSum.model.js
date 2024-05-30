const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BalanceSchema = new Schema({
  balance: { type: Number, required: true },
  branch: { type: mongoose.Types.ObjectId, required: true },
  equipments: [
    {
      _id: { type: mongoose.Types.ObjectId, required: true },
      balance: { type: Number, required: true }
    }
  ]
});

const BalanceSum = mongoose.model("BalanceSum", BalanceSchema)
module.exports = BalanceSum 