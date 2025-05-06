// name time desription //
const mongoose= require('mongoose')

const noteSchema=  mongoose.Schema({
    note_title:{type:String,default:''},
    note_attachment:{type:String,default:'no_image.jpeg'},
    note_timing:{type:String,default:''},
    note_description:{type:String,default:''},
    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("note",noteSchema)