CREATE TABLE IF NOT EXISTS "llm_apis_content" (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    reference_id VARCHAR(100) NOT NULL
);