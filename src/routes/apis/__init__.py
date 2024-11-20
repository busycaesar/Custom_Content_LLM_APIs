from flask import Blueprint
from routes.apis.content import content_apis
from routes.apis.prompt import prompt_apis

apis = Blueprint("apis", __name__)

apis.register_blueprint(content_apis, url_prefix="/content")
apis.register_blueprint(prompt_apis, url_prefix="/prompt")