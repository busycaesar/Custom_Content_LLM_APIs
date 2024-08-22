const { createTables, dbHealthCheck } = require("./table");
const { addContent } = require("./content");

module.exports = { createTables, addContent, dbHealthCheck };
