const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../services/jwt.service");
const { Logs, WorkingHours } = require("../models/workHours.model");

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

    if(data.branch != user.branch){
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
};

module.exports = authController;
