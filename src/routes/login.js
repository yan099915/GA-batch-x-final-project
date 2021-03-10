const router = require("express").Router();
const loginControllers = require("../controllers/loginControllers");
const loginMiddleware = require("../middlewares/loginmid");
const validateMid = require("../middlewares/tokenmid");
const passport = require("passport");
const auth = require('../middlewares/fbAuth');

router.post("/login", loginMiddleware.loginmid, loginControllers.login);
router.put(
  "/login/update",
  validateMid.validateToken,
  loginControllers.updateGender
);

//Google sign in
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/googlelogin",
    failureRedirect: "/login",
  })
);

router.get("/googlelogin", loginControllers.googleLogin);


// FACEBOOK LOGIN
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), auth.facebookAuth);

// // Callback without jwt
// router.get('/auth/facebook/callback',
//         passport.authenticate('facebook', {
//             successRedirect : '/',
//             failureRedirect : '/login'
//         }));

module.exports = router;
