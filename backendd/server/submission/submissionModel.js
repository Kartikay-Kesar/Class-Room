// name time desription //
const mongoose= require('mongoose')

const submissionSchema=  mongoose.Schema({
    submission_by_whome:{type:String,default:''},
    submission_timing:{type:String,default:''},
    submission_description:{type:String,default:''},
    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= new mongoose.model("submission",submissionSchema)