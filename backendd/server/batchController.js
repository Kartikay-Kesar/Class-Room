const Batch=require("./batchModel")

addBatch = (req, res) => {
    var validationerror = []
    if (!req.body.batch_title)
        validationerror.push("batch_title is required")
    if (!req.body.batch_name)
        validationerror.push("batch_name is required")
    if (!req.body.batch_timing)
        validationerror.push("batch_timing is required")
    if (!req.body.batch_description)
        validationerror.push("batch_description is required")
   
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else{
        Batch.findOne({batch_name: req.body.batch_name})
        .then(batchData => {
            if(!batchData){
                let batchObj = new Batch()
                batchObj.batch_title = req.body.batch_title
                batchObj.batch_name = req.body.batch_name
                batchObj.batch_timing = req.body.bacth_timing
                batchObj.batch_description = req.body.batch_description
                batchObj.save()
                .then(batchData => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Batch added successfully",
                        data: batchData
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

getBatch=(req,res)=>{
    Batch.find(req.body)
    .then(batchData=>{
        res.send({
            status:200,
            success:true,
            message:"Data found",
            data:batchData
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

singleBatch = (req, res)=>{
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
        Batch.findOne({_id:req.body._id})
        .then(batchData =>{
            res.send({
                status:200,
                success:true,
                message:" single category found",
                data: batchData
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

deleteBatch=(req, res)=>{
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
        Batch.deleteOne({_id:req.body._id})
        .then(batchData=>{
            res.send({
                status:200,
                success:true,
                message:"Deleted successfully",
                data:batchData
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

updateBatch=(req,res)=>{
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
        Batch.findOne({_id:req.body._id})
        .then(batchData=>{
            if(!batchData){
                res.send({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                if(req.body.batch_title)
                    batchData.batch_title=req.body.batch_title
                if(req.body.batch_name)
                    batchData.batch_name=req.body.batch_name
                if(req.body.batch_timing)
                    batchData.batch_timing=req.body.batch_timing
                if(req.body.batch_description)
                    batchData.batch_description=req.body.batch_description
                
                   batchData.save()
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
    addBatch,
    getBatch,
    singleBatch,
    deleteBatch,
    updateBatch,
}