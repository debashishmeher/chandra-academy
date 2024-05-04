const mongoose = require("mongoose");
const URL = process.env.MONGO_CON;

mongoose
  .connect(URL)
  .then(() => {
    console.log("database connection ready...");
  })
  .catch((err) => {
    console.log(err);
  });
