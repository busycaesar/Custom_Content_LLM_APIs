const router = require("express").Router();
const response = require("./response");
const { dbHealthCheck } = require("../db");

router.use("/api", require("./api"));

// Healthcheck Route
router.get("/", async (req, res) => {
  console.log("Health Check!");

  // Get the current version of the project.
  const { version } = require("../../package.json");

  try {
    // Get the health check of the db.
    const dbHealth = await dbHealthCheck();

    // Make sure that the response of health check route is not cached.
    res.setHeader("Cache-Control", "no-cache");

    res.status(200).json(
      response(true, "Healthy", {
        "Project Version": version,
        "Current Time": dbHealth,
      })
    );
  } catch (error) {
    res.status(500).json;
  }
});

// 404 Routes.
router.use((req, res) =>
  res.status(404).json(response(false, "Route does not exist."))
);

module.exports = router;
