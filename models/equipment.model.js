const mongoose = require("mongoose");

const Equipment = mongoose.model("Equipment", {
  name: { type: String, trim: true, required: true },
  balance: { type: Number, default: 0 },
  branch: { type: mongoose.Types.ObjectId, ref: "Branch", required: true },
  type: { type: String, required: true, enum: ["machine", "phone"] },
});

module.exports = Equipment;