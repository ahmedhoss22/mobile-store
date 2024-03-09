const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentsSchema = new Schema({
  amount: { type: Number, required: true },
  commission: { type: Number, required: true },
  source: { type: mongoose.Types.ObjectId, required: true },
});

const Payments = mongoose.model("Payyments", paymentsSchema);
module.exports = Payments;
