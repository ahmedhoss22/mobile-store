const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CasshSchema = new Schema({
    amount: { type: Number, min: 0, required: true },
    commission: { type: Number, min: 0 },
    type: { type: String, trim: true, enum: ["draw", "deposit"], required: true },
    cashType: { type: String, trim: true, enum: ["internal", "external"], required: true },
    source: { type: mongoose.Types.ObjectId, required: true, ref: "Equipment" },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    branch: { type: mongoose.Types.ObjectId, required: true, ref: "Branch" },
    inshift: { type: Boolean, default: true }

}, {
    timestamps: true
})

const Cash = mongoose.model("Cash", CasshSchema)
module.exports = Cash;
