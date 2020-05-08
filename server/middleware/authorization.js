const jwt = require('jsonwebtoken');
require('dotenv').config(); 
module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header('token');
        
        // If no token returned, decline authorization
        if(!jwtToken) {

            return res.status(403).json('Not authorized');
        }

        // verify token, get user id
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;


        
    } catch (err) {
        console.error(err.message);
        return res.status(403).json('Not authorized');   
    }
};