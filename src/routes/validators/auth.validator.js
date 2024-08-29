const Joi = require('joi');

const userValidator = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required()
}).options({abortEarly: false});

module.exports = userValidator;