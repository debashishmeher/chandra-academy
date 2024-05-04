const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");
const Admission = require("../database/admissionModel");
const Admission1 = require("../database/admission1Model");
const Admission2 = require("../database/admission2Model");
const Admission3 = require("../database/admission3Model");
const Admission4 = require("../database/admission4Model");
const Admission5 = require("../database/admission5Model");
const Student = require("../database/studentModel");
const multer=require("multer")
const sharp=require("sharp");
const { admission2 } = require("./viewController");


// admission------------------
exports.createAdmission = catchAsync(async (req, res, next) => {
  if (!req.body.admissionNo) req.body.admissionNo = Date.now();
  const admission = await Admission.create(req.body);

  res.status(200).json({
    status: "success",
    admission,
  });
});

exports.getAdmission = catchAsync(async (req, res, next) => {
  const admission = await Admission.find({ status: "complete" });

  res.status(200).render("adminAdmission", admission);
});

exports.getOneAdmission = catchAsync(async (req, res, next) => {
  const admissionNo = req.params.admissionId;
  const admissionrpt = await Admission.findById(admissionNo);
  console.log(admissionrpt.admission5[0]);
  res.status(200).render("admissionReport", { admissionrpt });
});

exports.deleteAdmission = catchAsync(async (req, res, next) => {
  const admissionNo = req.params.admissionId;
  const admission = await Admission.findOneAndDelete({ admissionNo });

  res.status(200).json({
    status: "success",
    admission,
  });
});


// admission 1-----------------------{student details}------------------------
exports.createAdmission1 = catchAsync(async (req, res, next) => {
  if (!req.body.admission) req.body.admission = req.params.admissionId;
  const admission = await Admission1.create(req.body);

  res.status(200).json({
    status: "success",
    admission,
  });
});

exports.checkAdmission1=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
  const admission= await Admission1.findOne({admission:admissionId})
  if(!admission){
    return next()
  }
  res.status(200).render("admission1",{admission})
})
exports.updateAdmission1=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
   await Admission1.findOneAndUpdate({admission:admissionId},req.body)

  res.status(200).json({
    status:"success",
    message:"update successfully"
  })
})


// admission 2-----------------{locality details}-----------------

exports.createAdmission2 = catchAsync(async (req, res, next) => {
  if (!req.body.admission) req.body.admission = req.params.admissionId;
  const admission = await Admission2.create(req.body);

  res.status(200).json({
    status: "success",
    admission,
  });
});

exports.checkAdmission2=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
  const admission= await Admission2.findOne({admission:admissionId})
  if(!admission){
    return next()
  }
  res.status(200).render("admission2",{admission})
})

exports.updateAdmission2=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
   await Admission2.findOneAndUpdate({admission:admissionId},req.body)

  res.status(200).json({
    status:"success",
    message:"update successfully"
  })
})

// admission3-------------{address}-------------------
exports.createAdmission3 = catchAsync(async (req, res, next) => {
  if (!req.body.admission) req.body.admission = req.params.admissionId;

  const admission = await Admission3.create(req.body);
  
  res.status(200).json({
    status: "success",
    admission,
  });
});

exports.checkAdmission3=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
  const admission= await Admission3.findOne({admission:admissionId})
  if(!admission){
    return next()
  }
  res.status(200).render("admission3",{admission})
})

exports.updateAdmission3=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
   await Admission3.findOneAndUpdate({admission:admissionId},req.body)

  res.status(200).json({
    status:"success",
    message:"update successfully"
  })
})


// multer configuration----------------------------

const maxSize=0.5*1000*1000
// const multerstorage=multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './images/upload')
//   },
//   filename: function (req, file, cb) {
//     // const sufx=file.mimetype.split("/")[1]
//     cb(null, `${file.fieldname}-${req.params.admissionId}-.jpeg` )
//   },
  // onFileUploadStart: function(file, req, res){
  //   if(req.files.file.length > maxSize) {
  //     return false;
  //   }
  // }
// })


const multerstorage=multer.memoryStorage()
const multerfilter=(req,file,cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    cb(new AppError("not an image! please check.",400),false)
  }
}

const upload=multer({
  storage:multerstorage,
  fileFilter:multerfilter
})

exports.admissionPhoto=upload.fields([
  {name:"studentPhoto",maxCount:1},
  {name:"adharPhoto",maxCount:1},
  {name:"markPhoto",maxCount:1},
])
// exports.admissionPhoto=upload.single("studentPhoto")

exports.processimg=catchAsync(async(req,res,next)=>{

  req.body.studentPhoto=`student-${req.params.admissionId}.jpeg`
  await sharp(req.files.studentPhoto[0].buffer)
  .resize(500,500)
  .toFormat("jpeg")
  .jpeg({quality:90}).toFile(`./public/images/upload/${req.body.studentPhoto}`)


  req.body.adharPhoto=`adhar-${req.params.admissionId}.jpeg`
  await sharp(req.files.adharPhoto[0].buffer)
  .toFormat("jpeg")
  .jpeg({quality:90}).toFile(`./public/images/upload/${req.body.adharPhoto}`)



  req.body.markPhoto=`mark-${req.params.admissionId}.jpeg`
  await sharp(req.files.markPhoto[0].buffer)
  .toFormat("jpeg")
  .jpeg({quality:90}).toFile(`./public/images/upload/${req.body.markPhoto}`)

  next()
})

// admission 4------------- {payment-}--------------------
exports.createAdmission4 = catchAsync(async (req, res, next) => {
  if (!req.body.admission) req.body.admission = req.params.admissionId;
  const admission = await Admission4.create(req.body);
  console.log(admission);


  res.status(200).json({
    status: "success",
    admission,
  });
});

exports.checkAdmission4=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
  const admission= await Admission4.findOne({admission:admissionId})
  if(!admission){
    return next()
  }
  res.status(200).render("admission4",{admission})
})

exports.updateAdmission4=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
   await Admission4.findOneAndUpdate({admission:admissionId},req.body)

  res.status(200).json({
    status:"success",
    message:"update successfully"
  })
})



// creating student----------------

exports.createStudent = catchAsync(async (req, res, next) => {
  const admissionId = req.params.admissionId;

  const admission = await Admission1.findOne({ admission: admissionId });
  const admission2 = await Admission4.findOne({ admission: admissionId });
  // req.body.name=admission.admission1[0].name
  console.log(admission);
  const fullYear = new Date().getFullYear();
  const lastTwoDigits = fullYear.toString().substring(2);
  const rollClass=admission.studentclass.toString();
  const ca="CA"
  const medium=admission.medium.toString().charAt(0).toUpperCase()
  let serialno=await Student.find({
    studentClass:admission.studentclass,
    medium:admission.medium
  })
  serialno=serialno.length*1 + 1;
  serialno=serialno.toString()



  req.body.rollno=lastTwoDigits + rollClass + ca + medium + serialno
  req.body.name = admission.name;
  req.body.phone = admission.phone;
  req.body.studentClass = admission.studentclass;
  req.body.medium = admission.medium;
  req.body.gender = admission.gender;
  req.body.photo = admission2.studentPhoto;
  req.body.admission = admissionId;

  const student = await Student.create(req.body);
  const mainAdmission = await Admission.findById(req.body.admission);

  mainAdmission.status = "student";
  mainAdmission.save();

  res.status(201).json({ status: "success", student });
});


// admission 5--------------
exports.createPayment=catchAsync(async(req,res,next)=>{
  const admissionId = req.params.admissionId;
  const admission1 = await Admission1.findOne({ admission: admissionId });

  let tuition
  if(admission1.medium=="english"){
    tuition=admission1.studentclass*2*100;
  }
  if(admission1.medium=="odia"){
    if(admission1.studentclass=="6"){
      tuition=1000
    }
    if(admission1.studentclass=="7"){
      tuition=1000
    }
    if(admission1.studentclass=="8"){
      tuition=1200
    }
    if(admission1.studentclass=="9"){
      tuition=1300
    }
    if(admission1.studentclass=="10"){
      tuition=1500
    }
    if(admission1.studentclass=="11"){
      tuition=2200
    }
    if(admission1.studentclass=="12"){
      tuition=2400
    }
  }

  console.log(tuition,req.body.foodingFees);

  const admission=new Admission5({
  registrationFees:{
    status:req.body.registrationFees
  },
  lodgingFees:{
    status:req.body.lodgingFees
  },
  foodingFees:req.body.foodingFees,
  transportationFees:{
    status:req.body.transportationFees
  },
  tuitionFees:tuition*1,
  monthlyDiscount:req.body.monthlyDiscount,
  otherDiscount:req.body.otherDiscount,
  admission:req.params.admissionId

  })

  if(admission1.medium=="english"){
    if(admission.registrationFees.status=="new"){
      admission.registrationFees.price="2000"
    }
    else if(admission.registrationFees.status=="old"){
      admission.registrationFees.price="1500"
    }else{
      admission.registrationFees.price=0
    }

  }
  if(admission1.medium=="odia"){
    if(admission.registrationFees.status=="new"){
      admission.registrationFees.price="1500"
    }
    else if(admission.registrationFees.status=="old"){
      admission.registrationFees.price="1000"
    }
    else{
      admission.registrationFees.price=0
    }
    
  }

  if(admission.lodgingFees.status=="yearly"){
    admission.lodgingFees.price="12000"
  }
  else if(admission.lodgingFees.status=="monthly"){
    admission.lodgingFees.price="1000"
  }
  else{
    admission.lodgingFees.price=0
  }

  if(admission.transportationFees.status=="school"){
    admission.transportationFees.price="1200"
  }
  else if(admission.transportationFees.status=="tuition"){
    admission.transportationFees.price="700"
  }
  else if(admission.transportationFees.status=="both"){
    admission.transportationFees.price="1900"
  }
  else{
    admission.transportationFees.price=0
  }


let total=(admission.registrationFees.price) + (admission.lodgingFees.price) + (admission.foodingFees) + (admission.transportationFees.price) + (admission.tuitionFees) 
total=total*1
console.log((admission.registrationFees.price) , (admission.lodgingFees.price) , (admission.foodingFees) , (admission.transportationFees.price) , (admission.tuitionFees));
let subtotal=total - admission.monthlyDiscount - admission.otherDiscount
subtotal=subtotal*1

admission.totalDiscounted=subtotal;
admission.totalAmout=total;
await admission.save()

const mainAdmission = await Admission.findById(admissionId);

mainAdmission.status = "complete";
mainAdmission.save();


  res.status(200).json({
    status:"success",
    admission
  })
})


exports.updatePayment=catchAsync(async(req,res,next)=>{
  const admissionId = req.params.admissionId;
  const admission1 = await Admission1.findOne({ admission: admissionId });
  const admission=await Admission5.findOne({admission:admissionId})

  
admission.registrationFees.status=req.body.registrationFees
admission.lodgingFees.status=req.body.lodgingFees
admission.foodingFees=req.body.foodingFees
admission.transportationFees.status=req.body.transportationFees
admission.monthlyDiscount=req.body.monthlyDiscount
admission.otherDiscount=req.body.otherDiscount

  // console.log(admission1);
  let tuition
  if(admission1.medium=="english"){
    if(admission.registrationFees.status=="new"){
      admission.registrationFees.price="2000"
    }
    else if(admission.registrationFees.status=="old"){
      admission.registrationFees.price="1500"
    }else{
      admission.registrationFees.price=0
    }

    tuition=admission1.studentclass*2*100;
  }
  if(admission1.medium=="odia"){
    if(admission.registrationFees.status=="new"){
      admission.registrationFees.price="1500"
    }
    else if(admission.registrationFees.status=="old"){
      admission.registrationFees.price="1000"
    }
    else{
      admission.registrationFees.price=0
    }
    if(admission1.studentclass=="6"){
      tuition=1000
    }
    if(admission1.studentclass=="7"){
      tuition=1000
    }
    if(admission1.studentclass=="8"){
      tuition=1200
    }
    if(admission1.studentclass=="9"){
      tuition=1300
    }
    if(admission1.studentclass=="10"){
      tuition=1500
    }
    if(admission1.studentclass=="11"){
      tuition=2200
    }
    if(admission1.studentclass=="12"){
      tuition=2400
    }
  }

  if(admission.lodgingFees.status=="yearly"){
    admission.lodgingFees.price="12000"
  }
  else if(admission.lodgingFees.status=="monthly"){
    admission.lodgingFees.price="1000"
  }
  else{
    admission.lodgingFees.price=0
  }

  if(admission.transportationFees.status=="school"){
    admission.transportationFees.price="1200"
  }
  else if(admission.transportationFees.status=="tuition"){
    admission.transportationFees.price="700"
  }
  else if(admission.transportationFees.status=="both"){
    admission.transportationFees.price="1900"
  }
  else{
    admission.transportationFees.price=0
  }

console.log(admission.registrationFees.price,
  admission.lodgingFees.price,
  admission.transportationFees.price,
 admission.monthlyDiscount,
  admission.otherDiscount,
  admission.tuitionFees=tuition*1
  );
  let total=(admission.registrationFees.price) + (admission.lodgingFees.price) + (admission.foodingFees) + (admission.transportationFees.price) + (admission.tuitionFees) 
  total=total*1
  console.log((admission.registrationFees.price) , (admission.lodgingFees.price) , (admission.foodingFees) , (admission.transportationFees.price) , (admission.tuitionFees));
  let subtotal=total - admission.monthlyDiscount - admission.otherDiscount
  subtotal=subtotal*1
  
  admission.totalDiscounted=subtotal;
  admission.totalAmout=total;


admission.tuitionFees=tuition*1
await admission.save()

  res.status(200).json({
    status:"success",
    admission
  })
})


exports.checkAdmission5=catchAsync(async(req,res,next)=>{
  const admissionId=req.params.admissionId;
  const admission= await Admission5.findOne({admission:admissionId})
  if(!admission){
    return next()
  }
  res.status(200).render("admission5",{admission})
})


exports.getpayment=catchAsync(async(req,res,next)=>{
  const admissionId = req.params.admissionId;
  const admission=await Admission5.findOne({ admission: admissionId })

  console.log(admission.registrationFees.price);
  res.status(200).json({
    status:"success",
    admission
  })
})
