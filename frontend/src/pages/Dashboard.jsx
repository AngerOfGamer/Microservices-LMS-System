import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [userRole, setUserRole] = useState(""); // Menyimpan role pengguna
  const navigate = useNavigate();

  // Ambil kelas dan user role (misalnya dari session atau API)
  useEffect(() => {
    // Ambil kelas
    fetch("http://localhost:5000/api/class", {
      credentials: "include",  // Pastikan cookies/session disertakan
    })
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));

    // Ambil role pengguna dari session atau API
    // Misalnya bisa ambil dari session atau endpoint yang memberikan detail user
    const storedUserRole = localStorage.getItem("role") || "mahasiswa"; // Sesuaikan
    setUserRole(storedUserRole);
  }, []);

  // Fungsi untuk navigasi ke halaman CreateClass
  const handleAddClass = () => {
    navigate("/create-class"); // Navigasi ke halaman CreateClass
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Menampilkan tombol "Create Class" hanya untuk Admin */}
      {userRole === "admin" && (
        <button onClick={handleAddClass}>Create Class</button>
      )}

      <div className="class-cards">
        {classes.map((cls) => (
          <div className="class-card" key={cls.class_id}>
            <h3>{cls.class_name}</h3>
            <p>{cls.description}</p>
            <button onClick={() => navigate(`/class/${cls.class_id}`)}>
              View Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
