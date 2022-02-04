const express = require("express");
const router = express.Router();

router.use("/users", require("../users"));
router.use("/colors", require("../colors"));

module.exports = router;
