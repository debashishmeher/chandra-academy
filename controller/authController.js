const User = require("../database/userModel");
const AppError = require("../utility/AppError");
const catchAsync = require("../utility/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../utility/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

exports.signup = catchAsync(async (req, res, next) => {
  if(req.body.role=="admin"){
    const admin=await User.findOne({role:"admin"})
    if(admin){
      return next(new AppError("admin already exist",404))
    }
  }
  const user = await User.create(req.body);
  const url = "http://localhost:4000/";
  await new sendEmail(user, url).sendWelcome();
  const token = signToken(user.id);
  res.cookie("token", token);
  res.status(201).json({
    status: "success",
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and password", 404));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkpassword(password, user.password))) {
    return next(new AppError("invalid user and password", 404));
  }

  const token = signToken(user.id);

  res.cookie("token", token);

  res.status(200).json({
    status: "success",
    user,
  });
});
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "logout");
  res.status(200).json({
    status: "success",
    cookies: res.cookie.token,
  });
});

exports.isLogin = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;

      const decode = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET_KEY
      );

      const currentuser = await User.findById(decode.id);
      if (!currentuser) {
        return next();
      }
      if (currentuser.lastpasswordUpdate(jwt.iat)) {
        return next();
      }
      res.locals.user = currentuser;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("ACTIVE")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError("no authorization token found"));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decode.id);
  if (!user) {
    return next(new AppError("user doesn't exists"));
  }

  if (user.lastpasswordUpdate(jwt.iat)) {
    return next(new AppError("password change after token issued", 404));
  }
  req.user = user;
  next();
});
exports.acessTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you have no permission to access this route", 404)
      );
    }
    next();
  };
};

exports.forgotpass = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return next(new AppError("please provide email", 404));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("user doesn't exists..", 404));
  }
  // create token
  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  // sending email
  const url = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;

  try {
    await new sendEmail(user, url).resetPassword();
    res.status(200).json({
      status: "success",
      message: "token has been sent to your email please check..",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new AppError("sothing went wrong to send email", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const encryptToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: encryptToken,
    passwordResetTokenExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new AppError("user not found..", 404));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordChangeAt = Date.now();
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  await user.save({ validateBeforeSave: true });

  const token = signToken(user.id);

  res.cookie("token", token);
  res.status(200).json({
    status: "success",
    token,
  });
});
