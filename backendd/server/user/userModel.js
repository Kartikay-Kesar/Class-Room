// name time desription //
const mongoose= require('mongoose')

const userSchema=  mongoose.Schema({
    name:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    userType:{type:String,default:3},//1 admin, 2 student 3 teacher

    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("user",userSchema)