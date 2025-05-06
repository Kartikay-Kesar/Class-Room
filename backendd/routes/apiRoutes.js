const routes = require("express").Router()
const { request } = require("express")
const batchController = require("../server/batchController")
const notesController = require("../server/notes/notesController")
const assignmentController = require("../server/assignment/assignmentController")
const teacherController = require("../server/teacher/teacherController")
const studentController = require("../server/student/studentController")
const submissionController = require("../server/submission/submissionController")
const batchAssignController = require("../server/batchAssign/batchAssignController")
const enquiryController = require("../server/enquiry/enquiryController")
const {createUser,loginUser,getAllUser,getUserById,updatedUser,deletedUser} = require("../server/users/userController")
const {addCourse,getAllCourse,getCourseById,updateCourseById,deleteCourseById} = require("../server/course/courseController")
const {adminLogin} = require("../config/seeder")
const multer = require("multer")
routes.post("/addcourse",addCourse)
routes.post("/getallcourse",getAllCourse)
routes.post("/getcoursebyid",getCourseById)
routes.post("/updatecourse",updateCourseById),
routes.post("/deletecourse",deleteCourseById)

//notes's attachment start

const attachmentstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/attachmentImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var newname = file.fieldname + '-' + uniqueSuffix + file.originalname
      req.body['note_attachment'] = newname
      cb(null, newname)
    }
})
  
const attachmentupload = multer({ storage: attachmentstorage })
routes.post("/loginadmin",adminLogin)
routes.post("/createuser",createUser)
routes.post("/loginuser",loginUser)
routes.post("/getalluser",getAllUser)
routes.post("/getuserbyid",getUserById)
routes.post("/updateuser",updatedUser)
routes.post("/deleteuser",deletedUser)

routes.post("/batch/add",batchController.addBatch)

routes.post("/batch/get",batchController.getBatch)
routes.post("/batch/single",batchController.singleBatch)
routes.post("/batch/delete",batchController.deleteBatch)
routes.post("/batch/update",batchController.updateBatch)





// notes 

routes.post("/attachment/add",attachmentupload.single('note_attachment'),notesController.addNote)
routes.post("/attachment/get",notesController.getNote)
routes.post("/attachment/single",notesController.singleNote)
routes.post("/attachment/delete",notesController.deleteNote)
routes.post("/attachment/update",notesController.updateNote)


//assignments


routes.post("/assign/add",assignmentController.add)
routes.post("/assign/get",assignmentController.get)
routes.post("/assign/single",assignmentController.single)
routes.post("/assign/delete",assignmentController.delet)
routes.post("/assign/update",assignmentController.update)

//teacher

routes.post("/teacher/add",teacherController.add)
routes.post("/teacher/login",teacherController.login)
routes.post("/teacher/get",teacherController.getAll)

// students

routes.post("/student/add",studentController.add)
routes.post("/student/login",studentController.login)
routes.post("/student/get",studentController.getAll)

// submissions

routes.post("/submission/add",submissionController.add)
routes.post("/submission/get",submissionController.get)
routes.post("/submission/single",submissionController.single)
routes.post("/submission/delete",submissionController.deleteSubmission)
routes.post("/submission/update",submissionController.update)

// assignBatach

routes.post("/batchAssign/add",batchAssignController.add)
routes.post("/batchAssign/get",batchAssignController.get)
routes.post("/batchAssign/single",batchAssignController.single)
routes.post("/batchAssign/delete",batchAssignController.deleteAssignBatch)
routes.post("/batchAssign/update",batchAssignController.update)

//enquiry

routes.post("/enquiry/add",enquiryController.add)
routes.post("/enquiry/get",enquiryController.get)
routes.post("/enquiry/single",enquiryController.single)
routes.post("/enquiry/delete",enquiryController.deleteEnquiry)
routes.post("/enquiry/update",enquiryController.update)

module.exports = routes