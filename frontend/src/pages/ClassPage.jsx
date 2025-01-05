import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ContentPage from "./ContentPage"; // Import komponen ContentPage
import AttendancePage from "./AttendancePage"; // Import komponen AttendancePage

const ClassPage = () => {
  const { classId } = useParams(); // Ambil classId dari URL
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("contents"); // Menentukan tab aktif

  useEffect(() => {
    // Memeriksa apakah pengguna sudah login
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); // Pengguna tidak login, arahkan ke login
      return; // Hentikan eksekusi lebih lanjut
    }

    // Ambil data kelas berdasarkan classId
    fetch(`http://localhost:5000/api/class/${classId}`, {
      credentials: "include",  // Kirim session cookie ke backend
    })
      .then((response) => response.json())
      .then((data) => {
        setClassDetails(data);
        setLoading(false); // Set loading false setelah data diambil
      })
      .catch((error) => {
        console.error("Error fetching class details:", error);
        setLoading(false); // Set loading false jika terjadi error
      });
  }, [classId, navigate]);  // Berjalan setiap kali classId atau navigate berubah

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : classDetails ? (
        <div className="container">
          <h2>{classDetails.class_name}</h2>
          <p>{classDetails.description}</p>

          {/* Tabs Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "contents" ? "active" : ""}`}
                onClick={() => setActiveTab("contents")}
              >
                Contents
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "attendance" ? "active" : ""}`}
                onClick={() => setActiveTab("attendance")}
              >
                Attendance
              </button>
            </li>
          </ul>

          {/* Tab Contents */}
          {activeTab === "contents" && <ContentPage classId={classId} />}
          {activeTab === "attendance" && <AttendancePage classId={classId} />}
        </div>
      ) : (
        <p>No class found.</p>
      )}
    </div>
  );
};

export default ClassPage;
