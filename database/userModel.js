const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name must be required"],
      minlength: [5, "name must have more than 5 cheracters"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user email must be required"],
      unique: [true, "user already exists"],
      validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "password must be required"],
      minlength: [8, "password must have  more than 8 cheracters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "conform password must be required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password and confirm password are not same",
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "co-admin"],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.virtual("admission1", {
  ref: "Admission1",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkpassword = async function (inputpass, actpass) {
  return await bcrypt.compare(inputpass, actpass);
};
userSchema.methods.lastpasswordUpdate = function (jwtTimeStamp) {
  if (this.passwordChangeAt) {
    const updatetime = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
    return jwtTimeStamp > updatetime;
  }
};

userSchema.methods.createResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
