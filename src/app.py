from flask import Flask, jsonify
from env_variable import port

# Import all the routes.
from routes import routes

# Initiate a Flask application.
app = Flask(__name__)

# Register the blueprint of all the routes.
# API calls for the assigned url prefix will be redirected to the routes.
app.register_blueprint(routes, url_prefix="/")

if __name__ == "__main__":

    if port:
        # Run the application.
        app.run(host="0.0.0.0",debug=True, port=port)