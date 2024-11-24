from langchain_postgres import PGVector
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from env_variable import postgres_connection_string, postgres_collection, gemini_api_keys

def get_vector_store(gemini_api_keys_by_api_call):

    model_api_keys = gemini_api_keys_by_api_call if not gemini_api_keys else gemini_api_keys

    if not model_api_keys: return
    
    embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001", 
    google_api_key=model_api_keys)

    vector_store = PGVector(
    embeddings=embedding_model,
    collection_name=postgres_collection,
    connection=postgres_connection_string,
    use_jsonb=True,
    )

    return vector_store