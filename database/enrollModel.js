const mongoose = require("mongoose");
const validator = require("validator");

const enrollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be required"],
  },
  email: {
    type: String,
    required: [true, "user email must be required"],
    unique: [true, "user already exists"],
    validate: [validator.isEmail, "please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "number must be required"],
    unique: [true, "user already exists"],
    minLength: [10, "phone number must have 10 digits"],
    maxLength: [10, "phone number must have 10 digits"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Enroll = mongoose.model("Enroll", enrollSchema);

module.exports = Enroll;
