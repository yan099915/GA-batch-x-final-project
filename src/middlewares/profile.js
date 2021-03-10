//Import dependencies
require('dotenv').config()
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const fileFilter = require("./uploadFilter");
const {S3_ACCESS_KEY, S3_ACCESS_SECRET} = process.env;
//Connect S3Bucket
const s3 = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_ACCESS_SECRET,
  region : 'ap-southeast-1'
});

// Storage
const uploadS3 = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "mymoviesapp/profile_picture",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});


module.exports = uploadS3

