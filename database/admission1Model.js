const mongoose = require("mongoose");
const User = require("../database/userModel");

const admissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name must be required"],
      minlength: [5, "name must have more than 5 cheracters"],
      lowercase: true,
      trim: true,
    },
    studentclass: {
      type: Number,
      required: [true, "class must be requird"],
      min: 6,
      max: 12,
    },
    medium:{
      type:String,
      enum:["english","odia"]
    },
    dob: {
      type: Date,
      required: [true, "date of birth must be required"],
    },
    gender: {
      type: String,
      required: [true, "gender must be required"],
      enum: ["male", "female"],
    },
    adhar: {
      type: Number,
      required: [true, "adhar no must be required"],
      unique: [true, "user already exists"],
      validate: {
        validator: function (val) {
          return val.toString().length === 12;
        },
        message: (val) => `${val.value} has to be 12 digits`,
      },
    },
    phone: {
      type: Number,
      required: [true, "phone no must be required"],
      validate: {
        validator: function (val) {
          return val.toString().length === 10;
        },
        message: (val) => `${val.value} has to be 10 digits`,
      },
    },
    admission: {
      required: [true, "admission must be required."],
      unique:[true,"this details already exist"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Admission1 = mongoose.model("Admission1", admissionSchema);
module.exports = Admission1;
