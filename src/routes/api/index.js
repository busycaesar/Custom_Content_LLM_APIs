const router = require("express").Router();

router.use("/content", require("./content"));
router.use("/prompt", require("./prompt"));

module.exports = router;
