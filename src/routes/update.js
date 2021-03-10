//  DEPENDENCIES
require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = require("express").Router();
/* ----------------------- */
const authMiddleware = require("../middlewares/profile");
const updateMiddleware = require("../middlewares/tokenmid");
const upload = require("../controllers/updateController");

// MOVIES
router.post("/upload", authMiddleware.single("images"), upload.upload);
router.put("/update", updateMiddleware.validateToken, upload.update);
router.get("/get", updateMiddleware.validateToken, upload.get);

module.exports = router;
