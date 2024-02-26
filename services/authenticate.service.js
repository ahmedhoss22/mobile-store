const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authenticate = asyncHandler(async (req, res, next) => {
  try {
    let token;

    const authorizationHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      token = authorizationHeader.split(" ")[1];
    } else {
      return res.status(401).send({
        message: "Token is required!",
      });
    }

    const secretKey = process.env.SECRET_TOKEN;
    const decode = jwt.verify(token, secretKey);

    if (!decode) {
      return res.status(401).send({
        message: "Invalid token!",
      });
    }

    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(401).send({
        message: "User not found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Authentication failed!",
    });
  }
});

const adminAuth = (req, res, next) => {
  authenticate(req, res, () => {
    const user = req.user;
    if (!user.isAdmin) {
      return res.status(401).send({
        message: "Route is only for admins!",
      });
    } else {
      next();
    }
  });
};

module.exports = {
  authorizeUser: authenticate,
  authorizeAdmin: adminAuth,
};
