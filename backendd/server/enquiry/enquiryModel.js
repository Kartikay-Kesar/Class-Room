// name time desription //
const mongoose= require('mongoose')

const enquirySchema=  mongoose.Schema({
    
    name:{type:String,default:''},
    email:{type:String,default:''},
    message:{type:String,default:''}, 

    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("enquiry",enquirySchema)