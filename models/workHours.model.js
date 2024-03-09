const mongoose = require("mongoose");
const { format } = require("date-fns");

const WorkingHoursSchema = new mongoose.Schema(
  {
    hours: { type: Number, required: true },
    date: { type: String, default: format(new Date(), "yyyy-MM-dd"), trim: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const WorkingHours = mongoose.model("Working-Hours", WorkingHoursSchema);

const LogsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["Login", "Logout"], required: true },
  },
  { timestamps: true }
);
const Logs = mongoose.model("Logs", LogsSchema);

module.exports = {
  Logs,
  WorkingHours,
};
