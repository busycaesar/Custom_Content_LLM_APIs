from flask import Flask, jsonify
from routes import routes
from dotenv import load_dotenv
import os

app = Flask(__name__)

app.register_blueprint(routes, url_prefix="/")

load_dotenv()

if __name__ == "__main__":

    PORT = os.getenv("PORT")
    app.run(debug=True, port=PORT)