from flask import Blueprint, request, jsonify
from routes.response import response
from db import add_new_content#, get_content, put_content, delete_content

content_apis = Blueprint("content_apis", __name__)

@content_apis.route("/", methods=["POST"])
async def api_post_content():
    # All data from the request body.
    data = request.get_json()

    # Get the value of content from the data.
    content = data.get("content")
    gemini_api_keys = data.get("gemini_api_keys")

    # Make sure the content is not empty.
    if not content:
        return jsonify(response(False,"Content not provided")), 400

    # Store the content in a Vector DB.
    try:
        await add_new_content(content=content, gemini_api_keys=gemini_api_keys)
        
        return jsonify(response(True, "New content stored.")), 201
    except Exception as e:
        return jsonify(response(False, f"Error: {str(e)}")), 500