// name time desription //
const mongoose= require('mongoose')

const batchAssignSchema=  mongoose.Schema({
    batchAssign_title:{type:String,default:''},
    // batchAssign_attachment:{type:String,default:'no_image.jpeg'},
    batchAssign_teacher:{type:String,default:''},
    batchAssign_timing:{type:String,default:''},
    batchAssign_description:{type:String,default:''},
    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("batchAssign",batchAssignSchema)