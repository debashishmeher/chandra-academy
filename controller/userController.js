const User = require("../database/userModel");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

exports.getAllUser = catchAsync(async (req, res, next) => {
  const allUser = await User.find().populate("admission1");

  res.status(200).json({
    status: "success",
    allUser,
  });
});

exports.oneUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).populate("admission1");

  res.status(200).json({
    status: "success",
    user,
  });
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/images/user");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${User._id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("upload file is note an image", 404), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.photoUpload = upload.single("userPhoto");

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select("+password");
  if (!user) {
    return next(new AppError("user not found..", 404));
  }
  if (!user.checkpassword(req.body.currentPassword, user.password)) {
    return next(
      new AppError("you don't have permission to change password", 401)
    );
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordChangeAt = Date.now();
  await user.save();

  const token = signToken(user.id);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});
