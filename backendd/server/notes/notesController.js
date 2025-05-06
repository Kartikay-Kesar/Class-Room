const Note=require("./notesModel")

addNote = (req, res) => {
    var validationerror = []
    if (!req.body.note_title)
        validationerror.push("note_title is required")
    if (!req.body.note_attachment)
        validationerror.push("note_attachment is required")
    if (!req.body.note_timing)
        validationerror.push("note_timing is required")
    if (!req.body.note_description)
        validationerror.push("note_description is required")
   
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else{
        Note.findOne({note_title: req.body.note_title})
        .then(noteData => {
            if(!noteData){
                let noteObj = new Note()
                noteObj.note_title = req.body.note_title
                noteObj.note_attachment = "attachmentImages/" + req.body.note_attachment
                noteObj.note_timing = req.body.note_timing
                noteObj.note_description = req.body.note_description
                noteObj.save()
                .then(noteData => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "note added successfully",
                        data: noteData
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

getNote=(req,res)=>{
    Note.find(req.body)
    .then(noteData=>{
        res.send({
            status:200,
            success:true,
            message:"Data found",
            data:noteData
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

singleNote = (req, res)=>{
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
        Note.findOne({_id:req.body._id})
        .then(noteData =>{
            res.send({
                status:200,
                success:true,
                message:" single category found",
                data: noteData
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

deleteNote=(req, res)=>{
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
        Note.deleteOne({_id:req.body._id})
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

updateNote=(req,res)=>{
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
        Note.findOne({_id:req.body._id})
        .then(noteData=>{
            if(!noteData){
                res.send({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                if(req.body.note_title)
                    noteData.note_title=req.body.note_title
                if(req.body.note_name)
                    noteData.note_name=req.body.note_name
                if(req.body.note_timing)
                    noteData.note_timing=req.body.note_timing
                if(req.body.note_description)
                    noteData.note_description=req.body.note_description
                
                   noteData.save()
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
    addNote,
    getNote,
    singleNote,
    deleteNote,
    updateNote,
}