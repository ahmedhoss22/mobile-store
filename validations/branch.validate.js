const Joi = require("joi");

module.exports = {
  addStore: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.required": "name is required",
      "string.name": "Invalid name",
    }),
    balance: Joi.number().min(0).message("Balance must be a positive number"),
  }),
};
