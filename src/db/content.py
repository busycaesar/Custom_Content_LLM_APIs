from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from dotenv import load_dotenv
from langchain.schema import Document
from langchain_community.vectorstores import FAISS

load_dotenv()

gemini_api_keys = os.getenv("GEMINI_API_KEY")
db = None

async def add_new_content(content: str):
    global db

    # Convert the text into Document type.
    content = Document(page_content=content)
    
    # Initiate the text splitter.
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    
    # Using the text splitter, split the content into chunks by passing the converted content.
    documents = text_splitter.split_documents([content])
    
    # Initiate an embedding model.
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=gemini_api_keys)

    db = FAISS.from_documents(documents, embedding=embeddings)

async def get_content():
    
    content = ""

    return content

async def put_content(content):
    return 000;

async def delete_content():
    return 000;

async def get_relevant_chunk(prompt):
    global db
    
    if db is None: 
        print("No relevant content")
        return "No relevant content"

    docs = db.similarity_search(prompt, k=4)
    relevant_chunk = " ".join([d.page_content for d in docs])

    return relevant_chunk