const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdditionSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, min: 0, required: true },
    source: { type: mongoose.Types.ObjectId, required: true, ref: "Equipment" },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    branch: { type: mongoose.Types.ObjectId, required: true, ref: "Branch" },
    inshift: { type: Boolean, default: true }

}, {
    timestamps: true
})

const Addition = mongoose.model("Addition", AdditionSchema)
module.exports = Addition