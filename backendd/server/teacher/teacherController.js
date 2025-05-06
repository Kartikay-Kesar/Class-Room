const Teacher = require('./teacherModel')
const User = require('../user/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const saltround = 10
const privateKey = "professorvinay1432"
add=(req, res) => {
    var validationerror = []
    if (!req.body.name)
        validationerror.push("name is required")
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.password)
        validationerror.push("password is required")
    if (!req.body.address)
        validationerror.push("address is required")
    if (!req.body.designation)
        validationerror.push("designation is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        // email//
        User.findOne({ email: req.body.email })
            .then(customerData => {
                if (!customerData) {
                    let loginObj = new User()
                    loginObj.name = req.body.name
                    loginObj.email = req.body.email
                    loginObj.password = bcrypt.hashSync(req.body.password, saltround)
                    loginObj.userType = 3
                    loginObj.save()
                        // insert
                        .then(saveRes => {
                            let customerObj = new Teacher()
                            customerObj.userId = saveRes._id
                            customerObj.name = req.body.name
                            customerObj.email = req.body.email
                            customerObj.password = bcrypt.hashSync(req.body.password, saltround)
                            customerObj.designation = req.body.designation
                            customerObj.address = req.body.address

                            customerObj.save()
                                .then(customerSave => {


                                    res.send({
                                        status: 200,
                                        success: true,
                                        message: "Teacher register",
                                        data: customerSave
                                    })

                                })
                            // .catch((err) => {
                            //     res.send({
                            //         status: 500,
                            //         success: false,
                            //         message: "internal server error",
                            //         error: err.message
                            //     })
                            // })

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
                        message: "customer is already exists",
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
 login = (req,res) => {
    var validationerror = []
    if(!req.body.email)
        validationerror.push("email is required")
    if(!req.body.password)
        validationerror.push("password is required")
    if(validationerror.length > 0){
        res.send({
            status:422,
            success:false,
            message:"validation error",
            error:validationerror
        })

    } else {
        //  email existence
        User.findOne({email: req.body.email})
        .then(userdata =>{
            if (!userdata){
                res.send({
                  status:402,
                  success:false,
                  message: "invalid email"  
                })
            }
            else{
                // password compare
                bcrypt.compare(req.body.password, userdata.password,function(err,data){
                    if(!data) {
                        res.send({
                            status:422,
                            success:false,
                            message: "password incorrect"
                        })
                    }
                    else{
                        var tokenObj = {
                            _id: userdata._id,
                            email:userdata.email,
                            name:userdata.name,
                            userType: userdata.userType,

                        }
                        var token = jwt.sign(tokenObj, privateKey)
                        res.send({
                            status:200,
                            success:true,
                            message: "login successfully",
                            token: token,
                            data:userdata
                        })
                    }
                })
            }
        })
        .catch((err) => {
            res.json({
                status:500,
                success:false,
                message: "server error",
                error: err.message
            })
        })
    }
 }

 getAll = (req, res) => {
    Teacher.find()
    .then(customerData =>{
        res.send({
            status:200,
            success:true,
            message: "All Data Found",
            data: customerData
        })
    })
    .catch(err => {
        res.send({
            status:500,
            success:false,
            message: "Internal server error",
            error: err.message
        })
    })
 }

module.exports= {
    add,login,getAll
}