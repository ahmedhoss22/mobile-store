const Equipment = require("../models/equipment.model");
const asyncHandler = require("express-async-handler");

const equipmentCtl = {
  addEquipment: asyncHandler(async (req, res) => {
    let data = req.body;
    let newEquipment = new Equipment(data);
    await newEquipment.save();

    res.status(201).send(newEquipment);
  }),

  updateEquipment: asyncHandler(async (req, res) => {
    let id = req.params.id;
    let updatedEquipment = await Equipment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEquipment) {
      return res.status(400).send({ message: "Equipment not found !!" });
    }
    res.send(updatedEquipment);
  }),
  getAllEquipmentes: asyncHandler(async (req, res) => {
    let data = await Equipment.find({ branch: req.params.id });
    res.send(data);
  }),
  deleteEquipment: asyncHandler(async (req, res) => {
    let id = req.params.id;
    await Equipment.findByIdAndDelete(id);
    res.send({ message: "Equipment Deleted !!" });
  }),
};

module.exports = equipmentCtl;