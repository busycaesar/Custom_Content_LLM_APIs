const router = require("express").Router();
const response = require("../response");

router.use("/", require("./content"));

module.exports = router;
