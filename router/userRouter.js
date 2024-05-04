const express = require("express");
const Router = express.Router();
const authController = require("../controller/authController");
const userController = require("../controller/userController");

Router.use(authController.isLogin);

Router.route("/signUp").post(authController.signup);
Router.route("/login").post(authController.login);
Router.route("/forgot").post(authController.forgotpass);
Router.route("/logout").get(authController.logout);
Router.route("/resetPassword/:resetToken").patch(authController.resetPassword);
Router.route("/user").get(
  authController.protect,
  authController.acessTo("admin"),
  userController.getAllUser
);
Router.route("/user/:userId").get(userController.oneUser);

module.exports = Router;
