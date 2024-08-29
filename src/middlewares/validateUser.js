const jwt = require('jsonwebtoken');
const { errorResponseHandler } = require('./errorHandler');

const authenticateToken = (req, res, next) => {
    try{
        const token = req.header('Authorization');
        if(!token){
            throw { error: "Full authenthication is required to access this resource" }
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    }catch(err) {
        errorResponseHandler(req, res, err);
    }
}