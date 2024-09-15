const Joi = require('joi');

const userValidator = Joi.object({
    username: Joi.string().min(3).max(50).required()
    .messages({
        'string.base': 'Username must be a text.',
        'string.empty': 'Username is required.',
        'string.min': 'Username must be at least {#limit} characters long.',
        'string.max': 'Username must be at most {#limit} characters long.',
        'any.required': 'Username is required.',
      }),
    password: Joi.string().min(6).required()
    .messages({
        'string.base': 'Password must be a text.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'any.required': 'Password is required.',
      })
}).options({abortEarly: false});

module.exports = userValidator;