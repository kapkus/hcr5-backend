const User = require('../models/mongo/User');
const bcrypt = require('bcrypt');
const { mongo } = require('globals');
const mongoose = require('mongoose');
/** 
 * Operations to be done on a brand new app setup (database)
 */

// @todo create default superuser 


const setupAppDefaults = async () => {
    try{

        console.log("setupAppDefaults");

        await mongoose.connect('mongodb://localhost:27017/hcr5');

        /** generate random jwt secret */
        // console.log(require('crypto').randomBytes(32).toString('hex'));
    
        const password = 'admin123';

        const superUser = await User.findOne({creator: true});
        if(!superUser) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const adminUser = new User({
                name: 'admin',
                password: hashedPassword,
                superUser: true,
                userType: 'admin',
                settings: {
                    step: 1,
                }
            });

            const savedUser = await adminUser.save();
            
            console.log(savedUser);
            // throw ERROR_CODES["APP_0001"];
        }
    } catch (err) {
        console.log(err);
        // errorResponseHandler();
    } finally {
        
    }
}


setupAppDefaults();