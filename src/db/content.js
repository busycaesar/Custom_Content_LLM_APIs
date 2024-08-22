const pool = require("./db");

const addContent = (content, referenceId) =>
  new Promise((resolve, reject) => {
    const insertQuery = `
    INSERT INTO "llm_apis_content" (content, reference_id)
                            VALUES ($1, $2);
    `;

    pool
      .query(insertQuery, [content, referenceId])
      .then((result) => {
        if (!result || result.rowCount <= 0)
          reject(new Error(`DB error while adding the new content.`));

        resolve();
      })
      .catch((error) =>
        reject(
          new Error(`DB error while adding the new content. ${error.message}`)
        )
      );
  });

const getContentUsingReferenceId = (referenceId) =>
  new Promise((resolve, reject) => {
    const getQuery = `
    SELECT content
    FROM   llm_apis_content
    WHERE  reference_id = $1;
    `;

    pool
      .query(getQuery, [referenceId])
      .then((result) => {
        if (!result || result.rowCount <= 0)
          reject(
            new Error(
              `No content found with the provided reference id, ${referenceId}.`
            )
          );

        const { content } = result.rows[0];

        resolve(content);
      })
      .catch((error) =>
        reject(
          new Error(`DB error while adding the new content. ${error.message}`)
        )
      );
  });

module.exports = { addContent, getContentUsingReferenceId };
