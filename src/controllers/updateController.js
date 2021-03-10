require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3();

const UsersModel = require("../models/users")();

module.exports = {
  // UPLOAD USER PROFIL PICTURE
  upload: async (req, res) => {
    try {
      const id = data.userId;
      const secretKey = process.env.SECRETKEY;
      const filter = { _id: id };
      const update = {
        images: req.file.location,
      };
      const updateUser = await UsersModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(updateUser);
      const token = jwt.sign(
        {
          userId: updateUser._id,
          name: updateUser.name,
          gender: updateUser.gender,
          level: updateUser.level,
          role: updateUser.roles,
        },
        secretKey
      );
      res.status(200).json({
        message: "succes insert data",
        data: token,
      });
    } catch (error) {
      res.send(error);
    }
  },

  // GET USER PROFIL PICTURE
  get: async (req, res) => {
    const id = data.userId;
    // IF TOKEN VALID USER CAN UPDATE PERSONAL INFORMATION
    const filter = { _id: id };
    return await UsersModel.findOne(filter).then((profile) => {
      res.status(200).json(profile);
    });
  },

  update: async (req, res) => {
    const id = data.userId;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const level = req.body.level;
    const secretKey = process.env.SECRETKEY;

    // IF TOKEN VALID USER CAN UPDATE PERSONAL INFORMATION
    try {
      let update = {
        name: req.body.name,
        gender: req.body.gender,
        level: req.body.level,
      };
      // UPDATE USER
      if (password) {
        const saltKey = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltKey);
        update.password = hashedPassword;
        update.salt = saltKey;
      }

      const filter = { _id: id };
      // UPDATE USERDATA AT DATABASE.a
      const updateUser = await UsersModel.findOneAndUpdate(filter, update, {
        new: true,
      });

      const token = jwt.sign(
        {
          userId: updateUser._id,
          name: updateUser.name,
          gender: updateUser.gender,
          level: updateUser.level,
          role: updateUser.roles,
        },
        secretKey
      );

      res.send({
        message: "success update",
        data: [token],
      });
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  },
};
