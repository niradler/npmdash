require("dotenv").config();
const packagesByUsername = require("./npm/packagesByUsername");

(async () => {
  const res = await packagesByUsername();
  console.log({ res });
})();
