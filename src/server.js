const app = require("./app");
require("dotenv").config();
const { createTables } = require("./db");

const PORT = process.env.PORT;

if (!PORT) {
  console.log("PORT number not provided.");
  process.exit(1);
}

createTables()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
