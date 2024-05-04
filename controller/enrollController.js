const Enroll = require("../database/enrollModel");
const catchAsync = require("../utility/catchAsync");

exports.createEnroll = catchAsync(async (req, res, next) => {
  const enroll = await Enroll.create(req.body);

  res.status(200).json({
    status: "success",
    enroll,
  });
});

exports.getAllData = catchAsync(async (req, res, next) => {
  const data = await Enroll.find();

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});
