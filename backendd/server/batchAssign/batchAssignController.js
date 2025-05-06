const BatchAssign=require("./batchAssignModel")

add = (req, res) => {
    var validationerror = []
    if (!req.body.batchAssign_title)
        validationerror.push("batchAssign_title is required")
    if (!req.body.batchAssign_description)
        validationerror.push("batchAssign_description is required")
    if (!req.body.batchAssign_teacher)
        validationerror.push("batchAssign_teacher is required")
    if (!req.body.batchAssign_timing)
        validationerror.push("batchAssign_timing is required")
   
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else{
        BatchAssign.findOne({batchAssign_title: req.body.batchAssign_title})
        .then(batchAssignData => {
            if(!batchAssignData){
                let batchAssignObj = new BatchAssign()
                batchAssignObj.batchAssign_title = req.body.batchAssign_title
                batchAssignObj.batchAssign_teacher = req.body.batchAssign_teacher
                // batchAssignObj.batchAssign_attachment = "attachmentImages/" + req.body.batchAssign_attachment
                batchAssignObj.batchAssign_timing = req.body.batchAssign_timing
                batchAssignObj.batchAssign_description = req.body.batchAssign_description
                batchAssignObj.save()
                .then(batchAssignData => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "batchAssign added successfully",
                        data: batchAssignData
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
                    message: "batchAssign is already exists",
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
    BatchAssign.find(req.body)
    .then(batchAssignData=>{
        res.send({
            status:200,
            success:true,
            message:"Data found",
            data:batchAssignData
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
        BatchAssign.findOne({_id:req.body._id})
        .then(batchAssignData =>{
            res.send({
                status:200,
                success:true,
                message:" single category found",
                data: batchAssignData
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

deleteAssignBatch = (req, res)=>{
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
        BatchAssign.deleteOne({_id:req.body._id})
        .then(batchAssignData=>{
            res.send({
                status:200,
                success:true,
                message:"Deleted successfully",
                data:batchAssignData
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
        BatchAssign.findOne({_id:req.body._id})
        .then(batchAssignData=>{
            if(!batchAssignData){
                res.send({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                if(req.body.batchAssign_title)
                    batchAssignData.batchAssign_title=req.body.batchAssign_title
                if(req.body.batchAssign_teacher)
                    batchAssignData.batchAssign_teacher=req.body.batchAssign_teacher
                if(req.body.batchAssign_timing)
                    batchAssignData.batchAssign_timing=req.body.batchAssign_timing
                if(req.body.batchAssign_description)
                    batchAssignData.batchAssign_description=req.body.batchAssign_description
                
                   batchAssignData.save()
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
    deleteAssignBatch,
    update,
}