# Function to standardize the response for all the API calls.
def response(success, message="", data=None):
    return {
        "success": success,
        "message": message,
        "data": data
    }