from flask import Blueprint, jsonify
from .response import response

# Import the apis blueprint.
from .apis import apis


# Initiate Blueprint with the name routes.
routes = Blueprint("routes", __name__)

# Assign the route to the blue print.
@routes.route("/", methods=["GET"])
def health_check():
    return jsonify(response(True, "App is healthy.")), 200

# Register a Blueprint to the routes.
# All the API calls with the url prefix /api will be redirected to the apis.
routes.register_blueprint(apis, url_prefix="/api")