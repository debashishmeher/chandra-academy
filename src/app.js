const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const path = require("path");
const globalError = require("../controller/globalError.js");
const AppError = require("../utility/AppError.js");
const pug = require("pug");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// database connection...
require("../database/connection.js");

// requiring files
const userRouter = require("../router/userRouter.js");
const viewRouter = require("../router/viewRouter.js");
const enrollRouter = require("../router/enrollRouter.js");
const admissionRouter = require("../router/admissionRouter.js");
const adminRouter = require("../router/adminRouter.js");

// rendering static files

// use middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser().urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

// view router
app.use("/", viewRouter);
app.use(express.static(path.join(__dirname, "../public")));

// router
app.use("/", userRouter);
app.use("/enroll", enrollRouter);
app.use("/admission", admissionRouter);
app.use("/admin", adminRouter);

app.all("*", (req, res, next) => {
  return next(new AppError(`${req.originalUrl} not found on server`, 404));
});

app.use(globalError);
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server listenting at port no ${process.env.PORT}`);
});
