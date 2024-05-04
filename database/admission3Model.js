const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    village: {
      type: String,
      required: [true, "name must be required"],
      lowercase: true,
      trim: true,
    },
    postOffice: {
      type: String,
      required: [true, "name must be required"],
      lowercase: true,
    },
    policeStation: {
      type: String,
      required: [true, "name must be required"],
      lowercase: true,
    },
    pin: {
      type: Number,
      required: [true, "phone no must be required"],
      validate: {
        validator: function (val) {
          return val.toString().length === 6;
        },
        message: (val) => `${val.value} has to be 6 digits`,
      },
    },
    dist: {
      type: String,
      required: [true, "phone no must be required"],
    },
    transport: {
      type: String,
      required: [true, "phone no must be required"],
      enum: ["coaching", "school", "both"],
    },
    stay: {
      type: String,
      required: [true, "phone no must be required"],
      enum: ["hostel", "day scholar"],
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

const Admission3 = mongoose.model("Admission3", admissionSchema);

module.exports = Admission3;
