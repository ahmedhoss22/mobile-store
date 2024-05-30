const Branch = require("../models/branch.model");
const Equipment = require("../models/equipment.model");
const Cash = require("../models/cash.model");
const asyncHandler = require("express-async-handler");

const CashCtl = {
  addInternalCash: asyncHandler(async (req, res) => {
    const data = req.body
    let source = await Equipment.findById(data.source);
    if (!source) {
      return res.status(400).send({
        message: "Source id is invalid",
      });
    }

    //check for source balance
    const amount = data.amount;
    if (data.type == "deposite" && source.balance < amount) {
      res.status(400).send({
        message: `Balance of ${source.name} is not enough !!`,
      });
    }

    //check for branch balance if withdraw
    let branch = await Branch.findById(req.branch._id)
    if (data.type == "withdraw" && branch.balance < amount) {
      return res.status(400).send({ message: "The cash in branch not enough for withdraw" })
    }

    //update balance for balance and source
    if (data.type == "withdraw") {
      source.balance += amount;
      branch.balance -= amount + data.commission
    } else {
      source.balance -= amount;
      branch.balance += amount + data.commission
    }

    await source.save();
    await branch.save();

    //save payment
    let newCash = new Cash({
      ...data,
      user: req.user._id,
      branch: req.branch._id,
      cashType: "internal"
    });
    await newCash.save();

    res.status(201).send({ message: "Cash is submitted !!", data: newCash });
  }),
  addExternalCash: asyncHandler(async (req, res) => {
    const data = req.body
    let source = await Equipment.findById(data.source);
    if (!source) {
      return res.status(400).send({
        message: "Source id is invalid",
      });
    }

    //check for source balance
    const amount = data.amount;
    if (data.type == "deposite" && source.balance < amount) {
      res.status(400).send({
        message: `Balance of ${source.name} is not enough !!`,
      });
    }

    //check for branch balance if withdraw
    let branch = await Branch.findById(req.branch._id)
    if (data.type == "withdraw" && branch.balance < amount) {
      return res.status(400).send({ message: "The cash in branch not enough for withdraw" })
    }

    //update balance for balance and source
    if (data.type == "withdraw") {
      source.balance += amount;
      branch.balance -= amount + data.commission
    } else {
      source.balance -= amount;
      branch.balance += amount + data.commission
    }

    await source.save();
    await branch.save();
    let newCash = new Cash({
      ...req.body,
      user: req.user._id,
      branch: req.branch._id,
      cashType: "external"
    });
    await newCash.save();

    res.status(201).send({ message: "Cash is submitted !!", data: newCash });
  }),
  getInternalCash: asyncHandler(async (req, res) => {
    let data = await Cash.find({ cashType: "internal",branch:req.branch._id }).populate("source");
    res.json(data);
  }),
  getExternalCash: asyncHandler(async (req, res) => {
    let data = await Cash.find({ cashType: "external" }).populate("source");
    res.json(data);
  }),
  updateCash: asyncHandler(async (req, res) => {
    let { id } = req.params;
    let newCash = await Cash.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(newCash);
  }),
  deleteCash: asyncHandler(async (req, res) => {
    let { id } = req.params;
    await Cash.findByIdAndDelete(id);
    res.json({
      message: "Cash Deleted !!",
    });
  }),
};

module.exports = CashCtl;
