const Additions = require("../models/additions.model");
const asyncHandler = require("express-async-handler");

const AdditionsCtl = {
  addAdditions: asyncHandler(async (req, res) => {
    let data = req.body;
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