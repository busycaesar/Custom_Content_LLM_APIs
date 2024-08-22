const router = require("express").Router();
const response = require("../response");
const { addContent } = require("../../db");
const { randomUUID } = require("crypto");

router.post("/", async (req, res) => {
  // Get the content from the body.
  const { content } = req.body;

  // Make sure that the content is valid.
  if (!content)
    return res.send(401).json(response(false, `Content not provided.`));

  // Generate the reference id for the content.
  const referenceId = randomUUID();

  try {
    // Store the content.
    await addContent(content, referenceId);

    // Return the reference id.
    res
      .status(201)
      .json(response(true, `New content stored.`, { referenceId }));
  } catch (error) {
    res
      .status(500)
      .json(
        response(
          false,
          `Error while trying to store the new content.`,
          error.message
        )
      );
  }
});

module.exports = router;
