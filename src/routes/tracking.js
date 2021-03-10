const router = require("express").Router();
const trackingController = require("../controllers/trackingControllers");
const validateMid = require("../middlewares/tokenmid");

router.post("/tracking", validateMid.validateToken, trackingController.insert);
router.get("/tracking", validateMid.validateToken, trackingController.browse);
router.post("/history", validateMid.validateToken, trackingController.inputHistory);
router.get("/history", validateMid.validateToken, trackingController.getHistory);
router.delete(
  "/tracking/:_id",
  validateMid.validateToken,
  trackingController.delete
);

module.exports = router;
