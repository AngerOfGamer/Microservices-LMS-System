import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ContentPage from "./ContentsPage";
import AttendancePage from "./AttendancePage";

const ClassPage = () => {
  const { classId } = useParams(); // Ambil classId dari URL
  const [activeTab, setActiveTab] = useState("contents");
  const [classDetails, setClassDetails] = useState(null); // Menyimpan detail kelas

  useEffect(() => {
    // Ambil data kelas berdasarkan classId
    fetch(`http://localhost:5000/api/class/${classId}`)
      .then((response) => response.json())
      .then((data) => setClassDetails(data))
      .catch((error) => console.error("Error fetching class details:", error));
  }, [classId]); // Menjalankan setiap kali classId berubah

  return (
    <div>
      <NavBar />

      {/* Tampilkan detail kelas */}
      {classDetails && (
        <div className="class-details mb-4">
          <h2>{classDetails.class_name}</h2>
          <p>{classDetails.description}</p>
        </div>
      )}

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
      <div>
        {activeTab === "contents" && <ContentPage classId={classId} />}
        {activeTab === "attendance" && <AttendancePage classId={classId} />}
      </div>
    </div>
  );
};

export default ClassPage;
