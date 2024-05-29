const Joi = require("joi");
const mongoose = require("mongoose")

module.exports = {
  addCash: Joi.object().keys({
    amount: Joi.number().min(0).required().messages({
      "number.required": "amount is required",
      "number.amount": "Invalid amount",
    }),
    commission: Joi.number().required()
      .min(0)
      .message("commission must be a positive number"),
    source: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid ObjectID for source");
        }
        return value;
      }),
      type:Joi.string().required().valid("withdraw","deposit"),
  }),
  updateCash: Joi.object().keys({
    amount: Joi.number().min(0).messages({
      "number.required": "amount is required",
      "number.amount": "Invalid amount",
    }),
    commission: Joi.number()
      .min(0)
      .message("commission must be a positive number"),
    source: Joi.string()
      
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid ObjectID for source");
        }
        return value;
      }),
      type:Joi.string().valid("withdraw","deposit"),
      _id:Joi.string(),
      __v:Joi.string(),
  }),
};
