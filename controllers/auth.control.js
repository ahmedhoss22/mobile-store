const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../services/jwt.service");

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

    let token = generateToken(user._id);
    res.send({ token });
  }),
};

module.exports = authController;
