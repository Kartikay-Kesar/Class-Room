import React from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();
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
    <div className="d-flex">
      {/* Sidebar */}
      <aside
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
        className="flex-grow-1 bg-light"
        style={{ marginLeft: "250px", minHeight: "100vh", padding: "40px" }}
      >
        <div className="container">
          {/* Hero Section */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h1 className="fw-bold text-dark">
                Let’s learn about new knowledge and abilities
              </h1>
              <p className="text-muted mt-3">
                Empowering educators and students through modern admin tools and seamless course management.
              </p>
              <button className="btn btn-primary mt-3">Explore Courses</button>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="https://img.freepik.com/free-vector/online-education-illustration_52683-47931.jpg"
                alt="Dashboard Visual"
                className="img-fluid rounded"
              />
            </div>
          </div>
          {/* Stats or Highlights Section */}
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="text-primary fw-bold">200+ Students</h5>
                <p className="text-muted">Actively Enrolled</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="text-primary fw-bold">25+ Courses</h5>
                <p className="text-muted">Across 5 categories</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="text-primary fw-bold">15+ Teachers</h5>
                <p className="text-muted">Handling classes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;