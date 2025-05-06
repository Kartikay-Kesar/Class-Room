import Home from "./component/Home"
import Layout from "./Master/Layout"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import About from "./component/About"
import Course from "./component/Course"
import Signup from "./component/Signup"
import Login from "./component/Login"
import AdminDashbaord from "./component/AdminDashbaord"
import ViewStudent from "./component/ViewStudent"
import ViewTeacher from "./component/ViewTeacher"
import AddCourse from "./component/AddCourse"
import BatchAssign from "./component/BatchAssign"
import ViewNotes from "./component/ViewNotes"
import ViewAssignment from "./component/ViewAssignment"
import ViewEnquiry from "./component/ViewEnquiry"
import ViewSubmission from "./component/ViewSubmission"
import ViewCourse from "./component/ViewCourse"


function App() {


  return (
    <BrowserRouter>
    <Routes>
     <Route path="/"element={<Layout/>} >
     <Route index element={<Home/>} />
     <Route path="/about" element={<About/>} />
     <Route path="/course" element={<Course/>} />
 
     

      </Route>
     <Route path="/signup" element={<Signup/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/admin/dashboard" element={<AdminDashbaord/>} />
     <Route path="/viewstudent" element={<ViewStudent/>} />
     <Route path="/viewteacher" element={<ViewTeacher/>} />
     <Route path="/addcourse" element={<AddCourse/>} />
     <Route path="/viewcourse" element={<ViewCourse/>} />
     <Route path="/batchassign" element={<BatchAssign/>} />
     <Route path="/viewnotes" element={<ViewNotes/>} />
     <Route path="/viewassignment" element={<ViewAssignment/>} />
     <Route path="/viewenquiry" element={<ViewEnquiry/>} />
     <Route path="/viewsubmission" element={<ViewSubmission/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
