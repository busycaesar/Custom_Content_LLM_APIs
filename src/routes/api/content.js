const router = require("express").Router();
const response = require("../response");
const { addContent } = require("../../db");

const generateUniqueId = () => {
  return crypto.randomBytes(16).toString("hex");
};

router.post("/", async (req, res) => {
  // Get the content from the body.
  const { content } = req.body;

  // Make sure that the content is valid.
  if (!content)
    return res.send(401).json(response(false, `Content not provided.`));

  // Generate the reference id for the content.
  const uniqueContentId = generateUniqueId();

  try {
    // Store the content.
    await addContent(content, uniqueContentId);

    // Return the reference id.
    res.status(201).json(response(true, `New content stored.`));
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
