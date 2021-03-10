const router = require("express").Router();
const favContentCtrl = require("../controllers/favContentCtrl");
const validateToken = require("../middlewares/tokenmid");

router.post(
  "/favourite",
  validateToken.validateToken,
  favContentCtrl.insertFav
);

router.delete(
  "/favourite/:id",
  validateToken.validateToken,
  favContentCtrl.removeFav
);

router.get(
  "/favourite/all",
  validateToken.validateToken,
  favContentCtrl.getAll
);

router.get(
  "/favourite/:id",
  validateToken.validateToken,
  favContentCtrl.getFav
);

router.put("/favourite", validateToken.validateToken, favContentCtrl.updateFav);

module.exports = router;
