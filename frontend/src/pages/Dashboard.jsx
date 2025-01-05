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
        <button onClick={handleAddClass}>Create Class</button>
      )}

      <div>
        <h2>Classes</h2>
        {classes.length === 0 ? (
          <p>No classes available</p>
        ) : (
          <ul>
            {classes.map((cls) => (
              <li key={cls.class_id}>
                {cls.class_name} - {cls.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
