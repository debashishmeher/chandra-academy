const mongoose=require("mongoose");
const paymentSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.ObjectId,
        require:[true,"student id must be required"],
        ref:"Student"
    },
    monthlypay:{
        type:Number
    },
    balance:{
        type:Number
    },
    payAmount:{
        type:Number
    },
    receptAmount:{
        type:Number
    },
    discount:{
        type:Number
    },
    dateAt:{
        type:Date,
        default:Date.now()
    },
    bookNo:{
        type:Number
    }
})



const Payment=mongoose.model("Payment",paymentSchema);
module.exports=Payment;