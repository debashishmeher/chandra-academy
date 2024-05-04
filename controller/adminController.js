const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");
const Student = require("../database/studentModel");
const Payment = require("../database/paymentModel");

exports.getStudentDate=catchAsync(async(req,res,next)=>{
    const studentId=req.params.studentId;
    console.log(studentId);
    const student=await Student.findById(studentId)
    res.status(200).render("studentpage",{student})
})

