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
    },
    
    registrationFees:{
        type:Number,
        default:0
    },
   lodgingFees:{
    type:Number,
    default:0
},
   foodingFees:{
    type:Number,
    default:0
},
   transportationFees:{
    type:Number,
    default:0
},
   tuitionFees:{
    type:Number,
    default:0
},
   monthlyDiscount:{
    type:Number,
    default:0
},
   otherDiscount:{
    type:Number,
    default:0
}
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })

  paymentSchema.pre(/^find/, function (next) {
    this.populate({
      path: "studentId",
    });
    next();
})

const Payment=mongoose.model("Payment",paymentSchema);
module.exports=Payment;