const { parse } = require("url");
const jwt = require('jsonwebtoken');

module.exports = {
    authenticateSocket: (request) => {
        try {
            const {token} = parse(request.url, true).query;
            jwt.verify(token, process.env.JWT_SECRET);
            return true;
        } catch (err) {
            //TODO: log
            return false
        }
    }
}