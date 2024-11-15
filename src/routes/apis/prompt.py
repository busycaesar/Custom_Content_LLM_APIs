from flask import Blueprint, jsonify
from routes.response import response

prompt_apis = Blueprint("prompt_apis", __name__)

@prompt_apis.route("/",methods=["POST"])
def post_prompt():
    return jsonify(response(True, 'Prompt Received'))