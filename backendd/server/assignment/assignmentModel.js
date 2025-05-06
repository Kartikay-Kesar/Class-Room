// name time desription //
const mongoose= require('mongoose')

const assignmentSchema=  mongoose.Schema({
    assignment_title:{type:String,default:''},
    // assignment_attachment:{type:String,default:'no_image.jpeg'},
    assignment_due_date:{type:String,default:''},
    assignment_marks:{type:String,default:''},
    assignment_description:{type:String,default:''},
    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("assignment",assignmentSchema)