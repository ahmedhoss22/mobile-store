const Joi = require("joi");

module.exports = {
  addPayment: Joi.object().keys({
    amount: Joi.number().min(0).required().messages({
      "number.required": "amount is required",
      "number.name": "Invalid name",
    }),
    commission: Joi.number().min(0).message("commission must be a positive number"),
    source: Joi.string().required(),
  }),
};
