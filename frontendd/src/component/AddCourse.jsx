import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: ""
  });
  const [staffList, setStaffList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/getallcourse");
      console.log(response)
      setStaffList(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch course list");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // update staff
        const response = await axios.post("http://localhost:3000/api/updatecourse",{
            id:editId,
            ...formData
        }) 
        console.log(response);
        toast.success("Course updated successfully");
      } else {
        // add staff
        const response = await axios.post("http://localhost:3000/api/addcourse", formData);
        console.log(response);
        toast.success("Course added successfully");
      }
      setFormData({
        name: "",
        code: "",
        description: ""
      });
      setEditMode(false);
      setEditId(null);
      fetchStaff();
    } catch (err) {
      console.log(err);
      toast.error("Failed to save course. Please try again");
    }
  };

  const handleEdit = (staff) => {
    setFormData({
      name: staff.name,
      code: staff.code,
      description:staff.description, // Password usually not prefilled
     
    });
    setEditMode(true);
    setEditId(staff._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.post("http://localhost:3000/api/deletecourse",{id});
        toast.success("course deleted successfully");
        fetchStaff();
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete course");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
        { name: "ADD STAFF", path: "/signup" },
        { name: "VIEW STUDENT", path: "/viewstudent" },
        { name: "VIEW TEACHER", path: "/viewteacher" },
        { name: "ADD COURSE", path: "/addcourse" },
        { name: "VIEW COURSE", path: "/viewcourse" },
        { name: "BATCH ASSIGN", path: "/batchassign" },
        { name: "VIEW NOTES", path: "/viewnotes" },
        { name: "VIEW ASSIGNMENT", path: "/viewassignment" },
        { name: "VIEW ENQUIRY", path: "/viewenquiry" },
        { name: "VIEW SUBMISSION", path: "/viewsubmission" },
      ];

  return (
    <div>
      <ToastContainer />
      {/* Sidebar */}
      //       <aside
        className="bg-white shadow-sm p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <h4 className="text-center text-primary fw-bold mb-4">Class Room</h4>
        <ul className="nav flex-column mb-4">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item mb-2">
              <button
                onClick={() => navigate(item.path)}
                className="btn btn-outline-primary w-100 fw-semibold"
                style={{ fontSize: "14px", padding: "10px" }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-danger w-100 fw-bold mt-auto"
          onClick={handleLogout}
        >
          LOG OUT
        </button>
      </aside>

      {/* Main Content */}
      <main
        className="p-5 bg-white"
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
        }}
      >
        <div className="container p-4 shadow rounded" style={{ maxWidth: "100%" }}>
          <h3 className="text-center text-danger fw-bold mb-4">
            {editMode ? "Edit Course" : "Add Course"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Code</label>
              <input
                type="text"
                name="code"
                className="form-control"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            
            <button type="submit" className="btn btn-danger w-100 fw-bold">
              {editMode ? "Update Staff" : "Add Staff"}
            </button>
          </form>

          {/* Staff List */}
          <hr className="my-5" />
          <h4 className="text-center fw-bold text-danger mb-3">Course List</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-danger">
                <tr>
                  <th>Course Name</th>
                  <th>Course Code</th>
                  <th>Description</th>
                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff._id}>
                    <td>{staff.name}</td>
                    <td>{staff.code}</td>
                    <td>{staff.description}</td>
                    
                  
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(staff)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(staff._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {staffList.length === 0 && (
                  <tr>
                    <td colSpan="7">No Course found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCourse;
