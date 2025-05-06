const Submission=require("./submissionModel")

add = (req, res) => {
    var validationerror = []
    if (!req.body.submission_by_whome)
        validationerror.push("submission_title is required")
    if (!req.body.submission_timing)
        validationerror.push("submission_timing is required")
    if (!req.body.submission_description)
        validationerror.push("submission_description is required")
   
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else{
        Submission.findOne({submission_by_whome: req.body.submission_by_whome})
        .then(submissionData => {
            if(!submissionData){
                let submissionObj = new Submission()
                submissionObj.submission_by_whome = req.body.submission_by_whome
                submissionObj.submission_timing = req.body.submission_timing
                submissionObj.submission_description = req.body.submission_description
                submissionObj.save()
                .then(submissionData => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "submission added successfully",
                        data: submissionData
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
                    message: "Batch is already exists",
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
    Submission.find(req.body)
    .then(submissionData=>{
        res.send({
            status:200,
            success:true,
            message:"Data found",
            data:submissionData
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
        Submission.findOne({_id:req.body._id})
        .then(submissionData =>{
            res.send({
                status:200,
                success:true,
                message:" single category found",
                data: submissionData
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

deleteSubmission=(req, res)=>{
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
        Submission.deleteOne({_id:req.body._id})
        .then(submissionData=>{
            res.send({
                status:200,
                success:true,
                message:"Deleted successfully",
                data:submissionData
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
        Submission.findOne({_id:req.body._id})
        .then(submissionData=>{
            if(!submissionData){
                res.send({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                if(req.body.submission_by_whome)
                    submissionData.submission_by_whome=req.body.submission_by_whome
                if(req.body.submission_timing)
                    submissionData.submission_timing=req.body.submission_timing
                if(req.body.submission_description)
                    submissionData.submission_description=req.body.submission_description
                
                   submissionData.save()
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
    deleteSubmission,
    update,
}