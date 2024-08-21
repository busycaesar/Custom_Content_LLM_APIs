const router = require("express").Router();
const response = require("../response");

router.get("/", async (req, res) => {
  res.status(200).json(response(true, "Example Route"));
});

module.exports = router;
