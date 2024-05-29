const Equipment = require("../models/equipment.model");
const asyncHandler = require("express-async-handler");

const equipmentCtl = {
  addEquipment: asyncHandler(async (req, res) => {
    let data = req.body;

    let dublicated = await Equipment.findOne({
      $and: [
        { name: data.name },
        { branch: data.branch }
      ]
    });
    if(dublicated){
      return res.status(400).send({message:"This Equipment with this name is already exist !!"})
    }

    let newEquipment = new Equipment(data);
    await newEquipment.save();

    res.status(201).json(newEquipment);
  }),

  updateEquipment: asyncHandler(async (req, res) => {
    let id = req.params.id;
    let updatedEquipment = await Equipment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEquipment) {
      return res.status(400).send({ message: "Equipment not found !!" });
    }
    res.json(updatedEquipment);
  }),
  getAllEquipmentes: asyncHandler(async (req, res) => {
    let data = await Equipment.find({ branch: req.params.id });
    res.json(data);
  }),
  deleteEquipment: asyncHandler(async (req, res) => {
    let id = req.params.id;
    await Equipment.findByIdAndDelete(id);
    res.send({ message: "Equipment Deleted !!" });
  }),
};

module.exports = equipmentCtl;