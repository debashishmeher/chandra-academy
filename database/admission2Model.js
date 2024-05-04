const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    nationallity: {
      type: String,
      required: [true, "name must be required"],
    },
    religion: {
      type: String,
      required: [true, "name must be required"],
    },
    catagory: {
      type: String,
      required: [true, "name must be required"],
    },
    fatherName: {
      type: String,
      required: [true, "name must be required"],
      minlength: [5, "name must have more than 5 cheracters"],
      lowercase: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: [true, "name must be required"],
      minlength: [5, "name must have more than 5 cheracters"],
      lowercase: true,
      trim: true,
    },
    admission: {
      required: [true, "product must be required."],
      unique:[true,"this details already exist"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Admission2 = mongoose.model("Admission2", admissionSchema);
module.exports = Admission2;
