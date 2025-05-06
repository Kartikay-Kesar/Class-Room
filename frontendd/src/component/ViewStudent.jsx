import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewStudent = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch teacher data on mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/getalluser");
        const allUsers = res.data.data;
        const onlyTeachers = allUsers.filter(user => user.userType === "student");
        setTeachers(onlyTeachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      {/* Sidebar */}
      <aside
        className="bg-light p-3 shadow-sm"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "250px",
          height: "100vh",
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <h4 className="text-center text-danger fw-bold mb-4">
              Class Room
            </h4>
            <ul className="nav flex-column">
              {[
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
              ].map((item) => (
                <li key={item.name} className="nav-item mb-2">
                  <button
                    onClick={() => navigate(item.path)}
                    className="btn btn-outline-danger w-100 fw-semibold"
                    style={{ fontSize: "14px", padding: "8px" }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn btn-danger fw-bold w-100"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="p-5 bg-white"
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
        }}
      >
        <h2 className="fw-bold text-danger text-center mb-4">
          Welcome to Admin Dashboard
        </h2>

        <h4 className="fw-bold mb-3">Student List:</h4>
        {teachers.length > 0 ? (
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No teacher data available.</p>
        )}
      </main>
    </div>
  );
};

export default ViewStudent;
