import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(""); // Menyimpan role pengguna
  const [classes, setClasses] = useState([]); // Menyimpan kelas yang ada
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari localStorage setelah login
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserRole(user.role); // Set role berdasarkan data yang ada di localStorage
    }

    // Ambil data kelas
    fetch("http://localhost:5000/api/class", {
      credentials: "include", // Kirim session cookie ke backend
    })
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []); // UseEffect berjalan sekali saat komponen pertama kali render

  // Navigasi ke halaman kelas atau ke halaman create class
  const handleAddClass = () => {
    navigate("/createClass"); // Navigasi ke halaman create class untuk Admin
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>

      {/* Menampilkan tombol "Create Class" hanya untuk Admin */}
      {userRole === "admin" && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={handleAddClass} className="btn btn-primary">
            Create Class
          </button>
        </div>
      )}

      <div>
        <h2>Classes</h2>
        {classes.length === 0 ? (
          <p>No classes available</p>
        ) : (
          <div className="row">
            {classes.map((cls) => (
              <div className="col-md-4 mb-4" key={cls.class_id}>
                <div className="card">
                  <img
                    src="https://via.placeholder.com/150"
                    className="card-img-top"
                    alt={cls.class_name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cls.class_name}</h5>
                    <p className="card-text">{cls.description}</p>
                    <button
                      onClick={() => navigate(`/classPage/${cls.class_id}`)} // Mengarahkan ke halaman detail kelas
                      className="btn btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
