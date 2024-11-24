from flask import Blueprint, jsonify, request
from routes.response import response
from db import get_relevant_chunk
from llm import generate_response

prompt_apis = Blueprint("prompt_apis", __name__)

@prompt_apis.route("/",methods=["POST"])
async def api_post_prompt():
    # Get prompt from the request body.
    data = request.get_json()
    prompt = data.get("prompt")
    gemini_api_keys = data.get("gemini_api_keys")

    # Get the relevent chunk of data based on the prompt.
    relevant_chunk_of_data = await get_relevant_chunk(prompt, gemini_api_keys)
    
    # Call the LLM by passing the prompt to get the response.
    llm_response = generate_response(prompt, relevant_chunk_of_data, gemini_api_keys)

    return jsonify(response(True, 'Response sent', llm_response))