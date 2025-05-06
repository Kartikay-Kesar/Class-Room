const Assignment=require("./assignmentModel")

add = (req, res) => {
    var validationerror = []
    if (!req.body.assignment_title)
        validationerror.push("assignment_title is required")
    if (!req.body.assignment_description)
        validationerror.push("assignment_description is required")
    if (!req.body.assignment_due_date)
        validationerror.push("assignment_due_date is required")
    if (!req.body.assignment_marks)
        validationerror.push("assignment_marks is required")
   
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else{
        Assignment.findOne({assignment_title: req.body.assignment_title})
        .then(assignmentData => {
            if(!assignmentData){
                let assignmentObj = new Assignment()
                assignmentObj.assignment_title = req.body.assignment_title
                assignmentObj.assignment_marks = req.body.assignment_marks
                // assignmentObj.assignment_attachment = "attachmentImages/" + req.body.assignment_attachment
                assignmentObj.assignment_due_date = req.body.assignment_due_date
                assignmentObj.assignment_description = req.body.assignment_description
                assignmentObj.save()
                .then(assignmentData => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "assignment added successfully",
                        data: assignmentData
                    })

                })
                .catch(err => {
                    res.send({
                        status: 500,
                        success: false,
                        message: "internal server error",
                        error: err.message
                    })
                })
                
            }
            else {
                res.send({
                    status: 420,
                    success: false,
                    message: "Assignment is already exists",
                })
            }
        })
        .catch(err => {
            res.send({
                status: 500,
                success: false,
                message: "internal server error",
                error: err.message
            })
        })
    }
}


get=(req,res)=>{
    Assignment.find(req.body)
    .then(assignmentData=>{
        res.send({
            status:200,
            success:true,
            message:"Data found",
            data:assignmentData
        })
    })
    .catch(err=>{
     res.send({
        status:500,
        success:false,
        message:"Internal server error",
        error:err.message
     })
    })
}

single = (req, res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("_id is required" )
    if(validationerror.length>0){
        res.send({
            status:404,
            success:false,
            message:"validation error",
            error:validationerror
        })
    }
    else{
        Assignment.findOne({_id:req.body._id})
        .then(assignmentData =>{
            res.send({
                status:200,
                success:true,
                message:" single category found",
                data: assignmentData
            })
        })
        .catch(err=>{
            res.send({
                status:500,
                success:false,
                message:" Internal server error",
                error:err.message
            })
        })
    }
}

delet = (req, res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status:420,
            success:false,
            message:"validation error occur",
            error: validationerror
        })
    }
    else{
        Assignment.deleteOne({_id:req.body._id})
        .then(noteData=>{
            res.send({
                status:200,
                success:true,
                message:"Deleted successfully",
                data:noteData
            })
        })
        .catch(err=>{
            res.send({
                status500,
                success:false,
                message:" Internal server error"
            })
        })
    }
}

update=(req,res)=>{
    var validationerror=[]
    if(!req.body._id)
        validationerror.push("id is required")
    if(validationerror.length>0){
        res.send({
            status:420,
            success:false,
            message:"validation error",
            error:validationerror
        })
    }
    else{
        Assignment.findOne({_id:req.body._id})
        .then(assignmentData=>{
            if(!assignmentData){
                res.send({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                if(req.body.assignment_title)
                    assignmentData.assignment_title=req.body.assignment_title
                if(req.body.assignment_marks)
                    assignmentData.assignment_marks=req.body.assignment_marks
                if(req.body.assignment_due_date)
                    assignmentData.assignment_due_date=req.body.assignment_due_date
                if(req.body.assignment_description)
                    assignmentData.assignment_description=req.body.assignment_description
                
                   assignmentData.save()
                .then(saveData=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"updated successfully",
                        data:saveData
                    })
                })
                .catch(err=>{
                    res.send({
                        status:500,
                        success:false,
                        message:"internal server error",
                        error:err.message
                    })
                })
            }
        })
    }

}

module.exports={
    add,
    get,
    single,
    delet,
    update,
}