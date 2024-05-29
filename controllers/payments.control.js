const Branch = require("../models/branch.model");
const Equipment = require("../models/equipment.model");
const Payments = require("../models/payment.model");
const asyncHandler = require("express-async-handler");

const paymentsCtl = {
  addPament: asyncHandler(async (req, res) => {
    let source = await Equipment.findById(req.body.source);
    if (!source) {
     return res.status(400).send({
        message: "Source id is invalid",
      });
    }

    //check for source balance
    const amount = req.body.amount ;
    if (source.balance < amount) {
      res.status(400).send({
        message: `Balance of ${source.name} is not enough !!`,
      });
    }

    //update balance
    source.balance -= amount;
    await source.save();

    let branch = await Branch.findById(source.branch);
    branch.balance += req.body.amount + req.body.commission;
    await branch.save();

    let newPayment = new Payments({
      ...req.body,
      user: req.user._id,
      branch: req.branch._id,
    });
    await newPayment.save();

    res.status(201).send({ message: "Payment is submitted !!" , data: newPayment });
  }),
  getPayments: asyncHandler(async (req, res) => {
    let data = await Payments.find().populate("source");
    res.json(data);
  }),
  updatePayments: asyncHandler(async (req, res) => {
    let { id } = req.params;
    let newPayment = await Payments.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(newPayment);
  }),
  deletePayment: asyncHandler(async (req, res) => {
    let { id } = req.params;
    await Payments.findByIdAndDelete(id);
    res.send({
      message: "Payment Deleted !!",
    });
  }),
};

module.exports = paymentsCtl;
