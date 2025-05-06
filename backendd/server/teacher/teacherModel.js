// name time desription //
const mongoose= require('mongoose')

const teacherSchema=  mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",default:null},
    name:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    designation:{type:String,default:''},  
    address:{type:String,default:''},  

    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("teacher",teacherSchema)