from flask import Blueprint, jsonify
from .apis import apis
from .response import response

routes = Blueprint("routes", __name__)

@routes.route("/", methods=["GET"])
def health_check():
    return jsonify(response(True, "App is healthy.")), 200

routes.register_blueprint(apis, url_prefix="/api")