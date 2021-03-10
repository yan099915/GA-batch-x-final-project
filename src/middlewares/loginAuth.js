const jwt = require('jsonwebtoken');
require('dotenv').config

module.exports = function userAuth (req, res,next) {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decToken = jwt.verify(token, process.env.SECRETKEY);
        res.locals.user = decToken

        next();
    } catch (error) {
        res.status(400).json({message:"you're not authorized or invalid token"})
    }
}