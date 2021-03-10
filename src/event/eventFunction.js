const nodemailer = require("nodemailer");
require("dotenv").config();
const UsersModel = require("../models/users")();

module.exports = {
  dailyReminder: async () => {
    const email = "triagungpras07@gmail.com";

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
      subject: "Sportsman Daily Reminder", // Subject line
      text: "Workout Daily Reminder", // plain text body
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
          <h1><b>Morning! Sports Man,</b></h1>
          <br>
            <p>Don't forget to exercise today, open your sportsman app and find various types of exercises!</p>
            <br>
             <p style="font-size:20px">“You have to expect things of yourself before you can do them.” – Michael Jordan</p>
            <a href="https://academy.glints.com"><img src="https://mymoviesapp.s3-ap-southeast-1.amazonaws.com/profile_picture/apple-app-store-travel-awards-globestamp-7.png" "></a>
          </div>
          <br><br>
          </body>
        </html>
`, // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  },
};
