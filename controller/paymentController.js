const Payment=require("../database/paymentModel")
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");
// const Admission5=require("../database/admission5Model")
const Student=require("../database/studentModel")
// const authController=require("../controller/authController")

exports.createPayment=catchAsync(async(req,res,next)=>{
    if(!req.body.studentId) req.body.studentId=req.params.studentId;
    const student=await Student.findById(req.params.studentId).populate("admission")

    // find student payment
    const studentPayment= await Payment.find({studentId:req.params.studentId})
    const lastpayment=studentPayment[studentPayment.length-1]
    let discount

    if(lastpayment){
        const monthly=lastpayment.monthlypay
        req.body.monthlypay=lastpayment.monthlypay

        if(req.body.discount){
             discount=req.body.discount*1
        }else{
            discount=0
        }
        if(student.admission.admission5[0].lodgingFees.status =="monthly"){
            req.body.lodgingFees=student.admission.admission5[0].lodgingFees.price
        }
        const year=new Date().getFullYear()-lastpayment.dateAt.getFullYear()+1
        const month=new Date().getMonth()-lastpayment.dateAt.getMonth()
        
        const monthNo=year*month
        console.log(monthNo);
        
        req.body.payAmount=(monthly * monthNo)+lastpayment.balance
    }
    else{
        

        const lodging=(student.admission.admission5[0].lodgingFees.status=="monthly")? student.admission.admission5[0].lodgingFees.price : 0
        req.body.monthlypay=lodging + student.admission.admission5[0].foodingFees +student.admission.admission5[0].transportationFees.price + student.admission.admission5[0].tuitionFees -student.admission.admission5[0].monthlyDiscount
        if(req.body.discount){
            discount=req.body.discount*1
        }else{
            discount=0
        }
        req.body.registrationFees=student.admission.admission5[0].registrationFees.price
        req.body.lodgingFees=student.admission.admission5[0].lodgingFees.price
        // const doa=student.doa
        // const nowaday=Date.now()
        // const perDay=24 * 60 * 60 * 1000
        // const day=Math.round(Math.abs((nowaday - doa) / perDay))
        // console.log(day);
        // const perdaypay=req.body.monthlypay/30
        // const perDayPayAmount=perdaypay*day
        // console.log(perDayPayAmount);
        // const yearlyLodging=(student.admission.admission5[0].lodgingFees.status=="yearly")? student.admission.admission5[0].lodgingFees.price : 0
        const amt=student.admission.admission5[0].totalDiscounted
        // console.log(req.body.registrationFees,amt);
        req.body.payAmount=amt 
        student.registrationStatus="yes"
        await student.save()
    }
    req.body.monthNo=new Date().getMonth() + 1
    console.log(req.body.payAmount,req.body.receptAmount,discount);
    req.body.foodingFees=student.admission.admission5[0].foodingFees
    req.body.transportationFees=student.admission.admission5[0].transportationFees.price
    req.body.tuitionFees=student.admission.admission5[0].tuitionFees
    req.body.monthlyDiscount=student.admission.admission5[0].monthlyDiscount
    req.body.otherDiscount=student.admission.admission5[0].otherDiscount
    // book number and balance
    const number=await Payment.find()
    const last=number[number.length-1]
    console.log(last);
    if(last){
        req.body.bookNo=last.bookNo + 1;
    }
    else{
        req.body.bookNo=1
    }
    req.body.balance=req.body.payAmount-req.body.receptAmount-discount
    const payment=await Payment.create(req.body)

    res.status(200).json({
        status:"success",
        message:"Payment created successfully",
        payment
    })
})

exports.getpaymentform=catchAsync(async(req,res,next)=>{
    const studentId=req.params.studentId
    const student=await Student.findById(studentId).populate("admission")
    if(!student){
        return next(new AppError("user not found",404))
    }
        const lodging=(student.admission.admission5[0].lodgingFees.status=="monthly")? student.admission.admission5[0].lodgingFees.price : 0
        req.body.monthlypay=lodging + student.admission.admission5[0].foodingFees +student.admission.admission5[0].transportationFees.price + student.admission.admission5[0].tuitionFees -student.admission.admission5[0].monthlyDiscount
    const studentPayment= await Payment.find({studentId:req.params.studentId})
    const lastpayment=studentPayment[studentPayment.length-1]
    
    if(lastpayment){
        const year=new Date().getFullYear()-lastpayment.dateAt.getFullYear()+1
        const month=new Date().getMonth()-lastpayment.dateAt.getMonth()
        
        const monthNo=year*month
        res.status(200).render("paymentForm",{student,lastpayment,monthNo})
        console.log(monthNo);
    }
    else{
        // const doa=student.doa
        // const nowaday=Date.now()
        // const perDay=24 * 60 * 60 * 1000
        // const day=Math.round(Math.abs((nowaday - doa) / perDay))
        // const perdaypay=req.body.monthlypay/30
        // const perDayPayAmount=Math.round(perdaypay*day)
        // const yearlyLodging=(student.admission.admission5[0].lodgingFees.status=="yearly")? student.admission.admission5[0].lodgingFees.price : 0
        // const amt=student.admission.admission5[0].registrationFees.price + yearlyLodging
        // const total=amt + perDayPayAmount
        // console.log(total);
        // req.body.payAmount=amt + Math.round(perDayPayAmount)
        res.status(200).render("paymentForm",{student})
    }
    
})
exports.paymentDetails=catchAsync(async(req,res,next)=>{
    const paymentId=req.params.paymentId;
    const payment=await Payment.findById(paymentId)
    // const fees=payment.studentId.admission.admission5[0]
    const student=payment.studentId
    // console.log(fees);

    res.status(200).render("paymentDetails",{student,payment})
})

exports.paymentHistory=catchAsync(async(req,res,next)=>{
    const studentId=req.params.studentId;
    const payments=await Payment.find({studentId})
    res.status(200).render("paymentHistory",{payments})
})
exports.allPayments=catchAsync(async(req,res,next)=>{

    let total=0
    const payments=await Payment.find()
     for(let i=0;i<payments.length;i++){
        total=total+payments[i].payAmount
     }
    console.log(total,payments);
    res.status(200).render("paymentHistory",{payments,total})

})

exports.defulderlist=catchAsync(async(req,res,next)=>{
    let now=new Date().getMonth()
    console.log(now);
    now=7
    const newstudent=await Student.find({registrationStatus:"no"}).select("-admission")
    const students=await Payment.find({monthNo:{$lte:now}}).select("studentId")
    students.forEach(async(el)=>{
        const studentPay=await Payment.find({studentId:el.studentId.id})
        console.log(studentPay);

        // newstudent.push(studentPayments)
    })
    // console.log(newstudent);


    res.status(200).json({
        status:"success",
        students,
        newstudent
    })
})