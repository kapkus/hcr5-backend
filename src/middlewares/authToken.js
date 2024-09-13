const jwt = require('jsonwebtoken');
const { errorResponseHandler } = require('./errorHandler');

const authenticateToken = (req, res, next) => {
    try{
        if (req.path === '/login') {
            return next(); // public route
        }

        const token = req.header('Authorization');
        if(!token){
            throw { error: "Full authenthication is required to access this resource" }
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    }catch(err) {
        console.log(err)
        // errorResponseHandler(req, res, err);
    }
}

module.exports = authenticateToken;