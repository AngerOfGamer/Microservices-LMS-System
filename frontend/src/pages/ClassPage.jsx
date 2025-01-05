import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ContentPage from "./ContentsPage"; // Import komponen ContentPage
import AttendancePage from "./AttendancePage"; // Import komponen AttendancePage

const ClassPage = () => {
  const { class_id } = useParams(); // Ambil class_id dari URL
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content"); // Menentukan tab aktif

  useEffect(() => {
    // Ambil data kelas berdasarkan class_id
    fetch(`http://localhost:5000/api/class/${class_id}`, {
      credentials: "include",  
    })
      .then((response) => response.json())
      .then((data) => {
        setClassDetails(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching class details:", error);
        setLoading(false); 
      });
  }, [class_id, navigate]); // Gunakan class_id di dependency array

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
          {activeTab === "contents" && <ContentPage classId={class_id} />}
          {activeTab === "attendance" && <AttendancePage classId={class_id} />}
        </div>
      ) : (
        <p>No class found.</p>
      )}
    </div>
  );
};

export default ClassPage;
