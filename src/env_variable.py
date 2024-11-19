import os
from dotenv import load_dotenv

load_dotenv()

postgres_user = os.getenv("POSTGRES_USER")
postgres_password = os.getenv("POSTGRES_PASSWORD")
postgres_db = os.getenv("POSTGRES_DB")
gemini_api_keys = os.getenv("GEMINI_API_KEY")
postgres_connection_string = os.getenv("POSTGRES_CONNECTION_STRING")
postgres_collection = os.getenv("POSTGRES_COLLECTION")