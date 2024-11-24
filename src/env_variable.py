import os
from dotenv import load_dotenv

load_dotenv()

port = os.getenv("PORT")
postgres_user = os.getenv("POSTGRES_USER")
postgres_password = os.getenv("POSTGRES_PASSWORD")
postgres_db = os.getenv("POSTGRES_DB")
gemini_api_keys = os.getenv("GEMINI_API_KEY")
postgres_url = os.getenv("POSTGRES_URL")
postgres_connection_string = f"postgresql+psycopg://{postgres_user}:{postgres_password}@{postgres_url}/{postgres_db}"
postgres_collection = os.getenv("POSTGRES_COLLECTION")
