const express = require("express");
const Router = express.Router();

const authController = require("../controller/authController");
const adminController = require("../controller/adminController");
const paymentController = require("../controller/paymentController");
const admissionController = require("../controller/admissionController");

Router.use(authController.protect, authController.acessTo("admin"));

Router.route("/student/:studentId/updateStudent").patch(
  admissionController.editDate
);
Router.route("/student/:studentId").get(adminController.getStudentDate);
Router.route("/student/:studentId/payment")
  .post(paymentController.createPayment)
  .get(paymentController.getpaymentform);
Router.route("/student/:studentId/paymentHistory").get(
  paymentController.paymentHistory
);

Router.route("/paymentHistory").get(paymentController.allPayments);

Router.route("/payment/:paymentId")
  .post(paymentController.createPayment)
  .get(paymentController.paymentDetails);

Router.route("/defulder").get(paymentController.defulderlist)
module.exports = Router;
