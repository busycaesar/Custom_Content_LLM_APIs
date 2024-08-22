const router = require("express").Router();
const response = require("../response");
const {
  addContent,
  getContentUsingReferenceId,
  getAllContent,
  updateContentUsingReferenceId,
  deleteContentUsingReferenceId,
} = require("../../db");
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

router.get("/", async (req, res) => {
  try {
    // Get all the stored content.
    const content = await getAllContent();

    // Return the content.
    res
      .status(200)
      .json(response(true, `${content.length} contents returned.`, content));
  } catch (error) {
    res
      .status(500)
      .json(response(false, `Error while getting the content.`, error.message));
  }
});

router.get("/:referenceId", async (req, res) => {
  // Get the reference id from the request parameter.
  const { referenceId } = req.params;

  // Make sure the reference id is received.
  if (!referenceId)
    return res.status(401).json(response(false, "Reference id not provided."));

  try {
    // Get the content using the reference id.
    const content = await getContentUsingReferenceId(referenceId);

    // Return the content.
    res.status(200).json(response(true, "Requested content sent.", content));
  } catch (error) {
    res
      .status(500)
      .json(response(false, `Error while getting the content.`, error.message));
  }
});

router.put("/:referenceId", async (req, res) => {
  // Get the reference id from the request parameter.
  const { referenceId } = req.params;

  // Get the content from the request body.
  const { content } = req.body;

  // Make sure all the required data is valid.
  if (!referenceId || !content)
    return res
      .status(401)
      .json(
        response(
          false,
          `Insufficient data received. Please check the API documentation`
        )
      );

  try {
    // Try to update the content using the reference id.
    await updateContentUsingReferenceId(referenceId, content);

    // Infrom about the status of the operation.
    res.status(201).json(response(true, "The content is updated."));
  } catch (error) {
    res
      .status(500)
      .json(
        response(false, `Error while updating the content.`, error.message)
      );
  }
});

router.delete("/:referenceId", async (req, res) => {
  // Get the reference id from the request parameter.
  const { referenceId } = req.params;

  // Make sure all the required data is valid.
  if (!referenceId)
    return res.status(401).json(response(false, `Reference Id not received.`));

  try {
    // Try to delete the content using the reference id.
    await deleteContentUsingReferenceId(referenceId);

    // Infrom about the status of the operation.
    res.status(201).json(response(true, "The content is deleted."));
  } catch (error) {
    res
      .status(500)
      .json(
        response(false, `Error while deleting the content.`, error.message)
      );
  }
});

module.exports = router;
