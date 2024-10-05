const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const authRouter = require('./auth');

router.use('/user', userRouter);
router.use('/login', authRouter)

module.exports = router;