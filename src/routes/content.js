require("dotenv").config();
const express = require("express");
const router = express.Router();
const tokenMid = require('../middlewares/tokenmid');
const isAdmin = require('../middlewares/adminAuth');
const contentCtrl = require("../controllers/content");

router.post("/admin/content", tokenMid.validateToken, isAdmin.adminAuth, contentCtrl.insertContent);
router.put("/admin/content/:id", tokenMid.validateToken, isAdmin.adminAuth, contentCtrl.updateContent);
router.delete("/admin/content/:id", tokenMid.validateToken, isAdmin.adminAuth, contentCtrl.deleteContent);
router.post("/admin/content/image", tokenMid.validateToken, isAdmin.adminAuth, contentCtrl.uploadImage);
router.get("/content/all", tokenMid.validateToken, contentCtrl.getAllContent);
router.get("/content/gender", tokenMid.validateToken, contentCtrl.contentByGender);
router.get("/content/:id", tokenMid.validateToken, contentCtrl.getOneContent);


module.exports = router;