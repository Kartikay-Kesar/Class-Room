const Course = require("./courseModel")

const addCourse = async(req,res) =>{
    try{
        const validation = []
        const {name,code,description} = req.body 

        if(!name || typeof name !== "string"){
            validation.push("name is required and type must be string")
        }
        if(!code || typeof code !== "string"){
            validation.push("code is required and type must be string")
        }
        if(!description || typeof description !== "string"){
            validation.push("description is required and type must be string")
        }

        if(validation.length >0){
            return res.json({
                status:400,
                success:false,
                message:"validation erro",
                error:validation
            })
        }

        const course = await Course.findOne({name})
        if(course){
            return res.json({
                status:404,
                success:false,
                message:"couse is alredy exist"
            })
        }

        const codes  = await Course.findOne({code})
        if(codes){
            return res.json({
                status:404,
                success:false,
                message:"code is already exist"
            })
        }

        const newCourse = new Course({
            name,
            code,
            description
        })

        await newCourse.save()

        res.json({
            status:201,
            success:true,
            message:"course is created successfully",
            data:newCourse
        })

    }catch(err){
       res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
       })
    }
}

const getAllCourse = async(req,res) =>{
    try{
        const course = await Course.find()
        res.json({
            status:200,
            success:true,
            message:"all couse is get successfully",
            data:course
        })

    }catch(err){
     res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
     })
    }
}

const getCourseById = async(req,res) =>{
    try{

        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const course = await Course.findById(id)
        if(!course){
            return res.json({
                status:404,
                success:false,
                message:"course is not found"
            })
        }

        res.json({
            status:200,
            success:true,
            message:"course is fetched",
            data:course
        })

    }catch(err){
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}

const updateCourseById = async(req,res) =>{
    try{
        const{id,...data} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const ids = await Course.findById(id)
        if(!ids){
            return res.json({
                status:404,
                success:false,
                message:"id is not found in the database"
            })
        }

        const course = await Course.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        if(!course){
            return res.json({
                status:404,
                success:false,
                message:"course is not updated"
            })
        }

        res.json({
            status:200,
            success:true,
            message:"course updated successfully",
            data:course
        })

    }catch(err){
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message

        })
    }
}

const deleteCourseById = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
        }

        const ids = await Course.findById(id)
        if(!ids){
            return res.json({
                status:404,
                success:false,
                message:"id is not found in the database"
            })
        }

        const course = await Course.findByIdAndDelete(id)

        if(!course){
            return res.json({
                status:404,
                success:false,
                message:"course is not deleted"
            })
        }

        res.json({
            status:200,
            success:true,
            message:"course is deleted successfully",
            data:course
        })

    }catch(err){
          res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
          })
    }
}

module.exports = {addCourse,getAllCourse,getCourseById,updateCourseById,deleteCourseById}