const router = require("express").Router();
const registerControllers = require("../controllers/registerControllers");
const registermiddleware = require("../middlewares/registermid");
const loginControllers = require("../controllers/loginControllers");
const loginmiddleware = require("../middlewares/loginmid");

//coba read heroku deploy
router.get("/", (req, res) => res.send("<h1>Sportsman Homepage</h1>"));

router.post(
  "/register",
  registermiddleware.registermid,
  registerControllers.register
);

router.post("/login", loginmiddleware.loginmid, loginControllers.login);

module.exports = router;
