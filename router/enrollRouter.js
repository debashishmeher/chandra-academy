const express = require("express");
const Router = express.Router();

const enrollController = require("../controller/enrollController");

Router.route("/")
  .post(enrollController.createEnroll)
  .get(enrollController.getAllData);

module.exports = Router;
