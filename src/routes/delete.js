const router = require("express").Router();
const deleteUser = require("../controllers/deleteUser")
const validateMid = require("../middlewares/tokenmid");

router.delete("/users/delete", validateMid.validateToken, deleteUser.delete);

module.exports = router;