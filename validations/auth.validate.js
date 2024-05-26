const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const passwordExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const equipmentSchema = Joi.object({
  _id: Joi.string().required(),
  balance: Joi.number().required()
});

module.exports = {
  registerationSchema: Joi.object().keys({
    name: Joi.string().min(3).max(30).required().messages({
      "string.required": "Name is required",
    }),
    username: Joi.string().min(3).max(30).required().messages({
      "string.required": "username is required",
    }),
    password: Joi.string().required().regex(passwordExp).messages({
      "string.required": "password is required",
    }),
    branch: Joi.string().required().messages({
      "string.required": "store is required",
    }),
  }),
  loginSchema: Joi.object().keys({
    username: Joi.string().email().min(3).max(30).required().messages({
      "string.required": "username is required",
      "string.username": "Invalid username",
    }),
    password: Joi.string().required().messages({
      "string.required": "password is required",
    }),
    branch: Joi.string().required().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectID for branch');
      }
      return value;
    })
  }),
  balanceWhileLoginSchema: Joi.object().keys({
    balance: Joi.number().required(),
    equipments: Joi.array().required().items(equipmentSchema),
  }),
  adminRegistration: Joi.object().keys({
    name: Joi.string().min(3).max(30).required().messages({
      "string.required": "Name is required",
    }),
    username: Joi.string().min(3).max(30).required().messages({
      "string.required": "username is required",
    }),
    password: Joi.string().required().regex(passwordExp).messages({
      "string.required": "password is required",
    }),
  }),
};
