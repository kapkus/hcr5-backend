const logger = require("../utils/logger");
const {APP_ERROR_CODES} = require('../models/Error');

const errorMiddleware = (err, req, res, next) => {
    logger.error(err.stack);

    console.log(err)

    const responseObj = {
        code: err.code || "NOT_CATCHED",
        messages: err.message || APP_ERROR_CODES.APP_0000,
        details: err.details || []
    };

    res.status(err.statusCode || 500).json(responseObj);
}

/*
const errorResponseHandler = (res, error, code) => {
    let responseObj = {
        status: 400,
        code: "APP_0000",
        type: "error",
        messages: ["Not catched"]
    }

    console.error(error)

    if (code) {
        responseObj = {
            ...responseObj,
            ...code,
            messages: [...code.messages]
        };
    }

    if(error instanceof Joi.ValidationError){
        error?.details.forEach(error => {
            responseObj.messages.push(error?.message);
        });
    }

    res.status(responseObj.status).json(responseObj);
}
*/

// const ERROR_CODES = {
//     APP_0000: {
//         code: "APP_0000",
//         status: 500,
//         messages: ["Not catched"]
//     },
//     APP_0001: {
//         code: "APP_0001",
//         status: 404,
//         messages: ["Nie udało się wczytać ustawień głównego użytkownika"]
//     },
//     APP_0002: {
//         code: "APP_0002",
//         status: 400,
//         messages: ["Params validation error"]
//     },

// }

module.exports = {
    errorMiddleware
};