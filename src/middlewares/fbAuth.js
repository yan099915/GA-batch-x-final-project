const jwt = require('jsonwebtoken');
const User = require('../models/users');
const secretKey = process.env.SECRETKEY;

createToken = user => {
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        level: user.level
    }, secretKey, { expiresIn: 43200 });    // for 12 hours >> 12*60*60
}


exports.facebookAuth = async (req, res) => {
    if (!req.user) {
        return res.send(401, 'User not authenticated');
    }

    const token = createToken({ id: req.user._id});
    res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
}