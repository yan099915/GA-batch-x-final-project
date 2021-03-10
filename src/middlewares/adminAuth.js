const User = require("../models/users");

exports.adminAuth = async (req, res, next) => {
    try {
        const role = data.role;
            if(role === 'admin') {
                next();
            } else {
                res.status(500).json({message: "You are not authorized to create content"});
            }
    } catch (error) {
        res.status(400).json({ message: "Token is invalid" })
    };
}