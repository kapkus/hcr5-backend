const express = require('express');
const router = express.Router();

const settingsRouter = require('./settings');
const authRouter = require('./auth');

router.use('/settings', settingsRouter);
router.use('/login', authRouter)

module.exports = router;