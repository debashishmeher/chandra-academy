const mongoose=require("mongoose")
const admission4Schema=new mongoose.Schema({
    studentPhoto:{
        type:String
    },
    adharPhoto:{
        type:String
    },
    markPhoto:{
        type:String
    },
    admission: {
        required: [true, "product must be required."],
        unique:[true,"this details already exist"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admission",
      },
})

const Admission4=mongoose.model("Admission4",admission4Schema)
module.exports=Admission4