const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../services/jwt.service");
const { Logs, WorkingHours } = require("../models/workHours.model");
const Equipment = require("../models/equipment.model")
const Paymets = require("../models/payment.model")
const BalanceSum = require("../models/balanceSum.model")
const Branch = require("../models/branch.model");
const Draws = require("../models/draws.model");
const Cash = require("../models/cash.model");

const authController = {
  register: asyncHandler(async (req, res) => {
    const existUser = await User.findOne({ username: req.body.username });
    if (existUser) {
      return res.status(409).send({ message: "username is already taken !!" });
    }
    let newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: "Account Created !!" });
  }),

  adminRegister: asyncHandler(async (req, res) => {
    const existUser = await User.findOne({ username: req.body.username });
    if (existUser) {
      return res.status(409).send({ message: "username is already taken !!" });
    }
    let newUser = new User({ ...req.body, isAdmin: true });
    await newUser.save();
    res.status(201).send(newUser);
  }),

  login: asyncHandler(async (req, res) => {
    const data = req.body;
    let user = await User.findOne({ username: data.username });

    if (!user) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    let validPass = await user.comparePassword(data.password);
    if (!validPass) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    if (data.branch != user.branch) {
      return res.status(400).send({ message: "User not in this branch !!" });
    }
    let newLog = new Logs({ type: "Login", user: user._id });
    await newLog.save();

    let token = generateToken(user._id);
    res.send({ token: `Bearar ${token}`, data: user });

  }),

  logout: asyncHandler(async (req, res) => {
    const data = req.body;
    let user = await User.findOne({ username: data.username });

    if (!user) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    let validPass = await user.comparePassword(data.password);
    if (!validPass) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    let userLog = await Logs.findOne({ user: user._id, type: "Login" });
    if (!userLog) {
      return res.status(400).send({ message: "User not Logedin !!" });
    }

    let logoinTime = new Date(userLog.createdAt).getTime();
    let logoutTime = new Date().getTime();
    let period = ((logoutTime - logoinTime) / (1000 * 60 * 60)).toFixed(2);

    let newWorkingHours = new WorkingHours({ hours: period, user: user._id });
    await newWorkingHours.save();

    await Logs.findByIdAndDelete(userLog._id);
    res.send({ message: "Loged out !!" });
  }),

  balanceWhileLogin: asyncHandler(async (req, res) => {
    const { balance, equipments } = req.body;

    //save balances while login 
    let newBalanceSum = new BalanceSum({ ...req.body, branch: req.user.branch })
    await newBalanceSum.save()

    //update the equipment balances
    await Branch.findByIdAndUpdate(req.user.branch, { balance })
    await Promise.all(equipments.map(async (equipment) => {
      await Equipment.findByIdAndUpdate(equipment._id, { balance: equipment.balance });
    }));
    res.send({ message: "Balances updated successfully" });
  }),

  balanceWhileLogout: asyncHandler(async (req, res) => {
    const { balance, equipments } = req.body;

    //save balances while login 
    let loginBalance = await BalanceSum.findOne({ branch: req.branch._id })
    let allPayments = await Paymets.find({inshift : true})
    let allWithDraw = await Draws.find({inshift:true})
    let allCash = await Cash.find({inshift:true})

    //get total value for each 
    let totalPayments = allPayments.reduce((prev , cur) =>prev+=cur.amount ,0)
    let totalWithDraw = allWithDraw.reduce((prev , cur) =>prev+=cur.amount ,0)

    //deposite or withdraw
    let totalCash = allCash.reduce((prev , cur) =>prev+=cur.amount ,0)

    console.log(totalPayments,totalWithDraw ,totalCash );
    // let totalShift = 

    res.send({ message: "Balances updated successfully" });
  })
};

module.exports = authController;
