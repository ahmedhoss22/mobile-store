const mongoose = require("mongoose");

const Branch = mongoose.model("Branch", {
  name: { type: String, trim: true, required: true },
  balance:{type: Number , default : 0}
});
module.exports = Branch;
