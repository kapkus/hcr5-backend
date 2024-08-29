const express = require('express');
const router = express.Router();
const validateRequest = require("../middlewares/requestValidator");
const Settings = require("../models/mongo/Settings");
const {errorResponseHandler, ERROR_CODES} = require('../middlewares/errorHandler');

router.get('/', validateRequest({
    query: [{name: 'id', type: Number}],
    body: []
}), async (req, res) => {
    try{
        const settings = await Settings.findOne({creator: true});
        if(!settings) {
            const adminSettings = new Settings({
                userType: 'admin',
                creator: true,
                step: 1
            });
            const savedSettings = await adminSettings.save();
            
            console.log(savedSettings);
            throw ERROR_CODES["APP_0001"];
        }
        console.log(settings)
        res.json(settings)
    } catch (err) {
        errorResponseHandler();
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