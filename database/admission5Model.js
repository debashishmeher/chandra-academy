const mongoose= require("mongoose")

const pricingSchema=new mongoose.Schema({
    status:{
        type:String,
    },
    price:{
        type:Number
    }
})

const admissionSchema=new mongoose.Schema({
   registrationFees:pricingSchema,
   lodgingFees:pricingSchema,
   foodingFees:{
    type:Number,
    
   },
   transportationFees:pricingSchema,
   tuitionFees:{
    type:Number
   },
   monthlyDiscount:{
    type:Number
   },
   otherDiscount:{
    type:Number
   },
   totalAmout:{
    type:Number
   },
   totalDiscounted:{
    type:Number
   },
   admission: {
    required: [true, "product must be required."],
    unique:[true,"this details already exist"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admission",
  },
})

// admissionSchema.pre("save",function(next){
    
// function checkundefined(val){
//     if(val == undefined){
//     return val=0
//     }
  
//   }
  
//   let total=checkundefined(this.registrationFees.price) + checkundefined(this.lodgingFees.price) + checkundefined(this.foodingFees) + checkundefined(this.transportationFees.price) + checkundefined(this.tuitionFees) 
//   total=total*1
//   console.log(checkundefined(this.registrationFees.price) , checkundefined(this.lodgingFees.price) , checkundefined(this.foodingFees) , checkundefined(this.transportationFees.price) , checkundefined(this.tuitionFees));
//   let subtotal=total - this.monthlyDiscount - this.otherDiscount
//   subtotal=subtotal*1
  
//   this.totalDiscounted=subtotal;
//   this.totalAmout=total;
//   next()
// })

const Admission5=mongoose.model("Admission5",admissionSchema)

module.exports=Admission5