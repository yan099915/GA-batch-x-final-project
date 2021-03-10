const UsersModel = require("../models/users")();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports = {
  register: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {
      //saltkey level 10
      const saltKey = await bcrypt.genSalt(10);

      //cara hash password
      const hashPassword = await bcrypt.hash(password, saltKey);

      //validate email registered
      const emailRegistered = await UsersModel.findOne({ email });
      if (emailRegistered) {
        return res.status(400).json({ message: "Email is already used" });
      }
      //create usersmodel
      const users = await UsersModel.create({
        email: email,
        password: hashPassword,
        name: name,
        salt: saltKey,
        social_media: false,
      });

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });

      let message = {
        from: "sportsmanglints@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: "Sportsman Register Success", // Subject line
        text: "account register sucess", // plain text body
        html: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style>
            body {
            font-family: Monospace;
            }
            h1 {
            color: #F27828;
            margin-left: 10px;
            }
            p {
            color: #F27828;
            font-size: 25px;
            text-align: center;
            }
            img {
            display: block;
            padding-top: 20px;
            padding-bottom: 30px;
            margin-left: auto;
            margin-right: auto;
            width: 45%;
            }
            .container {
            height: auto;
            width: 550px;
            background-color: #FFFFFF;
            padding-top: 30px;
            margin-top: 30px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 20px;
            }
          </style>
          </head>
          <body style="background-color: #F27828;">
          <br><br>
          <div class="container" style="background-color: #FFFFFF; margin-top: 30px;">
          <img src="https://mymoviesapp.s3-ap-southeast-1.amazonaws.com/profile_picture/1614682264427-Logo.png" width="45%;">
          <h1><b>Hello ${name},</b></h1>
            <p>Welcome to Sportsman! The platform supports your workout activity by making it easy to track. With your new account, you can practice your skills.</p>
            <p>Let's Getting Started</p>
            <a href="https://academy.glints.com"><img src="https://mymoviesapp.s3-ap-southeast-1.amazonaws.com/profile_picture/apple-app-store-travel-awards-globestamp-7.png" "></a>
          </div>
          <br><br>
          </body>
        </html>`, // html body
      };

      // send mail with defined transport object
      let info = await transporter.sendMail(message);

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      res.json({
        message: "success register",
        data: {
          users: users,
        },
      });
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  },
};
