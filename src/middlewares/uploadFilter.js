const joi = require("joi");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

// FILE FORMAT FILTER
    fileFilter = async (req, file, cb, res) => {
    const { authorization } = req.headers
    let payload = jwt.verify(authorization, process.env.SECRETKEY)
    if (!payload.error) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
        }
        data = payload
        console.log(payload)
    } else {
        res.status(500).json({
            isSuccessful: 500,
            error: true,
            error_message: payload.error,
            message: "token is not valid",
            data: [],
        });
    }
}
module.exports = fileFilter