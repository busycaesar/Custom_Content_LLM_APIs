from flask import Flask, jsonify

# For working with environment variables.
import os
from dotenv import load_dotenv

# Import all the routes.
from routes import routes

# Initiate a Flask application.
app = Flask(__name__)

# Register the blueprint of all the routes.
# API calls for the assigned url prefix will be redirected to the routes.
app.register_blueprint(routes, url_prefix="/")

# Load variables from all .env files.
load_dotenv()

if __name__ == "__main__":

    # Get the PORT number from the environment variable.
    PORT = os.getenv("PORT")
    # Run the application.
    app.run(debug=True, port=PORT)