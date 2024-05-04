const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    admissionNo: {
      type: String,
      unique: [true, "admission must be unique"],
    },
    doa: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      default: "start",
      enum: ["start", "student", "complete"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

admissionSchema.virtual("admission1", {
  ref: "Admission1",
  foreignField: "admission",
  localField: "_id",
});
admissionSchema.virtual("admission2", {
  ref: "Admission2",
  foreignField: "admission",
  localField: "_id",
});
admissionSchema.virtual("admission3", {
  ref: "Admission3",
  foreignField: "admission",
  localField: "_id",
});
admissionSchema.virtual("admission4", {
  ref: "Admission4",
  foreignField: "admission",
  localField: "_id",
});
admissionSchema.virtual("admission5", {
  ref: "Admission5",
  foreignField: "admission",
  localField: "_id",
});

admissionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "admission1",
  });
  next();
});
admissionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "admission2",
  });
  next();
});
admissionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "admission3",
  });
  next();
});
admissionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "admission4",
  });
  next();
});
admissionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "admission5",
  });
  next();
});

const Admission = mongoose.model("Admission", admissionSchema);
module.exports = Admission;
