const express = require("express");
const Router = express.Router();

const admissionController = require("../controller/admissionController");
const authController = require("../controller/authController");

Router.use(authController.protect, authController.acessTo("admin"));

Router.route("/").get(
  authController.protect,
  authController.acessTo("admin"),
  admissionController.getAdmission
);
Router.route("/").post(
  authController.protect,
  admissionController.createAdmission
);

Router.route("/:admissionId")
  .post(authController.protect, admissionController.createAdmission)
  .patch(authController.protect, admissionController.deleteAdmission)
  .get(admissionController.getOneAdmission);

Router.route("/:admissionId/page1").post(
  authController.protect,
  authController.acessTo("admin"),
  admissionController.createAdmission1
).patch(admissionController.updateAdmission1);

Router.route("/:admissionId/page2").post(
  authController.protect,
  admissionController.createAdmission2
).patch(admissionController.updateAdmission2);
Router.route("/:admissionId/page3").post(
  authController.protect,
  admissionController.createAdmission3
).patch(admissionController.updateAdmission3);
Router.route("/:admissionId/page4").post(
  authController.protect,
  admissionController.admissionPhoto,
  admissionController.processimg,
  admissionController.createAdmission4
).patch(admissionController.admissionPhoto,
  admissionController.processimg,
  admissionController.updateAdmission4);

Router.route("/:admissionId/student").post(
  authController.protect,
  admissionController.createStudent
);
Router.route("/:admissionId/page5").post(
  authController.protect,
  admissionController.createPayment
).patch(admissionController.updatePayment);
// .get(admissionController.getpayment);

module.exports = Router;
