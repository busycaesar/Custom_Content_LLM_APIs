const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT;

if (!PORT) {
  console.log("PORT number not provided.");
  process.exit(1);
}

app.listen(PORT, async () => {
  console.log(`Server started on PORT: ${PORT}`);
});
