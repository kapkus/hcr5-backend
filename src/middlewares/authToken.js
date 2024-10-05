const jwt = require('jsonwebtoken');
const { errorResponseHandler } = require('./errorHandler');
const { AppError } = require('../models/Error');
const { HTTP_RESPONSE_CODE } = require('../constants/constants');

const authenticateToken = (req, res, next) => {
    try{
        if (req.path === '/login') {
            return next(); // public route
        }

        const authHeader = req.header('authorization');
        const token = authHeader && authHeader.split(' ')[1];
        
        if(!token){
            next(new AppError({
                statusCode: HTTP_RESPONSE_CODE.UNAUTHORIZED,
                code: "AUTH_0001",
                msg: "Authentication required to access this resource"
            }));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = {
            userId: decoded.userId
        }
        next();
    }catch(err) {
        next(new AppError({
            statusCode: HTTP_RESPONSE_CODE.UNAUTHORIZED,
            code: "AUTH_0001",
            msg: "Authentication failed - invalid token"
        }));
    }
}

module.exports = authenticateToken;