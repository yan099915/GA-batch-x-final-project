const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongoose = require("mongoose");
const userModel = require("../models/users")();
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const findEmail = await userModel.findOne({ email: profile.email });
          if (findEmail) {
            return done(null, profile);
          } else {
            //hash password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(process.env.GOOGLE_PASSWORD, salt);

            let userData = {
              name: profile.displayName,
              email: profile.email,
              password: hash,
              social_media: true,
            };

            const newUser = await userModel.create(userData);

            const email = newUser.email;
            const name = newUser.name;

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

            return done(null, profile);
          }
        } catch (error) {
          return done(null, profile);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
