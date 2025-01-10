import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Menyimpan data user dari localStorage
  const [classes, setClasses] = useState([]); // Daftar kelas
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(""); // State error

  // Fungsi untuk fetch data kelas
  const fetchData = async () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user); // Set user ke state

    try {
      console.log("Fetching classes for:", user); // Debugging

      const response = await axios.get("http://localhost:5002/class", {
        headers: {
          username: user.username,
          role: user.role,
        },
      });

      console.log("Classes fetched:", response.data); // Debugging
      setClasses(response.data); // Update state classes dengan hasil fetch
    } catch (err) {
      console.error("Error fetching classes:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Gagal memuat kelas.");
    } finally {
      setLoading(false);
    }
  };

  // UseEffect untuk fetch data
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mencoba lagi saat error
  const handleRetry = () => {
    setLoading(true);
    setError("");
    fetchData();
  };

  // Fungsi untuk navigasi ke halaman detail kelas
  const handleCardClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        {loading && <p className="text-center">Memuat data kelas...</p>}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
            <button onClick={handleRetry} className="btn btn-link">
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && (
          <div>
            {/* Tombol Create Class dan Add User untuk Admin */}
            {user && user.role === "admin" && (
              <div className="d-flex justify-content-start mb-4">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate("/createClass")}
                >
                  Buat Kelas
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/addUser")}
                >
                  Tambah Pengguna
                </button>
              </div>
            )}

            {classes.length === 0 ? (
              <p className="text-center">Tidak ada kelas yang diikuti.</p>
            ) : (
              <div className="row">
                {classes.map((classItem) => (
                  <div
                    key={classItem._id}
                    className="col-md-4 mb-4"
                    onClick={() => handleCardClick(classItem._id)}
                  >
                    <div
                      className="card shadow-sm h-100"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{classItem.class_name}</h5>
                        <p className="card-text">{classItem.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
