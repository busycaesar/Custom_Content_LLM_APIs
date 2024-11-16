from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

def generate_response(prompt, relevant_chunk_of_data):
    # Create a prompt template
    prompt_template = PromptTemplate(
        input_variables=["prompt", "relevant_chunk_of_data"], 
        template= """
        You are a knowledgeable assistant trained to answer questions based on specific content provided to you. Below is the content you should use to respond, followed by a user's question. Do not include information outside the given content. If the question cannot be answered based on the provided content, respond with "I am not trained to answer this."

        Content: {relevant_chunk_of_data}

        User's Question: {prompt}
        """
        )
    
    # Initiate an llm instance
    gemini_api_keys = os.getenv("GEMINI_API_KEY")

    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=gemini_api_keys)

    # Chain the template and instance
    chain = prompt_template | llm

    # Invoke the chain by passing the input variables of prompt
    response = chain.invoke({
        "prompt":prompt,
        "relevant_chunk_of_data": relevant_chunk_of_data
        })

    # Return the response
    return response.content