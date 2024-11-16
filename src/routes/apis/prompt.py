from flask import Blueprint, jsonify, request
from routes.response import response
from db import get_relevant_chunk
from llm import generate_response

prompt_apis = Blueprint("prompt_apis", __name__)

@prompt_apis.route("/",methods=["POST"])
def api_post_prompt():
    # Get prompt from the request body.
    data = request.get_json()
    prompt = data.get("prompt")

    # Get the relevent chunk of data based on the prompt.
    relevant_chunk_of_data = get_relevant_chunk(prompt)
    
    # Call the LLM by passing the prompt to get the response.
    llm_response = generate_response(prompt, relevant_chunk_of_data)

    return jsonify(response(True, 'Response sent', llm_response))