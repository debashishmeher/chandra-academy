const path = require("path");
module.exports = {
  entry: "./public/js/source.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
  },
};
