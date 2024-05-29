const asyncHandler = require("express-async-handler");
const Additions = require("../models/additions.model");
const Draws = require("../models/draws.model");
const Payments = require("../models/payment.model");
const Cash = require("../models/cash.model");

const reportCtl = {
    payments : asyncHandler(async (req,res)=>{
      let data = await Payments.find({inshift:true})
      res.json(data)
    }),
    additions : asyncHandler(async (req,res)=>{
      let data = await Additions.find({inshift:true})
      res.json(data)
    }),
    draws : asyncHandler(async (req,res)=>{
      let data = await Draws.find({inshift:true})
      res.json(data)
    }),
    cashDeposite : asyncHandler(async (req,res)=>{
      let data = await Cash.find({inshift:true , type:"deposit"})
      res.json(data)
    }),
    cashWithdraw : asyncHandler(async (req,res)=>{
      let data = await Cash.find({inshift:true , type:"deposit"})
      res.json(data)
    }),

}

module.exports = reportCtl