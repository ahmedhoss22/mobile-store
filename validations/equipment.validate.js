const Joi = require("joi");

module.exports = {
  addEquipment: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.required": "name is required",
      "string.min": "Invalid name",
      "string.max": "Invalid name",
    }),
    balance: Joi.number().min(0).message("Balance must be a positive number"),
    branch: Joi.string().min(2).max(30).required().messages({
      "string.required": "branch is required",
      "string.min": "Invalid branch",
      "string.max": "Invalid branch",
    }),
    type: Joi.string()
      .min(2)
      .max(30)
      .required()
      .valid("machine", "phone")
      .messages({
        "string.required": "The type of equipment is required either machine or phone !!",
        "any.only": "The type of equipment must be either machine or phone !!",
      }),
  }),
};

