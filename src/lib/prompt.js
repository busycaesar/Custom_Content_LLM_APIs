require("dotenv").config();

const promptLLM = async (content, prompt) => {
  // Create a prompt for the llm.
  const llmPrompt = `
  You are an intelligent assistant designed to answer questions using only the provided content. Your task is to give a direct and concise response based solely on the information contained in the content. Do not mention that the content provided the answer; just deliver the answer itself.
  **Content:** ${content}
  **Question:** ${prompt}
  Provide an answer based on the content provided. If the content contains relevant information that answers the question, use that to formulate your response. If the content does not address the question, respond with: "I am not trained to answer this."
`;

  // Pass the created prompt to the llm middleware and get the response.
  const llmResponse = await fetch(`${process.env.LLM_API}/api/response`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: llmPrompt }),
  });

  const { ok, message, body } = await llmResponse.json();

  if (!ok) throw new Error(message);

  return body;
};

module.exports = { promptLLM };
