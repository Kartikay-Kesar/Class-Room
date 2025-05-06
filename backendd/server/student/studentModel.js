// name time desription //
const mongoose= require('mongoose')

const studentSchema=  mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",default:null},
    name:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    course:{type:String,default:''},   

    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("student",studentSchema)