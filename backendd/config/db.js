const mongodb = require('mongoose')

mongodb.connect('mongodb://localhost:27017/classroom')
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch(()=>{
    console.log("Error in Connection")
}) 
