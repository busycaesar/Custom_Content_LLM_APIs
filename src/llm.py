from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from env_variable import gemini_api_keys

def generate_response(prompt, relevant_chunk_of_data, gemini_api_keys_by_api_call):
    # Create a prompt template
    prompt_template = PromptTemplate(
        input_variables=["prompt", "relevant_chunk_of_data"], 
        template= """
        You are a knowledgeable assistant trained to answer questions based on specific content provided to you. Below is the content you should use to respond, followed by a user's question. Do not include information outside the given content. If the question cannot be answered based on the provided content, respond with "I am not trained to answer this."

        Content: {relevant_chunk_of_data}

        User's Question: {prompt}
        """
        )
    
    model_api_keys = gemini_api_keys_by_api_call if not gemini_api_keys else gemini_api_keys

    if not model_api_keys: return

    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=model_api_keys)

    # Chain the template and instance
    chain = prompt_template | llm

    # Invoke the chain by passing the input variables of prompt
    response = chain.invoke({
        "prompt":prompt,
        "relevant_chunk_of_data": relevant_chunk_of_data
        })

    # Return the response
    return response.content