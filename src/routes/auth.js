const express = require('express');
const router = express.Router();
const User = require('../models/mongo/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidator = require('./validators/auth.validator');
const validateParams = require('../middlewares/requestValidator');
const { ValidationError, AppError } = require('../models/Error');

router.post('/', validateParams(userValidator), async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ name: username });
        if (!user) {
            throw new AppError({title: "AUTHENTICATION ERROR", code: "AUTH_0000"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError({title: "AUTHENTICATION ERROR", code: "AUTH_0000"});
        }

        console.log(user)

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            // expiresIn: process.env.JWT_EXPIRE_TIME,
            expiresIn: process.env.JWT_EXPIRE_TIME || '1h'
        });
        res.status(200).json({ token });
    } catch (err) {
        next(err);
        // console.log(err)
    }
});

module.exports = router;