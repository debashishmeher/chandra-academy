const express = require("express");
const Router = express.Router();
const viewController = require("../controller/viewController");
const authContoller = require("../controller/authController");
const admissionContoller = require("../controller/admissionController");

Router.use(authContoller.isLogin);

Router.get("/", viewController.home);
Router.get("/about", viewController.about);
Router.get("/contact", viewController.contact);
Router.get("/admission", viewController.admission);
Router.get(
  "/admission/:admissionId/page1",
  authContoller.protect,
  admissionContoller.checkAdmission1,
  viewController.admission1
);

Router.get(
  "/admission/:admissionId/preview",
  authContoller.protect,
  viewController.getOneAdmission
);

Router.get(
  "/admission/:admissionId/page2",
  authContoller.protect,
  admissionContoller.checkAdmission2,
  viewController.admission2
);
Router.get(
  "/admission/:admissionId/page3",
  authContoller.protect,
  admissionContoller.checkAdmission3,
  viewController.admission3
);
Router.get(
  "/admission/:admissionId/page4",
  authContoller.protect,
  admissionContoller.checkAdmission4,
  viewController.admission4
);
Router.get(
  "/admission/:admissionId/page5",
  authContoller.protect,
  admissionContoller.checkAdmission5,
  viewController.admission5
);

Router.get("/login", viewController.login);
Router.get("/signup", viewController.signup);
Router.get("/forgot", viewController.forgot);
Router.get("/resetPassword/:resetToken", viewController.resetpassword);
Router.get("/alluser", viewController.alluser);
Router.get("/fecility", viewController.fecility);
Router.get("/results", viewController.results);
Router.get("/teachers", viewController.teachers);
Router.get(
  "/admin",
  authContoller.protect,
  authContoller.acessTo("admin"),
  viewController.admin
);
Router.get(
  "/admin/admission",
  authContoller.protect,
  authContoller.acessTo("admin"),
  viewController.adminAdmission
);
Router.get(
  "/admin/students",
  authContoller.protect,
  authContoller.acessTo("admin"),
  viewController.adminStudents
);
Router.get(
  "/admin/enquaries",
  authContoller.protect,
  authContoller.acessTo("admin"),
  viewController.adminEnquaries
);

module.exports = Router;
