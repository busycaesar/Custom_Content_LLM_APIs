from flask import Blueprint, request, jsonify
from routes.response import response
from db import add_new_content

content_apis = Blueprint("content_apis", __name__)

@content_apis.route("/", methods=["POST"])
def post_content():
    # All data from the request body.
    data = request.get_json()

    # Get the value of content from the data.
    content = data.get("content")

    # Make sure the content is not empty.
    if not content:
        return jsonify(response(False,"Content not provided")), 400

    # Store the content in a Vector DB.
    reference_id = add_new_content(content=content)

    # Return the user unique id of the content.
    return jsonify(response(True, "New content stored.", reference_id))

@content_apis.route("/", methods=["GET"])
def get_content():
    return jsonify(response(True, "Working"))

@content_apis.route("/", methods=["PUT"])
def put_content():
    return jsonify(response(True, "Working"))

@content_apis.route("/", methods=["DELETE"])
def delete_content():
    return jsonify(response(True, "Working"))