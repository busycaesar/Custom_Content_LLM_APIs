const { createTables, dbHealthCheck } = require("./table");
const {
  addContent,
  getContentUsingReferenceId,
  getAllContent,
  updateContentUsingReferenceId,
  deleteContentUsingReferenceId,
} = require("./content");

module.exports = {
  createTables,
  addContent,
  dbHealthCheck,
  getContentUsingReferenceId,
  getAllContent,
  updateContentUsingReferenceId,
  deleteContentUsingReferenceId,
};
