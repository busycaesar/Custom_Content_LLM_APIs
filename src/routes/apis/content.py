from flask import Blueprint, request, jsonify
import uuid
from ..response import response

content_apis = Blueprint("content_apis", __name__)

@content_apis.route("/", methods=["POST"])
def post_content():
    return jsonify(response(True, "Working"))
    # data = request.get_json()
    # content = data.get("content")

    # if not content:
    #     return jsonify(), 400

    # reference_id = str(uuid.uuid4())

    # try:
    #     add_content(content, reference_id)

    #     return jsonify(), 201
    
    # except Exception as error:
    #     return jsonify()