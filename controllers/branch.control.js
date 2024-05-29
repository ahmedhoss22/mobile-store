const Branch = require("../models/branch.model");
const asyncHandler = require("express-async-handler");

const branchCtl = {
  addBranch: asyncHandler(async (req, res) => {
    let branches = await Branch.find();
    if (branches?.length >= process.env.BRANCHES_NO) {
      return res
        .status(400)
        .send({ message: "Cant't create more branches !!" });
    }

    let data = req.body;
    let newBranch = new Branch(data);
    await newBranch.save();

    res.status(201).send(newBranch);
  }),

  updateBranch: asyncHandler(async (req, res) => {
    let id = req.params.id;
    let updatedBranch = await Branch.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBranch) {
      return res.status(400).send({ message: "Branch not found !!" });
    }
    res.send(updatedBranch);
  }),
  getAllBranches: asyncHandler(async (req, res) => {
    let data = await Branch.find();
    //add branch details
    let branch = req.branch
    data.push({ amount: branch.balance, _id: branch._id, name: "درج" })
    res.json(data);
  }),
  deleteBranch: asyncHandler(async (req, res) => {
    let id = req.params.id;
    await Branch.findByIdAndDelete(id);
    res.send({ message: "Branch Deleted !!" });
  }),
};

module.exports = branchCtl;
