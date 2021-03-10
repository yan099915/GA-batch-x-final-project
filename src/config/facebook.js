require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/users')();
const bcrypt = require('bcrypt');



passport.use(new FacebookStrategy({

    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'name', 'gender', 'email']

},
(token, refreshToken, profile, done) => {
    console.log('profile', profile)

    process.nextTick(() => {
        User.findOne({ 'email': profile.emails[0].value }, (err, user) => {

            if (err)
                return done(err);
            
            if (user) {
                console.log('user found');
                console.log(user)
                return done(null, user);
            } else {

                let newUser = new User();

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(process.env.PASSWORD, salt)

                newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.email = profile.emails[0].value;
                newUser.gender = profile.gender;
                newUser.password = hash

                newUser.save((err) => {
                    if (err)
                        throw err;

                    console.log('create new user success')
                    return done(null, newUser);
                });
            }
        });
    })
}));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});