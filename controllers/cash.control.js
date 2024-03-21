const Branch = require("../models/branch.model");
const Equipment = require("../models/equipment.model");
const Cash = require("../models/cash.model");
const asyncHandler = require("express-async-handler");

const CashCtl = {
  addInternalCash: asyncHandler(async (req, res) => {
    let source = await Equipment.findById(req.body.source);
    if (!source) {
     return res.status(400).send({
        message: "Source id is invalid",
      });
    }

    //check for source balance
    // const amount = req.body.amount - req.body.commission;
    // if (source.balance < amount) {
    //   res.status(400).send({
    //     message: `Balance of ${source.name} is not enough !!`,
    //   });
    // }

    //update balance
    // source.balance -= amount;
    // await source.save();

    // let branch = await Branch.findById(source.branch);
    // branch.balance += req.body.amount;
    // await branch.save();

    let newCash = new Cash({
      ...req.body,
      user: req.user._id,
      branch: req.branch._id,
      casyType:"internal"
    });
    await newCash.save();

    res.status(201).send({ message: "Cash is submitted !!" , data: newCash });
  }),
  addExternalCash: asyncHandler(async (req, res) => {
    let source = await Equipment.findById(req.body.source);
    if (!source) {
     return res.status(400).send({
        message: "Source id is invalid",
      });
    }

    //check for source balance
    // const amount = req.body.amount - req.body.commission;
    // if (source.balance < amount) {
    //   res.status(400).send({
    //     message: `Balance of ${source.name} is not enough !!`,
    //   });
    // }

    //update balance
    // source.balance -= amount;
    // await source.save();

    // let branch = await Branch.findById(source.branch);
    // branch.balance += req.body.amount;
    // await branch.save();

    let newCash = new Cash({
      ...req.body,
      user: req.user._id,
      branch: req.branch._id,
      casyType:"external"
    });
    await newCash.save();

    res.status(201).send({ message: "Cash is submitted !!" , data: newCash });
  }),
  getInternalCash: asyncHandler(async (req, res) => {
    let data = await Cash.find({casyType:"internal"}).populate("source");
    res.json(data);
  }),
  getExternalCash: asyncHandler(async (req, res) => {
    let data = await Cash.find({casyType:"external"}).populate("source");
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
