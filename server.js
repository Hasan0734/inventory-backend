const dotenv = require("dotenv").config();
const mongosse = require("mongoose");
const app = require("./app");

//database connection

mongosse.connect(process.env.DATABASE);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
