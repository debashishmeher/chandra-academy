const User = require("../database/userModel");
const Admission = require("../database/admissionModel");
const Admission1 = require("../database/admission1Model");
const Student = require("../database/studentModel");
const catchAsync = require("../utility/catchAsync");
const Enroll = require("../database/enrollModel");

exports.alluser = catchAsync(async (req, res, next) => {
  const alluser = await User.find();

  res.status(200).render("alluser", {
    status: "success",
    alluser,
  });
});

exports.home = catchAsync(async (req, res, next) => {
  let user;
  if (res.locals.user) {
    user = res.locals.user;
  }
  res.status(200).render("home", { user });
});
exports.about = (req, res, next) => {
  res.status(200).render("about");
};
exports.contact = (req, res, next) => {
  res.status(200).render("contact");
};
exports.admission = (req, res, next) => {
  res.status(200).render("admissionhome");
};
exports.admission1 = (req, res, next) => {
  res.status(200).render("admission1");
};
exports.admission2 = (req, res, next) => {
  res.status(200).render("admission2");
};
exports.admission4 = (req, res, next) => {
  const admissionId=req.params.admissionId
  res.status(200).render("admission4",{admissionId});
};
exports.admission3 = (req, res, next) => {
  res.status(200).render("admission3");
};
exports.admission5 = catchAsync(async(req, res, next) => {
  const admissionId=req.params.admissionId;
  const admision1=await Admission1.findOne({admission:admissionId})
  res.status(200).render("admission5",{admision1});
  console.log("admission5");
});

exports.getOneAdmission = catchAsync(async (req, res, next) => {
  const admissionNo = req.params.admissionId;
  const admission = await Admission.findById(admissionNo);

  res.status(200).render("admissionReport", { admission });
});
exports.login = (req, res, next) => {
  res.status(200).render("login");
};
exports.signup = (req, res, next) => {
  res.status(200).render("signup");
};
exports.forgot = (req, res, next) => {
  res.status(200).render("forgot");
};
exports.fecility = (req, res, next) => {
  res.status(200).render("fecility");
};
exports.resetpassword = (req, res, next) => {
  res.status(200).render("resetpassword");
};
exports.admin = (req, res, next) => {
  res.status(200).render("adminSetting");
};
exports.adminAdmission = catchAsync(async (req, res, next) => {
  const admission = await Admission.find({ status: "complete" });
  res.status(200).render("adminAdmission", { admission });
});
exports.adminStudents = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const students = await Student.find(req.query);
  console.log(students.length);
  res.status(200).render("adminStudents", { students });
});
exports.results = (req, res, next) => {
  res.status(200).render("results");
};

exports.teachers = (req, res, next) => {
  res.status(200).render("teachers");
};

exports.adminEnquaries = catchAsync(async (req, res, next) => {
  const enquary = await Enroll.find();

  res.status(200).render("adminEnquaries", { enquary });
});
