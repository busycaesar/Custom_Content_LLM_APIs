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

const getAllContent = () =>
  new Promise((resolve, reject) => {
    const getQuery = `
    SELECT reference_id, content
    FROM   llm_apis_content;
    `;

    pool
      .query(getQuery)
      .then((result) => {
        const { rows } = result;

        resolve(rows);
      })
      .catch((error) =>
        reject(
          new Error(`DB error while adding the new content. ${error.message}`)
        )
      );
  });

const updateContentUsingReferenceId = (referenceId, content) =>
  new Promise((resolve, reject) => {
    const updateQuery = `
    UPDATE llm_apis_content
    SET content = $1
    WHERE reference_id = $2;
    `;

    pool
      .query(updateQuery, [content, referenceId])
      .then((result) => {
        if (!result || result.rowCount <= 0)
          reject(
            new Error(
              `No content found with the provided reference id, ${referenceId}.`
            )
          );

        resolve();
      })
      .catch((error) =>
        reject(
          new Error(`DB error while updating the content. ${error.message}`)
        )
      );
  });

const deleteContentUsingReferenceId = (referenceId) =>
  new Promise((resolve, reject) => {
    const deleteQuery = `
      DELETE FROM llm_apis_content
      WHERE reference_id = $1;
      `;

    pool
      .query(deleteQuery, [referenceId])
      .then((result) => {
        if (!result || result.rowCount <= 0)
          reject(
            new Error(
              `No content found with the provided reference id, ${referenceId}.`
            )
          );

        resolve();
      })
      .catch((error) =>
        reject(
          new Error(`DB error while deleting the content. ${error.message}`)
        )
      );
  });

module.exports = {
  addContent,
  getContentUsingReferenceId,
  getAllContent,
  updateContentUsingReferenceId,
  deleteContentUsingReferenceId,
};
