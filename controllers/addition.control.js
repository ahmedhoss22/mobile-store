const Additions = require("../models/additions.model");
const asyncHandler = require("express-async-handler");
const Equipment = require("../models/equipment.model")
const Branch = require("../models/branch.model")

const AdditionsCtl = {
  addAdditions: asyncHandler(async (req, res) => {
    let data = req.body;

    let equipment = await Equipment.findById(data.source)
    let branch = await Branch.findById(data.source)
    if (!equipment && !branch) {
      return res.status(400).send({ message: "Invalid source Id" })
    }

    //update source balance
    if (equipment) {
      equipment.balance += data.amount
      await equipment.save()
    }

    if (branch) {
      branch.balance += data.amount
      await branch.save()
    }

    let newAdditions = new Additions({
      ...data,
      user: req.user._id,
      branch: req.branch._id,
    });
    await newAdditions.save();

    res.status(201).send(newAdditions);
  }),
  updateAdditions: asyncHandler(async (req, res) => {
    let id = req.params.id;
    let updatedAdditions = await Additions.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAdditions) {
      return res.status(400).send({ message: "Additions not found !!" });
    }
    res.send(updatedAdditions);
  }),
  getAllAdditionses: asyncHandler(async (req, res) => {
    let data = await Additions.find();
    res.json(data);
  }),
  deleteAdditions: asyncHandler(async (req, res) => {
    let id = req.params.id;
    await Additions.findByIdAndDelete(id);
    res.send({ message: "Additions Deleted !!" });
  }),
};

module.exports = AdditionsCtl;