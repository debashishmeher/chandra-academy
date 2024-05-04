const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    rollno: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: Number,
    },
    studentClass: {
      type: Number,
    },
    medium:{
      type:String
    },
    photo:{
      type:String
    },
    admission: {
      type: mongoose.Schema.ObjectId,
      ref: "Admission",
      unique: [true, "student already exist with this admission."],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

studentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "admission",
  });
  next();
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
