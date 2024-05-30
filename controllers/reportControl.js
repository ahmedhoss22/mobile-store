const asyncHandler = require("express-async-handler");
const Additions = require("../models/additions.model");
const Draws = require("../models/draws.model");
const Payments = require("../models/payment.model");
const Cash = require("../models/cash.model");

const reportCtl = {
  payments: asyncHandler(async (req, res) => {
    let data = await Payments.find({ inshift: true, branch: req.branch._id }).populate("source")
    data = data.map((ele) => {
      return { amount: ele.amount, source: ele.source.name, date: ele.createdAt }
    })
    res.json(data)
  }),
  additions: asyncHandler(async (req, res) => {
    let data = await Additions.find({ inshift: true, branch: req.branch._id }).populate("source")
    data = data.map((ele) => {
      return { amount: ele.amount, source: ele.source.name, date: ele.createdAt }
    })
    res.json(data)
  }),
  draws: asyncHandler(async (req, res) => {
    let data = await Draws.find({ inshift: true, branch: req.branch._id }).populate("source")
    data = data.map((ele)=>{
      return {amount : ele.amount , source : ele.source.name , date : ele.createdAt}
    })
    res.json(data)
  }),
  cashDeposite: asyncHandler(async (req, res) => {
    let data = await Cash.find({ inshift: true, branch: req.branch._id, type: "deposit" }).populate("source")
    data = data.map((ele)=>{
      return {amount : ele.amount , source : ele.source.name , date : ele.createdAt}
    })
    res.json(data)
  }),
  cashWithdraw: asyncHandler(async (req, res) => {
    let data = await Cash.find({ inshift: true, branch: req.branch._id, type: "withdraw" }).populate("source")
    res.json(data)
  }),
  cashWithdraw: asyncHandler(async (req, res) => {
    let data = await Cash.find({ inshift: true, branch: req.branch._id, type: "withdraw" }).populate("source")
    data = data.map((ele)=>{
      return {amount : ele.amount , source : ele.source.name , date : ele.createdAt}
    })
    res.json(data)
  }),
  comission: asyncHandler(async (req, res) => {
    let cash = await Cash.find({ inshift: true, branch: req.branch._id }).populate("source")
    let payments = await Payments.find({ inshift: true, branch: req.branch._id }).populate("source")
    let data = [...cash, ...payments]
    data = data.map((ele) => {
      return { commission: ele.commission, source: ele.source.name, date: ele.createdAt }
    })
    res.json(data)
  }),
}

module.exports = reportCtl