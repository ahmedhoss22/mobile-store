const Equipment = require("../models/equipment.model");
const Draws = require("../models/draws.model");
const asyncHandler = require("express-async-handler");

const drawsCtl = {
  addDraws: asyncHandler(async (req, res) => {
    let source = await Equipment.findById(req.body.source);
    if (!source) {
      return res.status(400).send({
        message: "Source id is invalid",
      });
    }
    //check for source balance
    const amount = req.body.amount;
    if (source.balance < amount) {
      res.status(400).send({
        message: `Balance of ${source.name} is not enough !!`,
      });
    }

    //update balance
    source.balance -= amount;
    await source.save();

    let newDraws = new Draws({
      ...req.body,
      user: req.user._id,
      branch: req.branch._id,
    });
    await newDraws.save();

    res.status(201).send({ message: "Draws is submitted !!" , data : newDraws});
  }),
  getDraws: asyncHandler(async (req, res) => {
    let data = await Draws.find().populate("source");
    res.json(data);
  }),
  updateDraws: asyncHandler(async (req, res) => {
    let { id } = req.params;
    let newDraws = await Draws.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(newDraws);
  }),
  deleteDraws: asyncHandler(async (req, res) => {
    let { id } = req.params;
    await Draws.findByIdAndDelete(id);
    res.send({
      message: "Draws Deleted !!",
    });
  }),
};

module.exports = drawsCtl;
