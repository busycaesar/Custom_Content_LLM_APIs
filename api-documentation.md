# API Documentation

This document provides an overview of the API endpoints provided by the Content Management service. Each endpoint includes a description, request format, and expected response format.

## Index

### Content

1. [`POST /content`](#post-content) - Create new content.
2. [`GET /content`](#get-content) - Retrieve all stored content.
3. [`GET /content/:referenceId`](#get-contentreferenceid) - Retrieve specific content by reference ID.
4. [`PUT /content/:referenceId`](#put-contentreferenceid) - Update specific content by reference ID.
5. [`DELETE /content/:referenceId`](#delete-contentreferenceid) - Delete specific content by reference ID.

### Prompt

1. [`POST /prompt/:referenceId`](#post-promptreferenceid) - Generate a response based on provided content and prompt.

## Response Structure

All responses will include the following structure:

```json
{
  "success": boolean, // Indicates if the response was successful (true) or a failure (false).
  "message": string, // Describes the status of the request.
  "data": object // Contains any data requested or required by the response.
}
```

## Content

### `POST /content`

**Description**: Create new content. On success, the response will have a status code of 201.

**Request Body**:
```json
{
  "content": "string"
}
```

**Response Body**:
```json
{
  "success": true,
  "message": "New content stored.",
  "data": {
    "referenceId": number // UUID of the stored content
  }
}
```

**Status Codes**:
- 201 Created: Content is successfully stored.
- 400 Bad Request: Content not provided.
- 500 Internal Server Error: Error while trying to store the new content.

### `GET /content`

**Description**: Retrieve all stored content. On success, the response will have a status code of 200.

**Response Body**:
```json
{
  "success": true,
  "message": "N contents returned.",
  "data": [
    {
      "referenceId": number, // UUID of the content
      "content": "string" // The stored content
    },
    ...
  ]
}
```

**Status Codes**:
- 200 OK: Contents are successfully retrieved.
- 500 Internal Server Error: Error while getting the content.

### `GET /content/:referenceId`

**Description**: Retrieve specific content by reference ID. On success, the response will have a status code of 200.

**Path Parameter**:
- `referenceId` (string): The UUID of the content to retrieve.

**Response Body**:
```json
{
  "success": true,
  "message": "Requested content sent.",
  "data": {
    "referenceId": "string", // UUID of the content
    "content": "string" // The stored content
  }
}
```

**Status Codes**:
- 200 OK: Requested content is successfully retrieved.
- 400 Bad Request: Reference ID not provided.
- 500 Internal Server Error: Error while getting the content.

### `PUT /content/:referenceId`

**Description**: Update specific content by reference ID. On success, the response will have a status code of 201.

**Path Parameter**:
- `referenceId` (string): The UUID of the content to update.

**Request Body**:
```json
{
  "content": "string" // The new content to replace the old one
}
```

**Response Body**:
```json
{
  "success": true,
  "message": "The content is updated."
}
```

**Status Codes**:
- 201 Created: Content is successfully updated.
- 400 Bad Request: Insufficient data received.
- 500 Internal Server Error: Error while updating the content.

### `DELETE /content/:referenceId`

**Description**: Delete specific content by reference ID. On success, the response will have a status code of 201.

**Path Parameter**:
- `referenceId` (string): The UUID of the content to delete.

**Response Body**:
```json
{
  "success": true,
  "message": "The content is deleted."
}
```

**Status Codes**:
- 201 Created: Content is successfully deleted.
- 400 Bad Request: Reference ID not received.
- 500 Internal Server Error: Error while deleting the content.

## Prompt

### `POST /prompt/:referenceId`

**Description**: Generate a response based on provided content and prompt using an LLM (Language Learning Model). On success, the response will have a status code of 200.

**Path Parameter**:
- `referenceId` (string): The UUID of the content to use for generating the prompt response.

**Request Body**:
```json
{
  "prompt": "string" // The question or prompt to generate the response
}
```

**Response Body**:
```json
{
  "success": true,
  "message": "Response by the llm is sent.",
  "data": {
    "response": "string" // The response generated by the LLM based on the content and prompt
  }
}
```

**Status Codes**:
- 200 OK: Response generated and returned successfully.
- 400 Bad Request: Insufficient data received or invalid LLM API response.
- 500 Internal Server Error: Error while generating the response using the LLM.
