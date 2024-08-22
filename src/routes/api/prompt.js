const response = require("../response");
const router = require("express").Router();
const { getContentUsingReferenceId } = require("../../db");
require("dotenv").config();

if (!process.env.LLM_API) {
  console.log("LLM Middleware's API is not provided.");
  process.exit(1);
}

router.post("/:referenceId", async (req, res) => {
  // Get the reference id from the request parameters.
  const { referenceId } = req.params;

  // Get the prompt from the request body.
  const { prompt } = req.body;

  // Make sure all the required data are valid.
  if (!referenceId || !prompt)
    return res
      .status(401)
      .json(
        response(
          false,
          `Insufficient data received. Please check the API documentation`
        )
      );

  try {
    // Get the content using the reference id.
    const content = await getContentUsingReferenceId(referenceId);

    // Create a prompt for the llm.
    const llmPrompt = `
You are an intelligent assistant designed to answer questions using only the provided content. Your task is to give a response based solely on the information contained in the content. 

**Content:** ${content}

**Question:** ${prompt}

Provide an answer based on the content provided. If the content contains relevant information that answers the question, use that to formulate your response.
`;

    // Pass the created prompt to the llm middleware and get the response.
    const llmResponse = await fetch(`${process.env.LLM_API}/api/response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: llmPrompt }),
    });

    const { ok, message, body } = await llmResponse.json();

    if (!ok) return res.status(401).json(response(false, message));

    // Return the response.
    res.status(200).json(response(true, "Response by the llm is send.", body));
  } catch (error) {
    res
      .status(500)
      .json(false, `Error while prompting the llm.`, error.message);
  }
});

module.exports = router;
