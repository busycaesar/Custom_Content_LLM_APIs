from langchain_text_splitters import RecursiveCharacterTextSplitter
import os
from dotenv import load_dotenv
from langchain.schema import Document
from langchain_community.vectorstores import FAISS
from db.db import get_vector_store

load_dotenv()

gemini_api_keys = os.getenv("GEMINI_API_KEY")

async def add_new_content(content: str):
    # Convert the text into Document type.
    content = Document(page_content=content)
    
    # Initiate the text splitter.
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    
    # Using the text splitter, split the content into chunks by passing the converted content.
    documents = text_splitter.split_documents([content])
    
    print(documents)

    vector_store = get_vector_store()

    if not vector_store: return

    vector_store.add_documents(documents)

async def get_content():
    
    content = ""

    return content

async def put_content(content):
    return 000;

async def delete_content():
    return 000;

async def get_relevant_chunk(prompt):
    vector_store = get_vector_store()

    if not vector_store: return

    docs = vector_store.similarity_search(prompt, k=4)

    relevant_chunk = " ".join([d.page_content for d in docs])

    print(relevant_chunk)

    return relevant_chunk