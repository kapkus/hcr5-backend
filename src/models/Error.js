/**
 * Custom application error class.
 * 
 * @class
 * @extends {Error}
 */
class AppError extends Error {
    /**
     * Creates an instance of AppError.
     * 
     * @param {Object} options - options object
     * @param {string} [options.title="APPLICATION ERROR"] - title of the error
     * @param {number} [options.statusCode=400] - HTTP status code
     * @param {string} [options.code="APP_0000"] - application-specific error code
     * @param {string} [options.message=""] - error message
     * @param {Array|string} [options.details=[]] - optional error details
     */
    constructor(options = {}) {
        const {
            statusCode = 400, 
            code = "APP_0000", 
            message = "", 
            details = []
        } = options;

        super(message || APP_ERROR_CODES[code]);
        this.statusCode = statusCode;
        this.code = code;
        this.details = Array.isArray(details) ? details : [details];
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Class for Joi request error handling
 */
class ValidationError extends AppError {
    constructor(message, details = []) {
        super({
            statusCode: 400,
            code: "APP_0002",
            message: message || "Invalid input data",
            details: details,
        });
    }
}

/**
 * Class for handling "not found" errors.
 */
class NotFoundError extends AppError {
    constructor(message, details = []) {
        super({
            statusCode: 404,
            code: "APP_0001",
            message: message || "Not Found",
            details,
        });
    }
}

const APP_ERROR_CODES = {
    APP_0000: "An unexpected error occurred.",
    APP_0001: "The requested resource was not found.",
    APP_0002: "Invalid input data.",
    
    AUTH_0000: "Authentication failed"
};

const DATABASE_ERROR_CODES = {
    DB_0000: "test"
};

const WS_ERROR_CODES = {};

module.exports = {
    AppError,
    ValidationError,
    NotFoundError,
    APP_ERROR_CODES,
};
