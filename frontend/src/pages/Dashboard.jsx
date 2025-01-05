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
    navigate("/create-class"); // Navigasi ke halaman create class untuk Admin
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Menampilkan tombol "Create Class" hanya untuk Admin */}
      {userRole === "admin" && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={handleAddClass}>Create Class</button>
        </div>
      )}

      <div>
        <h2>Classes</h2>
        {classes.length === 0 ? (
          <p>No classes available</p>
        ) : (
          <ul>
            {classes.map((cls) => (
              <li key={cls.class_id}>
                <h3>{cls.class_name}</h3>
                <p>{cls.description}</p>
                <button
                  onClick={() => navigate(`/class/${cls.class_id}`)} // Mengarahkan ke halaman detail kelas
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
