# Content Driven LLM APIs (In Dev.)

## Description

This project is offered as **Image as a Service**. The image can be pulled from DockerHub (`busycaesar/content_driven_llm_apis`) and started. It provides RESTful APIs to integrate AI functionalities into existing projects. This project offers the ability to store and manage content. Additionally, it provides APIs to generate knowledge-based responses using LLMs.

The content is divided into several chunks and stored in a vector database. When a user submits a query, the relevant chunks of data are retrieved from the vector database, combined with the query in a prompt template, and then sent to the LLM to generate a response.

Previously, the application was developed using JavaScript and stored data in PostgreSQL. However, the project is currently being migrated to Python with the LangChain framework, and the data is being stored in pgvector.

To use the image, please refer to [Project Documentation](./documentation.md) to check all the requirements to setup the image.

## Video Explanation

[<img src="https://img.youtube.com/vi/R7Xiv3iG7Fg/0.jpg" width="500" height="375"
/>](https://www.youtube.com/embed/R7Xiv3iG7Fg)

## Tech Stack

- **Application**: Flask, LangChain,
- **Embedding and LLM**: Gemini
- **Vector DB**: pgvector
- **Deployment**: Docker

## Features

- Store content
- Prompt LLM and get knowledge based response

## System Diagram

<img src="./system_diagram.png" width="750" height="400" />

## Documentation

- [API Documentation](./api-documentation.md)
- [Project Documentation](./documentation.md)

## Author

[Dev Shah](https://github.com/busycaesar)
