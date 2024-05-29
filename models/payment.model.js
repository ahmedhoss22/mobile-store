const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentsSchema = new Schema({
  amount: { type: Number, required: true },
  commission: { type: Number, required: true },
  source: { type: mongoose.Types.ObjectId, required: true , ref:"Equipment" },
  user: { type: mongoose.Types.ObjectId, required: true , ref:"User" },
  branch: { type: mongoose.Types.ObjectId, required: true , ref:"Branch" },
  inshift:{type :Boolean , default:true}
},{
  timestamps:true
});

const Payments = mongoose.model("Payments", paymentsSchema);
module.exports = Payments;
