const express = require('express')
const app= express()
const Port= 3000
const cors = require("cors")

const db = require("./config/db");
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(__dirname + "/public"))


const {seedAdmin}=require('./config/seeder')
seedAdmin()

const userRoutes=require("./routes/apiRoutes")
app.use("/api",userRoutes)

app.get("/home",(req,res)=>{
    res.send('Hello this is home page')
})

app.listen(Port,()=>{
    console.log("Server is Listening on Port No",Port)
})