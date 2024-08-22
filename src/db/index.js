const { createTables, dbHealthCheck } = require("./table");
const { addContent, getContentUsingReferenceId } = require("./content");

module.exports = {
  createTables,
  addContent,
  dbHealthCheck,
  getContentUsingReferenceId,
};
