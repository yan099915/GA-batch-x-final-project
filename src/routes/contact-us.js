const router = require("express").Router();
const contactUsControllers = require("../controllers/contactus");

router.post("/contact-us", contactUsControllers.contact);

module.exports = router;
