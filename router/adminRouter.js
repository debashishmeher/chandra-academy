const express=require("express")
const Router=express.Router()

const authController = require("../controller/authController");
const adminController=require("../controller/adminController")
const paymentController=require("../controller/paymentController")


Router.use(authController.protect,authController.acessTo("admin"))

Router.route("/student/:studentId").get(adminController.getStudentDate)
Router.route("/student/:studentId/payment").post(paymentController.createPayment).get(paymentController.getpaymentform)
Router.route("/student/:studentId/paymentHistory").get(paymentController.paymentHistory)



module.exports = Router;