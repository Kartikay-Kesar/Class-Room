// name time desription //
const mongoose= require('mongoose')

const batchSchema= new mongoose.Schema({
    batch_title:{type:String,default:''},
    batch_name:{type:String,default:''},
    // batch_id:{type,String},
    batch_timing:{type:String,default:''},
    batch_description:{type:String,default:''},
    status:{type:Boolean,default:true},
    created_At:{type:Date,default:Date.now()},
})

module.exports= mongoose.model("batch",batchSchema)