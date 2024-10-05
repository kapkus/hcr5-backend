const express = require('express');
const router = express.Router();
const validateRequest = require("../middlewares/requestValidator");
const {errorResponseHandler, ERROR_CODES} = require('../middlewares/errorHandler');
const User = require('../models/mongo/User');
const {ObjectId} = require("mongodb")

router.get('/', async (req, res, next) => {
    try{
        const user = await User.findOne({
            _id: ObjectId.createFromHexString(req.currentUser.userId)
        }).select('name userType settings');
        
        let resObj = {};
        if(user){
            resObj = {
                userId: user._id,
                name: user.name,
                userType: user.userType,
                settings: user.settings
            }
        }

        res.status(200).json(resObj);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        // const settings = await Settings.find();
        // res.json(settings)
    } catch (err) {
        errorResponseHandler();
    }    
});

module.exports = router;