const Enquiry=require("./enquiryModel")

add = (req, res) => {
    var validationerror = []
    if (!req.body.name)
        validationerror.push("name is required")
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.message)
        validationerror.push("message is required")
   
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else{
        Enquiry.findOne({name: req.body.name})
        .then(enquiryData => {
            if(!enquiryData){
                let enquiryObj = new Enquiry()
                enquiryObj.name = req.body.name
                enquiryObj.message = req.body.message
                enquiryObj.email = req.body.email

                enquiryObj.save()
                .then(enquiryData => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "enquiry added successfully",
                        data: enquiryData
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
    Enquiry.find(req.body)
    .then(enquiryData=>{
        res.send({
            status:200,
            success:true,
            message:"Data found",
            data:enquiryData
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
        Enquiry.findOne({_id:req.body._id})
        .then(enquiryData =>{
            res.send({
                status:200,
                success:true,
                message:" single category found",
                data: enquiryData
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

deleteEnquiry=(req, res)=>{
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
        Enquiry.deleteOne({_id:req.body._id})
        .then(enquiryData=>{
            res.send({
                status:200,
                success:true,
                message:"Deleted successfully",
                data:enquiryData
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
        Enquiry.findOne({_id:req.body._id})
        .then(enquiryData=>{
            if(!enquiryData){
                res.send({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                if(req.body.name)
                    enquiryData.name=req.body.name
                if(req.body.email)
                    enquiryData.email=req.body.email
                if(req.body.message)
                    enquiryData.message=req.body.message
  
                   enquiryData.save()
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
    update,
    deleteEnquiry
}