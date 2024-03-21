const Joi = require("joi");
const mongoose =require("mongoose")

module.exports = {
    addAddition: Joi.object().keys({
        name: Joi.string().min(2).max(30).required().messages({
            "string.required": "name is required",
            "string.min": "Invalid name",
            "string.max": "Invalid name",
        }),
        source: Joi.string()
            .required()
            .custom((value, helpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.message("Invalid ObjectID for source");
                }
                return value;
            }),
        amount: Joi.number().min(0).required().messages({
            "number.required": "amount is required",
            "number.amount": "Invalid amount",
        }),
    }),
};

