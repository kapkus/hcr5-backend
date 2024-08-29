const {errorResponseHandler, ERROR_CODES} = require("./errorHandler");
const Joi = require("joi");
const {ValidationError} = require('../models/Error')

const validateParams = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);

        if(error) {
            console.log(error.details)
            next(new ValidationError("Invalid input data", error.details));
        } else {
            next();
        }
    }
}

module.exports = validateParams;


// class ValidationError extends Error {
//     constructor(message, fieldName) {
//       super(message)
//       this.fieldName = fieldName
//     }
//  }


// validateRequest = () => {
//     return (req, res, next) => {
//         next();
//     }
// }

// const validateParams = (fields) => {
//     return (req, res, next) => {
//         for (const field of fields) {
//             const { name, type, required } = field;
            
//             // if(required !)

//             if (!req.query[name]) {
//                 return res.status(400).send(`${name} is missing`);
//             }
            
//             if (typeof req.query[name] !== type) {
//                 return res.status(400).send(`${name} should be of type ${type}`);
//             }
            
//             if (type === 'number' && isNaN(Number(req.query[name]))) {
//                 return res.status(400).send(`${name} should be a valid number`);
//             }
//         }

//         next();
//     };
// }

// const validateQuery = () => {
    
// }

// parseParam = (param, type) => {
//     try{
//         switch(type){

//         }
//     } catch (err) {
//         errorResponseHandler();
//     }
// }

// module.exports = validateRequest;