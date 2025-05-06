const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:""
    },
    code:{
        type:String,
        required:true,
        default:""
    },
    description:{
        type:String,
        required:true,
        default:""
    }

})

const Course = mongoose.models.Course || mongoose.model("Course",courseSchema)

module.exports = Course