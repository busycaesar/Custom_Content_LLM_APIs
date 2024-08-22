const pool = require("./db");
const fs = require("fs");

const createTables = () => {
  return new Promise((resolve, reject) => {
    const createTableQuery = fs.readFileSync("src/db/table.sql", "utf8");

    pool
      .query(createTableQuery)
      .then(() => {
        console.log("All tables created.");
        resolve();
      })
      .catch((error) =>
        reject(
          new Error(
            `Database error while creating all the tables. ${error.message}`
          )
        )
      );
  });
};

const dbHealthCheck = () => {
  return new Promise((resolve, reject) => {
    const healthCheckQuery = `SELECT CURRENT_TIMESTAMP as health_check_time;`;
    pool
      .query(healthCheckQuery)
      .then((result) => resolve(result.rows[0].health_check_time))
      .catch((error) =>
        reject(new Error(`Database error while health check. ${error}`))
      );
  });
};

module.exports = { createTables, dbHealthCheck };
