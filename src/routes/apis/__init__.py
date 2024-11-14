from flask import Blueprint
from .content import content_apis

apis = Blueprint("apis", __name__)

apis.register_blueprint(content_apis, url_prefix="/content")